import json


def symptom_retrieval(event, context):
    try:
        # Parse the request body
        body = json.loads(event['body'])
        conditions = body.get('conditions', '')
        
        data = {}
        for condition in conditions:
            with open(f"./conditions/{condition}.json", "r") as f:
                data[condition] = json.load(f)
        
        response_body = {
            "message": "Successfully retrieved data",
            "data": data
        }
                
        response = {
            "statusCode": 200,
            "body": json.dumps(response_body)
        }

    except Exception as e:
        response_body = {
            "message": "Error parsing request body",
            "error": str(e)
        }

        response = {
            "statusCode": 500,
            "body": json.dumps(response_body)
        }

    return response