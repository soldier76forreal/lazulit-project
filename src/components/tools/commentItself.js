import {Container, Form , Row ,Col , Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from  "./commentItself.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'jalali-moment';


import PlaceHolderImg from '../../assets/a.jpg'

let CommentItself = (props) =>{

    return(
        <Col xs={12} md={12} lg={12}>
                    
        <div className={Style.commentItselfDiv}>
              <div  dir="rtl"  className={Style.commentItselfProfDiv}>
                <div className={Style.commentProfItselfImage}>
                    <img src={`${PlaceHolderImg}`} className={Style.profilePhoto}></img>
                </div>
                 <div className={Style.commentProfItselfName}>
                    <h4>رضا رضایی</h4>
                 </div>
              </div>
              <div className={Style.commentItselfDateDiv}>
                  <h4></h4>
              </div>
              <div className={Style.commentTextItselfDiv}>
                  <p>
                     تست تست ستست تستس   {/* {props.data.comment} */}
                  </p>
              </div>
              <div   dir="rtl" className={Style.commentItselfFooterDiv}>
                    <div className={Style.commentLikeAndDislike}>
                        <div className={Style.commentLike}>
                        <h5>5</h5>
                            <FontAwesomeIcon className={Style.commentLikeBtn} size="lg" icon="thumbs-up" color="#DCDCDC" />
                        </div>
                        <div className={Style.commentDislike}>
                            <h5>5</h5>
                            <FontAwesomeIcon className={Style.commentDislikeBtn} size="lg" icon="thumbs-down" color="#DCDCDC" />
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


