import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,  useParams } from "react-router-dom";
import { editComment } from "../../store/comment";
import { getItemComments } from "../../store/comment";
import './CommentEditForm.css'

function CommentEditForm({comment, itemId,  setEditId}) {
  // const comment  = useSelector(state=> state.comments)
  const userId = useSelector((state) => state.session.user.id);
  const [body, setBody]= useState(comment.body)
  const [validationErrors, setValidationErrors] = useState([]);
  const [leftNum, setLeftNum] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const errors = [];
    if (!body.length) errors.push('-Please enter your comment');
    if (body.length >250) errors.push('your comment is too long. Maximum is 255 characters')
    // if (!stars.length) errors.push('-Please enter your stars');
    // if (stars < 0 || stars > 6) errors.push('Please enter between 0~5')
    setValidationErrors(errors);
// }, [body, stars])
}, [body])

useEffect(()=>{
  let commentNum = body.trim().length
  setLeftNum(250-commentNum)
},[body])


  const updateSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    // Create a new object for the song form information.
    const commentForm = {body,
                        user_id:userId,
                        item_id:itemId,
                        id: comment.id
     };

    await dispatch(editComment(commentForm))
    setEditId(-1)

    // Reset the form state.
    setBody("");
    setValidationErrors([]);
    // setHasSubmitted(false);
  };

    useEffect (()=>{
      dispatch(getItemComments(itemId))
    }, [dispatch])

  return (
    <form id="form1" noValidate onSubmit={updateSubmit}>
      <ul>
        {validationErrors.map((error, idx) => (
          <li className="errorDetail" key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <textarea
          className="edit-text"
          id="edit-commentform-text"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <p id="wordCount"> <span style={{color: 'red', fontSize:16}}>{leftNum}</span> /250</p>
      <button type="submit">Update</button>
      {/* <button type="submit">cancel</button> */}
    </form>
  );
}

export default CommentEditForm;
