from rest_framework import serializers
from .models import Product, Cart, CartItem
from django.contrib.auth import get_user_model

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "image", "description", "category", "price"]


class DetailedProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "image",
            "description",
            "similar_products",
            "price",
        ]

    def get_similar_products(self, product):
        products = Product.objects.filter(category=product.category).exclude(
            id=product.id
        )
        serializer = ProductSerializer(products, many=True)
        return serializer.data


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "total"]

    def get_total(self, cartitem):
        total_price = cartitem.product.price * cartitem.quantity
        return total_price


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "cart_code", "sum_total","num_of_items" ,"created_at", "updated_at"]

    def get_sum_total(self, cart):
        items = cart.items.all()
        total = sum([item.product.price * item.quantity for item in items])
        return total

    def get_num_of_items(self, cart):
        items = cart.items.all()
        total = sum([item.quantity for item in items])
        return total


class SimpleCartSerializer(serializers.ModelSerializer):
    number_of_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "cart_code", "number_of_items"]

    def get_number_of_items(self, cart):
        return sum([cart_item.quantity for cart_item in cart.items.all()])


class UserSerializer(serializers.ModelSerializer):
    # items = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ["id","username", "first_name", "last_name", "email", "city", "state", "address", "phone_number"]