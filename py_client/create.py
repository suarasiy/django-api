import requests

endpoint = "http://localhost:8000/api/products/"

get_result = requests.post(endpoint, json={
    "title": "create api view",
    "price": 5.50
})

print(get_result.json())
