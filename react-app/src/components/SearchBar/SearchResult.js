import { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from "../../store/items";
import './SearchResult.css'
// import Placeholder from "../Placeholder"
// import mainStyles from '../MainPage/main.module.css'
// import favoriteStyles from '../Favorite/favorite.module.css'

const SearchResult = () => {
    const { searchStr } = useParams()
    const history = useHistory()
    const dispatch = useDispatch();
    // const [items, setItems] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const data = Object.values(useSelector(state => state.items));


    // if(searchStr.length){
    //     fetch(`/api/items/search/${searchStr}`)
    //         .then(res =>  res.json())
    //         // .then(res => setItems(Object.values(res)))
       
    // }

    const items = data.filter(item=>
        ((item.name).toLowerCase()).includes(searchStr.toLowerCase()) ||
        ((item.description).toLowerCase()).includes(searchStr.toLowerCase()) 
        // ((item.category).toLowerCase()).includes(searchStr.toLowerCase())
    )
    
    console.log("search display",items)

    const noResult =  `We couldn't find matches for "${searchStr}"`
    const sNoResult = 'Double check your search for any typos or spellling errors - or different search term'

    // useEffect(() => {
    //             if(searchStr){
    //                 fetch(`/api/items/search/${searchStr}`)
    //                     .then(res => {
    //                         if(res.ok) return res.json()
    //                     })
    //                     .then(res => setResult(res))
    //             }
    //             setShowResult(!!searchStr)
    //         }, [searchStr])
    useEffect(() => {
        dispatch(getItems());
       
    }, [dispatch]);

return (
    <>
        {/* <SearchField 
        placeholder='Search item'
        onEnter={onEnter}
        onSearchClick={onSearchClick}
        /> */}

<div className="itemDetail">
              <div className="itemLayout">
             
              {items.length ?    items?.map((item, ind)=>(
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
            )) : <div className="noResultContainer"> 
                <div className="hmmm">Hmmm...</div>
                <div className="noResult"> {noResult} </div>
                <div className="sNoResult"> {sNoResult} </div>
            </div>}

            </div>
            </div>
    </>
)}

export default SearchResult;