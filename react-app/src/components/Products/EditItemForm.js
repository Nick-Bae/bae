import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getItemDetail } from "../../store/itemDetail";
import { updateItem } from "../../store/items";

const EditItemForm = () => {
  const [errors, setErrors] = useState([]);
  const item = useSelector(state => state.item)
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const {itemId} = useParams();
  const history = useHistory();

    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [category_id, setCategory_id] = useState(item.category_id);
    // const [inventory_id, setInventory_id] = useState('');
    const [description, setDescription] = useState(item.description);
    const [image, setImage] = useState('');
    
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false); 
    

//   useEffect(() => {
//     dispatch(getItemDetail());
//   }, [dispatch]);

  const editSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const item = { 
        id: itemId,
        user_id: user.id, 
        name, 
        price: Number(price), 
        category_id, 
        description };
        // image, 

    await dispatch(updateItem(item))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors((data.errors));
    });
    history.push(`/items/${itemId}`);
  };

  const cancelClick = (e) =>{
    e.preventDefault();
    history.push(`/items/${itemId}`);
  }

  return (
    <section className='createSpotForm'>
    {hasSubmitted && validationErrors.length > 0 && (
        <div id="spotErrors">
            <p id="spotErrorTItle">The following errors were found:</p>
            <ul id="errorMessages">
                {validationErrors.map(error => (
                    <li key={error}>-{error}</li>
                ))}
            </ul>
        </div>
    )}
    <form id="createItemForm" onSubmit={editSubmit}>
        <h2 id="formTitle">Create Item</h2>
    
        <div id="spotInput">
            <label htmlFor='name'>Title:</label>
            <input 
                id='name'
                type='text'
                placeholder='title'
                onChange={e => setName(e.target.value)}
                value={name}
                required
            />
        </div>
        
        <div id="spotInput">
            <label htmlFor='price'>Price:</label>
            <input
                id='state'
                type='text'
                onChange={e => setPrice(e.target.value)}
                value={price}
                required
            />
        </div>
        <div id="spotInput">
            <label> Category:
            <select onChange={e=> setCategory_id(parseInt(e.target.value))}>
                <option  defaultValue="Click to see options"> Click </option>
                <option value="1">Shoes</option>
                <option value="2">Phones</option>
                <option value="3">Clothes</option>
                {/* <option value="mango">Mango</option> */}
            </select>
            </label>
        </div>
            {category_id}

        <div id="spotInput">
            <label htmlFor='description'>description:</label>
            <textarea
                id='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
            />
        </div>

        {/* <button type='submit'>Creat new spot</button> */}
        <div>
        <input id="spotBt" type="submit" /> &nbsp;
        {/* <button id="spotBt" type="button" onClick={editSubmit}>Cancel</button> */}
        <button id="spotBt" type="button" onClick={cancelClick}>Cancel</button>
        </div>
    </form>
</section>
  );
};

export default EditItemForm;
