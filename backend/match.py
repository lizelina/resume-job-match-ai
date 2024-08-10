import os
import json


os.environ["OPENAI_API_KEY"] = "openai-api-key"  # YOUR_API_KEY

def match_job(response_parse_str,chroma_collection1):

    structured_resume = json.loads(response_parse_str)

    # print(structured_resume['Undergraduate Major'])
    if structured_resume['Internship Experience']:
        query=f"the candidate's major is {structured_resume['Undergraduate Major']}"
        for i in range(min(len(structured_resume['Internship Experience']),3)):
            query += f'''
            internship job title is {structured_resume['Internship Experience'][i]["Job_Title"]}, internship experience is
            {structured_resume['Internship Experience'][i]["Summary"]},
            '''
    else:
        query=f"the candidate's major is {structured_resume['Undergraduate Major']}"

    results = chroma_collection1.query(query_texts=[query], n_results=100)
    return results['ids'][0]