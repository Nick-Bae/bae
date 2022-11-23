import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react'
// import './index.css'
import { getItems } from '../../store/items';
import './items.css'


const Items = () => {
  const dispatch = useDispatch();
  const items = Object.values(useSelector(state => state.items));
  const images = useSelector(state=>state.images)
  const user = useSelector(state => state.session.user)

  console.log("images?????????", images)

console.log("all items???",items)

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);


  

  //   onClick={() => {
  const login = (!user) ? false : true
  //     // if (!login) return ("please log in first")

  return (
    <main>
        <div className='mainContainer'>
            {items.map(item=>(
          <div className="itemDetail">
              <Link key={item?.id} to={`/items/${item?.id}`}> 
                    {item?.name} 
                    <div className='imageContainer'>
                    <img className="itemImage" src={item?.image} />

                    </div>
              </Link>
          </div>
            ))}
        </div>
        <div>
          <Link to={`/new-item`}>Create New Item</Link>
        </div>
    </main>
  );
};

export default Items;