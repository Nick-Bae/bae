import { useEffect,useState, useCallback, React  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
// import './index.css'
import { getItemDetail } from '../../store/itemDetail';
import { deleteOneItem } from '../../store/items';
import { getItems } from '../../store/items';
import './itemDetail.css'
import CommentDisplay from '../Comment/CommentDisplay';
import CommentForm from '../Comment/CommentForm';
import WishList from './WishList';
import Cart from '../Cart/Cart';
import Bid from '../Bid';
import ReactImageZoom from "react-image-zoom";
// import Zoom from 'react-medium-image-zoom'
// import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'

const ItemDetail = () => {
    
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const history = useHistory();
    const item = useSelector(state => state.item)
    //const item = useSelector(state => state?.item);
    const user = useSelector(state => state.session.user)
    const [selectedImg, setSelectedImg] = useState( );

    useEffect(() => {
        dispatch(getItemDetail(itemId));
        // dispatch(getItems());
    }, [dispatch, itemId, getItemDetail]);

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

    
    useEffect(()=>{
        if (item.end){
            const interval = setInterval(
                () => setDelta(Math.abs(endtime - currentTime) / 1000), 1000)
            setRemainTime(calculateTime)
    
            return ()=> clearInterval(interval);
        }
    },[endtime, calculateTime, currentTime] )
    
     
   

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
        width: 400,
        height: 250,
        zoomWidth: 500,
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
                                style={{ border: selectedImg === img ? "4px solid purple" : "" }}
                                key={index}
                                src={img}
                                alt="dog"
                                onClick={() => setSelectedImg(img)}
                                />
                            // </Zoom>
                            ))}
                            </div>
                            {/* </ControlledZoom> */}
                            {/* { item?.image && (
                                <div className='zoomedImage'>
                                {!(selectedImg) ? setSelectedImg(item.image[0]) : <img  src={selectedImg} alt="zoom" className="selectedImage" width="500" />}
                            </div>
                            )}  */}
                            {/* <img  src={selectedImg} alt="zoom" className="selectedImage" width="500" /> */}

                                <div>
                                    {/* {!(selectedImg) ? loadImg : <ReactImageZoom {...props} />} */}

                                </div>
                                 {/* <ReactImageZoom {...props} />; */}

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
                                <div id="endTime">Time left</div>
                                <div id="remainTime">{remainTime}</div>
                                
                                {/* <button id="wishBt" onClick={wishBt}>Add to Wishist</button> */}
                                <Bid item={item}/>
                                </>
                                )}
                                {!isEnded && item?.end && (
                                   <p> This auction is over. </p>
                                )}
                                <WishList itemId={itemId} />
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
                    <div className='commentDisplay'>
                        <CommentDisplay />
                    </div>
                    <div className='commentForm'>
                        <CommentForm />
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default ItemDetail;