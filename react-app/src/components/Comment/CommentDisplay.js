import { useState, useEffect, React } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItemComments } from '../../store/comment';
import { useSelector } from 'react-redux';
import { deleteComment } from '../../store/comment';
import './CommentDisplay.css'
import CommentEditForm from './CommentEditForm';
//import ReviewFormModal from '.';

export const CommentDisplay = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments));

    // const currSpot = spot.id;
    const [update, setUpdate] = useState(false);
    const [remove, setRemove] = useState(false);
    const currentUser = useSelector(state => state.session.user)
    const { itemId } = useParams();
    const [stars, setStars] = useState("");
    const [editId, setEditId] = useState(-1);
    const [validationErrors, setValidationErrors] = useState([]);
    const [body, setBody] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // console.log("ownerId",revi)
    // const permission = currentUser?.id === spot.ownerId
    // const spotReview = onlyspotReviews.filter(review => (review.spotId === (spot.id)))

    // useEffect(() => {
    //     const errors = [];
    //     if (!review.length) errors.push('Please enter your review');
    //     if (!stars.length) errors.push('Please enter your stars');
    //     if (stars < 0 || stars > 6) errors.push('Please enter between 0~5')
    //     setValidationErrors(errors);
    // }, [review, stars])

    useEffect(() => {
        dispatch(getItemComments(itemId))

    }, [dispatch]);

    // console.log('allreviews', spotReviewsObj)
    // const reset = () => {
    //     setReview("");
    //     setStars("");
    // };
    // if (!spotReviewsObj) return null
    // const spotReviews = Object.values(spotReviewsObj);

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
                    <div className='commentDetails'>
                        <div id='reviewer'>
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
                                                        setUpdate(true)
                                                        dispatch(deleteComment(parseInt(comment.id)));
                                                        dispatch(getItemComments(itemId))
                                                        // setRemove(true)
                                                        // history.push(`/item/${itemId}/comments`);
                                                    }
                                                }
                                                // }} className="delete" disabled={validationErrors.length > 0}>delete</button>
                                            }} className="commentDeleteBt" ><i class="fa-solid fa-trash"></i></button>
                                        </div>
                                        <div
                                            className="commentEditBt"
                                            onClick={() => {
                                                if (editId === comment.id) {
                                                    setEditId(-1);
                                                    setEditId("");
                                                    return;
                                                }
                                                setEditId(comment.id);
                                                setBody(comment.body);
                                            }}
                                        >
                                            <i className="fa-solid fa-pen"></i>
                                        </div>
                                    </div>
                                    <div className="editform">
                                        {editId === comment.id && (
                                            <CommentEditForm
                                                className="comment-edit-form"
                                                comment={comment}
                                                itemId={itemId}
                                                setEditId={setEditId}
                                            />
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