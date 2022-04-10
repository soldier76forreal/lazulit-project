import {React , useContext , useState} from 'react';

//pages
import TagsAndCategories from './components/controlPanel/tagsAndCategories';
import ProductsList from './components/controlPanel/productsList';
import CpSideBar from './components/controlPanel/specialTools/cpSideBar';
import NewProduct from './components/controlPanel/newProduct';
import CpProductShowCase from './components/controlPanel/cpProductShowCase';
import CpUploadCenter from './components/controlPanel/cpUploadCenter';
import CpOprators from './components/controlPanel/cpOprators';
import LogIn from './components/tools/auth/login';
import SignUp from './components/tools/auth/signup';
import CpProductListPage from './components/controlPanel/cpProductListPage';
import AuthContext from './store/auth';
import CpUser from './components/controlPanel/cpUsers';
import Comments from './components/controlPanel/cpComments';

//modules
import {Route , Switch , Redirect} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCheckCircle, faUpload , faTimes , faStar ,faSearch , faPlus , faThumbsUp , faChevronLeft ,faChevronRight ,faExclamationCircle , faSignOutAlt , faFile , faUser  , faComments , faTags , faThumbsDown, faReply , faCaretDown , faQuestion , faCheck , faTimesCircle , faThLarge,  faTrashAlt , faEdit, faBars , faHeadset} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import CpEditProduct from './components/controlPanel/cpEditProduct';
import jwtDecode from 'jwt-decode';
library.add(faTimes , faUpload , faCheckCircle, farStar  , faStar , faSearch , faPlus , faChevronRight , faChevronLeft , faExclamationCircle ,faThumbsUp ,faSignOutAlt, faFile ,faUser, faComments , faTags , faThumbsDown  , faReply ,faCaretDown , faQuestion ,faBars , faThLarge , faCheck ,faTimesCircle , faTrashAlt ,faEdit , faHeadset )



function App() {
   const authCtx = useContext(AuthContext);

   return (
 
     <div className="container-fluid">
      <div className="row"> 

         {authCtx.isLoggedIn !== true ?
            <Route exact path="/logIn">
               <LogIn></LogIn>
            </Route>
           :null }
        <Switch>

        {authCtx.isLoggedIn === true?
         <Route path="/signup" exact>
            <SignUp></SignUp>
         </Route>
            :<Redirect to='/logIn'/>}
          {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/cpUploadCenter"> 
               <CpSideBar></CpSideBar>
               <CpUploadCenter></CpUploadCenter>
            </Route>
          :<Redirect to='/logIn'/>}

          {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/users"> 
               <CpSideBar></CpSideBar>
               <CpUser></CpUser>
            </Route>
          :<Redirect to='/logIn'/>}
         

         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/categories/productList"> 
               <CpSideBar></CpSideBar>
               <CpProductListPage></CpProductListPage>
            </Route>
          :<Redirect to='/logIn'/>}

         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/categories/productList/productShowCase/:productId"> 
               <CpProductShowCase></CpProductShowCase>
            </Route>
          :<Redirect to='/logIn'/>}
         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/tags/productList/productShowCase"> 
               <CpProductShowCase></CpProductShowCase>
            </Route>
          :<Redirect to='/logIn'/>}
         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/products/editProduct/:productId"> 
               <CpSideBar></CpSideBar>
               <CpEditProduct></CpEditProduct>
            </Route>
          :<Redirect to='/logIn'/>}
         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/products/newProduct/productShowCase/:productId"> 
               <CpProductShowCase></CpProductShowCase>
            </Route>
          :<Redirect to='/logIn'/>}

         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/products/productShowCase/:productId"> 
               <CpProductShowCase></CpProductShowCase>
            </Route>
          :<Redirect to='/logIn'/>}

         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/comments"> 
               <CpSideBar></CpSideBar>
               <Comments></Comments>
            </Route>
          :<Redirect to='/logIn'/>}

         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/products/newProduct"> 
               <CpSideBar></CpSideBar>
               <NewProduct></NewProduct>
            </Route>
          :<Redirect to='/logIn'/>}
         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/products"> 
               <CpSideBar></CpSideBar>
               <ProductsList></ProductsList>
            </Route>
          :<Redirect to='/logIn'/>}
         {authCtx.isLoggedIn === true ?
            <Route exact path="/cp/oprators"> 
               <CpSideBar></CpSideBar>
               <CpOprators></CpOprators>
            </Route>
          :<Redirect to='/logIn'/>}

         {authCtx.isLoggedIn === true ?
            <Route  path="/cp/tagsAndCategories"> 
               <CpSideBar></CpSideBar>
               <TagsAndCategories></TagsAndCategories>
            </Route>
          :<Redirect to='/logIn'/>}

           <Route to='*'>
             {authCtx.isLoggedIn === true ?
 
             <Redirect to='/cp/products'/>
             :<Redirect to='/logIn'/>}
 
           </Route>
 
 
       </Switch>
      </div>
     </div>
 
   );
 }
 
// function App() {
//    const authCtx = useContext(AuthContext);
//   return (
//     <div className="container-fluid">
//     <div className="row">

//       <Switch>
//          {/* <Route exact path="/cp"> 
//             <SideBar></SideBar>
//             <CpMain></CpMain>
//          </Route>
//          <Route exact path="/cp/tags"> 
//             <SideBar></SideBar>
//             <Tags></Tags>
//          </Route>
//          <Route exact path="/cp/newPost"> 
//             <SideBar></SideBar>
//             <NewPostBlog></NewPostBlog>
//          </Route>
//          <Route path="/blog" exact>
//          <Navigation></Navigation>
//            <IntroTiles></IntroTiles>
//            <Post></Post>
//          </Route> */}
//          {authCtx.isLoggedIn === true ?

//       </Switch>
      
//     </div>
//    </div>
//   )
// }

export default App;
