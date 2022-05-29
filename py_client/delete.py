import requests

product_id = input("What the product id you want to delete?\n")

try:
    product_id = int(product_id)
except:
    product_id = None
    print(f'{product_id} not valid id.')

if product_id:
    endpoint = f"http://localhost:8000/api/products/{product_id}/destroy/"
    get_result = requests.delete(endpoint)

    print(f'{get_result.status_code} :: {get_result.status_code == 204}')
