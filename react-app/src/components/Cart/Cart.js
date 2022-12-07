import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCart } from '../../store/cart';
import { getUserCart } from '../../store/cart';
import { getItemDetail } from '../../store/itemDetail';
import './Cart.css'

const Cart = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = (useSelector(state => state.item));
  const cart = Object.values(useSelector(state => state.cart));
  const user = useSelector(state => state.session.user);
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    dispatch(getItemDetail(itemId))
    dispatch(getUserCart(user?.id))
  }, [dispatch, cart.length, user.id]);

  const isItemInCart = cart.find(item=> parseInt(item.id) === parseInt(itemId))

  const submitCart = () => {
    const addCart = {
      itemId,
      quantity,
      userId: user?.id
    }
    
    if (isItemInCart) {
      alert('aleady in the cart' )
     } else {
       if (item.quantity > quantity) {
         dispatch(createCart(addCart))
       } else {
         alert(`only ${item.quantity}ea available`)
       }
       setQuantity('');
     }

  }

  return (
    <>
      <form id="cartForm" onSubmit={submitCart}>
        <div id="quantityInput">
          <label id="quantityLabel" htmlFor='quantity'>Quantity</label>
          <input
            id='quantity'
            type='number'
            onChange={e => setQuantity(e.target.value)}
            value={quantity}
            required
            min="1"
            max="1000"
          />
          <div className='availableQty'>
            <div id="availableQty"> {item.quantity} </div> <div>available</div>
          </div>
        </div>
      </form>

      {/* <div className='cart-container'> */}
      <button type="submit" className="addToCartLabel" onClick={submitCart} >Add to Cart</button>

      {/* </div> */}
    </>
  );
};

export default Cart;