import { Fragment, useState , useEffect , useContext } from "react";
import Style from './cpProductListPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams , useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "../tools/searchBar";
import { FileUploader } from "react-drag-drop-files";
import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import ProductCard from "../tools/productCard";
import Pag from "../tools/pagination";
import Loader from "../tools/loader";
import NoDataFigure from "../tools/noDataFigure";
import AuthContext from "../../store/auth";


const CpProductListPage = () =>{
    //hooks
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const params = useParams();
    useEffect(() => {
        document.title = "محصول جدید";
    }, []);
    //----------------------------------states--------------------------------------
    const [maxPage , setMaxPage] = useState();
    const [currentPage , setCurrentPage] = useState();
    const [totalPage , setTotalPage] = useState();
    const [nextPage , setNextPage] = useState();
    const [prevPage , setPrevPage] = useState();

    const [products , setProducts] = useState([]);

    const [items , setItems] = useState([]);


    const [pageLoading , setPageLoading] = useState(true);
    //----------------------------------http req--------------------------------------
        // get products
            const getProducts = async() =>{
                try{
                    setPageLoading(true);
                    const response = await axios({
                        method: 'get',
                        url: `${authCtx.defaultTargetApi}/product/productListByCategory?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=10&id=${queryParams.get('id')}`,
                        config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                    })
                    const recivedData = response;
                    if(recivedData.data.now.total<9){
                        setMaxPage(recivedData.data.now.total);
                    }else{
                        setMaxPage(9);
                    }
                    setCurrentPage(recivedData.data.now.page);
                    setTotalPage(recivedData.data.now.total);
                    if(recivedData.data.previous !== undefined){
                        setPrevPage(recivedData.data.previous.page);
                    }
                    if(recivedData.data.next !== undefined){
                        setNextPage(recivedData.data.next.page);
                    }
                    setPageLoading(false);
                    setProducts(recivedData.data.results);
                    console.log(recivedData)
                }catch(error){
        
                }
            }
            
            useEffect(() => {
                getProducts();
        
                const half =Math.round(maxPage/2);
                let to = maxPage;
                if(currentPage + half >= totalPage){
                    to = totalPage;
                }else if(currentPage > half){
                    to = currentPage + half;
                }
                let from = to - maxPage;
                setItems(Array.from({length:maxPage},(_,i) => (i+1) + from));
        console.log(maxPage);
        }, [currentPage]);
   

        //----------------------------------listners--------------------------------------
        const currentPageClick = (event) =>{
            setCurrentPage(event.target.value);
            history.push(`/cp/categories/productList?page=${event.target.value}&id=${queryParams.get('id')}&title=${queryParams.get('title')}`);
        }
        const nextP = () =>{
            if(nextPage !== undefined){
                setCurrentPage(nextPage);
                history.push(`/cp/categories/productList?page=${nextPage}&id=${queryParams.get('id')}&title=${queryParams.get('title')}`);
            }
        }
        const prevP = () =>{
            if(prevPage !== undefined){
                setCurrentPage(prevPage);
                history.push(`/cp/categories/productList?page=${prevPage}&id=${queryParams.get('id')}&title=${queryParams.get('title')}`);
            }
        }



        if(pageLoading === true){
            return(           
                <div className={Style.loaderDiv} >
                        <Loader marginBottom={'2px'} borderTop={'4px solid #fff'} border={'#1043A9 4px solid'} width={'60px'} height={'60px'}></Loader>
                </div>
            )
        }else if(pageLoading === false && products.length !== 0){
            return(
                <Fragment>
                    <Container  style={{padding:'0px'}}>
                        <div className={Style.navigation}>    
                            <Navbar  dir="rtl"  bg="light" variant="light">
                                <Container>
                                <Navbar.Brand href="#home">{queryParams.get('title')}</Navbar.Brand>
                                <Nav className="me-right">
                                    {/* <Nav.Link href="#home">Home</Nav.Link>
                                    <Nav.Link href="#features">Features</Nav.Link> */}
                                    <SearchBar></SearchBar>
                                </Nav>
                                </Container>
                            </Navbar>
                        </div>
                        <div dir="rtl" className={Style.wapper}>
                            <Row>
                                {products.map((data , i) =>{
                                    return(
                                        <Col key={i} style={{padding:'0px 5px 18px 5px'}} xs={6} md={4} lg={4} xl={4} xxl={3}>
                                            <ProductCard data={data}></ProductCard>
                                        </Col>
                                    )

                                })}
                            </Row>
                        </div>
                        <div>
                            {totalPage !== 1?
                              <Pag items={items}  prevPage={prevP} nextPage={nextP} setCurrent={currentPageClick} max={maxPage} current={currentPage} total={totalPage} getProducts={getProducts} ></Pag>
                              :
                              null  
                            }
                        </div>
                    </Container>
                </Fragment>
            ) 
        }else{
            return(
                <div style={{ position:'absolute' , top:'30%'}}>
                    <NoDataFigure msg='محصولی وجود ندارد'></NoDataFigure>
                </div>
            )
        }
    
}
export default CpProductListPage;
