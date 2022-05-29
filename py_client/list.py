import requests

endpoint = "http://localhost:8000/api/products/"

get_result = requests.get(endpoint)
print(get_result.json())
