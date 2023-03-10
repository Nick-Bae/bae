# from app.models import db, User, environment, SCHEMA, Product
from app.models import db, User, Product


# Adds a demo user, you can add other users here if you want
def seed_products():
    item1 = Product(
        name='Open Front Long Blazer', user_id=1, price = 119, quantity = 100 ,category_id = 1, 
        description ="A relaxed version of a tailored classic, this open blazer features scrunched sleeves for the perfect balance of softness and structure." )
    item2 = Product(
        name='Oversize Twill', user_id=2, price = 135, quantity = 100 ,category_id = 1, 
        description ="A dramatically oversized point collar dominates this cropped jacket styled with dual-entry pockets and a zip-up front.")
    item3 = Product(
        name='Knit Midi Dress', user_id=3, price = 70, quantity = 70 ,category_id = 1, 
        description ="A draped waist tie lends contemporary elegance to a mid-length dress framed by long sleeves and a jewel neck.")
    item4 = Product(
        name='Tie Waist Long Sleeve', user_id=1, price = 79, quantity = 120 ,category_id = 1, 
        description ="Date night are calling in this long-sleeve shirtdress made from rumpled satin.")
    item5 = Product(
        name='Icon Bomber Jacket', user_id=2, price = 65, quantity = 50 ,category_id = 1, 
        description ="Every closet craves this edgy bomber styled with handy side pockets and comfy ribbed trim.")
    item6 = Product(
        name='Faux Leather Renoir Jacket', user_id=3, price = 295, quantity = 30 ,category_id = 1, 
        description ="Casual ensembles get a little more elevated with this faux-leather jacket that sports a snap-up design and ample pockets.")
    item7 = Product(
        name='V-Neck Cashmere Sweater', user_id=1, price = 68.97, quantity = 50 ,category_id = 1, 
        description ="A classic in every way and oh so comfortable, this luxe cashmere V-neck sweater is one you'll want in every color")
    item8 = Product(
        name='Mode Slim Fit Wool Cardigan', user_id=2, price = 149, quantity = 100 ,category_id = 1, 
        description ="Supremely soft wool elevates a charming cardigan with modern appeal.")
    item9 = Product(
        name='Boston Soft Footbed Clog', user_id=3, price = 158, quantity = 100 ,category_id = 2, 
        description ="A natural cork and latex footbed ensures proper weight distribution and support in a comfy clog designed to stimulate circulation and improve balance.")
    item10 = Product(
        name='Top Platform Sneaker', user_id=1, price = 75, quantity = 100 ,category_id = 2, 
        description ="A bright platform cupsole kicks up the height and the attitude of an iconic high-top sneaker cut from soft, durable canvas.")
    item11 = Product(
        name='Paily Braided Sandal', user_id=2, price = 79, quantity = 100 ,category_id = 2, 
        description ="Chunky braided straps add an eye-catching touch to this slide sandal lifted by a block heel.")
    item12 = Product(
        name='Enella Ankle Strap Sandal', user_id=3, price = 39, quantity = 70 ,category_id = 2, 
        description ="Simple and chic, this ankle-strap sandal with a square toe and a flared heel adds minimalist '90s vibes to any ensemble.")
    item13 = Product(
        name='Initial Pendant Necklace', user_id=1, price = 50, quantity = 70 ,category_id = 3, 
        description ="Handcrafted in the USA, this dainty pendant necklace serves as an elegant custom accessory.")
    item14 = Product(
        name='Set of 3 Hoop Earrings', user_id=2, price = 150, quantity = 50 ,category_id = 3, 
        description ="A set of gleaming hoop earrings in different sizes and textures will help you shift from classic to chic depending on the style you choose.")
    item15 = Product(
        name='that sparkle round stud earrings', user_id=3, price = 180, quantity = 50 ,category_id = 3, 
        description ="Glistening cubic zirconia are clutched in scalloped, plated bezels, fusing glamour and charm on these round stud earrings.")
    item16 = Product(
        name='Cubic Zirconia Pendant Necklace', user_id=3, price = 800, quantity = 129 ,category_id = 3, 
        description ="Embrace minimalist elegance with this gleaming chain-link collar necklace set with a single sparkling cubic zirconia pendant.")
    item17 = Product(
        name='G-Timeless Feline Bracelet Watch', user_id=1, price = 1300, quantity = 15 ,category_id = 4, 
        description ="Gucci's signature feline and mixed indexes—from a buzzing bee to an interlocking-G—gleam against the mother-of-pearl dial of this Swiss-made bracelet watch.")
    item18 = Product(
        name='Sport Slim FKM Rubber', user_id=2, price = 275, quantity = 20 ,category_id = 4, 
        description ="Designed to accommodate your active lifestyle, this ultrasleek watchband combines durability and flexibility for comfort that lasts. classic American style fine-tuned by Detroit craftsmen.")
    item19 = Product(
        name='The Birdy Day & Night Phase Leather Strap Watch', user_id=3, price = 625, quantity = 50 ,category_id = 4, 
        description ="A beautiful sun-and-moon-phase indicator and coin-edge bezel refresh a vintage-inspired round watch assembled and fine-tuned by Detroit craftsmen.")
    item20 = Product(
        name='The Canfield Chrono Leather Strap Watch', user_id=1, price = 895, quantity = 50 ,category_id = 4, 
        description ="This handsome chronograph watch offers a complex, top-loaded case construction that distinguishes its distinctive, vintage-inspired profile.")

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.add(item7)
    db.session.add(item8)
    db.session.add(item9)
    db.session.add(item10)
    db.session.add(item11)
    db.session.add(item12)
    db.session.add(item13)
    db.session.add(item14)
    db.session.add(item15)
    db.session.add(item16)
    db.session.add(item17)
    db.session.add(item18)
    db.session.add(item19)
    db.session.add(item20)
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