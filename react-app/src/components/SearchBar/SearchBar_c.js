import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import SearchField from 'react-search-field';
import { getItems } from "../store/items";

function SearchBar_c () {
    const dispatch = useDispatch();
    const history = useHistory();
    const data = Object.values(useSelector(state => state.items));
    let result
    const onEnter = (value, event) =>{
        if(event){
            result = data.filter(item=>
                (item.name).toLowerCase() === (value).toLowerCase()
            )
            console.log(result)
        }
    }
    const onSearchClick = (value) =>{
        result = data.filter(item=>
            (item.name).toLowerCase() === (value).toLowerCase()
        )
            history.push({ pathname: `/search`, state: { result:result } })
            console.log(result)
        
    }
    console.log("search", result)

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);

return (
    <>
        <SearchField 
        placeholder='Search item'
        onEnter={onEnter}
        onSearchClick={onSearchClick}
        />

<div className="itemDetail">
              <div className="itemLayout">
            {result?.map((item, ind)=>(
              <Link  key={ind} 
                     to={{ pathname:`/items/${item?.id}`,
                     state:{item:item}   
                    }}
              > 
                    <div key={item?.id} className='imageContainer'>
                    { item?.image &&(
                                    <img key={item?.id} className="itemImage" src={item?.image[0]} alt="" />
                                 )} 
                    </div>
                    <div className='previewNamePrice'>
                        <div className='previewName'>
                            {item?.name}
                        </div>
                        <div className="previewPrice">
                            ${parseFloat(item?.price).toFixed(2)}
                        </div>
                    </div>
              </Link>
            ))}
            </div>
            </div>
    </>
)}

export default SearchBar_c;