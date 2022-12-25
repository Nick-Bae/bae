# from app.models import db, User, environment, SCHEMA, Image
from app.models import db, User, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        url='https://static.nike.com/a/images/w_1536,c_limit,f_auto/y3henppvrmboxalhqbn5/air-jordan-1-banned-555088-001.jpg', 
        product_id=1)
    image2 = Image(
        url='https://cdn.shopify.com/s/files/1/1726/4473/files/ba-hoops-gold-02-9x16_800x.jpg?v=1668706126', 
        product_id=2)
    image3 = Image(
        url='https://nbalance.by/wp-content/uploads/2022/03/574-1.jpg', 
        product_id=3)
    image4 = Image(
        url='https://bnsec.bluenile.com/bluenile/is/image/bluenile/2a_JSP_GetInspired_2880x3848?$alloy_default$&hei=1136&wid=850&fmt=pjpeg', 
        product_id=4)
    image5 = Image(
        url='https://media.glamourmagazine.co.uk/photos/633eeed812cab0baed0aeb15/master/w_1600%2Cc_limit/KAIA%2520GERBER%2520X%2520ZARA%2520061022%2520campaign3.jpg', 
        product_id=5)
    image6 = Image(
        url='https://m.media-amazon.com/images/I/51l+OB+eV6L._AC_UY780_.jpg', 
        product_id=6)
    image7 = Image(
        url='https://nbae.s3.amazonaws.com/Nike_red_74397_right_large.jpg', 
        product_id=7)
    image8 = Image(
        url='https://nbae.s3.amazonaws.com/Nike_red_74397_left_large.jpg', 
        product_id=7)
    image9 = Image(
        url='https://nbae.s3.amazonaws.com/Nike_red_74397_top_large.jpg', 
        product_id=7)
    image10 = Image(
        url='https://nbae.s3.amazonaws.com/Nike_red_74397_back_large.jpg', 
        product_id=7)

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
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