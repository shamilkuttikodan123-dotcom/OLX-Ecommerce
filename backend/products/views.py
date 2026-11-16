from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db import transaction
from django.db.models import F


from .models import Product
from .serializers import ProductSerializer

class ProductListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self,request):

        products = Product.objects.filter(is_sold=False)

        category = request.query_params.get("category")

        if category:
           products = products.filter(category=category)

        max_price = request.query_params.get("max_price")

        if max_price:
            products = products.filter(price__lte=max_price)

        serializer = ProductSerializer(products,many=True,context={"request":request})

        return Response(serializer.data)

    def post(self,request):

        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)

class ProductDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        product = get_object_or_404(Product, id=pk)

        if product.seller_id != request.user.id:
            return Response(
                {"detail": "You can only edit your own products."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ProductSerializer(
            product,
            context={"request": request}
        )

        return Response(serializer.data)
    def put(self,request,pk):

        product = get_object_or_404(Product,id=pk)

        if product.seller != request.user:
            return Response(
                {"detail":"You can only update your own products"},
                status=403
            )

        serializer = ProductSerializer(
            product,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response (serializer.data)
        
        return Response (serializer.errors)

    def delete(self ,request,pk):

        product = get_object_or_404(Product,id=pk)

        if product.seller != request.user:
                return Response(
                    {"detail":"You can only update your own products"},
                    status=403
                )

        product.delete()

        return Response({
            "message":"Product deleted successfully"
        })

    def patch(self,request,pk):

        product = get_object_or_404(Product,id=pk)

        if product.seller != request.user:
            return Response(
                {"detail" : "you can only update your own products"},
                status=403
            )
        
        serializer = ProductSerializer(product,data=request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class CheckoutView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        product_ids =  request.data.get("product_ids")

        if not product_ids:
            return Response(
                {"error":"product_ids are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        with transaction.atomic():

            products = Product.objects.select_for_update().filter(
                id__in=product_ids,
                is_sold = False
            )

            if products.count() !=len(product_ids):
                return Response (
                    {"error":"One or more products are unavailable"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            products.update(is_sold=True)

            return Response({
                "message":"Checkout Successful",
                "product_ids":product_ids
            })
        

class Myproducts(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        products = Product.objects.filter(
            seller=request.user
        )

        serializer = ProductSerializer(
            products,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)