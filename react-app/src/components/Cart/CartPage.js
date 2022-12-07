import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserCart } from '../../store/cart';
import { deleteOneCart } from '../../store/cart';
import './CartDetail.css'

const CartPage = () => {
    const dispatch = useDispatch();
    const carts = Object.values(useSelector(state => state.cart));
    const user = useSelector(state => state.session.user)


    console.log("carts", carts)
    // useEffect(() => {
    //     dispatch(getUserCart(user?.id))
    // }, [dispatch, user.id]);



    return (

        <>
            {carts.map(item => (
                <NavLink key={item?.id} to={`/items/${item?.id}`}>
                    {/* <ItemDetail item={item}/> */}
                    {item?.name}
                    <div key={item?.id} className='imageContainer'>
                        <img key={item?.id} className="itemImage" src={item?.image} alt="" />
                    </div>
                </NavLink>
            ))}
        </>

    );
};

export default CartPage;