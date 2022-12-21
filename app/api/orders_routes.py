from flask import Blueprint, request, jsonify, json
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Image, Comment, User, wishlist, Cart, Order, Ordered_item
from flask_login import login_required, current_user
from ..forms import OrderForm
from datetime import datetime


orders_routes = Blueprint('orders', __name__)

# =======================Validation=================================

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ======================All Items=================================================

# @orders_routes.route('')
# @login_required
# def get_orders():
#     orders = Orders.query.all()
  
#     return {order.to_dict()['id']: order.to_dict() for order in orders}

@orders_routes.route('', methods=['POST'])
@login_required
def post_orders():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    data = form.data
    newOrder = Order(
                userId = current_user.id,
                date = datetime.now(),
                status = data['status']
            )
   
    orderInfo = request.get_json()    
    items = orderInfo['items']   
    # item.quantity = data['quantity']
    db.session.add(newOrder)
    db.session.commit()
    # print("items what is inside???",orderInfo['items'])
    # items = data['items']
    for item in items:
        
        newOrdered_item = Ordered_item(
            orderId = newOrder.id,
            itemId = item['id'],
            quantity = item['quantity']
        )
        print ("neworder_ed item???",newOrdered_item)
        db.session.add(newOrdered_item)
        db.session.commit()

        # cart = Cart.query.get(item['cartId'])
    
        # db.session.delete(cart)
        db.session.commit()
        # order = {
        #     "orderId": newOrder.id,
        #     "userId": current_user.id,
        #     "date": newOrder.date,
        #     "itemId": itemId,
        #     "name": item.name,
        #     "price": item.price,
        #     "quantity": newOrdered_item.quantity,
        #     "status": newOrder.status,
        #     "items": [item.to_dict() for item in items]
        # }
        
    return newOrder.to_dict()
        # return order

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@orders_routes.route('', methods=['PUT'])
@login_required
def update_orders():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    data = form.data
    # newOrder = Order(
    #             userId = current_user.id,
    #             date = datetime.now(),
    #             status = data['status']
    #         )
   
    # orderInfo = request.get_json()    
    # items = orderInfo['items']   
    # # item.quantity = data['quantity']
    # db.session.add(newOrder)
    # db.session.commit()
    # print("items what is inside???",orderInfo['items'])
    items = data['items']
    for item in items:
        
        newOrdered_item = Ordered_item(
            orderId = newOrder.id,
            itemId = item['id'],
            quantity = item['quantity']
        )
        print ("neworder_ed item???",newOrdered_item)
        db.session.add(newOrdered_item)
        db.session.commit()

        # cart = Cart.query.get(item['cartId'])
    
        # db.session.delete(cart)
        db.session.commit()
        # order = {
        #     "orderId": newOrder.id,
        #     "userId": current_user.id,
        #     "date": newOrder.date,
        #     "itemId": itemId,
        #     "name": item.name,
        #     "price": item.price,
        #     "quantity": newOrdered_item.quantity,
        #     "status": newOrder.status,
        #     "items": [item.to_dict() for item in items]
        # }
        
    return newOrder.to_dict()