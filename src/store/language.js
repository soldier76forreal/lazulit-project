import Cookies from "js-cookie";
import React ,{useState} from "react";

const Language = React.createContext({
    language:"",
    activePageFnOr:(data) =>{}
});

export const LanguageProvider = (props) =>{
    const [activeLanguage , setActiveLanguage] = useState(Cookies.get('currentLang'));
    if(Cookies.get('currentLang') === undefined){
        Cookies.set("currentLang" , 'arabic' ,{sameSite: 'strict', secure: true});
        setActiveLanguage('arabic')   
     }
    const  activeLang =  (data) =>{
        setActiveLanguage(data);
    }
    return <Language.Provider value={{language:activeLanguage , activeLangFn:activeLang}}>{props.children}</Language.Provider>

}
export default Language;