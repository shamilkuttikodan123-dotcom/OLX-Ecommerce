from rest_framework import serializers

from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context.get("request")
        return request.user == obj.seller if request else False

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = [
            "seller",
            "is_sold",
            "created_at",
            "updated_at",
        ]