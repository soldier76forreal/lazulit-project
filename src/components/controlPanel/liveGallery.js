//modules
import { Fragment, useState , useEffect , useContext } from "react";
import Style from './productsList.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link  , useHistory , useLocation} from "react-router-dom";
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import NormalBtn from "../tools/normalBtn";
import NormalInput from "../tools/normalInput";
import MultiLangBtn from "../tools/multiLangBtn";
import CpSideBar from "./specialTools/cpSideBar";
import NormalSelect from "../tools/normalSelect";
import NormalHeader from "../tools/normalHeader";
import SearchBar from "../tools/searchBar";
import CpCategoryCard from "./specialTools/cpCategoryCard";
import MultiSelect from "../tools/reactSelectMulti";
import CpTagCard from "./specialTools/cpTagCard";
import Pag from "../tools/pagination";
import { Cookie, SyncProblem } from "@mui/icons-material";
import BtnNewThingWithIcon from "../tools/btnNewThingWithIcon";
import SelectiveOutLineBtn from "../tools/selectiveOutLineBtn";
import CpProductsCard from "./specialTools/cpProductsCard";
import NoDataFigure from "../tools/noDataFigure";
import axios from "axios";
import SuccessMsg from "../tools/successMsg";
import FailedMsg from "../tools/failedMsg";
import Modal from "../tools/modal";
import ActivePage from "../../store/activePage";
import AuthContext from "../../store/auth";
import Language from "../../store/language";


