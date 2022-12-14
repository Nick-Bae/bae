# from app.models import db, User, environment, SCHEMA, Product
from app.models import db, User, Product


# Adds a demo user, you can add other users here if you want
def seed_products():
    item1 = Product(
        name='Open Front Long Blazer', user_id=1, price = 119, quantity = 100 ,category_id = 1, )
    item2 = Product(
        name='Oversize Twill', user_id=2, price = 135, quantity = 100 ,category_id = 1, )
    item3 = Product(
        name='Tie Waist Long Sleeve', user_id=3, price = 70, quantity = 70 ,category_id = 1, )
    item4 = Product(
        name='Tie Waist Long Sleeve', user_id=1, price = 79, quantity = 120 ,category_id = 1, )
    item5 = Product(
        name='Icon Bomber Jacket', user_id=2, price = 65, quantity = 50 ,category_id = 1, )
    item6 = Product(
        name='Faux Leather Renoir Jacket', user_id=3, price = 295, quantity = 30 ,category_id = 1, )
    item7 = Product(
        name='V-Neck Cashmere Sweater', user_id=1, price = 68.97, quantity = 50 ,category_id = 1, )
    item8 = Product(
        name='Mode Slim Fit Wool Cardigan', user_id=2, price = 149, quantity = 100 ,category_id = 1, )

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.add(item7)
    db.session.add(item8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")
        
    db.session.commit()