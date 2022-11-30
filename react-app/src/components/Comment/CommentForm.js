import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createComment, getComments } from '../../store/comment';
import { useSelector } from 'react-redux';
import { getItemComments } from '../../store/comment';
import './CommentForm.css'
import { getItemDetail } from '../../store/itemDetail';

export const CommentForm = ({ spot, setShowModal }) => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const comments = useSelector(state => Object.values(state.comments))
    const user = useSelector(state => state.session.user)

    // const currSpot = spot.id;
    // const spotReview = spotReviews.filter(review=> review.spotId ===spot.id)
    const isComment = comments.filter(comment => comment?.user_id === user?.id)

    const [update, setUpdate] = useState(false);
    const currentUser = useSelector(state => state.session.user)

    const [body, setBody] = useState("");
    const [leftNum, setLeftNum] = useState();
    const [stars, setStars] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    // // let message = '';
    // // console.log("spotreviews", spotReviews)

    useEffect(() => {
        const errors = [];
        // if (!body.length) errors.push('-Please enter your comment');
        if (body.length > 250) errors.push('your comment is too long. Maximum is 255 characters')
        // if (!stars.length) errors.push('-Please enter your stars');
        // if (stars < 0 || stars > 6) errors.push('Please enter between 0~5')
        setValidationErrors(errors);
    }, [body, stars])

    useEffect(() => {
        let commentNum = body.trim().length
        setLeftNum(250 - commentNum)
    }, [body])


    // ============ create new review======================
    const handleSubmit = async (e) => {
        e.preventDefault();


        setHasSubmitted(true);
        // setClose(false)
        // console.log("showModal",setShowModal)
        if (!currentUser) return alert("Please log in")

        if (isComment.length > 0) return alert("You've already left a review on this item")

        if (validationErrors.length) return alert(`Cannot Submit`);

        const report = { body, user_id: user.id, item_id: itemId };

        // dispatch(createReview(report))
        await dispatch(createComment(report))
            .then(() => dispatch(getItemComments(itemId)))
            .then(() => dispatch(getItemDetail(itemId)))
        // .then(()=>history.push(`/spots/${spot.id}`))
        setUpdate(true);
        setOpen(false);
        // const createRe = await dispatch(createReview(report));

        // setShowModal(false)
        setBody("")
    };

    const cancel = () => {
        setOpen(false)
    }
    useEffect(() => {
        // console.log("useeffect ",currSpot)
        setHasSubmitted(false);
        dispatch(getItemComments(itemId))

        // dispatch(getSpotReviews(currSpot));
        // dispatch(getAllSpots())
    }, [dispatch]);

    // if (!spotReviews) return null

    return (
        <div id="reviewModal">
            <div className="leaveComment" onClick={() => { open ? setOpen(false) : setOpen(true) }}>
                <i className="fa-solid fa-pen-to-square commentSign"> </i>
                &nbsp; Click to leave your comment!
            </div>
            {hasSubmitted && validationErrors.length > 0 && (
                <div id="errormessage">
                    <p id="reviewErrorTitle"> The following errors were found:</p>
                    <ul id="errorDetail">
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            {open && (
                <form id="reviewForm" onSubmit={handleSubmit} >
                    <div id="reviewFormBox">
                        <label id="reviewFormLabel">
                            {/* Comment */}
                            <textarea
                                required
                                maxLength="250"
                                id="reviewTextInput"
                                type="textarea"
                                // placeholder='please leave a review'
                                value={body}
                                onChange={e => setBody(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className='commentFormHandle'>
                        <div className='wordCount'>
                        <p id="wordCount"> <span style={{ color: 'red', fontSize: 16 }}>{leftNum}</span> /250</p>
                        </div>

                        {/* <label id="reviewFormStar">
                        Stars
                        <input
                         id="starInput"
                            type="number"
                            min="0" max="5"
                            placeholder='Please leave a star between 1~5'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                        />
                    </label> */}
                        <div className='commentFormBts'>
                            <button id="reviewSubmit" type="submit"> Submit </button>&nbsp;
                            <button id="reviewCancel" onClick={cancel}> Cancel </button>
                        </div>
                    </div>
                </form>

            )}


        </div>
    );
}


// ================== delete Review ==================
// const deleteReview =  (e) => {
//     // e.preventDefault();
//     console.log('befor ')
//     const id = e.target.getAttribute("value")

//     // const id = obj
//     // const id  = e.getAttribute('value')
//     console.log('button Id', id)
//      dispatch(deleteReview(parseInt(id)))
//     setRemove(true)


//     // history.push(`/spots/${currSpot}`);
//     // {<Redirect to="/" />}
//     //   setRemove(true)
//     // dispatch(getAllSpots());
//     // history.push('/')
//     //   window.location.reload(true);
// };


export default CommentForm