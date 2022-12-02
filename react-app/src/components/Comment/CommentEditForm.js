import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../store/comment";
import { getItemComments } from "../../store/comment";
import './CommentEditForm.css'

function CommentEditForm({comment, itemId}) {
  // const comment  = useSelector(state=> state.comments)
  const userId = useSelector((state) => state.session.user.id);
  const [body, setBody]= useState(comment.body)
  const [validationErrors, setValidationErrors] = useState([]);
  const [leftNum, setLeftNum] = useState();
  const [enable, setEnable] = useState(true);
  const dispatch = useDispatch()

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
    e.preventDefault();

    if (validationErrors.length) return alert(`Cannot Submit`);

    const commentForm = {body,
                        user_id:userId,
                        item_id:itemId,
                        id: comment.id
     };

    await dispatch(editComment(commentForm))

    setEnable(false)
    setBody("");
    setValidationErrors([]);
  };

  const cancel =() =>{
    setEnable(false)
  };

    useEffect (()=>{
      dispatch(getItemComments(itemId))
    }, [dispatch, itemId])

  return (
    <>
    {enable &&(
      <>
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
      <div className="wordandUpdate">
      <p id="wordCount"> <span style={{color: 'red', fontSize:16}}>{leftNum}</span> /250</p>
      <button id="commentEdit" type="submit">Update</button>
      <button onClick={cancel} >cancel</button>
      </div>
    </form>
    </>
    )}
    </>
  );
}

export default CommentEditForm;
