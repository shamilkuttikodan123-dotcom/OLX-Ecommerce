from django.urls import path
from .views import ProductListView,ProductDetailView,CheckoutView,Myproducts

urlpatterns = [
    path("products/" , ProductListView.as_view()),
    path("products/<int:pk>/", ProductDetailView.as_view()),
    path("checkout/" , CheckoutView.as_view()),
    path('products/my/',Myproducts.as_view())
]
