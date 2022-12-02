import { useState, useEffect, React } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItemComments } from '../../store/comment';
import { useSelector } from 'react-redux';
import { deleteComment } from '../../store/comment';
import './CommentDisplay.css'
import CommentEditForm from './CommentEditForm';
//import ReviewFormModal from '.';

export const CommentDisplay = () => {

    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments));

    const currentUser = useSelector(state => state.session.user)
    const { itemId } = useParams();
    // const [stars, setStars] = useState("");
    const [open, setOpen] = useState(false);

    const [editId, setEditId] = useState(-1);
    const [body, setBody] = useState("");

    // useEffect(() => {
    //     const errors = [];
    //     if (!review.length) errors.push('Please enter your review');
    //     if (!stars.length) errors.push('Please enter your stars');
    //     if (stars < 0 || stars > 6) errors.push('Please enter between 0~5')
    //     setValidationErrors(errors);
    // }, [review, stars])

    useEffect(() => {
        dispatch(getItemComments(itemId))

    }, [dispatch, itemId, open]);
    const cancel = () => {
        setOpen(false)
        // dispatch(getItemComments(itemId));
        // dispatch(getItemDetail(itemId));
    }

    if (!comments) return null

    return (
        <div className='comment_container'>
            <p id="commentTitle">
                {/* <button id="reviewModalClick" onClick={reveiwModal}> */}

                &nbsp; Comments

                {/* <ReviewFormModal />
                     </button> */}

            </p>
            {/* <p id="numbers"><i className="fa-sharp fa-solid fa-star"></i> 
            &nbsp; {(spot.avgRating.toFixed(1))} · {spot.numReviews} Reviews</p> */}
            <div id="reviews">

                {/* {setHasSubmitted &&  */}
                {/* {comments.map(({ id, User, user_id, body}) => ( */}
                {comments.map((comment) => (
                    <div key={comment.id} className='commentDetails'>
                        <div id='reviewer' key={comment.id}>
                            <li key={comment.id} className='userId'>
                                {/* User Id: {userId} */}
                                {comment?.User?.username}
                            </li>
                            {/* <li key={updatedAt} className='date'>
                                {updatedAt.split('T')[0]}
                            </li> */}
                        </div>
                        <div>
                            <div key={body} className='reviewBody'>
                                {comment.body}
                            </div>
                            {/* <li className='reviewStar'>
                                Stars: {stars}
                                {(<i className="fa-sharp fa-solid fa-star"></i>) * Number(stars)}

                            </li> */}
                            

                            {(comment.user_id === currentUser?.id) &&
                                <div className='commentEditBt'>
                                    <div className='commentDelete_Edit'>
                                        <div>
                                            <button onClick={() => {
                                                const login = (!currentUser) ? alert("Please log in") : true

                                                if (login) {
                                                    const deletePermission = comment.user_id !== currentUser?.id ? alert("No Permission to delete") : true
                                                    if (deletePermission) {
                                                        dispatch(deleteComment(parseInt(comment.id)));
                                                        dispatch(getItemComments(itemId))
                                                        // setRemove(true)
                                                        // history.push(`/item/${itemId}/comments`);
                                                    }
                                                }
                                                // }} className="delete" disabled={validationErrors.length > 0}>delete</button>
                                            }} className="commentDeleteBt" ><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                        <div
                                            className="commentEditBt"
                                            // onClick={() => {
                                            //     if (editId === comment.id) {
                                            //         setEditId(-1);
                                            //         setEditId("");
                                            //         return;
                                            //     }
                                            //     setEditId(comment.id);
                                            //     setBody(comment.body);
                                            // }}
                                            onClick={() => { open ? setOpen(false) : setOpen(true) }}
                                        >
                                            <i className="fa-solid fa-pen"></i> 
                                        </div>
                                    </div>
                                    <div className="editform">
                                        {open && (
                                            <div className='commentUpdateBt'>
                                            
                                            <CommentEditForm
                                                className="comment-edit-form"
                                                comment={comment}
                                                itemId={itemId}
                                                Open={true}
                                            />
                                            <button id="reviewCancel" onClick={cancel}> Cancel </button>
                                            </div>
                                            
                                        )}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentDisplay;