import { Fragment, useState , useEffect , useContext } from "react";
import Style from './cpProductListPage.module.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams , useLocation } from "react-router-dom";
import axios from "axios";
import SearchBarV2 from "../tools/searchBarV2";
import { FileUploader } from "react-drag-drop-files";
    import {Pagination,Navbar,Row  , Nav ,NavDropdown , Container ,Form ,FormControl ,Button, Col} from 'react-bootstrap';
//components
import ProductCard from "../tools/productCard";
import Pag from "../tools/pagination";
import Loader from "../tools/loader";
import NoDataFigure from "../tools/noDataFigure";
import AuthContext from "../../store/auth";
import Language from "../../store/language";


const CpProductListPage = () =>{
    //hooks
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const authCtx = useContext(AuthContext);
    const langCtx = useContext(Language)
    const params = useParams();
    useEffect(() => {
        document.title = queryParams.get('title');

    }, []);
    //----------------------------------states--------------------------------------
    const [maxPage , setMaxPage] = useState();
    const [currentPage , setCurrentPage] = useState();
    const [totalPage , setTotalPage] = useState();
    const [nextPage , setNextPage] = useState();
    const [prevPage , setPrevPage] = useState();
    const [maxPageSearch , setMaxPageSearch] = useState();
    const [currentPageSearch , setCurrentPageSearch] = useState();
    const [totalPageSearch , setTotalPageSearch] = useState();
    const [nextPageSearch , setNextPageSearch] = useState();
    const [prevPageSearch , setPrevPageSearch] = useState();
    const [itemsSearch , setItemsSearch] = useState([]);
    const [products , setProducts] = useState([]);
    const [items , setItems] = useState([]);
    const [searchLoading , setSearchLoading] = useState(false);
    const [searchText , setSearchText] = useState('');
    const [searchData , setSearchData] = useState([]);
    const [pageLoading , setPageLoading] = useState(true);

        
    //----------------------------------http req--------------------------------------
        
            // get products
            const getProducts = async() =>{
                if(queryParams.get('state') === 'category'){
                try{
                        setPageLoading(true);
                        const response = await authCtx.jwtInst({
                            method: 'get',
                            params:{language:langCtx.language},
                            url: `${authCtx.defaultTargetApi}/product/productListByCategory?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=20&id=${queryParams.get('id')}`,
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
                }catch(error){
                    console.log(error);
                }
                 }else if(queryParams.get('state') === 'tag'){
                    try{
                            setPageLoading(true);
                            const response = await authCtx.jwtInst({
                                method: 'get',
                                params:{language:langCtx.language},
                                url: `${authCtx.defaultTargetApi}/product/productListByTag?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=20&id=${queryParams.get('id')}`,
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

                    }catch(error){
                        console.log(error);
                    }
                 }
            }
            // search product
            const searchProducts = async() =>{
                if(queryParams.get('state') === 'category'){
                    try{
                        const response = await authCtx.jwtInst({
                            method: 'get',
                            url: `${authCtx.defaultTargetApi}/product/productListByCategorySearch?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=20&id=${queryParams.get('id')}`,
                            params:{title:searchText , language:langCtx.language},
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const recivedData = response;
                        if(recivedData.data.now.total<9){
                            setMaxPageSearch(recivedData.data.now.total);
                        }else{
                            setMaxPageSearch(9);
                        }
                        setCurrentPageSearch(recivedData.data.now.page);
                        setTotalPageSearch(recivedData.data.now.total);
                        if(recivedData.data.previous !== undefined){
                            setPrevPageSearch(recivedData.data.previous.page);
                        }
                        if(recivedData.data.next !== undefined){
                            setNextPageSearch(recivedData.data.next.page);
                        }
                        setSearchData(recivedData.data.results);
                        setSearchLoading(false);
                    }catch(error){
            
                    }
                }else if(queryParams.get('state') === 'tag'){
                    try{
                        const response = await authCtx.jwtInst({
                            method: 'get',
                            url: `${authCtx.defaultTargetApi}/product/productListByTagSearch?page=${queryParams.get('page') === null ? '1' : queryParams.get('page')}&limit=20&id=${queryParams.get('id')}`,
                            params:{title:searchText , language:langCtx.language},
                            config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }}
                        })
                        const recivedData = response;
                        if(recivedData.data.now.total<9){
                            setMaxPageSearch(recivedData.data.now.total);
                        }else{
                            setMaxPageSearch(9);
                        }
                        setCurrentPageSearch(recivedData.data.now.page);
                        setTotalPageSearch(recivedData.data.now.total);
                        if(recivedData.data.previous !== undefined){
                            setPrevPageSearch(recivedData.data.previous.page);
                        }
                        if(recivedData.data.next !== undefined){
                            setNextPageSearch(recivedData.data.next.page);
                        }
                        setSearchData(recivedData.data.results);
                        setSearchLoading(false);
                    }catch(error){
            
                    }
                }

            }

            useEffect(() => {
                if(searchText !== ''){
                    setSearchLoading(true); 
                }
                let categorySearchTimeOut = setTimeout(()=>{
                    searchProducts();
                    const half =Math.round(maxPageSearch/2);
                    let to = maxPageSearch;
                    if(currentPageSearch + half >= totalPageSearch){
                        to = totalPageSearch;
                    }else if(currentPageSearch > half){
                        to = currentPageSearch + half;
                    }
                    let from = to - maxPageSearch;
                    setItemsSearch(Array.from({length:maxPageSearch},(_,i) => (i+1) + from));
                }, 1000)
                return () => {
                    clearTimeout(categorySearchTimeOut);
                }
            }, [searchText , currentPageSearch]);
        

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
        }, [currentPage]);
   

        //----------------------------------listners--------------------------------------
        const currentPageClick = (event) =>{
            setCurrentPage(event.target.value);
            history.push(`/cp/categories/productList?page=${event.target.value}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}`);
        }
        const nextP = () =>{
            if(nextPage !== undefined){
                setCurrentPage(nextPage);
                history.push(`/cp/categories/productList?page=${nextPage}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}`);
            }
        }
        const prevP = () =>{
            if(prevPage !== undefined){
                setCurrentPage(prevPage);
                history.push(`/cp/categories/productList?page=${prevPage}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}`);
            }
        }

        //search
        const currentPageClickSearch = (event) =>{
            setCurrentPageSearch(event.target.value);
            history.push(`/cp/categories/productList?page=${event.target.value}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}`);
        }
        const nextPSearch = () =>{
            if(nextPage !== undefined){
                setCurrentPageSearch(nextPageSearch);
                history.push(`/cp/categories/productList?page=${nextPageSearch}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}`);
            }
        }
        const prevPSearch = () =>{
            if(prevPage !== undefined){
                setCurrentPageSearch(prevPageSearch);
                history.push(`/cp/categories/productList?page=${prevPageSearch}&id=${queryParams.get('id')}&title=${queryParams.get('title')}&state=${queryParams.get('state')}`);
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
                                    <SearchBarV2 loading={searchLoading} onChange={(e)=>{setSearchText(e.target.value)}}></SearchBarV2>
                                </Nav>
                                </Container>
                            </Navbar>
                        </div>
                        {searchText === '' ?
                            <div className={Style.wapper}>
                                <Row dir="rtl">
                                    {products.map((data , i) =>{
                                        return(
                                            <Col key={i} style={{padding:'0px 5px 18px 5px'}} xs={6} md={4} lg={4} xl={4} xxl={3}>
                                                <ProductCard data={data}></ProductCard>
                                            </Col>
                                        )

                                    })}
                                </Row>
                                <div>
                                    {totalPage !== 1?
                                    <Pag items={items}  prevPage={prevP} nextPage={nextP} setCurrent={currentPageClick} max={maxPage} current={currentPage} total={totalPage} ></Pag>
                                    :
                                    null  
                                    }
                                </div>
                            </div>
                          :searchText !== '' ?
                            <div className={Style.wapper}>
                                <Row dir="rtl">
                                    {searchData.length !== 0 ? searchData.map((data , i) =>{
                                        return(
                                            <Col key={i} style={{padding:'0px 5px 18px 5px'}} xs={6} md={4} lg={4} xl={4} xxl={3}>
                                                <ProductCard data={data}></ProductCard>
                                            </Col>
                                        )

                                    
                                
                                }):searchData.length === 0 ?                           
                                    <div style={{marginTop:'15%' , marginRight:'35px'}}>
                                        <NoDataFigure msg='محصولی یافت نشد'></NoDataFigure>
                                    </div>
                                  :null}
                                </Row>
                                <div>
                                    {totalPageSearch > 1?
                                    <Pag items={itemsSearch}  prevPage={prevPSearch} nextPage={nextPSearch} setCurrent={currentPageClickSearch} max={maxPageSearch} current={currentPageSearch} total={totalPageSearch} ></Pag>
                                    :
                                    null  
                                    }
                                </div>
                            </div>

                        :null}   

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
