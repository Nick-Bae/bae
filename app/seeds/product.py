from app.models import db, User, environment, SCHEMA, Product


# Adds a demo user, you can add other users here if you want
def seed_products():
    item1 = Product(
        name='Jordan', user_id=1, price = 100, category_id = 1)
    item2 = Product(
        name='Iphone', user_id=3, price = 900, category_id = 2)
    item3 = Product(
        name='New Balance', user_id=2, price = 70, category_id = 1)
    item4 = Product(
        name='Gallexy', user_id=1, price = 910, category_id = 2)
    item5 = Product(
        name='Jara', user_id=3, price = 80, category_id = 3)

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
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