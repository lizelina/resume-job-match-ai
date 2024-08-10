from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from pymongo import MongoClient
# 用于上传pdf
from werkzeug.utils import secure_filename
import uuid

import time
# 导入解析函数简历的函数
from parse import parse_resume
# 读取mongodb的id
from bson.objectid import ObjectId
# 构建工作的向量数据库
from langchain_community.document_loaders.csv_loader import CSVLoader
import pandas as pd
import chromadb
import chromadb.utils.embedding_functions as embedding_functions
from tqdm import tqdm  # 引入tqdm
# 导入match函数
from match import match_job
from flask import g

app = Flask(__name__)
CORS(app)

# 创建工作数据库列表
df = pd.read_excel('./detailed_jobs_collection.xlsx')
# 将 NaN 替换为 None
df.replace({np.nan: None}, inplace=True)
# 将 DataFrame 的前两行转换为字典列表
dict_list = df.to_dict('records')

# 连接到 MongoDB 实例
client = MongoClient('mongodb://127.0.0.1:27017')
# 创建一个名为 "mydatabase" 的数据库，如果不存在的话
db = client['OfferAI']
collection_pdf = db['resume_pdf']
collection_user = db['user']

# 创建工作的embedding数据库
loader = CSVLoader(file_path='./jobs_collection.csv', encoding="utf-8")
jobs = loader.load()

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key="openai-api-key",
)
chroma_client = chromadb.Client()
# 每一次初始化最好改一下jobs-nus-20xx的名字，没写判断语句
chroma_collection = chroma_client.create_collection("jobs-nus-2225", embedding_function=openai_ef)
ids = [str(i) for i in range(len(jobs))]
job_texts = [job.page_content for job in jobs]


def batch(iterable, n=1):
    """分批生成器，每批产生n个项"""
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]


# 假设我们决定每批处理的最大文本数量
batch_size = 50  # 举例，实际大小应根据您的限制和文本长度来调整
# 计算总批次数，用于初始化tqdm
total_batches = len(job_texts) // batch_size + (1 if len(job_texts) % batch_size else 0)
# 使用tqdm包装我们的批处理循环
for batch_ids, batch_texts in tqdm(zip(batch(ids, batch_size), batch(job_texts, batch_size)), total=total_batches,
                                   desc="Processing batches"):
    chroma_collection.add(ids=batch_ids, documents=batch_texts)


# 读取前端传过来的简历pdf并且传入数据库
@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['resume']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        content = file.read()

        # 将文件存储到MongoDB中
        pdf_document = {
            'filename': filename,
            'content': content
        }
        result = collection_pdf.insert_one(pdf_document)

        return jsonify({'message': 'File uploaded successfully', 'document_id': str(result.inserted_id)}), 200

    else:
        # 如果文件不是PDF格式，返回错误提示
        return jsonify({'error': 'File format not allowed. Only PDF files are accepted.'}), 400


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}


resume_parsed_content = ''


# 解析简历并转入同一个id的对象
@app.route('/parse', methods=['POST'])
def parse_resume_result():
    data = request.get_json()
    file_id = str(data['id'])
    start_time = time.time()
    resume_id = ObjectId(file_id)

    # 解析简历
    response_parse = parse_resume(resume_id, collection_pdf)
    collection_pdf.update_one({'_id': resume_id}, {'$set': {'parsed_data': response_parse}})
    result = collection_pdf.update_one({'_id': resume_id}, {'$set': {'parsed_data': response_parse}})
    # print(result.matched_count, result.modified_count)
    end_time = time.time()
    parse_time = end_time - start_time
    # print(parse_time)
    g.resume_parsed_content = response_parse

    # 匹配工作
    response_parse_str = response_parse
    id_list = match_job(response_parse_str, chroma_collection)
    collection_pdf.update_one({'_id': resume_id}, {'$set': {'match_result': id_list}})

    matched_jobs = [dict_list[int(i)] for i in id_list]

    return jsonify({'message': response_parse, 'match_result': matched_jobs}), 200



@app.route('/login', methods=['POST'])
def login():
    token = str(uuid.uuid4())

    data = request.get_json()
    required_fields = ['mobile', 'password']

    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    user = collection_user.find_one({'mobile': str(data['mobile'])})

    if user == None:
        return jsonify({'error': 'User not found'}), 400

    if user['password'] != data['password']:
        return jsonify({'error': 'Incorrect password'}), 400

    return jsonify({'message': 'Logged in successfully', 'token': token}), 200


@app.route('/')
def index():
    return dict_list


if __name__ == '__main__':
    app.run(port=5004, debug=True)
