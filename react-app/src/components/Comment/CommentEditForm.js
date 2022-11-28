import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { editComment, getComments } from "../../store/comment";
import { getItemComments } from "../../store/comment";

function CommentEditForm({comment, itemId,  setEditId}) {
  // const comment  = useSelector(state=> state.comments)
  const userId = useSelector((state) => state.session.user.id);
  const {id} = useParams;
  const [body, setBody]= useState(comment.body)
  const [validationErrors, setValidationErrors] = useState([]);
  // const [body, setBody] = useState("");
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
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <textarea
          className="edit-text"
          id="edit-form-text"
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default CommentEditForm;
