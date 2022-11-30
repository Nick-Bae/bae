import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, NavLink, useLocation } from "react-router-dom";
import { getWishlist, postWishlist, deleteWishlist } from "../../store/wishlist";
import { getItemDetail } from "../../store/itemDetail";
import './wishlist.css'

const WishList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const { itemId } = useParams();
    const wishlist = useSelector((state) => state.wishlist);
    const allWishUser = wishlist.allUser
    const [buttonClicked, setButtonClicked] = useState(false)
    const [wishlistBt, setWishlistBt] = useState(false)
    console.log("wish list ????????????", wishlist)
    console.log("allWishUser??????", allWishUser)
  
    if (allWishUser === undefined) {
        dispatch(getWishlist(itemId));
      }

      const wishClick = document?.getElementById('wishSimbol')
        wishClick === null ? dispatch(getWishlist(itemId)) :
        wishClick.style.color = "black"

        const wishClicked = allWishUser?.find((id)=>id === user?.id)
    
            if (allWishUser?.find((id)=>id === user?.id)) {
                wishClick === null ? dispatch(getWishlist(itemId)) :
                wishClick.style.color = "red"
            } 

    const wishBt = (e) => {
        e.preventDefault();
        if (!user) {
            alert("please login")
        } else {
            if (allWishUser?.find((id)=>id === user?.id)) {
                // wishClick === null ? dispatch(getWishlist(itemId)) :
                wishClick.style.color = "black"
                dispatch(deleteWishlist(itemId))
              } else {
                  dispatch(postWishlist(itemId))
                //   wishClick === null ? dispatch(getWishlist(itemId)) :
                  wishClick.style.color = "red";
                //   dispatch(getItemDetail(itemId))
              }
              dispatch(getWishlist(itemId))
        }
    };

    useEffect(() => {
        // dispatch(getItemDetail(itemId))
        if (user) dispatch(getWishlist(itemId))

    }, [dispatch]);

    return (
        <>
            {/* <div id="wishSimbol" className={wishlistBt ? 'wishlist-clicked' : 'wishlist-click'}> */}
            <div >
                <div id="wishSimbol" onClick={wishBt}>
                    {/* <i class="fa-regular fa-heart heartSign"></i> */}
                    <i class="fa-solid fa-heart heartSign"></i>
                </div>
            </div>
        </>)
};

export default WishList;
