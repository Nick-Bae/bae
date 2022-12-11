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
  const [quantity, setQuantity] = useState('1');
  const [ errors, setErrors ] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(()=>{
    const errors =[];
    if (quantity<0) errors.push("Please put more than 0");
    setValidationErrors(errors);
  },[quantity]);

  useEffect(() => {
    dispatch(getItemDetail(itemId))
    dispatch(getUserCart(user?.id))
  }, [dispatch, cart.length, user?.id]);

  const isItemInCart = cart.find(item=> parseInt(item.id) === parseInt(itemId))

  const submitCart = () => {
    if (validationErrors.length) return alert(`Cannot Submit`);

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
      //  setQuantity('');
     }

  }

  return (
    <>
      { validationErrors.length > 0 && (
        <div id="cartErrors">
            {/* <p id="spotErrorTItle">The following errors were found:</p> */}
            <ul >
                {validationErrors.map(error => (
                    <li id="errorMessages" key={error} style={{color: 'red'}}>
                        -{error}
                    </li>
                ))}
            </ul>
        </div>
      )}
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