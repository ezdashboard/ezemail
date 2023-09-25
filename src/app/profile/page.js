"use client"
import Sidebaar from '../template/Sidebaar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { React, useState, useEffect } from 'react';
import $ from "jquery";
import Header from '../template/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import MyVerticallyCenteredModal from '../template/ProfileEdit'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Profile=()=>{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [msg, setFormStatus] = useState('')
  const [closeIcon, setCloseIcon] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [submitBtn, setSubmitBtn] = useState({})
  const [modalShow, setModalShow] = useState(false);
  const [inputData, setInputData] = useState({
    companyname : '',
    title : '',
    name : '',
    email : '',
    contactno : '',
    about : '',
    location : '',
    image : '',
    logo : '',
    userid :''
})
  const [profileData, setProfileData] = useState({
    companyname : '',
    title : '',
    name : '',
    email : '',
    contactno : '',
    about : '',
    location : '',
    image : '',
    logo : '',
    userid : ''
});
const [sideBarAccess, setSideBarAccess] = useState({
  users: false
});
const inputChangeData =(event)=> {
  const {name, value} = event.target;
  setInputData((valuePre)=>{
 return{
   ...valuePre,
   [name]:value
 }
})
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
    })
    if(inputData && inputData.email){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(inputData.email));
    }
    if(!inputData.name){
      setFormStatus("Name can not be blank.")
      setCloseIcon(true);
    }else if(!inputData.title){
      setFormStatus("Title can not be blank.")
      setCloseIcon(true);   
    }else{
      inputData.userid = profileData && profileData.userid ? profileData.userid : '';
      axios.post(`${process.env.API_BASE_URL}updateProfile.php`,inputData,{
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
                    setFormStatus("Update Successfully.");
                    //localStorage.clear();
                    // localStorage.setItem('name', inputData.name);
                    // localStorage.setItem('title', inputData.title);
                    // localStorage.setItem('companyname', inputData.companyname);
                    // localStorage.setItem('contactno', inputData.contactno);
                    // localStorage.setItem('about', inputData.about);
                    // localStorage.setItem('location', inputData.location);
                    setProfileData({
                      companyname : inputData.companyname,
                      title : inputData.title,
                      name : inputData.name,     
                      contactno : inputData.contactno ? inputData.contactno : '',
                      about : inputData.about ? inputData.about : '',
                      location : inputData.location ? inputData.location : '',
                      // email : localStorage.email,
                      // image : localStorage.image ? localStorage.image : '',
                      // logo : localStorage.logo?localStorage.logo:'',
                      // userid : localStorage.userid
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
  //   if(localStorage.email && localStorage.userid && localStorage.name){
  //       setProfileData({
  //           companyname : localStorage.companyname,
  //           title : localStorage.title,
  //           name : localStorage.name,
  //           email : localStorage.email,
  //           contactno : localStorage.contactno ? localStorage.contactno : '',
  //           about : localStorage.about ? localStorage.about : '',
  //           location : localStorage.location ? localStorage.location : '',
  //           image : localStorage.image ? localStorage.image : '',
  //           logo : localStorage.logo,
  //           userid : localStorage.userid
  //       });
  //       setInputData({
  //           companyname : localStorage.companyname,
  //           title : localStorage.title,
  //           name : localStorage.name,
  //           email : localStorage.email,
  //           contactno : localStorage.contactno ? localStorage.contactno : '',
  //           about : localStorage.about ? localStorage.about : '',
  //           location : localStorage.location ? localStorage.location : '',
  //           image : localStorage.image ? localStorage.image : '',
  //           logo : localStorage.logo,
  //           userid : localStorage.userid
  //       });
  //   }
  //   if(localStorage && localStorage.length > 0 && localStorage.type && localStorage.type=="admin"){
  //     setSideBarAccess({
  //         users : true
  //     })
  // }
    }, []);
 return(
    <>
         <div className='page_-full-wrapper'>
           <Sidebaar />
            <div className="app__offcanvas-overlay" onClick={sideCanvasActive}>
            </div>
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
                                          <li className="active"><span>Profile</span></li>
                                      </ul>
                                      </nav>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='profile-area'>
                      <div className='body-card-wrapper'>
                        <div className='card-header-top'>
                          <div className='card-title-inner'>
                            <h4>Profile Information</h4>
                          </div>
                        </div>
                        <div className='profile-main-wrapper'>
                          <div className='row'>
                              <div className='col-md-12 '>
                                <div className='profile__left'>
                                  <div className='padding-left-inner'>
                                    <div className='profile-user'>
                                      <Link href='#'  onClick={() => setModalShow(true)}>
                                      <div className='profile-edit'>
                                          <FontAwesomeIcon icon={faPenToSquare} />
                                      </div>
                                      </Link>
                                      <ul>
                                          <li>
                                            <div className='profile-user-item'>
                                                <div className='profile-user-tiitle'>
                                                  <span>Name:</span>
                                                </div>
                                                <div className='profile-user-info'>
                                                  <span>{profileData.name}</span>
                                                </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className='profile-user-item'>
                                                <div className='profile-user-tiitle'>
                                                  <span>Email Address:</span>
                                                </div>
                                                <div className='profile-user-info'>
                                                  <span>{profileData.email}</span>
                                                </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className='profile-user-item'>
                                                <div className='profile-user-tiitle'>
                                                  <span>Phone Number:</span>
                                                </div>
                                                <div className='profile-user-info'>
                                                  <span>{profileData.contactno}</span>
                                                </div>
                                            </div>
                                          </li>
                                      </ul>
                                    </div>
                                    </div>
                                </div>
                              </div>
                              {/* <div className='col-md-7'>
                                <div className='profile-right'>
                                    <Link href='#'>
                                    <div className='profile-edit'>
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    </div>
                                    </Link>
                                    <div className='profile-about-info'>
                                      <span className='profile-title'>About Me</span>
                                      <div className='profile-text'>
                                          <p>When referring to Lorem ipsum, different expressions are used, namely fill text , fictitious text , blind text or placeholder text : in short,
                                            its meaning can also be zero, but its usefulness is so clear as to go through the centuries and resist the ironic and modern versions that came
                                            with the arrival of the web.
                                          </p>
                                      </div>
                                    </div>
                                </div>
                              </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
         <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)
          }
          inputData={inputData}
          inputChangeData={inputChangeData}
          onSubmit={onSubmit}
          msg={msg}

      />
    </>
 )


}
export default Profile