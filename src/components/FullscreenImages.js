import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CarSlider from './CarSlider';

const FullscreenImages = ()=>{
    
    const dispatch = useDispatch();
    const { images } = useSelector(store => store.fullscreen);

    const Close = e => {
        if(e.target.className === 'fullscreen') dispatch({type: 'CLOSE_FULLSCREEN'});
    }
    const CloseButton = ()=> dispatch({type: 'CLOSE_FULLSCREEN'});

    return(
        <div className='fullscreen' onClick={Close}>
            <button className='close' onClick={CloseButton}>X</button>
            <div className='wrap_slider'>
                <CarSlider images={images}/>
            </div>
        </div>
    )
}

export default FullscreenImages;

/*
<button>Prev</button>
            {   
                i.map(img =>
                    <div className='WrapImg' key={img}>
                        <img src={img} alt="alt"/>
                    </div>)
            }
            <button>Next</button>
*/