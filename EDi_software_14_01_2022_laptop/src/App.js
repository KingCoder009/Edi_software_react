import React from 'react';
import './App.css';
import './tailwind.css';
import {BrowserRouter as Router,Route,Switch}from 'react-router-dom';
import CountryComponent from './components/master/CountryComponent';
import LoginComponent from './components/master/LoginComponent';
import StateComponent from './components/master/StateComponent';
import Sidebar from './components/menus/Sidebar';
import MawbInvoice from './components/operation/MawbInvoice';
import EDI_DOCUMENTS from './components/reports/EDI_DOCUMENTS';
import ClearanceLocetion from './components/master/ClearanceLocetion';
import OrignCargo from './components/master/OriginCargo';
import ParentOriginCustomer from './components/master/ParentOriginCustomer';
import ClearanceOrgs from './components/master/ClearanceOrgs'
import Company from './components/master/Company';
import Designetion from './components/master/Designetion';
import Department from './components/master/Department';
import Employee from './components/master/Employee';
import TransitType from './components/master/TransitType';
import ShipmentCompany from './components/master/ShipmentCompany';
import IGMgenaretion from './components/operation/IGMgenaretion';
import InvoiceEntryUpdetion from './components/operation/InvoiceEntryUpdetion';
import DataCorrection from './components/operation/DataCorrection'
import ItemValue from './components/master/ItemValue';
import SenderRecever from './components/Kyc/SenderRecever';
import ClearanceDacument from './components/reports/ClearanceDacument';

        function App() {
                return (
                  <div >
                  <Router basename={'/ediimports'}>
                  <div >
                    <Switch>
                      <Route path="/" exact component={LoginComponent} ></Route>
                      <Route path="/home" component={Sidebar} ></Route>
                      {/* Master service */}
                      <Route path="/master/delivery_state_setails" exact component={StateComponent}></Route>
                      <Route path="/master/getcountry" exact component={CountryComponent}></Route>
                      <Route path="/master/clr/loc" exact component={ClearanceLocetion}></Route>
                      <Route path="/master/clr/origin" exact component={OrignCargo}></Route>
                      <Route path="/master/prnt/origin" exact component={ParentOriginCustomer}></Route>
                      <Route path="/master/clr/organizetion" exact component={ClearanceOrgs}></Route>
                      <Route path="/master/company" exact component={Company}></Route>
                      <Route path="/master/designetion" exact component={Designetion}></Route>
                      <Route path="/master/dprtmnt" exact component={Department}></Route>
                      <Route path="/master/employe" exact component={Employee}></Route>
                      <Route path="/master/trnstyp" exact component={TransitType}></Route>
                      <Route path="/master/shpmnt/cmpny" exact component={ShipmentCompany}></Route>
                      <Route path="/master/itemdetails" exact component={ItemValue}></Route>
                      <Route path="/kyc/SenderRecever" exact component={SenderRecever}></Route>
                      {/* /operation service */}
                      <Route path="/operation/mawb_invoice_entry"  component={MawbInvoice} ></Route>
                      <Route path="/operation/igm_genaretion"  component={IGMgenaretion} ></Route>
                      <Route path="/operation/invoic_updetion"  component={InvoiceEntryUpdetion} ></Route>
                      <Route path="/operation/data_crction"  component={DataCorrection} ></Route>
                      {/* report Service */}
                      <Route path="/reports/edi_docs" exact component={EDI_DOCUMENTS}></Route>
                      <Route path="/reports/clr_docs" exact component={ClearanceDacument}></Route>
                   </Switch>
                  </div>
                  </Router>
                  </div>

                       );
                      }

export default App;
