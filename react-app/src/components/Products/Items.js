import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react'
// import './index.css'
import { getItems } from '../../store/items';
import './items.css'
import { getAllImages } from '../../store/image';


const Items = () => {
  const dispatch = useDispatch();
  const items = Object.values(useSelector(state => state.items));
  const images =Object.values( useSelector(state=>state.images));
  const user = useSelector(state => state.session.user)

  console.log("images?????????", images)

console.log("all items???",items)

  useEffect(() => {
    dispatch(getItems());
    dispatch(getAllImages());
  }, [dispatch]);




  //   onClick={() => {
  const login = (!user) ? false : true
  //     // if (!login) return ("please log in first")

  return (
    <main>
        <div className='mainContainer'>
            {/* {items.map(item=>( */}
            <div className="itemDetail">
            {images.map(item=>(
              <Link key={item?.id} to={{pathname:`/items/${item?.product_id}`, state:{item:item}}}> 
                    {item?.Product.name} 
                    <div className='imageContainer'>
                    <img className="itemImage" src={item?.url} />

                    </div>
              </Link>
            ))}
            </div>
        </div>
    </main>
  );
};

export default Items;