// import { csrfFetch } from './csrf';

const LOAD = "Items/LOAD"
const CREATE = 'Item/ADD_ONE';
const DELETE = 'Item/DELETE';
const READ = 'Item/LOAD';
const UPDATE = "Item/UPDATE"

const load = (items) => ({
    type: LOAD,
    items
});

const read = item => ({
    type: READ,
    item
});

const create = data => ({
    type: CREATE,
    data
});

const deleteItem = itemId => ({
    type: DELETE,
    itemId
});

const update = item => ({
    type: UPDATE,
    item
})

export const getItems = () =>async dispatch =>{
    const response = await fetch(`/api/items`);
    if (response.ok) {
        const items = await response.json();
        dispatch(load(items));
        return items;
    };
}

export const getSingleItem =itemId =>async dispatch =>{
    const response = await fetch(`/api/items/${itemId}`)

    if (response.ok) {
        const item = await response.json();
        dispatch(read(item));
        return item;
    };
}
export const getUserItem =userId =>async dispatch =>{
    const response = await fetch(`/api/users/${userId}/items`)

    if (response.ok) {
        const item = await response.json();
        dispatch(read(item));
        return item;
    };
}

export const createItem = (item) => async (dispatch) => {
    const response = await fetch("/api/items", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body is neccessary?
        body: JSON.stringify(item)
    })
    if (response.ok) {
        const item = await response.json();
        dispatch(create(item));
        return item;
    };
    return response;
};

export const updateItem = (item) => async (dispatch) => {
    const response = await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
    }
}

export const deleteOneItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`, {
        method: "DELETE",
    });
    const data = await response.json()

    if (response.ok) {
        dispatch(deleteItem(data));
        return response
    }
};



export const productReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD:
            newState = action.items;
            return newState;
        case READ:
            newState = action.item;
            return newState;
        case CREATE:
            newState[action.item] = action.item;
            return newState;
        case UPDATE:
            newState[action.item] = action.item;
            return newState;    
        case DELETE:
            delete newState[action.itemId]
            return newState;
        default:
            return state;
    }
}

export default productReducer
