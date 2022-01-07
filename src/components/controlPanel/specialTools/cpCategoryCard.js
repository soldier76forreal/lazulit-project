//modules
import Style from './cpCategoryCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import prof from '../../../assets/prof.jpg';
import moment from 'jalali-moment';
const CpCategoryCard = (props) =>{
    return(
        <div  className={Style.cardDiv}>
            <table id="datatables-1" style={{width:"100%"}} className={`${Style.table} ${Style.table_striped} ${Style.table_bordered}`}>
                    <thead>
                        <tr>
                            <th>دسته بندی ها</th>
                            <th style={{left:"0px" , margin:'0px' , width:'240px'}}>ثبت شده توسط</th>
                            <th  style={{left:"0px" , margin:'0px' , width:'130px'}}>تاریخ ثبت</th>
                            <th style={{left:"0px" , margin:'0px' , width:'80px'}}>تاییدیه</th>
                            <th style={{left:"0px" , margin:'0px' , width:'70px'}}>ویرایش</th>
                            <th style={{left:"0px" , margin:'0px' , width:'60px'}}>حذف</th>
                        </tr>
                    </thead>
                
                
                    <tbody>
                        {props.data.map(dt=>{
                            return(
                                <tr style={{backgroundColor:"#e2e2e2"}}>
                                    <td>
                                        <div className={Style.rightSideDiv}>
                                            <h3>{dt.category}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div  className={Style.profDiv}>
                                            <img className={Style.profImg} src={`${prof}`}></img>
                                            <h4>فیلان فیلانی</h4>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.submitDate}>
                                            <h3>{moment(dt.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.switchDiv}>               
                                            <label className={Style.switch}>
                                                <input   type="checkbox" ></input>                
                                                <span  className={`${Style.slider} ${Style.round}`}></span>
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.editIconDiv}><EditIcon  className={Style.editIcon} sx={{ fontSize: 30,color: '#354063' ,iconHover:'#FFF' }}></EditIcon></div>
                                    </td>
                                    <td>
                                        <div className={Style.deleteIconDiv}><button value={dt._id} style={{border:'none' , background:'none'}} onClick={props.deleteOnClick}><DeleteIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
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


export default CpCategoryCard;