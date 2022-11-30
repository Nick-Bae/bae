import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
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
    }, [dispatch, itemId]);

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

    // const login = (!user) ? false : true

    return (
        <div>
            <div className='itemDetail_container'>
                <div className='itemDetail_all'>
                    <div className='itemDetail'>

                        <div className='itemImage_container'>
                            <img className="itemImage_detail" src={item?.url} alt="" />
                        </div>
                        <div className="itemDetail_right">
                            <div className='itemDetail_info'>
                                <div id="itemName"> {item?.Product?.name} </div>
                                <div id="itemPrice">price:
                                    ${parseFloat(item?.Product?.price).toFixed(2)}</div>
                                <div id=""> </div>
                                <div id="itemCategory">{item?.category_id}</div>
                                <div id="itemDescription">{item?.Product?.description}</div>
                                {/* <button id="wishBt" onClick={wishBt}>Add to Wishist</button> */}
                                <WishList itemId={itemId} />
                            </div>
                        </div>
                    </div>
                    {user?.id === item?.Product?.user_id && (
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