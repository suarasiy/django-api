import requests
from getpass import getpass


auth_endpoint = "http://localhost:8000/api/auth/"
endpoint = "http://localhost:8000/api/products/"

username = input("Username: ")
password = getpass()

auth_response = requests.post(auth_endpoint, json={
    "username": username,
    "password": password,
})

print(auth_response.json())

if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        "Authorization": f"Bearer {token}"
    }
    get_result = requests.get(endpoint, headers=headers)
    print(get_result.json())
