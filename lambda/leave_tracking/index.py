import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('LeaveRecords')

def lambda_handler(event, context):
    if event['httpMethod'] == 'POST':
        leave_data = json.loads(event['body'])
        table.put_item(Item=leave_data)
        return {
            'statusCode': 200,
            'body': json.dumps('Leave request submitted successfully')
        }
    elif event['httpMethod'] == 'GET':
        leave_id = event['queryStringParameters']['LeaveID']
        response = table.get_item(Key={'LeaveID': leave_id})
        return {
            'statusCode': 200,
            'body': json.dumps(response.get('Item', 'Leave record not found'))
        }
