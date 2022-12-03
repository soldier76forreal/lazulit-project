//modules
import Style from './cpUserCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState , useContext } from 'react';
import {Navbar  , Nav ,NavDropdown ,Form  ,Button} from 'react-bootstrap';
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import UnstyledSelectSimple from '../../tools/dropDownSelect';
import NormalSelect from '../../tools/normalSelect';

import AuthContext from '../../../store/auth';



const CpUserCard = (props) =>{
    const authCtx = useContext(AuthContext);

    var selectItems = [
        {value : '1' , label:'user'},
        {value : '2' , label:'admin'},
        {value : '3' , label:'superAdmin'}
    ];
    return(
        <div  className={Style.cardDiv}>
            <table id="datatables-1" style={{width:"100%"}} className={`${Style.table} ${Style.table_striped} ${Style.table_bordered}`}>
                    <thead>
                        <tr>
                            <th>نام و نام خانوادگی</th>
                            <th style={{left:"0px" , margin:'0px' , width:'240px'}}>ثبت شده توسط</th>
                            <th  style={{left:"0px" , margin:'0px' , width:'130px'}}>تاریخ ثبت</th>
                            <th style={{left:"0px" , margin:'0px' , width:'80px'}}>تاییدیه</th>
                            <th style={{left:"0px" , margin:'0px' , width:'70px'}}>ویرایش</th>
                            {/* <th style={{left:"0px" , margin:'0px' , width:'60px'}}>حذف</th> */}
                        </tr>
                    </thead>
                

                    <tbody>
                        {props.data.map(dt=>{
                            return(
                                <tr key={dt._id} style={{backgroundColor:"#e2e2e2"}}>
                                    <td> 
                                        <div className={Style.rightSideDiv}>
                                            <div  className={Style.profDiv}>
                                                {dt.profileImage !== undefined ?
                                                <img alt={dt.firstName+' '+dt.lastName} title={dt.firstName+' '+dt.lastName} className={Style.profImg} src={`${authCtx.defaultTargetApi}/uploads/${dt.profileImage.filename}`}></img>
                                                :
                                                <img alt='placeholder' title='placeholder' className={Style.profImg} src={`${prof}`}></img>
                                                }
                                                <h4>{dt.firstName+' '+dt.lastName}</h4>
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <div dir='ltr' className={Style.select}>
                                            <NormalSelect name={dt._id} options={selectItems} onChange={props.changeRole} defaultValue={dt.role === 'user' ?{value : '1' , label:'user'}:dt.role === 'admin' ?{value : '2' , label:'admin'}:dt.role === 'superAdmin' ?{value : '3' , label:'superAdmin'}:null}></NormalSelect>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.submitDate}>
                                            <h3>{moment(dt.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div dir='ltr' className={Style.switchDiv}> 
                                            {dt.validation === true?
                                                <Form.Check 
                                                    onChange={props.validationUpdate}  
                                                    value={dt._id}                                                   
                                                    type="switch"
                                                    checked={true}
                                                    id="custom-switch"
                                                    style={{fontSize:'25px' , marginRight:'10px'}}
                                                />
                                                :
                                                <Form.Check 
                                                    onChange={props.validationUpdate}  
                                                    value={dt._id}  
                                                    checked={false}
                                                    type="switch"
                                                    id="custom-switch"
                                                    style={{fontSize:'25px' , marginRight:'10px'}}
                                                />
                                            }
                                        </div>
                                    </td>
                                    <td>
                                         <div  className={Style.editIconDiv}><button  onClick={props.openEditModal} id={dt._id} value={dt.profileImage !== undefined ? dt.profileImage.filename : null} style={{border:'none' , background:'none'}}  ><EditIcon  className={Style.editIcon} sx={{ fontSize: 30,color: '#354063' ,iconHover:'#FFF' }}></EditIcon></button></div>
                                    </td>
                                    {/* <td>
                                        <div className={Style.deleteIconDiv}><button value={dt._id} style={{border:'none' , background:'none'}} onClick={props.openModalByDeleteBtn}><DeleteIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
                                    </td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

    </div>
    )
}


export default CpUserCard;