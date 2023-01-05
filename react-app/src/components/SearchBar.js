import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useLocation } from 'react-router-dom';
import { getItems } from "../store/items";
import "./SearchBar.css"
// import Profile from "./Profile/Profile";
// import Cart from "./Cart/Cart";

function SearchBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = Object.values(useSelector(state => state.items));

  const handleOnSearch = (string, results) => {
    if (string)  {
      dispatch(getItems())
    }
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    window.location = `/items/${item.id}`;
  };

  const handleOnFocus = () => {
    dispatch(getItems())
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}> {item.name}</span>
      </>
    )
  }
  
  useEffect(() => {
      dispatch(getItems());
  }, [dispatch, location.pathname]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="searchBarStyle" style={{ width: 520 }}>
          <ReactSearchAutocomplete
            items={data}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  )
}

export default SearchBar;
