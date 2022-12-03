import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from  "./commentReplys.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import PlaceHolderImg from '../../assets/a.jpg'
import AuthContext from '../../store/auth';
import { Fragment, useContext , useState } from 'react';
import Axios  from 'axios';
import Cookies from 'js-cookie';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TextAvatar from './textAvatar';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import SendIcon from '@mui/icons-material/Send';
import Language from '../../store/language';
import SuccessMsg from './successMsg';

import FailedMsg from './failedMsg';
import Modal from './modal';

let CommentReplys = (props) =>{
    const authCtx = useContext(AuthContext);
    const langCtx = useContext(Language);
    const [author , setAuthor] = useState();
    const decode = jwtDecode(Cookies.get('accessToken'));
    const [openReplySection , setOpenReplySection] = useState(false);
    const decoded = jwtDecode(Cookies.get('accessToken'));
    const [replysTo , setReplysTo] = useState('');
    const [comment , setComment] = useState('');
    //modal
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [itemToDelete , setItemToDelete] = useState("");
    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states   
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
    const commentReplyOpen = () =>{
        if(openReplySection === false){
            setOpenReplySection(true);
        }else if(openReplySection === true){
            setOpenReplySection(false);
        }
    }
    const sendCommentReply = async(e) =>{
        var data;
            data = {
                rootComment: props.rootComment.comment._id,
                targetPost  : props.rootComment.comment.targetPost ,
                author : jwtDecode(Cookies.get('accessToken')).id,
                replyedTo : props.data.replys._id,
                comment:comment
            }
        try{
            const response = await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/newCommentReplyToReplyCp`,
                data:data,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            setOpenReplySection(false);
            props.setRefreshList(Math.random());

        }catch(error){
            console.log(error);
            console.log('خطایی رخ داده')
        }
    }



    const like = async(e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: decoded.id
            }
        }
        try{
            const response =await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/likeCommentReplyCp`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setRefreshList(Math.random());

        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const dislike = async(e) =>{
        var dataToSend = {}
        if(e.currentTarget.value !== undefined){
            dataToSend = {
                targetComment : e.currentTarget.value,
                author: decoded.id
            }
        }
        try{
            const response = await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/dislikeCommentReplyCp`,
                data:dataToSend,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            props.setRefreshList(Math.random());


        }catch{
            console.log('خطایی رخ داده')
        }
    }
    const commentValidation =async (e) =>{
        const validationUpdate = {id:e.target.value};
        try{
            const response = await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/commentValidationUpdateReply`,
                data:validationUpdate,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = await response.data;
            props.setRefreshList(Math.random());
        }catch{
            console.log('خطایی رخ داده')
        }
    }


    const deleteComment = async () =>{
        const validationUpdate = {id:itemToDelete};
        try{
            const response  =await authCtx.jwtInst({
                method:'post',
                url:`${authCtx.defaultTargetApi}/comment/deleteCommentReplyCp`,
                data:validationUpdate,
                config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
            })
            const data = await response.data;
            props.setRefreshList(Math.random());
            setShowDeleteModal(false)
            setSuccessOpenToast(true);
            setSuccessMsgToast('دیدگاه حذف شد');
            const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
        }catch{
            console.log('خطایی رخ داده')
        }
    }
    
    return(
        <Fragment>
            {/* Modal */}
            <Modal  delete={deleteComment} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal>
            {/* toasts */}
            <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
            <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
        <Col  xs={12} md={12} lg={12}>

         
        <div style={{width:'90%' , margin:'3px auto 0px auto'}} className={Style.commentItselfDiv}>
               <div className={Style.commentItselfDateDiv}>
                    <h4 >{moment(props.data.replys.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</h4>

                   <div style={{display:'inline-block' , marginLeft:'12px'}}>
                        {props.data.replys.validation === true?
                            <Form.Check 
                                onChange={commentValidation}  
                                value={props.data.replys._id}                                                   
                                type="switch"
                                checked={true}
                                id="custom-switch"
                                style={{fontSize:'25px' , marginRight:'10px'}}
                            />
                            :props.data.replys.validation === false?
                            <Form.Check 
                            onChange={commentValidation}  
                                value={props.data.replys._id}  
                                checked={false}
                                type="switch"
                                id="custom-switch"
                                style={{fontSize:'25px' , marginRight:'10px'}}
                            />
                        :null}

                   </div>
                   <div style={{display:'inline-block' , marginLeft:'-10px' }} className={Style.deleteIconDiv}><button onClick={(e)=>{setShowDeleteModal(true); setItemToDelete(e.currentTarget.value)}}  value={props.data.replys._id} style={{border:'none' , background:'none' , padding:'0px'}} ><DeleteIcon onClick={(e)=>{setShowDeleteModal(true); setItemToDelete(e.currentTarget.value)}} className={Style.deleteIcon} sx={{ fontSize: 30,color: '#FD7474' ,iconHover:'#FFF' }}></DeleteIcon></button></div>
                   <Link to={`/cp/products/productShowCase/${props.data.replys.targetPost}`}><div style={{display:'inline-block' , marginLeft:'11px' }} className={Style.deleteIconDiv}><button   value={props.data.replys._id} style={{border:'none' , background:'none' , padding:'0px'}} ><OpenInNewIcon  className={Style.deleteIcon} sx={{ fontSize: 30,color: 'rgb(16, 67, 169)' ,iconHover:'#FFF' }}></OpenInNewIcon></button></div></Link>

              </div>
              <div  dir="rtl"  className={Style.commentItselfProfDiv}>
                  {props.data.replys.rootComment === props.data.replys.replyedTo ? 
                    <div className={Style.commentProfItselfName}>
                       <h4 style={{fontSize:'15px', padding:'0px'  , display:'inline-block'}}>{`${props.data.user.firstName} ${props.data.user.lastName}`}</h4><span style={{fontSize:'13px' , padding:'0px 5px 0px 5px' , display:'inline-block'}}> در پاسخ به </span><h4 style={{fontSize:'15px' , padding:'0px', display:'inline-block'}}>{`${props.rootComment.user.firstName} ${props.rootComment.user.lastName}`}</h4>
                    </div>
                 :props.reply.map((data)=>{
                     if(data.replys._id === props.data.replys.replyedTo){
                         return(
                             
                            <div className={Style.commentProfItselfName}>
                                <h4 style={{fontSize:'15px', padding:'0px'  , display:'inline-block'}}>{`${props.data.user.firstName} ${props.data.user.lastName}`}</h4><span style={{fontSize:'13px' , padding:'0px 5px 0px 5px' , display:'inline-block'}}> در پاسخ به </span><h4 style={{fontSize:'15px' , padding:'0px', display:'inline-block'}}>{`${data.user.firstName} ${data.user.lastName}`}</h4>
                            </div>
                         )
                     }
                 })
                }
              </div>

              <div className={Style.commentTextItselfDiv}>
                  <p>
                    {props.data.replys.comment}
                  </p>
              </div>
              <div   dir="rtl" className={Style.commentItselfFooterDiv}>
                    <div className={Style.commentLikeAndDislike}>
                            <div className={Style.commentLike}>
                                <h5>{props.data.replys.likes.length}</h5>
                                {props.data.replys.likes.includes(decode.id)?
                                    <button  value={props.data.replys._id} onClick={like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#009C0B" />
                                    </button>
                                :
                                    <button value={props.data.replys._id} onClick={like} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon  className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#DCDCDC" />
                                    </button>
                                }
                            </div>
                        
                            <div className={Style.commentDislike}>
                                <h5>{props.data.replys.dislikes.length}</h5>
                                {props.data.replys.dislikes.includes(decode.id)?
                                    <button  value={props.data.replys._id} onClick={dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#D90000" />
                                    </button>
                                :
                                    <button  value={props.data.replys._id} onClick={dislike} style={{background:'none' , border:'none'}}>
                                        <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#DCDCDC" />
                                    </button>

                                }                            
                            </div>
                        

                    </div>
                      <div className={Style.commentShowReplyDiv}>
                      </div>
                  <div className={Style.commentReplyBtnDiv}>
                      <button onClick={commentReplyOpen} className={Style.replyBtnButton}>
                              <FontAwesomeIcon    className={Style.commentReplyBtn} size="lg" icon="reply"  color="#DCDCDC" />
                      </button>
                  </div>

              </div>
        </div>
        
    </Col>
    {openReplySection === true?
        <Col dir={langCtx.language === 'english' ?'ltr':'rtl'} style={{ maxWidth:'90%' , margin:'8px auto 0px auto'}} xs={12} md={12} lg={12}>
            <div style={{paddingBottom:'18px'}} className={Style.replySection}>
                <h5>پاسخ شما...</h5>
                <Row>
                    <Col style={{padding:'0px'}} xs={11} md={11} lg={11}>
                        <div style={{paddingTop:'0px', paddingBottom:'0px'}} className="textareaDiv">
                            <Form.Control onChange={(e)=>{setComment(e.target.value)}} className="commentTextarea" as="textarea" rows={2} />
                        </div>
                    </Col>
                    <Col style={{padding:'0px'}} xs={1} md={1} lg={1}>                           
                        <div className={Style.btnDiv}>
                            <button onClick={sendCommentReply} className={Style.sendReply}><SendIcon sx={{color:'#fff' , fontSize:'26px', transform:"rotate(180deg)"}}></SendIcon></button>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    :null}

</Fragment>
    );
}



export default CommentReplys;


