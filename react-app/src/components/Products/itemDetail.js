import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link,useParams,useHistory } from 'react-router-dom';
import { useState } from 'react'
// import './index.css'
import { getItemDetail } from '../../store/itemDetail';
import { deleteOneItem } from '../../store/items';
import EditItemForm from './EditItemForm';

const ItemDetail = () => {
const dispatch = useDispatch();
const { itemId } = useParams();
const history = useHistory();
const items = useSelector(state => state?.item);const item = useSelector(state => state?.item);
//   const spots = Object.values(spotsObj);
const user = useSelector(state => state.session.user)

// console.log("ALL items  ?????",items)
console.log("single item  ?????",item)

useEffect(() => {
    dispatch(getItemDetail(itemId));
}, [dispatch]);

const deleteBt = async(e) => {
    e.preventDefault();
            // let confirmMessage = window.confirm("Are you sure to delete this spot?");
            // if (confirmMessage) {
    await dispatch(deleteOneItem(itemId))
    history.push('/')
            // }
};

const itemEditBt = async(e) => {
    e.preventDefault();
    history.push(`/items/${itemId}/edit`)
};

  const login = (!user) ? false : true

  return (
    <main>
        <div>
            <h1>item detail</h1>
            {item?.name}
            {item?.price}
            {item?.category_id}
            {item?.description}
        </div>
        <button onClick={itemEditBt}>Edit</button>
        <button onClick={deleteBt}>Delete</button>
    </main>
  );
};

export default ItemDetail;