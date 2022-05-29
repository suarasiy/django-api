import requests

endpoint = "http://localhost:8000/api/products/1/update/"
get_result = requests.put(endpoint, json={
    "title": "Hello World",
    "price": 45.00
})

print(get_result.json())
