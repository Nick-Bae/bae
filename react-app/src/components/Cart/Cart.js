import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createCart } from '../../store/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  // const items = Object.values(useSelector(state => state.items));
  const cart =Object.values( useSelector(state=>state.cart));
  const user = useSelector(state => state.session.user)

//   useEffect(() => {
//    dispatch(cart)
//   }, [dispatch]);
    const addCart = {
        "itemId": itemId,
        "quantity": 1,
        "userId":user?.id
    }
    
    const submitCart=()=>{
        dispatch(createCart(addCart))
    }

  return (
    <div className='cart-container'>
        <button onClick={submitCart}>Add to Cart</button>
    </div>
  );
};

export default Cart;