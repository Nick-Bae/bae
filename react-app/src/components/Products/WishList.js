import React, { useEffect, useState, useRef  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getWishlist, postWishlist, deleteWishlist } from "../../store/wishlist";
import { getItemDetail } from "../../store/itemDetail";
import './wishlist.css'

const WishList = ({allWishUser, isWishlist}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const checkWishBt = useRef(null);
    const { itemId } = useParams();
    const wishlist = useSelector((state) => state.wishlist);
    // const allWishUser = wishlist.allUser
    // const [buttonClicked, setButtonClicked] = useState(false)
    const [wishlistBt, setWishlistBt] = useState('')
    let wishClick;
    
    useEffect(() => {
        dispatch(getItemDetail(itemId))
        dispatch(getWishlist(itemId))
        // wishClick = document.getElementById('wishSimbol')
        isWishlist ? checkWishBt.current.style.color = "red" : checkWishBt.current.style.color = "black"
        // isWishlist ? wishClick.style.color = "red" : wishClick.style.color = "black"
        
    
    }, [dispatch, wishClick]);

    if (allWishUser === undefined) {
        dispatch(getWishlist(itemId));
    }

 
    // const isWishlist = allWishUser?.find((id) => id === user?.id)
    // isWishlist ? setWishlistBt(true) : setWishlistBt(false)
    // window.onload = function () {
    //     wishClick = document?.getElementById('wishSimbol')
    
    //     isWishlist ? wishClick.style.color = "red" : wishClick.style.color = "black"
    // }
    //  const wishClick = document?.getElementById('wishSimbol')
    //  wishClick === null ? dispatch(getWishlist(itemId)) :
    //  wishClick.style.color = "black"
    // const wishClicked = allWishUser?.find((id)=>id === user?.id)

    // if (allWishUser?.find((id)=>id === user?.id)) {
    //     wishClick === null ? dispatch(getWishlist(itemId)) :
    //     wishClick.style.color = "red"
            // }

const wishBt = (e) => {
    e.preventDefault();

    // isWishlist ? setWishlistBt(false) : setWishlistBt(true)
    if (isWishlist){
        setWishlistBt(false)
        dispatch(deleteWishlist(itemId))
    } else {
        setWishlistBt(true)
        dispatch(postWishlist(itemId))
    }
    // if (!user) {
    //     alert("please login")
    // } else {
    //     if (isWishlist) {
    //         // wishClick === null ? dispatch(getWishlist(itemId)) :
    //         // wishClick.style.color = "black"

    //         setWishlistBt(false)
    //         dispatch(deleteWishlist(itemId))
    //     } else {
    //         dispatch(postWishlist(itemId))
    //         //   wishClick === null ? dispatch(getWishlist(itemId)) :
    //         // wishClick.style.color = "red";
    //         setWishlistBt(true)
    //         //   dispatch(getItemDetail(itemId))
    //     }
    wishClick = document?.getElementById('wishSimbol')
    // isWishlist ? wishClick.style.color = "red" : wishClick.style.color = "black"
    isWishlist ? checkWishBt.current.style.color = "red" : checkWishBt.current.style.color = "black"
    dispatch(getWishlist(itemId))
    // }
};



// useEffect(() => {
//      dispatch(getWishlist(itemId))

// }, [dispatch]);

return (
    <>
        <div >
            <div onClick={wishBt}>
                <button id="wishlistLabel">Add to Wishlist </button>
                {/* <i className="fa-solid fa-heart heartSign"></i> */}
                <i ref={checkWishBt} id="wishSimbol" className={wishlistBt ? "fa-solid fa-heart heartSign" 
                                :"fa-solid fa-heart blackHeart"}></i>
            </div>
        </div>
        

    </>
)
};

export default WishList;
