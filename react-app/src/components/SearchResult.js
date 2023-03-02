import { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
// import Placeholder from "../Placeholder"
// import mainStyles from '../MainPage/main.module.css'
// import favoriteStyles from '../Favorite/favorite.module.css'

const SearchResult = () => {
    const { keyword } = useParams()
    const history = useHistory()
    const [items, setItems] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`/api/items/search-all/${keyword}`)
            .then(res => {
                if(res.ok) return res.json()
                throw new Error()
            })
            .then(res => {setItems(Object.values(res))})
            .catch(() => history.push('/'))
            .finally(() => setIsLoaded(true))
    }, [keyword])

return (
    <>
        {/* <SearchField 
        placeholder='Search item'
        onEnter={onEnter}
        onSearchClick={onSearchClick}
        /> */}

<div className="itemDetail">
              <div className="itemLayout">
            {items.map((item, ind)=>(
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

export default SearchResult;