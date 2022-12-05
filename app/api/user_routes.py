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
def get_cartlist(id):
    user = User.query.get(id)
    itemsInCart =  user.cart
    
    carts =  user.cart
    items = [Cart.query.get(cart.id) for cart in carts]
    cart = [item.items.all() for item in items]
    # itemInfo = {cartInfo.to_dict()['id']: cartInfo.to_dict() for cartInfo in cart}
    itemInfo = [cartInfo[0].id for cartInfo in cart]
    # detail = [inside for inside in itemInfo]
    print ("item ##3#####", itemInfo)

    cartRes ={item.to_dict()['id']: item.to_dict() for item in itemsInCart}

    return cartRes


@user_routes.route('/<int:id>/carts', methods=['POST'])
@login_required
def post_user_cart(id):
    # user_cart = Cart.query.filter(id == Cart.user_id)
    user_cart = current_user.cart
    user = User.query.get(current_user.id)
    
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        newCart = Cart(
                    userId = id,
                    quantity = data['quantity']
                    )
    # if not all_liked_user:
    #     story.liked_story_user.append(like_story_user)
    #     # db.session.commit()
    # else:
    #     for user in all_liked_user:
    #         if user.id == current_user.id:
    #             return "You already clicked"
    #         else:
    db.session.add(newCart)
    db.session.commit()
    # the number of like for the story
    # num = story.liked_story_user.count()

    return newCart.to_dict()