from flask import Blueprint, request, jsonify
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Inventory, Category
from flask_login import login_required, current_user
# from app.forms import StoryForm
# from app.forms import CommentForm
from ..forms import ItemForm
products_routes = Blueprint('items', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@products_routes.route('')
def get_items():
    products = Product.query.all()
    return {item.to_dict()['id']: item.to_dict() for item in products}


@products_routes.route('/<int:id>')
def get_item(id):
    item = Product.query.get(id)
    return item.to_dict()


@products_routes.route('', methods=['POST'])
@login_required
def post_item():
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.category_id.choices = [(category.id, '')
                                for category in Category.query.all()]
    if form.validate_on_submit():
        data = form.data
        newItem = Product(
                    user_id = current_user.id,
                    name = data['name'],
                    price = data['price'],
                    category_id = data['category_id'],
                    description = data['description']
                    )
        db.session.add(newItem)
        db.session.commit()
        return newItem.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@products_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def edit_item(id):
    item = Product.query.get(id)
    form = ItemForm()
    if current_user.id == item.user_id:
        form['csrf_token'].data = request.cookies['csrf_token']
        form.category_id.choices = [(category.id, '')
                                    for category in Category.query.all()]
        if form.validate_on_submit():
            data = form.data
            item.user_id = current_user.id
            item.name = data['name']
            item.price = str(data['price'])
            item.category_id = data['category_id']
            item.description = data['description']
           
            db.session.add(item)
            db.session.commit()
            return item.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@products_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_Item(id):
    item = Product.query.get(id)
    if current_user.id == item.user_id:
        db.session.delete(item)
        db.session.commit()
        return {"data": "Deleted"}
    return {'errors': ['Unauthorized']}
