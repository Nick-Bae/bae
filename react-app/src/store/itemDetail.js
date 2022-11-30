// import { csrfFetch } from './csrf';

const READ = 'Item/LOAD';
// const DELETE = 'Item/DELETE';
const UPDATE = "Item/UPDATE"

const read = item => ({
    type: READ,
    item
});

// const deleteItem = itemId => ({
//     type: DELETE,
//     itemId
// });

const update = data => ({
    type: UPDATE,
    data
})

export const getItemDetail = (itemId) =>async dispatch =>{
    const response = await fetch(`/api/items/${itemId}`);
    if (response.ok) {
        const item = await response.json();
        dispatch(read(item));
        return item;
    };
}


// export const deleteOneItem = (itemId) => async (dispatch) => {
//     const response = await fetch(`/api/Items/${itemId}`, {
//         method: "DELETE",
//     });

//     if (response.ok) {
//         dispatch(deleteItem(itemId));
//     }
// };

export const updateItem = (data) => async (dispatch) => {
    const response = await fetch(`/api/Items/${data.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const item = await response.json();
    dispatch(update(item));
    return item;
}


export const itemDetailReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case READ:
            newState = action.item;
            return newState;
       
        case UPDATE:
            newState[action.item.id] = action.item;
            return newState;    
        // case DELETE:
        //     delete newState[action.itemId]
        //     return newState;
        default:
            return state;
    }
}

export default itemDetailReducer
