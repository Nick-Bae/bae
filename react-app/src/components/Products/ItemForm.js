import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createItem } from "../../store/items";
import { createImage } from "../../store/image";
import './itemForm.css'

const ItemForm = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState('');
    const [end, setEnd] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false)

    useEffect(() => {
    const errors =[];
    if (name.length >20) errors.push('Title must be less than 20 chracters');
    if ( price < 0) errors.push('Please enter your Correct Price');
    if (price > 10000) errors.push('Price should be less than $10,000');
    if (!category_id ) errors.push('Please select the category');
    if (quantity<1) errors.push('Please enter more than 0')
    // if (image.length>255) errors.push('url should not be over 255 characters');
    // if (!image.startsWith('https://') && 
    //     !image.startsWith('http://')) errors.push('url should starts with https:// or http://');
    // if (!image.endsWith(".png") && !image.endsWith(".jpeg") 
    //     && !image.endsWith(".jpg") && !image.endsWith(".gif")) errors.push('Image url should end with jpeg, jpg, gif, png');
    if (description.length > 500) errors.push('Description must be less than 500 chracters');
    setValidationErrors(errors);
  }, [price, image, name, category_id, description]);
  

  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);
    
    let removeT = end.split('T');
    let convertTime = removeT[0]+" "+removeT[1]+":00"
    // let convertTime = new Date(Date.UTC(end))
    let item={}
    if (end) {
         item = { 
            user_id: user.id, 
            name, 
            price:parseFloat(price).toFixed(2), 
            quantity,
            category_id, 
            description,
            end: convertTime
        };
    } else {
         item = { 
            user_id: user.id, 
            name, 
            price:parseFloat(price).toFixed(2), 
            quantity,
            category_id, 
            description
        };
    }
    const newItem = await dispatch(createItem(item)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(Object.values(data.errors));
        }
    });
    
    console.log("newItem is",newItem)
    // const imageUrl = {
    //     url:image,
    //     product_id: newItem.id
    // }
    
    // await dispatch(createImage( imageUrl))
    
    // <form id="createItemForm" method="POST">
    // <input type="text" id="product_id" name="product_id" value={newItem.id}></input>
    // </form>
        const formData = new FormData();
        formData.append("image", image);

        console.log("formData is ???",formData)
        // const product_id = {"product_id": newItem.id }
        // formData.append("product_id", JSON.stringify(product_id));

        const imageReturn = await fetch('/api/images',{
            method: "POST",
            body:formData,
        })
        const imgUrl = await imageReturn.json()
        const imageUrl = {
                url:imgUrl.url,
                product_id: newItem.id
            }

        await dispatch(createImage( imageUrl))
       
    reset();
    history.push(`/items/${newItem.id}`);
  };

  const cancelClick = (e) =>{
    e.preventDefault();
    history.push('/items')
  }

  const reset= () =>{
    setImage("");
    setName("");
    setPrice("");
    setDescription("");
  }
  
    const updateImage = (e) => {
    const file = e.target.files[0];
        setImage(file); 
    }

    const MultipleFileChange = (e) => {
        setImage(e.target.files);
    }

    const UploadMultipleFiles = async () => {
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);
        
        let removeT = end.split('T');
        let convertTime = removeT[0]+" "+removeT[1]+":00"
        // let convertTime = new Date(Date.UTC(end))
        let item={}
        // if (end) {
        //      item = { 
        //         user_id: user.id, 
        //         name, 
        //         price:parseFloat(price).toFixed(2), 
        //         quantity,
        //         category_id, 
        //         description,
        //         end: convertTime
        //     };
        // } else {
             item = { 
                user_id: user.id, 
                name, 
                price:parseFloat(price).toFixed(2), 
                quantity,
                category_id, 
                description
            };
        // }
        let newItem = await dispatch(createItem(item)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(Object.values(data.errors));
            }
        });
        console.log("newItem is",newItem)

        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);                      
        }
        
        console.log("this is a sending file to server", formData)
        
        const imageReturn = await fetch('/api/images',{
            method: "POST",
            body:formData,
        })

        const imgUrl = await imageReturn.json()
        const urlValues = Object.values(imgUrl)
        console.log("url is returing", urlValues)

        let url=[]
        for (let j=0; j<urlValues.length; j++) {
            const imageUrl ={
                url:urlValues[j].url,
                product_id: newItem.id
            }
           
            url.push(urlValues[j].url)

            console.log("sending url ", imageUrl)
            await dispatch(createImage( imageUrl))
        }
        newItem.image=url
        history.push({
            pathname: `/items/${newItem.id}`,
            state: { item: newItem }
          });
    }

  return (
    <section className='createItemForm'>
    { hasSubmitted && validationErrors.length > 0 && (
        <div id="itemErrors">
            <p id="spotErrorTItle">The following errors were found:</p>
            <ul >
                {validationErrors.map(error => (
                    <li id="errorMessages" key={error} style={{color: 'red'}}>
                        -{error}
                    </li>
                ))}
            </ul>
        </div>
    )}
    <form id="createItemForm" onSubmit={onSubmit}>
        <h2 id="formTitle">List an Item</h2>

        <div className="selectCategory">
            <label id="categoryLabel"> Category</label>
            <select id="selectCategory" className="required" onChange={e=> setCategory_id(parseInt(e.target.value))}>
                <option id="categoryOption" defaultValue="Click"> Click to see options </option>
                <option value="1">Clothes</option>
                <option value="2">Shoes</option>
                <option value="3">Jewelry</option>
                <option value="4">Accessoreis</option>
            </select>
            
        </div>

        <div id="nameInput">
            <label id="editLabel" htmlFor='name'>Title</label>
            <input 
                id='name'
                type='text'
                // placeholder='address'
                onChange={e => setName(e.target.value)}
                value={name}
                required
            />
        </div>
        
        <div id="priceInput">
            <label id="editLabel" htmlFor='price'>Price</label>
            <input
                id='price'
                type='number'
                onChange={e => setPrice(e.target.value)}
                value={price}
                required
                max="10000"
            />
        </div>
        
        <div id="quantityInput">
          <label id="quantityLabel" htmlFor='quantity'>Quantity</label>
          <input
            id='quantity'
            type='number'
            onChange={e => setQuantity(e.target.value)}
            value={quantity}
            required
            min="1"
            max="1000"
          />
        </div>

        <div id="itemtInput">
            <label id="editLabel" htmlFor='description'>description</label>
            <textarea
                id='description'
                type='text'
                onChange={e => setDescription(e.target.value)}
                value={description}
                required
            />
        </div>

        {/* <div id="itemtInput">
            <label id="editLabel" htmlFor='end'>end biding</label>
            <input
                id='end'
                type='datetime-local'
                name='biddingend'
                onChange={e => setEnd(e.target.value)}
                value={end}
            />
        </div> */}
        
        {/* <div id="itemtInput">
            <label htmlFor='url'>Image:</label>
                <textarea
                        // maxLength='255'
                    id='imageUrl'
                    type='text'
                    onChange={e => setImage(e.target.value)}
                    value={image}
                    required
                    />
                </div> */}
        
        <div id="uploadImage">
            <label id="uploadBt" htmlFor='url'>Image:</label>
             <input
              id="uploadBt"
              type="file"
              accept="image/*"
            //   onChange={updateImage}
              onChange={MultipleFileChange}
              multiple 
            />
          
            {(imageLoading)&& <p>Loading...</p>}
        </div>

        <div>
        <input id="itemtBt" type="submit" /> &nbsp;
        <button id="itemtBt" type="button" onClick={cancelClick}>Cancel</button>
        {/* <button onClick={()=>{history.push(`/items/${itemId}/images`)}}>edit image</button> */}
        <button type="button" onClick={() => UploadMultipleFiles()}  className="mutipleUploadBt">Upload</button>
        </div>
    </form>
    
</section>
  );
};

export default ItemForm;
