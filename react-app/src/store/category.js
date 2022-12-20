// import { csrfFetch } from './csrf';


const READ = 'Category/LOAD';


const read = category => ({
    type: READ,
    category
});



export const getCategoryItem = (category) => async dispatch =>{
    const response = await fetch(`/api/categories/${category}`)

    if (response.ok) {
        const categoryItems = await response.json();
        dispatch(read(categoryItems));
        return categoryItems;
    };
}


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
