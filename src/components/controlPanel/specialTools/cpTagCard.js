//modules
import Style from './cpTagCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
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
import { Link } from 'react-router-dom';

import Loader from '../../tools/loader';
const CpTagCard = (props) =>{
    const [editStatus , setEditStatus] = useState(false);
    const [editId , setEditId] = useState('');
    const [editValue , setEditValue] = useState('');
    const [validationUpdate , setValidationUpdate] = useState();
    const [validationId , setValidationId] = useState('');
    const [allTagsData , setAllTagsData] = useState([]);
    const editItem = (e) =>{
        setEditStatus(true);
        setEditId(e.currentTarget.id);
        setEditValue(e.currentTarget.value);
    }
    const newCategory = (e) =>{
        setEditValue(e.target.value);
    }
    const cancel = () =>{
        setEditStatus(false);
    }
    const update =(e)=>{
        setValidationId(e.target.value)
    }
    // const dataMapping =()=>{
    //     for(var i = 0 ; props.data.length > i ; i++)
    // }

    return(
        <div  className={Style.cardDiv}>
            <table id="datatables-1" style={{width:"100%"}} className={`${Style.table} ${Style.table_striped} ${Style.table_bordered}`}>
                    <thead>
                        <tr>
                            <th style={{left:"0px" , margin:'0px' , width:'80px'}}>دسته بندی</th>
                            <th style={{left:"0px" , margin:'0px' , width:'600px'}}>تگ</th>
                            <th style={{left:"0px" , margin:'0px' , width:'240px'}}>ثبت شده توسط</th>
                            <th style={{left:"0px" , margin:'0px' , width:'130px'}}>تاریخ ثبت</th>
                            <th style={{left:"0px" , margin:'0px' , width:'80px'}}>تاییدیه</th>
                            <th style={{left:"0px" , margin:'0px' , width:'70px'}}>ویرایش</th>
                            <th style={{left:"0px" , margin:'0px' , width:'60px'}}>حذف</th>
                        </tr>
                    </thead>
                

                    <tbody>
                            {props.data.map((data , i)=>{
                                return(
                                <tr key={i} style={{backgroundColor:"#e2e2e2" , borderRadius:'10px'}}>
                                    <td>
                                        <div className={Style.tagCategoryDiv}>
                                            <h3>{data.category.category}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        {editStatus === true && editId === data.tag._id + i ?
                                            <div className={Style.editInputDiv}>
                                                <input onChange={newCategory} value={editValue} type='text' className={Style.editInput}></input>
                                                <NormalBtn onClick={()=>{props.updateTag(editId,editValue); setEditStatus(false)}}  
                                                btnName={props.loading === true ?<Loader marginBottom={'2px'} borderTop={'3px solid #1043A9'} border={'#fff 3px solid'} width={'22px'} height={'22px'}></Loader>:<DoneIcon sx={{ fontSize: 20}}></DoneIcon>}
                                                 paddingTop={'2px'} paddingButtom={'1px'} fontSize={'9px'} paddingRight={'10px'} paddingLeft={'10px'} backgroundColor={'#1043A9'} color={'#FFFFFF'} ></NormalBtn>
                                                 
                                                <div style={{marginRight:'10px' ,display:'inline'}}>
                                                    <NormalBtnRed onClick={cancel}  btnName={<CloseIcon sx={{ fontSize: 20}}></CloseIcon>} paddingTop={'2px'} paddingButtom={'1px'} fontSize={'9px'} paddingRight={'10px'} paddingLeft={'10px'} backgroundColor={'#FD7474'} color={'#FFFFFF'} ></NormalBtnRed>
                                                </div>
                                            </div>
                                        :
                                            <div className={Style.rightSideDiv}>
                                                <Link to={`/cp/categories/productList?id=${data.tag._id}&title=${data.tag.tag}&state=tag`}><h3>{data.tag.tag}</h3></Link>
                                            </div>
                                        }

                                    </td>
                                    <td>
                                        <div  className={Style.profDiv}>
                                            <img className={Style.profImg} src={`${prof}`}></img>
                                            <h4>محمد فلاح</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.submitDate}>
                                            <h3>1400/03/14</h3>

                                            {/* <h3>{moment(dt.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3> */}
                                        </div>
                                    </td>
                                    <td>
                                        <div dir='ltr' className={Style.switchDiv}> 
                                            {data.tag.validation.map((d , i) =>{
                                                return(
                                                d.categoryId===data.category._id && d.validationStatus ===false ?
                                                    <Form.Check 
                                                    key={i}
                                                    onChange={props.validationUpdate}  
                                                    value={JSON.stringify({tagId : data.tag._id , categoryId:d.categoryId})}                                                        checked={false}
                                                    type="switch"
                                                    id="custom-switch"
                                                    style={{fontSize:'25px' , marginRight:'10px'}}
                                                />
                                                    
                                                    
                                                :d.categoryId===data.category._id && d.validationStatus ===true ?
                                                    <Form.Check 
                                                    key={i}
                                                    onChange={props.validationUpdate}  
                                                    value={JSON.stringify({tagId : data.tag._id , categoryId:data.category._id})}                                                    checked={true}
                                                    type="switch"
                                                    id="custom-switch"
                                                    style={{fontSize:'25px' , marginRight:'10px'}}
                                                />
                                                    
                                                :null)
                                            })}


                                        </div>
                                    </td>

                                    <td>
                                    <div className={Style.editIconDiv}><button id={data.tag._id + i} value={data.tag.tag} style={{border:'none' , background:'none'}} onClick={editItem}><EditIcon  className={Style.editIcon} sx={{ fontSize: 30,color: '#354063' ,iconHover:'#FFF' }}></EditIcon></button></div>
                                    </td>
                                    <td>
                                        <div className={Style.deleteIconDiv}><button value={JSON.stringify({tagId : data.tag._id , categoryId:data.category._id})} style={{border:'none' , background:'none'}} onClick={(e)=>{props.deleteOnClick(true); props.tagIdToDelete(e.currentTarget.value)}}><DeleteIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
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


export default CpTagCard;