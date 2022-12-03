import Style from './productCardHorizon.module.css';
import { Fragment, useState , useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Pics from '../../assets/pl4.jpg'
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import moment from 'jalali-moment';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProductCardHorizon =(props)=>{

    return(
        <Fragment>
            
            <div dir='rtl' className={Style.mainDiv}>
                <div style={{display:'inline-block'}}>
                    <div className={Style.imageDiv}>
                        <Link to={`/cp/blog/showBlog/${props.data.product._id}`} target='_blank' ><img  src={props.data.product.coverImage}></img></Link>
                        {/* <Link target='_blank' to={`/showCase/${props.data._id}`}><img title={props.data.result.title} alt={props.data.result.title} src={`${props.data.result.images[0]}`}></img></Link> */}
                    </div>
                </div>
                <div style={{display:'inline-block' , padding:'10px 20px 10px 20px'}}>
                    <div className={Style.titleDiv}>
                    <Link to={`/cp/blog/showBlog/${props.data.product._id}`} target='_blank' ><h4>{props.data.product.title}</h4></Link>
                    </div>
                    <div className={Style.caption}>
                        <h3><span>0</span> نظر</h3> | <h3>{moment(props.data.product.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3>
                    </div>
                    <div className={Style.caption}>
                        <Link to={`/cp/blog/showBlog/${props.data.product._id}`} target='_blank' > <p>{props.data.product.subtitle}</p></Link>
                    </div>
                    <div className={Style.caption}>
                        <button onClick={props.openModalByDeleteBtn} value={props.data.product._id}><DeleteIcon  className={Style.deleteIcon}></DeleteIcon></button>
                        <Link to={`/cp/blog/editBlog/${props.data.product._id}`}><EditIcon className={Style.editIcon}></EditIcon></Link>
                        {props.data.product.validation === true?
                            <Form.Check 
                            
                                onChange={props.validationUpdate}  
                                value={props.data.product._id}                                                   
                                type="switch"
                                checked={true}
                                id="custom-switch"
                                style={{fontSize:'20px' , marginRight:'10px' , display:'inline-block'}}
                            />
                            :
                            <Form.Check 
                                onChange={props.validationUpdate}  
                                value={props.data.product._id}  
                                checked={false}
                                type="switch"
                                id="custom-switch"
                                style={{fontSize:'20px' , marginRight:'10px' , display:'inline-block'}}
                            />
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )

}
export default ProductCardHorizon;