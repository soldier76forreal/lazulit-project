import Style from './showBlog.module.css';
import { Fragment, useState , useEffect , useContext } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link  , useHistory  , useParams, useLocation} from "react-router-dom";
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import imgCover from '../../assets/pl4.jpg'
import AuthContext from "../../store/auth";
import Language from "../../store/language";
import * as React from 'react';

import moment from 'jalali-moment';

const ShowBlog = () =>{
    const params = useParams();
    
    const authCtx = useContext(AuthContext);
    const langCtx = useContext(Language);
    const [post , setPost] = useState({});
    const [date  , setDate] = useState('');
    const getProduct = async () =>{

        try{
                const response = await authCtx.jwtInst({
                    method:"get",
                    url:`${authCtx.defaultTargetApi}/blog/getBlog`,
                    params:{id:
                        params.blogId,
                        language:langCtx.language
                    },
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const dataRes = response.data;
                setDate(moment(dataRes.insertDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
                setPost(dataRes);
                document.title = response.data.title;
        }catch(err){
            console.log(err);
        }       
     
}
useEffect(() => {
    getProduct()
}, []);
    return(
        <Row>
            <Col xs={0} md={2} lg={3}>
            </Col>
            <Col xs={12} md={8} lg={6}>
                <div className={Style.postDiv}>
                    <div style={{padding:'20px'}}>
                        <div className={Style.topTextDiv}>
                            <div>

                            </div>
                            <h3>{post.title}</h3>
                            <div className={Style.line}></div>
                            <div className={Style.tools}>
                                <div className={Style.dateDiv}>
        
                                    <h4>تاریخ انتشار:<span>{date}</span></h4>
                                </div>
                            </div>

                        </div>
                        <div className={Style.coverImage}>
                            <img src={post.coverImage}></img>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: `${post.content}`}}  dir='rtl' className={Style.content}>
                            
                        </div>
                    </div>

                </div>
            </Col>
            <Col xs={0} md={2} lg={3}>
            
            </Col>
        </Row>
    )
}
export default ShowBlog;