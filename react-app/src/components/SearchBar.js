import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { NavLink } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../store/items';

function SearchBar({ placeholder }) {
    const dispatch = useDispatch();
    const data = Object.values(useSelector(state => state.items));
    // const data = items.map((item)=> item?.name)
    console.log("data is ",data)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch, wordEntered]);

    useEffect(()=> {

    })

    const handleFilter = (event) => {
        setOpen(true)
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
    const popup = document.querySelector('.dataResult');
    // function showPopup() {
    // popup.classList.add('open');
    // }
    // function hidePopup() {
    // popup.classList.remove('open');
    // }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon id="searchIconBtn"/>
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {open && (
      <div className="isResult" id="isResult">
        {filteredData.length != 0 &&  (
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
                document.addEventListener('click', function(e) {
                    var container = document.querySelector('.isResult');
                    if (!container.contains(e.target)) {
                        container.style.display = 'none';
                    }
                })
            }
        } */}
    </div>
  );
}

export default SearchBar;