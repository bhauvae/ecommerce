from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from .models import Product, Cart, CartItem
from .serializers import (
    ProductSerializer,
    DetailedProductSerializer,
    CartSerializer,
    SimpleCartSerializer,
    CartItemSerializer,
    UserSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)

    serializer = DetailedProductSerializer(product)
    return Response(serializer.data)


@api_view(["POST"])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")

        cart, created = Cart.objects.get_or_create(cart_code=cart_code)
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        cart_item.quantity = 1
        cart_item.save()

        serializers = CartItemSerializer(cart_item)
        return Response(
            {"data": serializers.data, "message": "Item added to cart"}, status=201
        )
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["GET"])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")
    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)

    product_exists_in_cart = CartItem.objects.filter(
        cart=cart, product=product
    ).exists()

    return Response({"product_in_cart": product_exists_in_cart})


@api_view(["GET"])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    if not cart_code:
        return Response(
            {"error": "cart_code query parameter is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        cart = Cart.objects.get(cart_code=cart_code, paid=False)
    except Cart.DoesNotExist:
        return Response(
            {"error": "No active cart found with that code."},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(["GET"])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(["PATCH"])
def update_quantity(request):
    try:
        cartitem_id = request.data.get("item_id")
        quantity = request.data.get("quantity")
        quantity = int(quantity)
        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()
        serializer = CartItemSerializer(cartitem)
        return Response(
            {"data": serializer.data, "message": "Quantity updated successfully"}
        )
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["DELETE"])
def delete_cartitem(request):
    cartitem_id = request.data.get("item_id")
    cartitem = CartItem.objects.get(id=cartitem_id)
    cartitem.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username": user.username})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    cart_code = request.data.get("cart_code")
    if not cart_code:
        return Response(
            {"error": "Cart code is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        cart = Cart.objects.get(cart_code=cart_code, paid=False)
    except Cart.DoesNotExist:
        return Response(
            {"error": "Cart not found or already paid."},
            status=status.HTTP_404_NOT_FOUND,
        )

    cart.paid = True
    cart.user = request.user
    cart.save()

    return Response(
        {"message": "Payment confirmed and cart marked as paid."},
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_history(request):
    """
    Return a list of all carts for the authenticated user
    that have been marked as paid.
    """
    user = request.user
    # Get all paid carts for this user
    paid_carts = Cart.objects.filter(user=user, paid=True).order_by("-updated_at")
    # Serialize as a list
    serializer = CartSerializer(paid_carts, many=True)
    return Response(serializer.data)
