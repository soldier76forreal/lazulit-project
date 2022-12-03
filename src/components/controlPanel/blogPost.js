import Style from './blogPost.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
import ProductCardHorizon from '../tools/productCardHorizon';
import SearchBar from '../tools/searchBar';
import NormalHeader from '../tools/normalHeader';
import MultiLangBtn from '../tools/multiLangBtn';
import BtnNewThingWithIcon from '../tools/btnNewThingWithIcon';

import { Fragment, useState , useEffect , useContext } from "react";
import { Link  , useHistory , useLocation} from "react-router-dom";
import ActivePage from '../../store/activePage';
import AuthContext from '../../store/auth';
import Language from '../../store/language';
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";
const BlogPost = () =>{
    //axios
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activePageCtx = useContext(ActivePage);
    const authCtx = useContext(AuthContext);
    const langCtx = useContext(Language);
    const [limit , setLimit] = useState(30);
    const [allProducts , setAllProducts] = useState([]);
    const [allProductLength , setAllProductLength] = useState('');
    const [refreshProduct , setRefreshProduct] = useState(3);
    //modal
    const [showDeleteModal , setShowDeleteModal] = useState(false);
    const [blogIdToDelete , setBlogIdToDelete] = useState("");

    //success toast states 
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states   
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');
       //get product    


     useEffect(() => {
         activePageCtx.activePageFnOr('blog');
         document.title = "وبلاگ"
     }, []);

       const getAllProducts = async () =>{
           let queryLimit = {limit:0 ,language:langCtx.language};
           if(queryParams.get('limit') === null){
               queryLimit.limit = 20;
           }else{
               queryLimit.limit = queryParams.get('limit');
           }
               try{
                   const response = await authCtx.jwtInst({
                       method:"get",
                       url:`${authCtx.defaultTargetApi}/blog/getAllBlog`,
                       params:queryLimit,
                       config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                   })
                   const data = await response.data; 
                   setAllProducts([...data.rs]);
                   setAllProductLength(data.ln);
               }catch(error){

                   // setFailedOpenToast(false);
                   // setFailedMsgToast(error.response.data);
               }
       }
       useEffect(() => {
           getAllProducts();
       }, [limit , refreshProduct]);


        // //validation Category
        const validationUpdate = async (e) =>{
        const  blogId ={id:e.target.value , language:langCtx.language};
            try{
                const response = await authCtx.jwtInst({
                    method:"post",
                    url:`${authCtx.defaultTargetApi}/blog/validationBlogPost`,
                    data:blogId,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data = await response.data; 
                setRefreshProduct(Math.random());            
            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast('تاییدیه انجام نشد');
                const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
            }
        }

       

    const showMore =()=>{
        setLimit(limit + 10);
        history.push(`blog?limit=${limit}`); 
    }
    //delete category 
    const deleteBlog = async () =>{
        const  dataToSend ={blogId:blogIdToDelete ,language:langCtx.language};
            try{
                const response = await authCtx.jwtInst({
                    method:"post",
                    url:`${authCtx.defaultTargetApi}/blog/deleteBlog`,
                    data:dataToSend,
                    config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                })
                const data =  response; 
                setSuccessOpenToast(true);
                setSuccessMsgToast(await data.data);
                setShowDeleteModal(false);
                const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                setRefreshProduct(Math.random());
                      
            }catch(error){
                setFailedOpenToast(true);
                setFailedMsgToast(error.response.data);
                const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
            }
    }
    const openModalByDeleteBtn =(e)=>{
        setShowDeleteModal(true);
        setBlogIdToDelete(e.currentTarget.value);
    }
    return(

        <Fragment>
                    {/* Modal */}
            <Modal  delete={deleteBlog} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal>
            {/* toasts */}
            <SuccessMsg openMsg={successOpenToast} msg={successMsgToast}></SuccessMsg>
            <FailedMsg openMsg={failedOpenToast} msg={failedMsgToast}></FailedMsg>
            <Container>
                    <Row>
                        <Col xs={0} md={12} lg={12}>
                            <div className={Style.inndeDiv}>
                                <Row dir="rtl">
                                    {/* header */}
                                    <Col xs={12} md={12} lg={4}>
                                        <div className={Style.topRightDivHeaderContainer}>
                                            <div className={Style.headerTitleDiv}>
                                               {/* custom header title component */}
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header='وبلاگ'></NormalHeader>
                                            </div>                           
                                        </div>  
                                    </Col>

                                    <Col xs={0} md={0} lg={4}>

                                    </Col>

                                    <Col  xs={12} md={12} lg={4}>
                                        <div className={Style.topLeftDivHeaderContainer}>
                                            <div className={Style.multiLangDiv}>
                                                {/* multi lang switcher component */}
                                                <MultiLangBtn></MultiLangBtn>
                                            </div>
                                        </div>
                                    </Col>
                                    <div className={Style.lineDiv}></div>
                                </Row>
                               {/* page if its category */}
                                
                                {/* search in categories */}
                                <Row dir="rtl">
                                    <div className={Style.toolBarDiv}>
                                        <div className={Style.leftToolBarDiv}>
                                           <SearchBar></SearchBar>
                                        </div>
                                        <div className={Style.rightToolBarDiv}>
                                            <div className={Style.newPostWithoutBtnDiv}>
                                                    <Link to='/cp/products/newBlogPost'><BtnNewThingWithIcon btnName='وبلاگ جدید' paddingTop={'0px'} paddingButtom={'0px'} fontSize={'16px'} paddingRight={'0px'} paddingLeft={'10px'} backgroundColor={'#3C3C3C'} color={'#FFFFFF'} ></BtnNewThingWithIcon></Link>
                                            </div>
                                            {/* <div className={Style.filterDiv}>
                                                <h3>فیلتر کردن براساس:</h3>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn btnName='جدید ترین' isActive={true} paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>        
                                                </div>
                                                <div className={Style.filterBtnDiv}>
                                                    <SelectiveOutLineBtn btnName='تایید نشده ها' isActive={false}   paddingTop={'2px'} paddingButtom={'2px'} fontSize={'16px'} paddingRight={'10px'} paddingLeft={'10px'}  border={'3px solid #1043A9'} backgroundColor={'#1043A9'} color={'#FFFFFF'}></SelectiveOutLineBtn>
                                                
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    <Col xs={1} md={3} lg={3}>
                                    </Col>
                                    <Col xs={10} md={6} lg={6}>
                                        <div dir='rtl' className={Style.listDiv}>
                                            <ul>
                                                {allProducts.map((data , i)=>{
                                                    return(
                                                    <li key={i}>
                                                        <ProductCardHorizon validationUpdate={validationUpdate} openModalByDeleteBtn={openModalByDeleteBtn} data={data}></ProductCardHorizon>
                                                    </li>
                                                    )
                                                })}
                                                {allProductLength > 20 ? 
                                                    <Row>  
                                                        <div  style={{width:'100%' ,marginTop:'20px' , textAlign:'center'}}>
                                                            <button onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                                        </div>
                                                    </Row>
                                                :
                                                null
                                                }
                                            </ul>
                                        </div>

                                    </Col>
                                    <Col xs={1} md={3} lg={3}>
                                    </Col>
                                </Row>
                                
                            </div>
                        </Col>
                    </Row>
                </Container>

        </Fragment>
    )
}
export default BlogPost;