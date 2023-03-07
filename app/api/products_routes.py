from flask import Blueprint, request, jsonify
from sqlalchemy import func, and_
from sqlalchemy.orm import relationship, sessionmaker, joinedload
from app.models import Product, db, Inventory, Category, Image, Comment, User, wishlist, Cart, Bid
from flask_login import login_required, current_user
from app.forms import CommentForm
from ..forms import ItemForm
from ..forms import ImageForm, BidForm
import datetime
from datetime import datetime

products_routes = Blueprint('items', __name__)

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

@products_routes.route('')
def get_items():
    products = Product.query.all()
  
    return {item.to_dict()['id']: item.to_dict() for item in products}


# ===================Current User items========================
# @products_routes.route('/current')
# @login_required
# def get_items_owner():
#     id = current_user.id
#     products = Product.query.filter(Product.user_id == id).all()
    
#     return {item.to_dict()['id']: item.to_dict() for item in products}

# ========================get single Item=====================================

@products_routes.route('/<int:id>')
def get_item(id):
    item = Product.query.get(id)
    img = Image
    return item.to_dict()

# ========================Post an Item=====================================

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
                    price = float(data['price']),
                    quantity = data['quantity'],
                    category_id = data['category_id'],
                    description = data['description'],
                    # end = data['end']
                    )
        db.session.add(newItem)
        db.session.commit()
        # return newItem.to_dict()
        newItem={
            "id": newItem.id,
            "user_id": current_user.id,
            "name" : newItem.name,
            "price" : newItem.price,
            "quantity" : newItem.quantity,
            "category_id" : newItem.category_id,
            "description" : newItem.description,
            # "end" : newItem.end
        }
        return newItem

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
            item.quantity = data['quantity']
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

# ============================search by title==========================================
# @products_routes.route('/<search>')
# def search_Item(search):
#     products = Product.query.filter(Product.name == search).all()

#     return {item.to_dict()['id']: item.to_dict() for item in products}


# ==============C O M M E N T S=====================================
@products_routes.route('/<int:id>/comments')
def get_comments(id):
    all_comments = Comment.query.all()
    item_comments = [comment for comment in all_comments if comment.item_id == id]

    return {comment.to_dict()['id']: comment.to_dict() for comment in item_comments}


@products_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def post_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(body=form.data['body'],
                      user_id=current_user.id,
                      item_id=id)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# ========================Wish List=============================

@products_routes.route('/<int:id>/wishlists')
def get_wishlist(id):
    item = Product.query.get(id)
    # num = item.wish_user.count()
    all_wish_users =  item.wish_user.all()
    if (current_user):
        wishlist = {
        'itemId':item.id,
        # 'userId':current_user.id,
        'allUser': [(user.id) for user in all_wish_users]
        }

    return wishlist

#post wishlist for item
@products_routes.route('/<int:id>/wishlists', methods=['POST'])
@login_required
def post_wishlist(id):
    item = Product.query.get(id)
    wish_user = User.query.get(current_user.id)

    # if not all_liked_user:
    #     story.liked_story_user.append(like_story_user)
    #     # db.session.commit()
    # else:
    #     for user in all_liked_user:
    #         if user.id == current_user.id:
    #             return "You already clicked"
    #         else:
    item.wish_user.append(wish_user)

    db.session.commit()
    # the number of like for the story
    # num = story.liked_story_user.count()

    wishlist = {
        'productId':item.id,
        # 'num':num
    }

    return wishlist

#delete wishlist

@products_routes.route('/<int:id>/wishlists', methods=['DELETE'])
@login_required
def delete_wishlist(id):
    item = Product.query.get(id)
    wish_user = User.query.get(current_user.id)
    all_wish_user =  item.wish_user.all()

    users = [ user.id for user in all_wish_user]

    if wish_user.id in users:
        item.wish_user.remove(wish_user)
    else:
        return "You havn't click the wishlist"

    db.session.commit()

    return "unwish"


    # =====================Post an image on item============================

@products_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def post_image(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        newImage = Image(
                    url = data['url'],
                    product_id = id
                    )
        db.session.add(newImage)
        db.session.commit()
        return newImage.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # ========================Update Image===============================================

@products_routes.route('/<int:id>/images',  methods=['PUT'])
@login_required
def edit_image(id):
    image = Image.query.filter(Image.product_id == id).first()
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        image.url = data['url']
        image.product_id = id   

        db.session.add(image)
        db.session.commit()
        return image.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ========================Bidding===============================================

@products_routes.route('/<int:id>/bids')
def get_bids(id):
    bids = db.session.query(
        func.max(Bid.price)).filter(Bid.itemId == id).one()
    # maxBid = Bid.query.filter(Bid.itemId == id)
    # queries = maxBid.query(func.max(Bid.price))

    # bid = Bid.where(
    #     and_(
    #         Bid.itemId == id,
    #         Bid.query(func.max(Bid.price)).all()
    #     )
    # )

    # bid = bids.query(func.max(Bid.price)).all()   
    # return bid.to_dict()
    # return { bid[0].to_dict()['id']: bid[0].to_dict() for bid in bids}
    # print("what is bids##########", bids)
    # return "bids"
    # print ("bid################",bids[0]) 
    return  {"bid":bids[0]}
    # return { bid.query(func.max(bid.price)) for bid in bids}

    # return bids.price

@products_routes.route('/<int:id>/bids', methods=['POST'])
@login_required
def post_bid(id):
    form = BidForm()
    form['csrf_token'].data = request.cookies['csrf_token']
   
    if form.validate_on_submit():
        data = form.data
        newBid = Bid(
                    userId = current_user.id,
                    itemId = id,
                    price = data['price']
                    )
        db.session.add(newBid)
        db.session.commit()
        return newBid.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ===============Search===================================================

# ===============search only 10 items============================
@products_routes.route('/search/<keyword>')
def search_items(keyword):
    items = Product.query.filter(Product.name.ilike(f'%{keyword}%')).limit(7)
    return {item.id: item.name for item in items}

# ===============search all items============================

@products_routes.route('/search-all/<keyword>')
def search_all_items(keyword):
    items = Product.query.filter(Product.name.ilike(f'%{keyword.lower()}%')).all() or Product.query.filter(Product.description.ilike(f'%{keyword.lower()}%')).all()
    print ("################# items", items)
    return  {item.to_dict()['id']: item.to_dict() for item in items}