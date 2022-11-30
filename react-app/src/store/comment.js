// import { csrfFetch } from './csrf';
const LOAD_ONE = 'Comment/LOAD_ONE';
const LOAD = 'Comment/LOAD';
const DELETE = 'Comment/DELETE';
const UPDATE = 'Comment/UPDATE';
const CREATE ='Comment/CREATE';

// const load = (comments) => ({
//     type: LOAD,
//     comments
// });
const loadOne = comments => ({
    type: LOAD_ONE,
    comments
});
const deleteOne = commentId => ({
    type: DELETE,
    commentId
});
const update = comment => ({
    type: UPDATE,
    comment
});

const create = comment =>({
    type:CREATE,
    comment
})

export const getComments = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`);

    if (response.ok) {
        const comment = await response.json();
        dispatch(loadOne(comment));

    };
};


export const getItemComments = (id) => async dispatch => {

    const response = await fetch(`/api/items/${id}/comments`);
    // console.log(response)

    if (response.ok) {
        const comments = await response.json();
        // console.log(reviews.message)
        // if (reviews.message !== "No Review yet"){
        // dispatch(loadOne(reviews.Reviews));
        dispatch(loadOne(comments));
        // dispatch(loadOne(reviews.reviews));
        // }
        return comments

    }
};

export const createComment = (report) => async dispatch => {
    // console.log(report)
    const response = await fetch(`/api/items/${report.item_id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
    });
    const comment = await response.json();
    // console.log(review)
    dispatch(create(comment));
    return comment;
}


export const editComment = data => async dispatch => {
    const response = await fetch(`/api/comments/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(update(comment));
        return comment;
    }
}

export const deleteComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteOne(id));
        // dispatch(getItemDetail(itemId));
    }
    return response;
};


// const initialState = { lists: [] }
export const commentReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD:
            const allComments = action.comments
            // console.log('state',reviews)
            allComments.forEach((comment) => {
                newState[comment.id] = comment
            })
            return newState;
        case LOAD_ONE:
            newState = action.comments;
            return newState;
        case CREATE: 
            newState[action.comment] = action.comment
            return newState   
        case UPDATE:
            newState[action.comment] = action.comment
            return newState;
        case DELETE:
            delete newState[action.commentId]
            return newState;
        default:
            return state;
    }
}

export default commentReducer;