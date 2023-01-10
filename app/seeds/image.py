# from app.models import db, User, environment, SCHEMA, Image
from app.models import db, User, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        url='https://nbae.s3.amazonaws.com/open+front+long+sleeve1.jpeg', 
        product_id=1)
    image2 = Image(
        url='https://nbae.s3.amazonaws.com/open+front+long+sleeve2.jpeg', 
        product_id=1)
    image3 = Image(
        url='https://nbae.s3.amazonaws.com/open+front+long+sleeve3.jpeg', 
        product_id=1)
    image4 = Image(
        url='https://nbae.s3.amazonaws.com/open+front+long+sleeve4.jpeg', 
        product_id=1)


    image5 = Image(
        url='https://nbae.s3.amazonaws.com/Oversieze+Twill4.jpeg', 
        product_id=2)
    image6 = Image(
        url='https://nbae.s3.amazonaws.com/Oversieze+Twill2.jpeg', 
        product_id=2)
    image7 = Image(
        url='https://nbae.s3.amazonaws.com/Oversieze+Twill3.jpeg', 
        product_id=2)
    image8 = Image(
        url='https://nbae.s3.amazonaws.com/Oversieze+Twill1.jpeg', 
        product_id=2)


    image9 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long1.jpeg', 
        product_id=3)
    image10 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long2.jpeg', 
        product_id=3)
    image11 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long3.jpeg', 
        product_id=3)
    image12 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long4.jpeg', 
        product_id=3)
   
   
    image13 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long+Sleeve1.jpeg', 
        product_id=4)
    image14 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long+Sleeve2.jpeg', 
        product_id=4)
    image15 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long+Sleeve3.jpeg', 
        product_id=4)
    image16 = Image(
        url='https://nbae.s3.amazonaws.com/Tie+Waist+Long+Sleeve4.jpeg', 
        product_id=4)

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
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
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