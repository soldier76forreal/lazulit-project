//pages
import TagsAndCategories from './components/controlPanel/tagsAndCategories';
import ProductsList from './components/controlPanel/productsList';
import CpSideBar from './components/controlPanel/specialTools/cpSideBar';
import NewProduct from './components/controlPanel/newProduct';
import CpProductShowCase from './components/controlPanel/cpProductShowCase';
import CpUploadCenter from './components/controlPanel/cpUploadCenter';
//modules
import {Route , Switch} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faCheckCircle, faUpload , faTimes , faStar ,faSearch , faPlus , faThumbsUp , faChevronLeft ,faChevronRight ,faExclamationCircle , faSignOutAlt , faFile , faUser  , faComments , faTags , faThumbsDown, faReply , faCaretDown , faQuestion , faCheck , faTimesCircle , faThLarge,  faTrashAlt , faEdit, faBars} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
library.add(faTimes , faUpload , faCheckCircle, farStar  , faStar , faSearch , faPlus , faChevronRight , faChevronLeft , faExclamationCircle ,faThumbsUp ,faSignOutAlt, faFile ,faUser, faComments , faTags , faThumbsDown  , faReply ,faCaretDown , faQuestion ,faBars , faThLarge , faCheck ,faTimesCircle , faTrashAlt ,faEdit )



function App() {
  return (
    <div className="container-fluid">
    <div className="row">

      <Switch>
         {/* <Route exact path="/cp"> 
            <SideBar></SideBar>
            <CpMain></CpMain>
         </Route>
         <Route exact path="/cp/tags"> 
            <SideBar></SideBar>
            <Tags></Tags>
         </Route>
         <Route exact path="/cp/newPost"> 
            <SideBar></SideBar>
            <NewPostBlog></NewPostBlog>
         </Route>
         <Route path="/blog" exact>
         <Navigation></Navigation>
           <IntroTiles></IntroTiles>
           <Post></Post>
         </Route> */}
         <Route exact path="/cp/cpProductShowCase"> 
            <CpProductShowCase></CpProductShowCase>
         </Route>
         <Route exact path="/cp/cpUploadCenter"> 
            <CpSideBar></CpSideBar>
            <CpUploadCenter></CpUploadCenter>
         </Route>
         <Route exact path="/cp/newProduct"> 
            <CpSideBar></CpSideBar>
            <NewProduct></NewProduct>
         </Route>
         <Route exact path="/cp/products"> 
            <CpSideBar></CpSideBar>
            <ProductsList></ProductsList>
         </Route>
         <Route exact path="/cp/tagsAndCategories"> 
            <CpSideBar></CpSideBar>
            <TagsAndCategories></TagsAndCategories>
         </Route>
      </Switch>
      
    </div>
   </div>
  )
}

export default App;
