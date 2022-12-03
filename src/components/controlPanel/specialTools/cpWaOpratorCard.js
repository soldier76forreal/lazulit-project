//modules
import Style from './cpOpratorCard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar  , Nav ,NavDropdown ,Form ,FormControl ,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import prof from '../../../assets/prof.jpg';
import moment from 'jalali-moment';
import { Link } from 'react-router-dom';
import AuthContext from '../../../store/auth';


const CpWaOpratorCard = (props) =>{
    const authCtx = useContext(AuthContext);
    return(
        <div  className={Style.cardDiv}>
            <table id="datatables-1" style={{width:"100%"}} className={`${Style.table} ${Style.table_striped} ${Style.table_bordered}`}>
                    <thead>
                        <tr>
                            <th>نام و نام خانوادگی</th>
                            <th style={{left:"0px" , margin:'0px' , width:'760px'}}>شماره واتساپ</th>
                            <th style={{left:"0px" , margin:'0px' , width:'240px'}}>ثبت شده توسط</th>
                            <th style={{left:"0px" , margin:'0px' , width:'110px'}}>تاریخ ثبت</th>
                            <th style={{left:"0px" , margin:'0px' , width:'70px'}}>ویرایش</th>
                            <th style={{left:"0px" , margin:'0px' , width:'60px'}}>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((dt , i)=>{
                            return(
                                <tr key={i} style={{backgroundColor:"#e2e2e2"}}>
                                    <td>
                                        <div className={Style.rightSideDiv}>
                                            <h3>{`${dt.waOprator.firstName} ${dt.waOprator.lastName}`}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.phoneNumbers}>
                                            {dt.waOprator.phoneNumber !== '' ? 
                                            <div>
                                                <a target='blank' href={`${authCtx.defaultTargetApi}/send?phone=98${parseInt(dt.waOprator.phoneNumber, 10)}`}><h4>{dt.waOprator.phoneNumber}</h4></a>
                                            </div>
                                        :'' }
                                        </div>
                                    </td>
                                    <td>
                                        <div  className={Style.profDiv}>
                                        {dt.author.profileImage !== undefined?
                                                <img title={dt.author.firstName+' '+dt.author.lastName} alt={dt.author.firstName+' '+dt.author.lastName} className={Style.profImg} src={`https://${authCtx.defaultTargetApi}/uploads/${dt.author.profileImage.filename}`}></img>
                                                :
                                                <img alt='placeholder' title='placeholder' className={Style.profImg} src={`${prof}`}></img>
                                            }                                           
                                            <h4>{dt.author.firstName+' '+dt.author.lastName}</h4>
                                        </div>
                                    </td>
                                    {/* <td>
                                        <div className={Style.switchDiv}>               
                                            <label className={Style.switch}>
                                                <input type="checkbox" ></input>                
                                                <span  className={`${Style.slider} ${Style.round}`}></span>
                                            </label>
                                        </div>
                                    </td> */}
                                    <td>
                                        <div className={Style.submitDate}>
                                            <h3>{moment(dt.waOprator.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h3>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={Style.editIconDiv}><button onClick={props.openEditModal}  value={dt.waOprator._id} style={{border:'none' , background:'none'}} ><EditIcon  className={Style.editIcon} sx={{ fontSize: 30,color: '#354063' ,iconHover:'#FFF' }}></EditIcon></button></div>
                                    </td>
                                    <td>
                                        <div  className={Style.deleteIconDiv}><button onClick={props.opratorToDelete}  value={dt.waOprator._id} style={{border:'none' , background:'none'}} ><DeleteIcon onClick={props.opratorToDelete} className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

					
    </div>
    )
}


export default CpWaOpratorCard;