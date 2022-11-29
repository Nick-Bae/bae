from flask import Blueprint, request, jsonify
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Inventory, Category, Image
from flask_login import login_required, current_user
# from app.forms import StoryForm
# from app.forms import CommentForm
from ..forms import ImageForm

images_routes = Blueprint('images', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@images_routes.route('')
def get_images():
    images = Image.query.all()
    # images = Image.query.all()
    # # return image

    # image['id']Product.query.get(image.product_id) for image in images
    return {item.to_dict()['id']: item.to_dict() for item in images}


@images_routes.route('/<int:id>')
def get_image(id):
    item = Image.query.get(id)
    return item.to_dict()


# @images_routes.route('', methods=['POST'])
# @login_required
# def post_image():
#     form = ImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         data = form.data
#         newImage = Image(
#                     url = data['url']
#                     product_id = data['product_id'],
#                     )
#         db.session.add(newImage)
#         db.session.commit()
#         return newImage.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @images_routes.route('/<int:id>',  methods=['PUT'])
# @login_required
# def edit_image(id):
#     item = Product.query.get(id)
#     form = ImageForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
        
#     if form.validate_on_submit():
#         data = form.data
#         newImage = Image(
#             url = data['url'],
#             product_id = data['product_id']
#         )
                   
#         db.session.add(newImage)
#         db.session.commit()
#         return newImage.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# @images_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_image(id):
#     item = Product.query.get(id)
#     if current_user.id == item.user_id:
#         db.session.delete(item)
#         db.session.commit()
#         return {"data": "Deleted"}
#     return {'errors': ['Unauthorized']}
