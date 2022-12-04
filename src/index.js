import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom';
// import {createRoot} from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import AdCompanyRegister from './components/AdCompanyRegister';
import AdCompanyLogin from './components/AdCompanyLogin';
import AdHome from './components/AdHome'
//import { browserHistory } from "react-router";
import {
    BrowserRouter as Router,
    Routes,
    Link,
    Route,
  } from "react-router-dom";
import FirstPage from './components/FirstPage';
import ListPackages from './components/ListPackages';
import BroadCasterHome from './components/BroadCasterHome';
import ListAdCompany from './components/ListAdCompany'
import ListPurchaseProduct from './components/ListPurchaseProducts'
import ListAdCompanyPurchase from './components/ListAdCompanyPurchase';
import UploadDoc from './components/UploadDoc';
import ListPurchaseProductLog from './components/ListPurchaseProductLog';
import AdSerterHome from './components/AdSerterHome';
import ListLog from './components/ListLog';
import ListLogBroadCaster from './components/ListLogsBroadCaster';
import ListLogAdCompany from './components/ListLogAdCompany';
import Footer from './components/Footer';
//import Test2 from './components/Test2';

 ReactDOM.render(   <React.StrictMode>
    <Router > 
      {/* history={browserHistory} */}
      <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/AdHome" element={ <AdHome/>} />
          <Route path="/AdCompanyLogin" element={<AdCompanyLogin />} />
          <Route path="/AdCompanyRegister" element={<AdCompanyRegister />} />
          <Route path="/ListPackages" element={ <ListPackages/>} />
          <Route path="/ListAdCompanyPurchase" element={ <ListAdCompanyPurchase/>} />
      
          <Route path="/BroadCasterHome" element={ <BroadCasterHome/>} />
          <Route path="/ListPurchaseProduct" element={ <ListPurchaseProduct/>} />
          <Route path="/AddPackages" element={<App/>} />
          
          <Route path="/ListAdCompany" element={ <ListAdCompany/>} />
          <Route path='/ListPurchaseProductLog' element={<ListPurchaseProductLog/>}/>
          <Route path="/AdSerterHome" element={<AdSerterHome/>} />
           <Route path='/UploadDoc' element={<UploadDoc/>}/>
            <Route path='/ListLog' element={<ListLog/>}/> 
            <Route path='/ListLogBroadCaster' element={<ListLogBroadCaster/>}/> 
            <Route path='/ListLogAdCompany' element={<ListLogAdCompany/>}/> 
            <Route path='/Footer' element={<Footer/>}/> 
          
     </Routes>
    </Router>
   </React.StrictMode>
, document.getElementById('root'));
 serviceWorker.unregister();
