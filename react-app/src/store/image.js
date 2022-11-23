// import { csrfFetch } from './csrf';

const ADD_ONE = 'image/ADD_ONE';
const LOAD = 'image/LOAD';
const DELETE = 'image/DELETE';
const UPDATE = 'image/UPDATE';

const addOne = image => ({
    type: ADD_ONE,
    image
});
const load = (image) => ({
    type: LOAD,
    image
});
const deleteOne = id => ({
    type: DELETE,
    id
});
const update = imageId => ({
    type: UPDATE,
    imageId
});

export const getAllImages = () => async dispatch => {
    const response = await fetch('/api/images');
    console.log(response)

    if (response.ok) {
        const spots = await response.json();
        dispatch(load(spots));
    }
};
export const createImage = (data) => async dispatch => {
    const response = await fetch(`/api/items/${data.itemId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const image = await response.json();
    dispatch(addOne(image));
    return image;
}

export const updateImage = data => async dispatch => {
    const response = await fetch(`/api/items/${data.id}/images`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(update(image));
        return image;
    }
}

export const deleteImage = (id) => async dispatch => {
   
        const response = await fetch(`/api/images/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            dispatch(deleteOne(id));
        }
}
    // return response;


// const initialState = { lists: [] }
export const imageReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_ONE:
            newState[action.image.id] = action.image;
            return newState;

        case LOAD:
            const images = action.images.Images
            images.forEach((url) => {
                newState[url.id] = url
            })
            return newState;

        case UPDATE:
            newState[action.image.id] = action.image
            return newState;

        case DELETE:
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default imageReducer;