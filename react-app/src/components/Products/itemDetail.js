import { useEffect,useState, useCallback, React, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getItemDetail } from '../../store/itemDetail';
import { deleteOneItem } from '../../store/items';
import './itemDetail.css'
import CommentDisplay from '../Comment/CommentDisplay';
import CommentForm from '../Comment/CommentForm';
import WishList from './WishList';
import Cart from '../Cart/Cart';
import Bid from '../Bid';
import ReactImageZoom from "react-image-zoom";
import EndTime from './EndTime';
import BuyNow from '../Order/BuyNow';
import { getWishlist, postWishlist, deleteWishlist } from "../../store/wishlist";
import aboutMe from '../aboutMe';

const ItemDetail = () => {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const item= location.state?.item;
    const { itemId } = useParams();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [selectedImg, setSelectedImg] = useState([item?.image[0]]);

    const wishlist = useSelector((state) => state.wishlist);
    const allWishUser = wishlist.allUser
    const checkWishBt = useRef(null);
    const isWishlist = allWishUser?.find((id) => id === user?.id)
    const [wishlistBt, setWishlistBt] = useState('')

    useEffect(() => {
            dispatch(getItemDetail(itemId));
            dispatch(getWishlist(itemId));
            isWishlist ? checkWishBt.current.style.color = "red" : checkWishBt.current.style.color = "black"
    }, [dispatch, itemId, isWishlist]);

    const endtime =new Date(item?.end)
    const currentTime = new Date()

    const [remainTime, setRemainTime] = useState()
    const [delta, setDelta] = useState("");

    endtime.setHours(endtime.getHours()+(endtime.getTimezoneOffset()/60))
    var days = Math.floor(delta/ 86400)
    var hours = Math.floor((delta / 3600))%24
    var minutes = Math.floor(delta/60)%60
    var seconds = Math.floor(delta % 60)

    // console.log("current bid",currentBid)
    // console.log("currenttime", currentTime)
    // console.log("delta", delta)
    // console.log("remaining days is", days)
    // console.log("remaining hours is", hours)
    // console.log("remaining minutes is", minutes)
    // console.log("remainin seconds is", seconds)

    var calculateTime = days+"d "+hours+"h "+minutes+"m "+seconds+"s"

    const isEnded = endtime - currentTime > 0

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
    };
       
     
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
        history.push({ pathname: `/items/${itemId}/edit`, state: { item: item } })
    };
    const props = {
        width: 330,
        height: 540,
        zoomWidth: 600,
        zoomHeight: 500,
        img: selectedImg
      };
    
    
    //   console.log("what is props", props)
    // const login = (!user) ? false : true
    const loadImg = async()=>{
        await dispatch(getItemDetail(itemId))
        setSelectedImg(item?.image[0])
    }

   

    if (!item) return null;
    return (
       
        <div>
            <div className='itemDetail_container'>
                <div className='itemDetail_all'>
                    <div className='itemDetail'>

                        <div className='itemImage_container'>
                            {/* <img className="itemImage_detail" src={item?.image} alt="" /> */}
                            {/* <i className="fa-solid fa-heart heartSigns"></i> */}
                            {/* <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}> */}
                            <div className="imgContainer">
                            {item?.image?.map((img, index) => (
                        //    <Zoom>
                                // {setSelectedImg(img)}
                                <img
                                className='thumnailImg'
                                style={{ border: selectedImg === img ? "4px solid gray" : "" }}
                                key={index}
                                src={img}
                                alt="dog"
                                onClick={() => setSelectedImg(img)}
                                />
                            // </Zoom>
                            ))}
                            </div>
 
                                <div>
                                    {/* {!(selectedImg) ? loadImg : <ReactImageZoom {...props} />} */}
                                     <ReactImageZoom {...props} />
                                </div>
                                <i ref={checkWishBt} 
                                   onClick={wishBt} 
                                    id="wishSimbol" 
                                    className={wishlistBt ? "fas fa-heart heartSign" 
                                :"fas fa-heart blackHeart"}>
                </i>
                        </div>
                        <div className="itemDetail_right">
                            <div className='itemDetail_info'>
                                <div id="itemName"> {item?.name} </div>
                                <div id="itemPrice">price:
                                    ${parseFloat(item?.price).toFixed(2)}</div>
                                <div id=""> </div>
                                {/* <div id="itemCategory">{item?.category_id}</div> */}
                                <div id="itemDescription">{item?.description}</div>
                                {item?.end && isEnded && (
                                    <>
                                    <EndTime />
                                {/* <div id="endTime">Time left</div>
                                <div id="remainTime">{remainTime}</div> */}
                                
                                {/* <button id="wishBt" onClick={wishBt}>Add to Wishist</button> */}
                                <Bid item={item}/>
                                </>
                                )}
                                {!isEnded && item?.end && (
                                   <p> This auction is over. </p>
                                )}
                                <WishList allWishUser={allWishUser} isWishlist={isWishlist}/>
                                <Cart />
                            </div>
                        </div>
                    </div>
                    {user?.id === item?.user_id && (
                        <div className='itemEditBt'>
                            <button id="itemEditBt" onClick={itemEditBt}>Edit</button>
                            <button id="itemDeleteBt" onClick={deleteBt}>Delete</button>
                        </div>
                    )}
                </div>
                <div className='itemComment_container'>
                    <div className='commentForm'>
                        <CommentForm />
                    </div>
                    <div className='commentDisplay'>
                        <CommentDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;