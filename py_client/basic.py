import requests

endpoint = "http://localhost:8000/api/"
get_request = requests.post(
    endpoint, json={
        "title": "New title",
        "content": "New content",
        "price": "b32.15"
    })

print(get_request.json())
# print(get_request.status_code)
