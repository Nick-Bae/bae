// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useParams, NavLink, useLocation } from "react-router-dom";
// // import { getItemDetail } from "../../store/itemDetail";
// import './Cart.css'

// const Cart = () => {
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.session.user);
//     const { itemId } = useParams();
//     const wishlist = useSelector((state) => state.wishlist);
//     const allWishUser = wishlist.allUser
//     const [buttonClicked, setButtonClicked] = useState(false)
//     const [wishlistBt, setWishlistBt] = useState(false)
//     console.log("wish list ????????????", wishlist)
//     console.log("allWishUser??????", allWishUser)
    // const likeInfo = likes[id];
    // const allLikeUser = likeInfo?.allUser;


    // like story without color=================================
    // const clickStoryLike = (e) => {
    //   if (!user) alert("please login")
    //   if (allLikeUser?.find((id) => id === user?.id)) {

    //     dispatch(deleteLikeStory(id))
    //     // dispatch(getLikeStory(id))
    //   } else {
    //     dispatch(likeStory(id))
    //   }
    //   dispatch(getLikeStory(id))

    // }
    // ====================================================

    // ===================== story like with color   #F5F5F5
    // if (allWishUser === undefined) {
    //     dispatch(getWishlist(itemId));
    //   }
    // const wishClick = document?.getElementById('wishSimbol')
    // wishClick === null ? dispatch(getWishlist(itemId)) :
    // wishClick.style.color = "black"

    // const wishClicked = allWishUser?.find((id)=>id === user?.id)

    //     if (allWishUser?.find((id)=>id === user?.id)) {
    //         wishClick === null ? dispatch(getWishlist(itemId)) :
    //         wishClick.style.color = "red"
    //     } 

    // const wishBt = (e) => {
    //     e.preventDefault();
    //     if (!user) alert("please login")
    //     if (allWishUser?.find((id)=>id === user?.id)) {
    //         wishClick === null ? dispatch(getWishlist(itemId)) :
    //         wishClick.style.color = "black"
    //         dispatch(deleteWishlist(itemId))
    //       } else {
    //           dispatch(postWishlist(itemId))
    //           wishClick === null ? dispatch(getWishlist(itemId)) :
    //           wishClick.style.color = "red";
    //         //   dispatch(getItemDetail(itemId))
    //       }
    //       dispatch(getWishlist(itemId))
    // };

    // useEffect(() => {
    //     // dispatch(getItemDetail(itemId))
    //     dispatch(getWishlist(itemId))

    // }, [dispatch]);

//     return (
//         <>
//             {/* <div id="wishSimbol" className={wishlistBt ? 'wishlist-clicked' : 'wishlist-click'}> */}
//             <div >
//                 {/* <div id="wishSimbol" onClick={wishBt}>
//                     <i class="fa-regular fa-heart heartSign"></i>
//                     <i class="fa-solid fa-heart heartSign"></i>
//                 </div> */}
//             </div>
//         </>)
// };

// export default Cart;