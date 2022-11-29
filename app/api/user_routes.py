from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image, Product
from flask_login import login_required, current_user

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
def get_cartlist(id):
    user = User.query.get(id)
    itemsInCart =  user.cart.all()
    cart ={item.to_dict()['id']: item.to_dict() for item in itemsInCart}

    return cart

