import requests

endpoint = " http://localhost:8000/api/"
get_request = requests.get(
    endpoint, params={"abc": 123}, json={"query": "hello world!"})

print(get_request.json())
# print(get_request.status_code)
