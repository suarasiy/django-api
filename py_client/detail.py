import requests

endpoint = "http://localhost:8000/api/products/7/"
get_request = requests.get(endpoint)
print(get_request.json())
