import requests

endpoint = "http://localhost:8000/api/products/81737972937"

get_result = requests.get(endpoint)
print(get_result.json())
