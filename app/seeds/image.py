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


    image17 = Image(
        url='https://nbae.s3.amazonaws.com/Icon+Bomber+Jacket1.jpeg', 
        product_id=5)
    image18 = Image(
        url='https://nbae.s3.amazonaws.com/Icon+Bomber+Jacket2.jpeg', 
        product_id=5)
    image19 = Image(
        url='https://nbae.s3.amazonaws.com/Icon+Bomber+Jacket5.jpeg', 
        product_id=5)
    image20 = Image(
        url='https://nbae.s3.amazonaws.com/Icon+Bomber+Jacket4.jpeg', 
        product_id=5)


    image21 = Image(
        url='https://nbae.s3.amazonaws.com/Faux+Leather+Renoir+Jacket1.jpeg', 
        product_id=6)
    image22 = Image(
        url='https://nbae.s3.amazonaws.com/Faux+Leather+Renoir+Jacket2.jpeg', 
        product_id=6)
    image23 = Image(
        url='https://nbae.s3.amazonaws.com/Faux+Leather+Renoir+Jacket3.jpeg', 
        product_id=6)
    image24 = Image(
        url='https://nbae.s3.amazonaws.com/Faux+Leather+Renoir+Jacket4.jpeg', 
        product_id=6)


    image25 = Image(
        url='https://nbae.s3.amazonaws.com/V-Neck+Cashmere+Sweater1.jpeg', 
        product_id=7)
    image26 = Image(
        url='https://nbae.s3.amazonaws.com/V-Neck+Cashmere+Sweater2.jpeg', 
        product_id=7)
    image27 = Image(
        url='https://nbae.s3.amazonaws.com/V-Neck+Cashmere+Sweater3.jpeg', 
        product_id=7)
    image28 = Image(
        url='https://nbae.s3.amazonaws.com/V-Neck+Cashmere+Sweater4.jpeg', 
        product_id=7)


    image29 = Image(
        url='https://nbae.s3.amazonaws.com/Mode+Slim+Fit+Wool+Cardigan1.jpeg', 
        product_id=8)
    image30 = Image(
        url='https://nbae.s3.amazonaws.com/Mode+Slim+Fit+Wool+Cardigan2.jpeg', 
        product_id=8)
    image31 = Image(
        url='https://nbae.s3.amazonaws.com/Mode+Slim+Fit+Wool+Cardigan3.jpeg', 
        product_id=8)
    image32 = Image(
        url='https://nbae.s3.amazonaws.com/Mode+Slim+Fit+Wool+Cardigan4.jpeg', 
        product_id=8)

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
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.add(image21)
    db.session.add(image22)
    db.session.add(image23)
    db.session.add(image24)
    db.session.add(image25)
    db.session.add(image26)
    db.session.add(image27)
    db.session.add(image28)
    db.session.add(image29)
    db.session.add(image30)
    db.session.add(image31)
    db.session.add(image32)
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