// import { csrfFetch } from './csrf';

// const LOAD = "Bid/LOAD"
// const CREATE = 'Category/ADD_ONE';
// const DELETE = 'Category/DELETE';
const READ = 'Category/LOAD';
// const UPDATE = "Category/UPDATE"

// const load = (cart) => ({
//     type: LOAD,
//     cart
// });

const read = category => ({
    type: READ,
    category
});

// const create = data => ({
//     type: CREATE,
//     data
// });

// const deleteCart = cartId => ({
//     type: DELETE,
//     cartId
// });

// const update = data => ({
//     type: UPDATE,
//     data
// })

// export const getItems = () =>async dispatch =>{
//     const response = await fetch(`/api/carts`);
//     if (response.ok) {
//         const items = await response.json();
//         dispatch(load(items));
//         return items;
//     };
// }

export const getCategoryItem = (category) => async dispatch =>{
    const response = await fetch(`/api/categories/${category}`)

    if (response.ok) {
        const categoryItems = await response.json();
        dispatch(read(categoryItems));
        return categoryItems;
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

// export const createBid = (data) => async (dispatch) => {
//     const response = await fetch(`/api/items/${data.itemId}/bids`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         // body is neccessary?
//         body: JSON.stringify(data)
//     })
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(create(data));
//         return data;
//     };
// };

// export const updateBid = (data) => async (dispatch) => {
//     const response = await fetch(`/api/carts/${data.itemId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });
//     if (response.ok) {
//     const data = await response.json();
//     dispatch(update(data));
//     return data;
//     }
// }

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

export const categoryReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        // case LOAD:
        //     newState = action.cart;
        //     return newState;
        case READ:
            newState = action.category;
            return newState;
        // case CREATE:
        //     newState[action.data] = action.data;
        //     return newState;
        // case UPDATE:
        //     newState[action.data] = action.data;
        //     return newState;    
        default:
            return state;
    }
}

export default categoryReducer
