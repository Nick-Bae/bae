import { useEffect, useState, useCallback, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getItemDetail } from '../../store/itemDetail';
import './itemDetail.css'

const EndTime = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const item = location.state?.item;
    const { itemId } = useParams();

    useEffect(() => {
        dispatch(getItemDetail(itemId));
    }, [dispatch, itemId]);

    const endtime = new Date(item?.end)
    const currentTime = new Date()

    const [remainTime, setRemainTime] = useState()
    const [delta, setDelta] = useState("");

    endtime.setHours(endtime.getHours() + (endtime.getTimezoneOffset() / 60))
    var days = Math.floor(delta / 86400)
    var hours = Math.floor((delta / 3600)) % 24
    var minutes = Math.floor(delta / 60) % 60
    var seconds = Math.floor(delta % 60)

    // console.log("current bid",currentBid)
    // console.log("currenttime", currentTime)
    // console.log("delta", delta)
    // console.log("remaining days is", days)
    // console.log("remaining hours is", hours)
    // console.log("remaining minutes is", minutes)
    // console.log("remainin seconds is", seconds)

    var calculateTime = days + "d " + hours + "h " + minutes + "m " + seconds + "s"

    const isEnded = endtime - currentTime > 0


    useEffect(() => {
        if (item?.end) {
            const interval = setInterval(
                () => setDelta(Math.abs(endtime - currentTime) / 1000), 1000)
            setRemainTime(calculateTime)

            return () => clearInterval(interval);
        }
    }, [endtime, calculateTime, currentTime])


    return (
        <div>
            <div className="itemDetail_right">
                {item?.end && isEnded && (
                    <>
                        <div id="endTime">Time left</div>
                        <div id="remainTime">{remainTime}</div>

                        {/* <button id="wishBt" onClick={wishBt}>Add to Wishist</button> */}
                    </>
                )}
                {!isEnded && item?.end && (
                    <p> This auction is over. </p>
                )}
            </div>
        </div>
    );
};

export default EndTime;