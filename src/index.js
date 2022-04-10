import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {AuthContextProvider} from './store/auth';
import {ActivePageProvider} from './store/activePage';
import { LanguageProvider} from './store/language';

ReactDOM.render(
<AuthContextProvider>
    <ActivePageProvider>
        <LanguageProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </LanguageProvider>
    </ActivePageProvider>
</AuthContextProvider>

, document.getElementById('root'));
