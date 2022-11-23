import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect, useParams } from 'react-router-dom';
import { createImage } from '../../store/image';
import { getAllImages } from '../../store/image';
import './addImage.css'
// import { createImage } from '../../store/image';

const AddImage = () => {
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const img = useSelector(state => state);

    // console.log('spotid',id)

    const handleSubmit = (e) => {

        e.preventDefault();
        // let isPreviewImage=false;
        const isPreviewImage  = document.querySelector('#preImageCheck');

        let image;
        // if (isPreviewImage.checked){
            image = {
                url: url,
                spotId: id,
                // previewImage: true
            }
        // } else {
        //     image = {
        //         url: url,
        //         spotId: id,
        //         previewImage: false
        //     }
        // }
        dispatch(createImage(image))
        history.push(`/spots/${id}`);
        reset();
    }
    const reset = () => {
        setUrl('');
    }
    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${id}`);
    };

    return (

        <div id="new-image">
            <form id="new-image-form" onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Add a image"
                    id="new-image-form-textarea"
                />
        {/* setting this image as a previewImage */}
                {/* <div>
                    <input id='preImageCheck' type="checkbox" value="previewImage" />
                    <label > Preview Image</label>
                </div> */}

                <div id="addImageBt">
                    <button id="addImage" type="submit"> Add Image</button> &nbsp;
                    <button id="imageCancel" type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>

        </div>
    )
}

export default AddImage