from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Image, Product, Cart, db
from flask_login import login_required, current_user
from ..forms import CartForm
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# ===================User Wishlist================================
@user_routes.route('/<int:id>/wishlists')
@login_required
def wishlist(id):
    user = User.query.get(id)
    wishlists = user.wish_item.all()
   
    wishlist ={wishlist.to_dict()['id']: wishlist.to_dict() for wishlist in wishlists}
    # image = Image.query.filter(product_id == item.id for item in wishlists)
    # wishlist.image
    return wishlist

# ======================User selling Items===============================
@user_routes.route('/<int:id>/items')
@login_required
def get_user_items(id):
    sellingItems = Product.query.filter(Product.user_id == current_user.id).all()
   
    items ={wishlist.to_dict()['id']: wishlist.to_dict() for wishlist in sellingItems}
    return items

 # ========================CART List=============================

@user_routes.route('/<int:id>/cart')
@login_required
def get_cartlist(id):
    user = User.query.get(id)
    carts =  user.cart
    items = [Cart.query.get(cart.id) for cart in carts]
    cart = [item.items.all() for item in items]
    itemInfo = [cartInfo[0] for cartInfo in cart]
   
    itemsInCart ={item.add_to_cart()['cartId']: item.add_to_cart() for item in itemInfo}

    return itemsInCart


@user_routes.route('/<int:id>/order')
@login_required
def get_user_order(id):
    user = User.query.get(id)
    orders = user.orders
    # for order in orders
