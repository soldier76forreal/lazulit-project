import Style from './productCard.module.css';
import { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from "react-drag-drop-files";
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import productImg from '../../assets/sts.jpg'


const ProductCard =(props)=>{
    return(
        <Fragment>
            <div dir='rtl' className={Style.productCardDiv}>
                    <Link target='_blank' to={`/cp/categories/productList/productShowCase/${props.data._id}`}><img src={`${props.data.images[0]}`}></img></Link>
                <div className={Style.productNameDiv}>
                    <Link target='_blank' to={`/cp/categories/productList/productShowCase/${props.data._id}`}><h4>{props.data.title}</h4></Link>
                </div>

                <div className={Style.cardInfo}>
                    {props.data.price.price !== null ?
                    <div className={Style.measure}>
                            <h4>{props.data.price.measure}</h4>
                        <div className={Style.priceDiv}>
                            <h5>{parseInt(props.data.price.price).toLocaleString()}<span style={{marginRight:'3px' , margin:'5px 3px 0px 0px ' , fontSize:'13px'}}>تومان</span></h5>
                        </div>
                    </div>
               :props.data.price.price === null ?
                    <div className={Style.measure}>
                        <h4>قیمت</h4>
                        <div className={Style.priceDiv}>
                            <h5>تماس بگیرید<span style={{marginRight:'3px' , margin:'5px 3px 0px 0px ' , fontSize:'13px'}}></span></h5>
                        </div>
                    </div>    
                :null}

                    <div className={Style.ratingStar}>
                       <h4>4.5</h4>
                        <StarIcon sx={{ fontSize: 24,color: '#CE9800' ,iconHover:'#3e76e6' }}></StarIcon>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}
export default ProductCard;