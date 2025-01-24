import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EmployeeInfo')

def lambda_handler(event, context):
    if event['httpMethod'] == 'POST':
        employee_data = json.loads(event['body'])
        table.put_item(Item=employee_data)
        return {
            'statusCode': 200,
            'body': json.dumps('Employee data saved successfully')
        }
    elif event['httpMethod'] == 'GET':
        employee_id = event['queryStringParameters']['EmployeeID']
        response = table.get_item(Key={'EmployeeID': employee_id})
        return {
            'statusCode': 200,
            'body': json.dumps(response.get('Item', 'Employee not found'))
        }
