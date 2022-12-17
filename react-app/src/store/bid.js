// import { csrfFetch } from './csrf';

// const LOAD = "Bid/LOAD"
const CREATE = 'Bid/ADD_ONE';
// const DELETE = 'Bid/DELETE';
const READ = 'Bid/LOAD';
const UPDATE = "Bid/UPDATE"

// const load = (cart) => ({
//     type: LOAD,
//     cart
// });

const read = bid => ({
    type: READ,
    bid
});

const create = data => ({
    type: CREATE,
    data
});

// const deleteCart = cartId => ({
//     type: DELETE,
//     cartId
// });

const update = data => ({
    type: UPDATE,
    data
})

// export const getItems = () =>async dispatch =>{
//     const response = await fetch(`/api/carts`);
//     if (response.ok) {
//         const items = await response.json();
//         dispatch(load(items));
//         return items;
//     };
// }

export const getBidsOnItem = (itemId) => async dispatch =>{
    const response = await fetch(`/api/items/${itemId}/bids`)

    if (response.ok) {
        const bid = await response.json();
        dispatch(read(bid));
        return bid;
    };
}
// export const getUserItem =userId =>async dispatch =>{
//     const response = await fetch(`/api/users/${userId}/items`)

//     if (response.ok) {
//         const item = await response.json();
//         dispatch(read(item));
//         return item;
//     };
// }

export const createBid = (data) => async (dispatch) => {
    const response = await fetch(`/api/items/${data.itemId}/bids`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body is neccessary?
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    };
};

export const updateBid = (data) => async (dispatch) => {
    const response = await fetch(`/api/carts/${data.itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
    const data = await response.json();
    dispatch(update(data));
    return data;
    }
}

// export const deleteOneCart = (cartId) => async (dispatch) => {
//     const response = await fetch(`/api/carts/${cartId}`, {
//         method: "DELETE",
//       }); 
      
//         // const data = await response.json()
//       if (response.ok) {
//         dispatch(deleteCart(cartId));
//         return response
//     }
// };

export const bidReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        // case LOAD:
        //     newState = action.cart;
        //     return newState;
        case READ:
            newState = action.bid;
            return newState;
        case CREATE:
            newState[action.data] = action.data;
            return newState;
        case UPDATE:
            newState[action.data] = action.data;
            return newState;    
        default:
            return state;
    }
}

export default bidReducer
