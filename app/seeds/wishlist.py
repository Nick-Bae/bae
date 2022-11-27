# from app.models import db, User, environment, SCHEMA, Product, Category, Comment, Wishlist


# # Adds a demo user, you can add other users here if you want
# def seed_wishlist():
#     wishlist1 = Wishlist(
#         user_id= 1, product_id=2)
#     wishlist2 = Wishlist(
#         user_id= 2, product_id=1)
#     wishlist3 = Wishlist(
#         user_id= 3, product_id=1)

#     db.session.add(wishlist1)
#     db.session.add(wishlist2)
#     db.session.add(wishlist3)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_wishlist():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.wishlist RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM wishlist")
        
#     db.session.commit()