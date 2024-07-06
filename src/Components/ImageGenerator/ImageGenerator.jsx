/* eslint-disable no-unused-vars */
import React, {useRef, useState} from 'react'
import './ImageGenerator.css'
import default_image from '../Assests/default_image.svg'
const ImageGenerator = () => {
    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);

    const [loading,setLoading] = useState(false);

    const imageGenerator = async () =>{
        if(inputRef.current.value===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
            method:"POST",
            Headers:{
                "Content-Type":"application/json",
                Authorization:
                "Bearer sk-cDwWpa1cGAi2Lomr8oL6T3B1bkFJNSVOwU1b4o3Sw7RqZ4Y5",
                "User-Agent":"Chrome",
            },
            body:JSON.stringify({
              prompy:'${inputRef.current.value}',
              n:1,
              size:"512x512",  
            }),
        }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
}

  return (
    <div className = 'ai-image-generator'>
        <div className="header">AI Image <span>generator</span></div>
        <div className="img-loading"></div>
        <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" srcset="" />
        </div>
        <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"diaplay-none"}>Loading.....</div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want to See'/>
            <div className="generate-btn " onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}

export default ImageGenerator