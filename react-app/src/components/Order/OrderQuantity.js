import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, updateCart } from '../../store/cart';
import { getUserOrder } from '../../store/order';
import './OrderQuantity.css'

const OrderQuantity = ({item}) => {
    const dispatch = useDispatch();
    //   const item = (useSelector(state => state.item));
      const cart = Object.values(useSelector(state => state.cart));
      const user = useSelector(state => state.session.user);
      const [quantity, setQuantity] = useState(item.quantity);
      const itemQ = (useSelector(state => state.item));
      const [ errors, setErrors ] = useState([]);
      const [validationErrors, setValidationErrors] = useState([]);
    
      console.log("item quantity",item.quantity)
    
      useEffect(()=>{
        const errors =[];
        if (quantity<0) errors.push("Please put more than 0");
        setValidationErrors(errors);
      },[quantity]);
    
      useEffect(() => {
        dispatch(getUserCart(user?.id))
      }, [dispatch, cart.length, user?.id]);

    //   useEffect(() => {
    //     dispatch(getUserOrder(user?.id))
    // }, [dispatch, quantity]);

    
      const cartUpdate = (cartId) => {
        if (validationErrors.length) return alert(`Cannot Submit`);
    
        const update = {
          quantity,
          itemId:item.id,
          userId: user.id,
        //   cartId
        }
        console.log("cartId ??????",cartId)
        dispatch(updateCart(update, cartId))
    }
      return (
        <>
        <form id="cartFormInCartview" onSubmit={cartUpdate}>
              <div id="cartViewquantityInput">
                  <label id="cartViewquantityLabel" htmlFor='quantity'>Quantity</label>
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
                      <div style={{color:"red"}} id="availableQty"> 
                      {itemQ.quantity < quantity ? <p>only available {item.quantity}</p> : ""} 
                                        
                      </div> 
                  </div>
              </div>
              <button type="submit" className="cartViewUpdate" onClick={()=>cartUpdate(item.cartId)} >update</button>
              {/* <div>total: $</div> <div>{item.quantity*item.price}</div> */}
              {/* <div hidden={true}>{cartTotal += item.quantity*item.price}</div> */}
        </form>
              
        </>
      );
    };

export default OrderQuantity;