import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import {createBid, getBidsOnItem, updateBid} from '../store/bid';
import './Bid.css'
let socket;

const Bid = ({item}) => {
    const dispatch = useDispatch();
    const [bidInput, setBidInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [currentPrice, setCurrentPrice] = useState(item.price)
    const user = useSelector(state => state.session.user)
    const currentBid = useSelector(state => state.bid)
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    // console.log("currentBid is ", currentBid?.bid)
    
    useEffect(()=>{
        console.log("item id is", item.id)
        dispatch(getBidsOnItem(item.id))
    },[dispatch, item.id, bidInput])

    const updateBidInput = (e) => {
        setBidInput(e.target.value)
    };

    const sendBid = (e) => {
        e.preventDefault()

        const bidInfo ={
            userId: user?.id,
            itemId: item.id,
            price: bidInput
        }

        if (bidInput<=item.price){
            alert("bidding should be higher that current bid")
        } else {
            dispatch(createBid(bidInfo))
            socket.emit("chat", { user: user.username, msg: bidInput });
        }
        setBidInput("")
    }

    return (user && (
        <div>
            {(messages[messages.length-1] === undefined ) && (
            <div className="currentBid">
                Current bid: ${(currentBid?.bid)?.toFixed(2)}
            </div>
            )}
            {(messages[messages.length-1] !== undefined ) && (
            <div>
                {/* {messages.map((message, ind) => ( */}
                    <p className="currentBid">Current bid: {` $${messages[messages.length-1]?.msg}.00`}</p>
                    <div className="bidWinner">{` Current Winner: ${messages[messages.length-1]?.user}`}</div>
                    <div className="placeBid">{` Highest bid: $ ${messages[messages.length-1]?.msg}.00`}</div>
                {/* ))} */}
            </div>
            )}
            <form  className="bidForm" onSubmit={sendBid}>
                <input
                    className="biddingPrice"
                    type='number'
                    placeholder="Bid Amount"
                    value={bidInput}
                    onChange={updateBidInput}
                />
                <button className="placeBidBt" type="submit" >Place bid</button>
            </form>
        </div>
    )
    )
};


export default Bid;