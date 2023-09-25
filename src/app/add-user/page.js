"use client"
import Sidebaar from '../template/Sidebaar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { React,useState,useEffect  } from 'react';
import $ from "jquery";
import Header from '../template/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const AddUser=()=>{
   const [msg, setFormStatus] = useState('')
   const [submitBtn, setSubmitBtn] = useState({})
   const [closeIcon, setCloseIcon] = useState(false)
   const [isValidEmail, setIsValidEmail] = useState(false)
   const [showManager, setShowManager] = useState(false)

   const [inputData, setInputData] = useState({
      companyname : '',
      title : '',
      name : '',
      email : '',
      mangerId: '',
      contactno : '',
      about : '',
      location : '',
      type : '',
      updatedBy : '',
      userid :''
  });
  const [profileData, setProfileData] = useState({
   companyname : '',
   title : '',
   name : '',
   email : '',
   mangerId: '',
   contactno : '',
   about : '',
   location : '',
   image : '',
   logo : '',
   type:'',
   updatedBy : '',
   userid : ''
});
   const inputChangeData =(event)=> {
   const {name, value} = event.target;
   if(name && name=="type" && value && value =="user"){
     setShowManager(true);
   }else if(name && name=="type" && (!value || value !="user")){
     setShowManager(false);
   }
   setInputData((valuePre)=>{
   return{
     ...valuePre,
     [name]:value
   }
 });
   }
const sideCanvasActive= () =>{ 
    $(".expovent__sidebar").removeClass("collapsed");
    $(".expovent__sidebar").removeClass("open");
    $(".app__offcanvas-overlay").removeClass("overlay-open");
}
const onSubmit = (e) => {
   e.preventDefault()
   setSubmitBtn({
     padding: '1rem 0rem',
     display: 'block',
     color: 'red'
   });
   if(inputData && inputData.email){
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     setIsValidEmail(emailRegex.test(inputData.email));
 
   }
   if(!inputData.name){
     setFormStatus("Name can not be blank.")
     setCloseIcon(true);
  
   // }else if(inputData.type && inputData.type == 'user' && !inputData.mangerId){
   //   setFormStatus("Please select manager.")
   //   setCloseIcon(true);         
   }else if(!inputData.email){
     setFormStatus("Email can not be blank.")
     setCloseIcon(true);  
   }else if(!inputData.type){
      setFormStatus("Please select user role.")
      setCloseIcon(true); 
   // }else if(!inputData.companyname){
   //   setFormStatus("Company Name can not be blank.")
   //   setCloseIcon(true);  
   // }else if(!inputData.contactno){
   //   setFormStatus("Phone Number can not be blank.")
   //   setCloseIcon(true);  
   }else if(!inputData.password){
     setFormStatus("Password can not be blank.")
     setCloseIcon(true);                                  
   }else{
     inputData.userid = profileData && profileData.userid ? profileData.userid : '';
     inputData.updatedBy = profileData && profileData.updatedBy ? profileData.updatedBy : '' 
     axios.post(`${process.env.API_BASE_URL}adduser.php`,inputData,{
       headers: {
       'Content-Type': 'multipart/form-data'
     }
   })
       .then(res => {
           const data = res.data;
           if(res &&  res.data && res.data.error && res.data.error.length > 0){
               setFormStatus(res.data.error);
               setCloseIcon(true);
           }else if(res &&  res.data && res.data.msg && res.data.msg.length > 0){
                   //Router.push('/thankyou')
                   setFormStatus("User added successfully.");
                   //localStorage.clear();
                   setInputData({
                     companyname : '',
                     name : '',
                     email : '',
                     mangerId:'',
                     contactno : '',
                     type:'',
                     password : ''
                 });

                   setCloseIcon(true);
                   setSubmitBtn({
                     padding: '1rem 0rem',
                     display: 'block',
                     color: '#46c737'
                   })
                 }
 
     })
     .catch(err => {
      })
   }
 }
 useEffect(() => {
   // if(localStorage.title && localStorage.email && localStorage.logo && localStorage.companyname && localStorage.userid && localStorage.name){
   //     setProfileData({
   //         companyname : localStorage.companyname,
   //         title : localStorage.title,
   //         name : localStorage.name,
   //         email : localStorage.email,
   //         contactno : localStorage.contactno ? localStorage.contactno : '',
   //         about : localStorage.about ? localStorage.about : '',
   //         location : localStorage.location ? localStorage.location : '',
   //         image : localStorage.image ? localStorage.image : '',
   //         logo : localStorage.logo,
   //         updatedBy : localStorage && localStorage.tokenAuth ? localStorage.tokenAuth : '',
   //         userid : localStorage.userid
   //     });
   // }
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
                                            <li><span><a href="#">Home</a></span></li>
                                            <li className="active"><span>Add User</span></li>
                                        </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                     <div className='col-md-12'>
                        {msg}
                     </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                         <div className='add-more-form'>
                             <form onSubmit={onSubmit}>
                                <div className='row'>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Name*</level>
                                         <input type='text' placeholder='Name*'  onChange={inputChangeData} name="name" value={inputData.name}/>
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Email*</level>
                                         <input type='text' placeholder='Email*'  onChange={inputChangeData} name="email" value={inputData.email}/>
                                      </div>
                                   </div>
                                   
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Password*</level>
                                         <input type='password' placeholder='Password*'  onChange={inputChangeData} name="password" value={inputData.password}/>
                                      </div>
                                   </div>
                                   {/* <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Confirm Password*</level>
                                         <input type='password' placeholder='Confirm Password*'/>
                                      </div>
                                   </div> */}
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <level>Role*</level>
                                         <select onChange={inputChangeData} name="type">
                                            <option value="">Select</option>
                                            <option value="User">User</option>
                                            <option value="Manager">Manager</option>
                                         </select>
                                         {/* <input type='text' placeholder='Role*'/> */}
                                      </div>
                                   </div>
                                   <div className='col-md-6'>
                                      <div className='form-group'>
                                         <button>Save</button>
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
export default AddUser