from pdfminer.high_level import extract_text_to_fp
from pdfminer.layout import LAParams
import io
from openai import OpenAI
import re

def parse_resume(file_id,collection_pdf):
    client = OpenAI(api_key='openai-api-key')

    pdf_document = collection_pdf.find_one({'_id': file_id})
    pdf_data = pdf_document['content']
    if pdf_data:
    # 使用io.BytesIO创建一个类文件对象
        pdf_stream = io.BytesIO(pdf_data)

        # PDFMiner配置
        laparams = LAParams()
        output = io.StringIO()
        
        # 提取PDF文本内容
        extract_text_to_fp(pdf_stream, output, laparams=laparams)
        resume = output.getvalue()
        
        print(resume)
        
        # 清理
        pdf_stream.close()
        output.close()
    else: 
        print('none')

    completion = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=[
            {"role": "system", "content": '''
            Now you are an interviewer who can extract useful information from a candidate's resume 

            <Task>
            You have 2 tasks

            Your task1 is to extract the following information one by one based on the document in english, take responsibility for the accuracy of the information
            REMEMBER:if there is no relevant, please fill in 'none'
            - Name:
            - Phone Number:
            - E-mail:
            - Undergraduate School(or bachelor school):
            - Undergraduate Major(or bachelor major):
            - Graduate School(or master school):
            - Graduate Major(or master major):
            - Internship Experience: Divide the experiences Internship in a certain company by different stages of the applicant's career and provide a summary for each stage as far as detailed, keeping each summary within 800 words and no less than 200 words
            - Project Experience: Divide the experiences by different stages of the applicant's career and provide a summary for each stage, keeping each summary within 800 words and no less than 200 words.

    

            <Example>
            you can refer to the following two examples:
            1.
            'EDUCATION BACKGROUND 
            Xi’an Jiaotong University, Xi’an, China                                                                                              09/2018-06/2022 
            Major: Mechanical Engineering                                Average Grade: 87.81/100                    Bachelor of Engineering 
            Computer Skills: 

            C/C++, Python, MATLAB 
            AutoCAD, Solidworks, CATIA, MasterCAM, ANSYS, Workbench 
            Outstanding Student of XJTU(10/2021&10/2020), Third Class Scholarship of XJTU(10/2021),           
            Second Class SMC Scholarship(09/2020) 
            '
            in this paragraph,Undergraduate School(or bachelor school) is Xi’an Jiaotong University, Graduate Major(or master major) is Mechanical Engineering\
            Graduate School(or master school) is none, Graduate Major(or master major) is none

            2.
            'Lab Center of the School of Mechanical Engineering, Shanghai University of Science and Technology 
            Volunteer Research Assistant                                                                  1-5&7-8/2020, 1-2&7-9/2021, 10/2022-present             
              Acquired knowledge of deep learning and transfer learning and realized algorithms using Python and MATLAB 
              Was responsible for data pre-processing and visualization of analysis results 
              Assisted in constructing, analyzing and optimizing digital twin models 
              Attended the lab’s weekly research meetings and provided assistance to other research fellows '
            this is Project Experience, 

            <Format>
            Output as JSON as following format in English
            Don't generate any tokens before or after json
            {
            "Name": 
            "Phone Number":
            "E-mail":
            "Undergraduate School": 
            "Undergraduate Major": 
            "Graduate School": 
            "Graduate Major": 
            "Internship Experience": [
                {
                "Company": 
                "Job_Title": 
                "Location": 
                "Duration": 
                "Summary":
                },
                ...
            ]
            "Project Experience":
            
            '''},
            {"role": "user", "content": resume}
        ]
    )
    parsed_result=completion.choices[0].message.content
    re_parsed_result = extract_json(parsed_result)

    return re_parsed_result



def extract_json(text):
    pattern = r'{.*}'
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group()
    else:
        return 'parse incorrectly'

    

    


