import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Style from "./ratingStar.module.css";


const StarRating = () =>{
    const [rating , setRating] = useState(null);
    const [hover , setHover] = useState(null);

    return(
        <div style={{display:'inline-block'}}>
            {[...Array(5)].map((star , i)=>{
                const ratingValue = i + 1;
                return(
                    <label>
                        <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        />
                        <FontAwesomeIcon
                        className={Style.star}
                        icon='star' color={ratingValue <= (hover || rating) ? '#CE9800' : '#afafaf'} 
                        style={{fontSize:'30px'}} 
                        
                        onMouseEnter={() => setHover(ratingValue)} 
                        onMouseLeave={() => setHover(null)}
                        ></FontAwesomeIcon>
                        
                    </label>
                )
            })}
        </div>
    )

}
export default StarRating;