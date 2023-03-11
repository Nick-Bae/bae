# from app.models import db, User, environment, SCHEMA, Image
from app.models import db, User, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        url='https://nbae.s3.amazonaws.com/Open+Front+Long+Blazer1.png', 
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
        url='https://nbae.s3.amazonaws.com/Oversieze+Twill.jpeg', 
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
        url='https://nbae.s3.amazonaws.com/Icon+Bomber+Jacket3.jpeg', 
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

    image33 = Image(
        url='https://nbae.s3.amazonaws.com/Boston+Sandal1.png', 
        product_id=9)
    image34 = Image(
        url='https://nbae.s3.amazonaws.com/Boston+Sandal2.png', 
        product_id=9)
    image35 = Image(
        url='https://nbae.s3.amazonaws.com/Boston+Sandal3.png', 
        product_id=9)
    image36 = Image(
        url='https://nbae.s3.amazonaws.com/Boston+Sandal4.png', 
        product_id=9)

    image37 = Image(
        url='https://nbae.s3.amazonaws.com/Converse+sneaker1.png', 
        product_id=10)
    image38 = Image(
        url='https://nbae.s3.amazonaws.com/Converse+sneaker2.png', 
        product_id=10)
    image39 = Image(
        url='https://nbae.s3.amazonaws.com/Converse+sneaker3.png', 
        product_id=10)
    image40 = Image(
        url='https://nbae.s3.amazonaws.com/Converse+sneaker4.png', 
        product_id=10)

    image41 = Image(
        url='https://nbae.s3.amazonaws.com/Paily+Braided+Sandal1.png', 
        product_id=11)
    image42 = Image(
        url='https://nbae.s3.amazonaws.com/Paily+Braided+Sandal2.png', 
        product_id=11)
    image43 = Image(
        url='https://nbae.s3.amazonaws.com/Paily+Braided+Sandal3.png', 
        product_id=11)
    image44 = Image(
        url='https://nbae.s3.amazonaws.com/Paily+Braided+Sandal4.png', 
        product_id=11)

    image45 = Image(
        url='https://nbae.s3.amazonaws.com/Enella+Ankle+Strap+Sandal1.png', 
        product_id=12)
    image46 = Image(
        url='https://nbae.s3.amazonaws.com/Enella+Ankle+Strap+Sandal2.png', 
        product_id=12)
    image47 = Image(
        url='https://nbae.s3.amazonaws.com/Enella+Ankle+Strap+Sandal3.png', 
        product_id=12)
    image48 = Image(
        url='https://nbae.s3.amazonaws.com/Enella+Ankle+Strap+Sandal4.png', 
        product_id=12)

    image49 = Image(
        url='https://nbae.s3.amazonaws.com/Initial+Pendant+Necklace1.png', 
        product_id=13)
    image50 = Image(
        url='https://nbae.s3.amazonaws.com/Initial+Pendant+Necklace2.jpeg', 
        product_id=13)

    image51 = Image(
        url='https://nbae.s3.amazonaws.com/Set+of+3+Hoop+Earrings1.png', 
        product_id=14)
    image52 = Image(
        url='https://nbae.s3.amazonaws.com/Set+of+3+Hoop+Earrings2.jpeg', 
        product_id=14)

    image53 = Image(
        url='https://nbae.s3.amazonaws.com/that+sparkle+round+stud+earrings1.png', 
        product_id=15)
    image54 = Image(
        url='https://nbae.s3.amazonaws.com/that+sparkle+round+stud+earrings2.jpeg', 
        product_id=15)

    image55 = Image(
        url='https://nbae.s3.amazonaws.com/Cubic+Zirconia+Pendant+Necklace1.png', 
        product_id=16)
    image56 = Image(
        url='https://nbae.s3.amazonaws.com/Cubic+Zirconia+Pendant+Necklace2.jpeg', 
        product_id=16)

    image57 = Image(
        url='https://nbae.s3.amazonaws.com/G-Timeless+Feline+Bracelet+Watch1.png', 
        product_id=17)
    image58 = Image(
        url='https://nbae.s3.amazonaws.com/G-Timeless+Feline+Bracelet+Watch2.jpeg', 
        product_id=17)
    image59 = Image(
        url='https://nbae.s3.amazonaws.com/G-Timeless+Feline+Bracelet+Watch3.jpeg', 
        product_id=17)
    image60 = Image(
        url='https://nbae.s3.amazonaws.com/G-Timeless+Feline+Bracelet+Watch4.jpeg', 
        product_id=17)

    image61 = Image(
        url="https://nbae.s3.amazonaws.com/smart+watch1.jpeg", 
        product_id=18)
    image62 = Image(
        url="https://nbae.s3.amazonaws.com/smart+watch2.jpeg", 
        product_id=18)
    image63 = Image(
        url="https://nbae.s3.amazonaws.com/smart+watch3.jpeg", 
        product_id=18)
    image64 = Image(
        url="https://nbae.s3.amazonaws.com/smart+watch4.jpeg", 
        product_id=18)

    image65 = Image(
        url="https://nbae.s3.amazonaws.com/The+Birdy+Day+%26+Night+Phase+Leather+Strap+Watch1.png", 
        product_id=19)
    image66 = Image(
        url="https://nbae.s3.amazonaws.com/The+Birdy+Day+%26+Night+Phase+Leather+Strap+Watch2.jpeg", 
        product_id=19)
    image67 = Image(
        url="https://nbae.s3.amazonaws.com/The+Birdy+Day+%26+Night+Phase+Leather+Strap+Watch3.jpeg", 
        product_id=19)
    image68 = Image(
        url="https://nbae.s3.amazonaws.com/The+Birdy+Day+%26+Night+Phase+Leather+Strap+Watch4.jpeg", 
        product_id=19)

    image69 = Image(
        url="https://nbae.s3.amazonaws.com/The+Canfield+Chrono+Leather+Strap+Watch1.png", 
        product_id=20)
    image70 = Image(
        url="https://nbae.s3.amazonaws.com/The+Canfield+Chrono+Leather+Strap+Watch2.jpeg", 
        product_id=20)
    image71 = Image(
        url="https://nbae.s3.amazonaws.com/The+Canfield+Chrono+Leather+Strap+Watch3.jpeg", 
        product_id=20)
    image72 = Image(
        url="https://nbae.s3.amazonaws.com/The+Canfield+Chrono+Leather+Strap+Watch4.jpeg", 
        product_id=20)

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
    db.session.add(image33)
    db.session.add(image34)
    db.session.add(image35)
    db.session.add(image36)
    db.session.add(image37)
    db.session.add(image38)
    db.session.add(image39)
    db.session.add(image40)
    db.session.add(image41)
    db.session.add(image42)
    db.session.add(image43)
    db.session.add(image44)
    db.session.add(image45)
    db.session.add(image46)
    db.session.add(image47)
    db.session.add(image48)
    db.session.add(image49)
    db.session.add(image50)
    db.session.add(image51)
    db.session.add(image52)
    db.session.add(image53)
    db.session.add(image54)
    db.session.add(image55)
    db.session.add(image56)
    db.session.add(image57)
    db.session.add(image58)
    db.session.add(image59)
    db.session.add(image60)
    db.session.add(image61)
    db.session.add(image62)
    db.session.add(image63)
    db.session.add(image64)
    db.session.add(image65)
    db.session.add(image66)
    db.session.add(image67)
    db.session.add(image68)
    db.session.add(image69)
    db.session.add(image70)
    db.session.add(image71)
    db.session.add(image72)
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