import React ,{useState} from "react";

const ActivePage = React.createContext({
    activePage:"product",
    activePageFnOr:(data) =>{}
});

export const ActivePageProvider = (props) =>{
    const [activePage , setActivePage] = useState('');
    const  activePageFn =  (data) =>{
        setActivePage(data);
    }
    return <ActivePage.Provider value={{activePage:activePage , activePageFnOr:activePageFn}}>{props.children}</ActivePage.Provider>

}
export default ActivePage;