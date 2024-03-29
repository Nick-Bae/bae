import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from "material-ui-search-bar";
import { withRouter } from "react-router";
import { getItems } from "../../store/items";

function SearchBox(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [searchStr, setSearchStr] = useState('');
    const [result, setResult] = useState({})
    const [inputKey, setInputKey] = useState('');
    const data = Object.values(useSelector(state => state.items));

    const handleSearch = async () => {
        // if (searchStr) props.history.push(`/list/${searchStr.split(' ').join(':')}`);
        // else props.history.push('/');
    
        // if(searchStr){
        //     let keyword = (searchStr).toLowerCase()
        //     result = data.filter(item=>
        //         (item.name).toLowerCase() === (searchStr).toLowerCase()
        //         ((item.description).toLowerCase).includes(keyword)
        //     )
        //     console.log(result)
        // }
       
        if(searchStr){
            const response = await fetch(`/api/items/search-all/${searchStr}`)
            const resData = await response.json();
            console.log("resdata0",resData)
        }
        //     history.push({ pathname: `/items/search/${searchStr}`, 
        //                     state: { items:resData } })
                // .then(res => res.json())
                // .then(data => 
                //     history.push({ pathname: `/items/search/${searchStr}`, state: { items:data } }))
                // .then(data => console.log("what is data", data))
                // // .then(res => setResult(res))
                // // .then(res =>history.push({ pathname: `/items/search/${searchStr}`, state: { items:res } }))
                // .then(data => console.log("data",data))
                
                // function searchCategory(category) {
                    //     if (category === searchStr.toLocaleLowerCase()){
                        //         return category
                        //     }
                        // }
                        
            const categories =["clothes", "shoes", "jewelry", "accessories"];
            // const resCategory = categories.filter(category => category === searchStr.toLocaleLowerCase())
            const resCategory = categories.filter(category => category.includes(searchStr.toLocaleLowerCase()))
            const searchCategory = categories.indexOf(resCategory[0])+1
            console.log("rescategory", resCategory)
            // console.log("searchCategory", searchCategory)

            if (!searchStr) {
                alert("please enter a keyword to search")  
            } else {
                // category.filter(item => item.includes(searchStr?.toLowerCase()))
                const items = data.filter(item=> ((item?.name)?.toLowerCase()).includes(searchStr?.toLowerCase()) ||
                    ((item?.description)?.toLowerCase()).includes(searchStr?.toLowerCase()) ||
                    (Number(item?.category_id) === Number(searchCategory))
                    )

                    let inputValue = document.querySelector('.MuiInputBase-input')
                    inputValue.value=''
                    console.log(inputValue)
                    setSearchStr(' ')
                    setResult(items)
                    setInputKey('')
                    console.log("items", items)
                    history.push(`/items/search/${searchStr}`)
            }
            
        //    const allResult = {...result, ...collectR}
                //  .catch(console.err)   
                // }
    // history.push({ pathname: `/items/search/${searchStr}`, state: { items:items } })
}
console.log("search result",result)
    // useEffect(()=>{
    //     history.push({ pathname: `/search/${searchStr}`, state: { items:result }
    // },[result])})
    // useEffect(() => {
    //             if(searchStr){
    //                 fetch(`/api/items/search/${searchStr}`)
    //                     .then(res => {
    //                         if(res.ok) return res.json()
    //                     })
    //                     .then(res => setResult(res))
    //             }
    //         }, [keyword])
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch]);
    // useEffect(() => { 
    //     setResult(result) }, [])

    // useEffect (()=>{
    //     let inputValue = document.querySelector('.MuiInputBase-input')
    //     console.log(inputValue)
    //     inputValue.value=' '
    // },[location.pathname])
    // if (location.pathname.length) {
    //     let inputValue = document.querySelector('.MuiInputBase-input')
    //     inputValue = ''
    // }
   


    return (
        <div className="searchBarC">
        <SearchBar
        onChange={(keyword) => setSearchStr(keyword)
                }
        onRequestSearch={handleSearch}
        value={inputKey}
        style={{
          margin: '10px auto',
          width:'100%',
          border: '1px solid black'
        }}
        cancelOnEscape
      />
     
      </div>
    )
}

export default withRouter(SearchBox);