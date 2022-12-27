from flask import Blueprint, request, jsonify
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Inventory, Category, Image, Comment, User, Cart
from flask_login import login_required, current_user
from app.forms import CommentForm
from ..forms import ItemForm
from ..forms import CartForm

carts_routes = Blueprint('carts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ============================Cart All===================================================

@carts_routes.route('')
@login_required
def get_cart():
    products = Cart.query.all()
  
    return {item.to_dict()['id']: item.to_dict() for item in products}

# ===============================Cart by cartId============================================   

@carts_routes.route('/<int:id>')
@login_required
def get_cartId(id):
    cart = Cart.query.get(id)
  
    return cart.to_dict()


# # =========================Cart post & delete=====================================

   #post wishlist for item
@carts_routes.route('', methods=['POST'])
@login_required
def post_cart():
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        cart = Cart(
                userId = current_user.id,
                quantity = data['quantity']
                )
        itemId = data['itemId']
        item =  Product.query.get(itemId)
        total = item.price * cart.quantity

        # item.quantity = item.quantity - cart.quantity
        # if item.quantity > cart.quantity:
        cart.items.append(item)
        db.session.add(cart)
        db.session.commit()

        newCart ={
            "cart": cart.to_dict(),
            "item": item.to_dict(),
            # "total": total
        }
        return newCart
        # cart = 
    # if not all_liked_user:
    #     story.liked_story_user.append(like_story_user)
    #     # db.session.commit()
    # else:
    #     for user in all_liked_user:
    #         if user.id == current_user.id:
    #             return "You already clicked"
    #         else:

#delete wishlist

@carts_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def edit_cart(id):
    cart = Cart.query.get(id)
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        data = form.data
        cart.quantity = data['quantity']
        cart.userId = current_user.id
        cart.itemId = data['itemId']
       
        db.session.add(cart)
        db.session.commit()
        return cart.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@carts_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cartlist(id):
    cart = Cart.query.get(id)
    
    db.session.delete(cart)
    db.session.commit()

    return "cart delete"