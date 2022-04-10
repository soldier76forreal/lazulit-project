import { useCKEditor, CKEditor } from 'ckeditor4-react';
import {React , useState , useEffect , useContext} from 'react';
import AuthContext from '../../../store/auth';


const Ck = (props) =>{
    const authCtx = useContext(AuthContext);

    return(

        <CKEditor
        editorUrl={`${authCtx.defaultTargetApi}/ckeditor/ckeditor.js`}
        
        initData={props.data}
        onChange={props.ckEditorFunction}
        
        >
        </CKEditor>
    )

}

export default Ck;
