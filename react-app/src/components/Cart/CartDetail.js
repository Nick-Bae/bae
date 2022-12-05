import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getUserCart } from '../../store/cart';

const CartDetail = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  // const items = Object.values(useSelector(state => state.items));
  const carts =Object.values( useSelector(state=>state.cart));
  const user = useSelector(state => state.session.user)

  console.log("cartb ###########", carts)
  
  useEffect(() => {
   dispatch(getUserCart(user?.id))
  }, [dispatch]);
    
    
    const submitCart=()=>{
        dispatch(getUserCart(user?.id))
    }

  return (
    <div className='cart-container'>
        {carts.map(cart=>(
            cart.id
        ))}
        {/* {cart.item?.name}
        {cart.item?.price} */}

    </div>
  );
};

export default CartDetail;