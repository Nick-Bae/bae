import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react'
// import './index.css'
import { getItems } from '../../store/items';
import ItemForm from './ItemForm';
const Items = () => {
  const dispatch = useDispatch();
  const items = Object.values(useSelector(state => state.items));
//   const spots = Object.values(spotsObj);
  const user = useSelector(state => state.session.user)

console.log("all items???",items)

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);


  //   onClick={() => {
  const login = (!user) ? false : true
  //     // if (!login) return ("please log in first")

  return (
    <main>
        <div>
            {items.map(item=>(
          <li>
                    <Link key={item?.id} to={`/items/${item?.id}`}> {item?.name} </Link>
          </li>
            ))}
        </div>
        <div>
          <Link to={`/new-item`}>Create New Item</Link>
        </div>
    </main>
  );
};

export default Items;