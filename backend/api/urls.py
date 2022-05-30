from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_home),
    # path('api/products/', include('products.urls'))
]
