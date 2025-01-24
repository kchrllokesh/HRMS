import boto3
import base64

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = 'hrms-documents'
    file_name = event['queryStringParameters']['fileName']
    file_content = base64.b64decode(event['body'])
    s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)
    return {
        'statusCode': 200,
        'body': json.dumps('Document uploaded successfully')
    }
