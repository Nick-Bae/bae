import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import { useState } from 'react'
// import './index.css'
import { getItems } from '../../store/items';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const items = Object.values(useSelector(state => state.items));
//   const spots = Object.values(spotsObj);
  const user = useSelector(state => state.session.user)

console.log("?????????????????",items)
console.log("?????????????????",items[0])

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
                    <Link key={item.id} to={`items/${item.id}`}> {item.name} </Link>
            ))}
            
        </div>
    </main>
  );
};

export default Items;