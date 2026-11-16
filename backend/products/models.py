from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10,decimal_places=2)
    CATEGORY_CHOICES = [
        ("electronics","Electronics"),
        ("fashion","Fashion"),
        ("furniture","Furniture"),
        ("books","Books"),
        ("vehicles","Vehicles"),
        ("others","Others")
    ]
    category = models.CharField(max_length=50,choices=CATEGORY_CHOICES)
    seller = models.ForeignKey(User,on_delete=models.CASCADE,related_name="products")
    image_url = models.URLField(blank=True)
    is_sold = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



