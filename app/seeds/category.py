# from app.models import db, User, environment, SCHEMA, Product, Category
from app.models import db, User, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    category1 = Category(
        name='Clothes')
    category2 = Category(
        name='Shoes')
    category3 = Category(
        name='Jewelry')
    category4 = Category(
        name='Accessoreis')

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM category")
        
    db.session.commit()