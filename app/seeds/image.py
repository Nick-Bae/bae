# from app.models import db, User, environment, SCHEMA, Image
from app.models import db, User, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        url='https://static.nike.com/a/images/w_1536,c_limit,f_auto/y3henppvrmboxalhqbn5/air-jordan-1-banned-555088-001.jpg', 
        product_id=1)
    image2 = Image(
        url='https://cdn.vox-cdn.com/thumbor/cPeVH-m_b9pScRXzpCBW-nAHSfw=/0x0:2032x1355/1400x1400/filters:focal(1016x678:1017x679)/cdn.vox-cdn.com/uploads/chorus_asset/file/22863258/akrales_210917_4760_0175.jpg', 
        product_id=2)
    image3 = Image(
        url='https://nbalance.by/wp-content/uploads/2022/03/574-1.jpg', 
        product_id=3)
    image4 = Image(
        url='https://pisces.bbystatic.com/image2/BestBuy_US/dam/MMT-571594-tradein-pol-243e6ddd-89c0-4d89-b68c-c66b1f2c6c77.jpg', 
        product_id=4)
    image5 = Image(
        url='https://media.glamourmagazine.co.uk/photos/633eeed812cab0baed0aeb15/master/w_1600%2Cc_limit/KAIA%2520GERBER%2520X%2520ZARA%2520061022%2520campaign3.jpg', 
        product_id=5)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")
        
    db.session.commit()