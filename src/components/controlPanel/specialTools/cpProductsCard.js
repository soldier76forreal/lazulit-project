//modules
import Style from './cpProductsCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useContext } from 'react';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import prof from '../../../assets/prof.jpg';
import moment from 'jalali-moment';
import NormalBtn from '../../tools/normalBtn';
import NormalBtnRed from '../../tools/normalBtnRed';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import UnstyledSwitches from '../../tools/switch';
import Loader from '../../tools/loader';
import { Link } from 'react-router-dom';
import AuthContext from '../../../store/auth';


const CpProductsCard = (props) =>{
    const [editPrice , setEditPrice] = useState(false);
    const [editId , setEditId] = useState('')
    const [price , setPrice] = useState('')
    const authCtx = useContext(AuthContext);

    const priceChange = (e) =>{
        if(editPrice === true){
            setEditPrice(false);
        }else if(editPrice === false){
            setEditPrice(true);
            setEditId(e.currentTarget.value)

        }
    }
    return(
        <div  className={Style.cardDiv}>
            <table id="datatables-1" style={{width:"100%"}} className={`${Style.table} ${Style.table_striped} ${Style.table_bordered}`}>
                    <thead>
                        <tr>                            
                            <th style={{left:"0px" , margin:'0px' , width:'80px'}}>کد</th>
                            <th>عنوان محصول</th>
                            <th style={{left:"0px" , margin:'0px'}}>موجودی؟</th>
                            <th style={{left:"0px" , margin:'0px'}}>متراژ(متر)</th>
                            <th style={{left:"0px" , margin:'0px' , width:'200px'}}>قیمت</th>
                            <th style={{left:"0px" , margin:'0px' , width:'200px'}}>ثبت شده توسط</th>
                            <th  style={{left:"0px" , margin:'0px' , width:'130px'}}>تاریخ ثبت</th>
                            <th style={{left:"0px" , margin:'0px' , width:'80px'}}>تاییدیه</th>
                            <th style={{left:"0px" , margin:'0px' , width:'70px'}}>ویرایش</th>
                            <th style={{left:"0px" , margin:'0px' , width:'60px'}}>حذف</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {props.data.map(dt=>{
                            return(
                                <tr key={dt.product._id} style={{backgroundColor:"#e2e2e2"}}>
                                    <td> 
                                            <div className={Style.productCode}>
                                                <h5>{dt.product.productCode}</h5>
                                            </div>
                                    </td>
                                    <td> 
                                            <div className={Style.rightSideDiv}>
                                                  <Link to={`/cp/products/productShowCase/${dt.product._id}`}><h3>{dt.product.title}</h3></Link>
                                            </div> 
                                    </td>
                                    <td> 
                                            <div className={Style.availableSurface}>
                                                {dt.product.stock === true?
                                                    <Form.Check 
                                                        onChange={props.stockStatus}  
                                                        value={dt.product._id}                                                   
                                                        type="switch"
                                                        checked={true}
                                                        id="custom-switch"
                                                        style={{fontSize:'25px' , marginRight:'10px'}}
                                                    />
                                                    :
                                                    <Form.Check 
                                                        onChange={props.stockStatus}  
                                                        value={dt.product._id}  
                                                        checked={false}
                                                        type="switch"
                                                        id="custom-switch"
                                                        style={{fontSize:'25px' , marginRight:'10px'}}
                                                    />
                                                }
                                            </div>
                                    </td>
                                    <td> 
                                            <div className={Style.availableSurface}>
                                                <h5>{dt.product.availableSurface}</h5>
                                            </div>
                                    </td>
                                    <td> 
                                            <div className={Style.availableSurface}>
                                                {editPrice === true && editId === dt.product._id ?                                                     
                                                    <div style={{display:'inline-block'}}>
                                                        <input onChange={(e)=>{setPrice(e.target.value)}} className={Style.priceInput}></input>
                                                        <DoneIcon onClick={()=>{props.priceUpdate(editId , price , setEditPrice)}} sx={{fontSize:'25px' , marginRight:'8px' , color:'#147900'}}></DoneIcon>
                                                        <CloseIcon onClick={()=>{setEditPrice(false)}} sx={{fontSize:'25px' , marginRight:'2px' , color:'#920000'}}></CloseIcon>
                                                    </div>
                                                :
                                                    <div style={{display:'inline-block'}}>
                                                        {dt.product.price.price === null?
                                                            <h5 style={{color:'#354063'}}>قیمت:تماس بگیرید</h5>
                                                        :
                                                            <h5 style={{color:'#354063'}}>{dt.product.price.measure}:{parseInt(dt.product.price.price).toLocaleString()}</h5>
                                                        }
                                                        <button onClick={priceChange} value={dt.product._id} style={{background:'none' , border:'none'}}><EditIcon  sx={{fontSize:'25px' , marginRight:'8px' , color:'#1043A9'}}></EditIcon></button>
                                                    </div>
                                                 }
                                            </div>
                                    </td>
                                    <td>
                                        <div  className={Style.profDiv}>
                                             {dt.author.profileImage !== undefined?
                                                <img title={dt.author.firstName+' '+dt.author.lastName} alt={dt.author.firstName+' '+dt.author.lastName} className={Style.profImg} src={`${authCtx.defaultTargetApi}/uploads/${dt.author.profileImage.filename}`}></img>
                                                :
                                                <img alt='placeholder' title='placeholder' className={Style.profImg} src={`${prof}`}></img>
                                             }                                            
                                            <h4>{dt.author.firstName+' '+dt.author.lastName}</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.submitDate}>
                                            <h3>{moment(dt.product.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div dir='ltr' className={Style.switchDiv}> 
                                            {dt.product.validation === true?
                                                <Form.Check 
                                                    onChange={props.validationUpdate}  
                                                    value={dt.product._id}                                                   
                                                    type="switch"
                                                    checked={true}
                                                    id="custom-switch"
                                                    style={{fontSize:'25px' , marginRight:'10px'}}
                                                />
                                                :
                                                <Form.Check 
                                                    onChange={props.validationUpdate}  
                                                    value={dt.product._id}  
                                                    checked={false}
                                                    type="switch"
                                                    id="custom-switch"
                                                    style={{fontSize:'25px' , marginRight:'10px'}}
                                                />
                                            }
                                        </div>
                                    </td>
                                    <td>
                                         <Link to={`/cp/products/editProduct/${dt.product._id}`}><div className={Style.editIconDiv}><button id={dt.product._id} value={dt.product.title} style={{border:'none' , background:'none'}}  ><EditIcon  className={Style.editIcon} sx={{ fontSize: 30,color: '#354063' ,iconHover:'#FFF' }}></EditIcon></button></div></Link>
                                    </td>
                                    <td>
                                        <div className={Style.deleteIconDiv}><button value={dt.product._id} style={{border:'none' , background:'none'}} onClick={props.openModalByDeleteBtn}><DeleteIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

							
            {/* <div className={Style.rightSideDiv}>
                <h3>تراورتن</h3>
            </div>
            <div className={Style.leftSideDiv}>
                <div className={Style.deleteIconDiv}><DeleteIcon className={Style.deleteIcon} sx={{ fontSize: 35,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></div>
                <div className={Style.editIconDiv}><EditIcon className={Style.editIcon} sx={{ fontSize: 35,color: '#354063' ,iconHover:'#FFF' }}></EditIcon></div>
                <div className={Style.switchDiv}>               
                     <label className={Style.switch}>
                          <input   type="checkbox" ></input>                
                         <span  className={`${Style.slider} ${Style.round}`}></span>
                    </label>
                </div>
                <div className={Style.submitDate}>
                    <h3>1400/09/04</h3>
                </div>
                <div className={Style.profDiv}>
                <h4>محمد فلاح</h4>
                    <img className={Style.profImg} src={`${prof}`}></img>
                </div>
            </div> */}
    </div>
    )
}


export default CpProductsCard;