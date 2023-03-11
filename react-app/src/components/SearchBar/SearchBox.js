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
    const [inputText, setInputText] = useState('');
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
       
        // if(searchStr){
        //     const response = await fetch(`/api/items/search-all/${searchStr}`)
        //     const resData = await response.json();
        //     console.log("resdata0",resData)
        //     history.push({ pathname: `/items/search/${searchStr}`, 
        //                     state: { items:resData } })
                // .then(res => res.json())
                // .then(data => 
                //     history.push({ pathname: `/items/search/${searchStr}`, state: { items:data } }))
                // .then(data => console.log("what is data", data))
                // // .then(res => setResult(res))
                // // .then(res =>history.push({ pathname: `/items/search/${searchStr}`, state: { items:res } }))
                // .then(data => console.log("data",data))
            const items = data.filter(item=>
                            ((item?.name)?.toLowerCase()).includes(searchStr?.toLowerCase()) ||
                            ((item?.description)?.toLowerCase()).includes(searchStr?.toLowerCase()) 
                            // ((item.category).toLowerCase()).includes(searchStr.toLowerCase())
                        )
        //    const allResult = {...result, ...collectR}
           setResult(items)
           setInputText('')
                //  .catch(console.err)   
                // }
        console.log("items", items)
    history.push(`/items/search/${searchStr}`)
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
    }, [dispatch, searchStr]);
    // useEffect(() => { 
    //     setResult(result) }, [])

    useEffect (()=>{
        let inputValue = document.querySelector('.MuiInputBase-input')
        inputValue.innerText=' '
        console.log(location)
    },[location.pathname])
    // if (location.pathname.length) {
    //     let inputValue = document.querySelector('.MuiInputBase-input')
    //     inputValue = ''
    // }

    return (
        <>
        <SearchBar
        onChange={(keyword) => setSearchStr(keyword)
                }
        onRequestSearch={handleSearch}
        value={inputText}
        style={{
          margin: '10px auto',
          width:'800px',
          border: '1px solid black'
        }}
        cancelOnEscape
      />
     
      </>
    )
}

export default withRouter(SearchBox);