const LiveGallery = () =>{
     //------------------------------history and location------------------------------
     const history = useHistory();
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
     const activePageCtx = useContext(ActivePage);
     const authCtx = useContext(AuthContext);
     const langCtx = useContext(Language);
     
     useEffect(() => {
         activePageCtx.activePageFnOr('product');
         document.title = "محصولات"
     }, []);
     //------------------------------states------------------------------

     //page switcher states
     const [pageSwitcherState , setPageSwitcherState] = useState('category');
     const [allProducts , setAllProducts] = useState([]);
     const [limit , setLimit] = useState(30);
     const [allProductLength , setAllProductLength] = useState('');
     


     const [searchInProductText , setSearchInProductText] = useState('');
     const [searchInProductData , setSearchInProductData] =  useState([]);


    //modal
     const [showDeleteModal , setShowDeleteModal] = useState(false);
     const [productIdToDelete , setProductIdToDelete] = useState("");

     const [listRefresh , setListRefresh] = useState('');


     const [searchLoading , setSearchLoading] = useState(false);

    //success toast states
    const [successOpenToast , setSuccessOpenToast] = useState(false);
    const [successMsgToast , setSuccessMsgToast] = useState('');

    //failed toast states   
    const [failedOpenToast , setFailedOpenToast] = useState(false);
    const [failedMsgToast , setFailedMsgToast] = useState('');




    //------------------------------http requests------------------------------

        //get product    
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
                        url:`${authCtx.defaultTargetApi}/product/getAllProducts`,
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
    
            // //validation Category
            const validationUpdate = async (e) =>{
                const  productId ={id:e.target.value , language:langCtx.language};
                    try{
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/product/validationProduct`,
                            data:productId,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setListRefresh(Math.random());            
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast('تاییدیه انجام نشد');
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
            }


            // //validation Category
            const stockStatus = async (e) =>{
                const  productId ={id:e.target.value , language:langCtx.language};
                    try{
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/product/stockUpdate`,
                            data:productId,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        setListRefresh(Math.random());                    
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast('خطا!');
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
            }
                
            // price update
            const priceUpdate = async (id , price , closeEdit) =>{
                const dataToSend = {
                    id:id,
                    price:price,
                    language:langCtx.language
                }
                if(price === ''){
                    setFailedOpenToast(true);
                    setFailedMsgToast('قیمت ویرایش نشد');
                    const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                }else{
                    try{
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/product/priceUpdate`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data = await response.data; 
                        closeEdit(false);
                        setListRefresh(Math.random());
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast('قیمت ویرایش نشد');
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
                }

            }


            //delete category 
            const deleteCategory = async () =>{
                const  dataToSend ={productId:productIdToDelete ,language:langCtx.language};
                    try{
                        const response = await authCtx.jwtInst({
                            method:"post",
                            url:`${authCtx.defaultTargetApi}/product/deleteProduct`,
                            data:dataToSend,
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const data =  response; 
                        setSuccessOpenToast(true);
                        setSuccessMsgToast(await data.data);
                        setShowDeleteModal(false);
                        const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
                        setListRefresh(Math.random());                      
                    }catch(error){
                        setFailedOpenToast(true);
                        setFailedMsgToast(error.response.data);
                        const closingFailedMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
                    }
            }


        //search category
        const searchInProducts = async () =>{
            const  dataToSend ={searching:searchInProductText , language:langCtx.language};
                try{
                    const response = await authCtx.jwtInst({
                        method:"post",
                        url:`${authCtx.defaultTargetApi}/product/searchInProduct`,
                        data:dataToSend,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const data = await response.data; 
                    setSearchInProductData([...data]);
                    setSearchLoading(false); 
                }catch(error){


                }
        }

        useEffect(() => {
            if(searchInProductText !== ''){
                setSearchLoading(true); 
            }
            let categorySearchTimeOut = setTimeout(()=>{
                searchInProducts();
            }, 1000)
            return () => {
                clearTimeout(categorySearchTimeOut);
            }
        }, [searchInProductText]);
        
        useEffect(() => {

            searchInProducts();
        }, [listRefresh]);

        // //update product
        // const updateProduct = async (id , value) =>{
        //     const  categoryData ={id:id , value:value };
        //         try{
        //             const response = await axios({
        //                 method:"post",
        //                 url:"http://localhost:3001/tagAndCategory/updateCategory",
        //                 data:categoryData,
        //                 config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
        //             })
        //             const data = await response.data; 
        //             setSuccessOpenToast(true);
        //             setSuccessMsgToast('ویرایش انجام شد');
        //             const closingSuccessMsgTimeOut = setTimeout(()=>{setSuccessOpenToast(false)}, 3000);
        //             setListRefresh(Math.random());
        //         }catch(error){
        //             setFailedOpenToast(true);
        //             setFailedMsgToast(error.response.data);
        //             const closingSuccessMsgTimeOut = setTimeout(()=>{setFailedOpenToast(false)}, 3000);
        //         }
        // }



    //------------------------------listners------------------------------

    const showMore =()=>{
        setLimit(limit + 10);
       history.push(`products?limit=${limit}`); 
    }



        //open and close Modal of delete btn
        const openModalByDeleteBtn =(e)=>{
            setShowDeleteModal(true);
            setProductIdToDelete(e.currentTarget.value);
        }
    //------------------------------useEffect------------------------------
    
    useEffect(() => {
        getAllProducts();
    }, [listRefresh , limit , langCtx.language]);
    return(
        <Fragment>
            {/* Modal */}
            <Modal  delete={deleteCategory} closeModalFn={()=>{setShowDeleteModal(false)}} showModal={showDeleteModal}></Modal>
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
                                               <NormalHeader fontFamily='Dana1' fontSize='27px' color='#354063'  header='گالری زنده'></NormalHeader>
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
                                <div>
                                {/* search in categories */}
                                <Row dir="rtl">
                                    <div className={Style.toolBarDiv}>
                                        <div className={Style.leftToolBarDiv}>
                                           <SearchBar loading={searchLoading} onChange={(e)=>{setSearchInProductText(e.target.value)}}></SearchBar>
                                        </div>
                                        <div className={Style.rightToolBarDiv}>
                                            <div className={Style.newPostWithoutBtnDiv}>
                                                    <Link to='/liveGallery/newLiveGallery'><BtnNewThingWithIcon btnName='گالری جدید' paddingTop={'0px'} paddingButtom={'0px'} fontSize={'16px'} paddingRight={'0px'} paddingLeft={'10px'} backgroundColor={'#3C3C3C'} color={'#FFFFFF'} ></BtnNewThingWithIcon></Link>
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
                                    {/* card header */}
                                    <Col xs={12} md={12} lg={12}>
                                        <div className={Style.tagsCardsDiv}>
                                            <Row>
                                                {/* card header */}
                                                {allProductLength !== 0 ? 

                                                <Col  xs={12} md={12} lg={12}>
                                                    <div  className={Style.tagsCardsDiv}>
                                                    {/* card it self */}
                                                    {searchInProductText === '' ?
                                                            <div className={Style.cardDiv}>
                                                                <CpProductsCard stockStatus={stockStatus} priceUpdate={priceUpdate} openModalByDeleteBtn={openModalByDeleteBtn} validationUpdate={validationUpdate}  data={allProducts}></CpProductsCard>
                                                            {allProductLength > 20 ? 
                                                                <Row>  
                                                                    <div  style={{width:'100%' ,marginTop:'10px' , textAlign:'center'}}>
                                                                        <button onClick={showMore} className={Style.showMoreBtn}>نمایش بیشتر</button>
                                                                    </div>
                                                                </Row>
                                                            :
                                                            null
                                                            }
                                                            </div>
                                                            :    
                                                            <div className={Style.cardDiv}>
                                                                {searchInProductText !== '' && searchInProductData.length === 0 ?
                                                                <div style={{marginTop:'90px'}}>
                                                                    <NoDataFigure msg='محصول مورد نظر یافت نشد'></NoDataFigure>
                                                                </div>    
                                                            :
                                                                <CpProductsCard stockStatus={stockStatus} priceUpdate={priceUpdate} openModalByDeleteBtn={openModalByDeleteBtn} validationUpdate={validationUpdate}  data={searchInProductData}></CpProductsCard>
                                                        }
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                    :
                                                    <div style={{marginTop:'90px'}}>
                                                        <NoDataFigure msg='محصولی برای نمایش وجود ندارد'></NoDataFigure>
                                                    </div>           
                                                }
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

        </Fragment>
    )
}

export default LiveGallery;