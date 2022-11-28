# from app.models import db, User, environment, SCHEMA, Product, Category, Comment
from app.models import db, User, Comment


# Adds a demo user, you can add other users here if you want
def seed_comment():
    comment1 = Comment(
        body = "good condition", user_id= 1, item_id=2)
    comment2 = Comment(
        body='good deal', user_id= 2, item_id=1)
    comment3 = Comment(
        body='fast shipping', user_id=3 , item_id=3)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comment():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM category")
        
    db.session.commit()