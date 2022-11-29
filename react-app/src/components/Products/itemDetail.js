import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react'
// import './index.css'
import { getItemDetail } from '../../store/itemDetail';
import { deleteOneItem } from '../../store/items';
import './itemDetail.css'
import CommentDisplay from '../Comment/CommentDisplay';
import CommentForm from '../Comment/CommentForm';
import WishList from './WishList';
import { getOneImage } from '../../store/image';

const ItemDetail = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { itemId } = useParams();
    const history = useHistory();
    // const { item } = location.state
    // const item = useSelector(state => state?.item);
    const item = useSelector(state => state.images);
    //const item = useSelector(state => state?.item);
    //   const spots = Object.values(spotsObj);
    const user = useSelector(state => state.session.user)

    // console.log("ALL items  ?????",items)
    console.log("single item  ?????", item)

    useEffect(() => {
        dispatch(getItemDetail(itemId));
        dispatch(getOneImage(itemId))
    }, [dispatch]);

    const deleteBt = async (e) => {
        e.preventDefault();
        let confirmMessage = window.confirm("Are you sure to delete this item?");
        if (confirmMessage) {
        await dispatch(deleteOneItem(itemId))
        history.push('/')
        }
    };

    const itemEditBt = async (e) => {
        e.preventDefault();
        history.push({pathname:`/items/${itemId}/edit`, state:{item:item} })
    };

    const wishBt = async (e) => {
        e.preventDefault();

    }

    const login = (!user) ? false : true

    return (
        <div>
            <div className='itemDetail_container'>
                <div className='itemDetail_all'>
                    <div className='itemImage_container'>
                        <img className="itemImage_detail" src={item?.url} />
                        <div className='itemEditBt'>
                            <button id="itemEditBt" onClick={itemEditBt}>Edit</button>
                            <button id="itemDeleteBt" onClick={deleteBt}>Delete</button>
                        </div>
                    </div>
                    <ul className='itemDetail_info'>
                        <li id="itemName"> {item?.Product?.name} </li>
                        <li id="itemPrice">price: ${item?.Product?.price}</li>
                        <li id=""> </li>
                        <li id="itemCategory">{item?.category_id}</li>
                        <li id="itemDescription">{item?.Product?.description}</li>
                        <button id="wishBt" onClick={wishBt}>Wish List</button>
                        <WishList itemId={itemId} />
                    </ul>
                </div>
            </div>
            <div className='itemComment_container'>
                <CommentForm />
                <CommentDisplay />

            </div>
        </div>
    );
};

export default ItemDetail;