import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { NavLink, useLocation } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/items';

function SearchBar({ placeholder }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const data = Object.values(useSelector(state => state.items));
    // const data = items.map((item)=> item?.name)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch, wordEntered]);

    useEffect(()=> {
        clearInput();
    },[location])

    var hideMe
    const handleFilter = (event) => {
        setOpen(true)
        hideMe = document.getElementById('resultContent');
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
        return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
        });

        
        if (searchWord === "") {
        setFilteredData([]);
        } else {
        setFilteredData(newFilter);
        }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setOpen(false)
  };

  const resetInput =() => {
    setOpen(false);
    setWordEntered("");
    setFilteredData([]);
    dispatch(getItems());
    // clearInput()
  }
  
  window.onload=function() {
    // var hideMe = document.getElementById('dataResult');
    
   document.onClick= function(e) {
    if (e.target.id !== 'resultContent'){
        hideMe.style.display = 'none';
    }
   }
}

  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="searchContainer" ref={ref}>
      <div className="searchInputs">
        <input
          className="searchInput"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          onClick={() => setIsMenuOpen((oldState) => !oldState)}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon id="searchIconBtn"/>
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {open && isMenuOpen &&(
      <div className="isResult" id="isResult" >
        {filteredData.length !== 0 &&  (
            <div className="dataResult" id="dataResult">
                
                <div className="resultContent" id="resultContent">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                        <NavLink className="dataItem" onClick={resetInput} to={`/items/${value.id}`} >
                            <p >{value.name} </p>
                        </NavLink>
                        );
                    })}
                </div>
                
            </div>
        )}
      </div>
      )}
       {/* {
            window.onload=function() {
                var hideMe = document.getElementById('isResult');
               document.onClick= function(e) {
                if (e.target.id !== 'isResult'){
                    hideMe.style.display = 'none';
                }
               }
            }
        } */}
         {/* <div className="wrapper" ref={ref}>
      <button
        className="button"
        onClick={() => setIsMenuOpen((oldState) => !oldState)}
      >
        Click Me
      </button>
      {isMenuOpen && (
        <ul className="list">
          <li className="list-item">dropdown option 1</li>
          <li className="list-item">dropdown option 2</li>
          <li className="list-item">dropdown option 3</li>
          <li className="list-item">dropdown option 4</li>
        </ul>
      )}
    </div> */}
    </div>
  );
}

export default SearchBar;