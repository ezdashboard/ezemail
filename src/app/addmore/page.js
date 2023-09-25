"use client"
import Sidebaar from '../template/Sidebaar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect, useState} from 'react'
import $ from "jquery";
import Header from '../template/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Link from 'next/link';

const Addmore=()=>{
   const [sideBarAccess, setSideBarAccess] = useState({
      users: false
   });
   const [userType, setUserType] = useState('')

   const [inputData, setInputData] = useState({
      leadGenBy: null,
      leadGenFor:'',
      leadDate:'',
      clientName:'',
      primaryEmail:'',
      secondaryEmail:'',
      websiteUrl:'',
      contactNumber:'',
      services:'',
      industry:'',
      country:'',
      genratedFrom:''
   })
   const inputChangeData =(event)=> {
      const {name, value} = event.target;
        setInputData((valuePre)=>{
       return{
         ...valuePre,
         [name]:value
       }
      })
   }
   const [serviceStoreData, setServiceStoreData] = useState([]);
   const [countryList, setCountryList] = useState([]);
   const sideCanvasActive= () =>{ 
         $(".expovent__sidebar").removeClass("collapsed");
         $(".expovent__sidebar").removeClass("open");
         $(".app__offcanvas-overlay").removeClass("overlay-open");
   }
   const getServiceData = async () => {
      axios.get(`${process.env.API_BASE_URL}services.php`)
         .then(res => {
            const data = res.data.serviceData.map((item) => {
               return {
                  id: item.id,
                  name: item.service_name,
                  status: item.status
               }
            }
         )
         setServiceStoreData(data);
      })
      .catch(err => {
         })
   }   
   const getCountryData = async () => {
      axios.get(`${process.env.API_BASE_URL}country.php`)
         .then(res => {
            const data = res.data.countryData.map((item) => {
               return {
                  id: item.id,
                  name: item.name,
                  status: item.status
               }
            }
         )
         setCountryList(data);
      })
      .catch(err => {
         })
   }                
   useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
         let localType = localStorage.getItem('type');
         if(localType){
          setUserType(localType)
         }  
      }
   
      }, []);

 return(
    <>
      <div className='page_-full-wrapper'>
           <Sidebaar/>
            <div className="app__offcanvas-overlay" onClick={sideCanvasActive}></div>
              <div className="page__body-wrapper">
               <Header/>
               <div className="app__slide-wrapper">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="breadcrumb__wrapper">
                                <div className="breadcrumb__inner">
                                    <div className="breadcrumb__icon">
                                    <FontAwesomeIcon icon={faHouse}/>
                                    </div>
                                    <div className="breadcrumb__menu">
                                        <nav>
                                        <ul>
                                            <li><span><Link href="#">Home</Link></span></li>
                                            <li className="active"><span>Add More</span></li>
                                        </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                         <div className='add-more-form'>
                             <form>
                                <div className='row'>
                                   {/* <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Lead Generated by</level>
                                         <input type='text' placeholder='Lead Generated by'/>
                                      </div>
                                   </div> */}
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Lead Generated For</level>
                                         <select name="leadGenFor"  onChange={inputChangeData} >
                                            <option value="">Select</option>
                                            <option value="EZ">EZ</option>
                                            <option value="SIO">SIO</option>
                                            <option value="DAR">DAR</option>
                                            <option value="SMCA">SMCA</option>
                                            <option value="IPR">IPR</option>
                                         </select>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Lead Date</level>
                                         <input type='date' placeholder='Lead Date' onChange={inputChangeData} name="leadDate" value={inputData.leadDate}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Client Name</level>
                                         <input type='text' placeholder='Client Name' name="clientName" onChange={inputChangeData} value={inputData.clientName}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Email ID*(Primary)</level>
                                         <input type='text' placeholder='Primary Email ID*' name="primaryEmail" onChange={inputChangeData} value={inputData.primaryEmail}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Email ID(Secondary)</level>
                                         <input type='text' placeholder='Secondary Email ID' name="secondaryEmail" onChange={inputChangeData} value={inputData.secondaryEmail}/>
                                      </div>
                                   </div>                                   
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Website URL</level>
                                         <input type='text' placeholder='Website URL' name="websiteUrl" onChange={inputChangeData} value={inputData.websiteUrl}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Contact Number</level>
                                         <input type='text' placeholder='Contact Number' name="contactNumber" onChange={inputChangeData} value={inputData.contactNumber}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Services</level>
                                         <select name="services"  onChange={inputChangeData} >
                                         <option value="">Select</option>
                                          {serviceStoreData && serviceStoreData.length > 0 && serviceStoreData.map((serv,s)=>{
                                             return(
                                                <option value={serv.id} key={s}>{serv.name}</option>
                                             )
                                          })}
                                         </select>   
                                       </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Industry</level>
                                         <input type='text' placeholder='Industry' name="industry" onChange={inputChangeData} value={inputData.industry}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Country</level>
                                         <select name="country"  onChange={inputChangeData}>
                                                <option value="">Select</option>
                                          {countryList && countryList.length > 0 && countryList.map((coun,c)=>{
                                             return(
                                                <option value={coun.id} key={c}>{coun.name}</option>
                                             )
                                          })}
                                         </select> 
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Generated from Domain/General Ids</level>
                                         <input type='text' placeholder='Generated from Domain/General Ids' onChange={inputChangeData} name="genratedFrom" value={inputData.genratedFrom}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <button type="submit">Save</button>
                                      </div>
                                   </div>
                                </div>
                             </form>
                         </div>
                      </div>
                    </div>
                </div>
              </div>
      </div>
    </>
 )


}
export default Addmore