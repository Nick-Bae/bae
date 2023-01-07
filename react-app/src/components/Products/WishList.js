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
    const [wishlistBt, setWishlistBt] = useState('')
    let wishClick;
    
    useEffect(() => {
        dispatch(getItemDetail(itemId))
        dispatch(getWishlist(itemId))
        // isWishlist ? checkWishBt.current.style.color = "red" : checkWishBt.current.style.color = "black"
        
    
    }, [dispatch, isWishlist]);

    if (allWishUser === undefined) {
        dispatch(getWishlist(itemId));
    }

 

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
    dispatch(getWishlist(itemId))
    // }
};

{/* <i className="far fa-heart btnProd-icons"></i> */}
return (
    <>
        <div >
            <div onClick={wishBt}>
                <button id="wishlistLabel">Add to Wishlist </button>
                {/* <i className="fa-solid fa-heart heartSign"></i> */}
                {/* <i ref={checkWishBt} 
                    id="wishSimbol" 
                    className={wishlistBt ? "fas fa-heart heartSign" 
                                :"fas fa-heart blackHeart"}>
                </i> */}
            </div>
        </div>
        

    </>
)
};

export default WishList;
