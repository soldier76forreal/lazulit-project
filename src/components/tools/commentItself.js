import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from  "./commentItself.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import PlaceHolderImg from '../../assets/a.jpg'
import AuthContext from '../../store/auth';
import { useContext , useState } from 'react';
import Axios  from 'axios';
import Cookies from 'js-cookie';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextAvatar from './textAvatar';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

let CommentItself = (props) =>{
    const authCtx = useContext(AuthContext);
    const [author , setAuthor] = useState();
    const decode = jwtDecode(Cookies.get('accessToken'));



    return(
        
        <Col  xs={12} md={12} lg={12}>

         
        <div className={Style.commentItselfDiv}>
               <div className={Style.commentItselfDateDiv}>
                    <h4 >{moment(props.comment.comment.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h4>

                   <div style={{display:'inline-block' , marginLeft:'12px'}}>
                        {props.comment.comment.validation === true?
                            <Form.Check 
                                onChange={props.commentValidation}  
                                value={props.comment.comment._id}                                                   
                                type="switch"
                                checked={true}
                                id="custom-switch"
                                style={{fontSize:'25px' , marginRight:'10px'}}
                            />
                            :props.comment.comment.validation === false?
                            <Form.Check 
                            onChange={props.commentValidation}  
                                value={props.comment.comment._id}  
                                checked={false}
                                type="switch"
                                id="custom-switch"
                                style={{fontSize:'25px' , marginRight:'10px'}}
                            />
                        :null}

                   </div>
                   <div style={{display:'inline-block' , marginLeft:'-10px' }} className={Style.deleteIconDiv}><button onClick={(e)=>{props.setShowDeleteModal(true); props.setItemToDelete(e.currentTarget.value)}}  value={props.comment.comment._id} style={{border:'none' , background:'none' , padding:'0px'}} ><DeleteIcon onClick={(e)=>{props.setShowDeleteModal(true); props.setItemToDelete(e.currentTarget.value)}} className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
                   <Link to={`/cp/products/productShowCase/${props.comment.comment.targetPost}`}><div style={{display:'inline-block' , marginLeft:'11px' }} className={Style.deleteIconDiv}><button   value={props.comment.comment._id} style={{border:'none' , background:'none' , padding:'0px'}} ><OpenInNewIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: 'rgb(16, 67, 169)' ,iconHover:'#FFF' }}></OpenInNewIcon></button></div></Link>

              </div>
              <div  dir="rtl"  className={Style.commentItselfProfDiv}>
                <div className={Style.commentProfItselfImage}>
                    <TextAvatar text={`${props.comment.user.firstName} ${props.comment.user.lastName}`}></TextAvatar>
                </div>
                 <div className={Style.commentProfItselfName}>
                    <h4>{`${props.comment.user.firstName} ${props.comment.user.lastName}`}</h4>
                 </div>
              </div>

              <div className={Style.commentTextItselfDiv}>
                  <p>
                    {props.comment.comment.comment}
                  </p>
              </div>
              <div   dir="rtl" className={Style.commentItselfFooterDiv}>
                    <div className={Style.commentLikeAndDislike}>
                            <div className={Style.commentLike}>
                                <h5>{props.comment.comment.likes.length}</h5>
                                {props.comment.comment.likes.includes(decode.id)?
                                    <button  value={props.comment.comment._id} onClick={props.like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#009C0B" />
                                    </button>
                                :
                                    <button value={props.comment.comment._id} onClick={props.like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#DCDCDC" />
                                    </button>
                                }
                            </div>
                        
                            <div className={Style.commentDislike}>
                                <h5>{props.comment.comment.dislikes.length}</h5>
                                {props.comment.comment.dislikes.includes(decode.id)?
                                    <button  value={props.comment.comment._id} onClick={props.dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#D90000" />
                                    </button>
                                :
                                    <button  value={props.comment.comment._id} onClick={props.dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#DCDCDC" />
                                    </button>

                                }                            
                            </div>
                        

                    </div>

                      <div className={Style.commentShowReplyDiv}>
                        <FontAwesomeIcon className={Style.commentShowReplyArrow} icon="caret-down" color="#DCDCDC" />
                        <h5><span>10 </span>پاسخ</h5>
                        <FontAwesomeIcon className={Style.commentShowReplyArrow}  icon="caret-down" color="#DCDCDC" />
                      </div>
                  <div className={Style.commentReplyBtnDiv}>
                      <button className={Style.replyBtnButton}  onClick={props.replyBtn}>
                              <FontAwesomeIcon    className={Style.commentReplyBtn} size="lg" icon="reply"  color="#DCDCDC" />
                      </button>
                  </div>

              </div>
        </div>
    </Col>
    );
}



export default CommentItself;


