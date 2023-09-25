"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse,faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import $ from "jquery";
import { React,useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebaar from '../template/Sidebaar';
import Header from '../template/Header';
import Link from "next/link"
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

const Users=()=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [limitp, setlimitp] =useState(5);
    const [totalPages, setPageCount] = useState(1);
    const [userStoreData, setUserStoreData] = useState([]);
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
    const sideCanvasActive= () =>{ 
        $(".expovent__sidebar").removeClass("collapsed");
        $(".expovent__sidebar").removeClass("open");
        $(".app__offcanvas-overlay").removeClass("overlay-open");
    
    }
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }
    const fetchData = async (page) => {
        axios.get(`${process.env.API_BASE_URL}users.php?page=${page}&limit=${limitp}&user=${localStorage.userid}`)
          .then(res => {
              const data = res.data.userData.map((item) => {
                return {
                  id: item.userid,
                  name: item.name,
                  email: item.email,
                  contactno: item.contactno,
                  companyname: item.companyname,
                  title: item.title,
                  logo: item.logo,
                  type: item.type,
                  status: item.status == '1' ? 'Active' : 'Inactive',
                  image: item.image
                }
            }
          )
          setUserStoreData(data);
          if(res.data.total){
            setPageCount(res.data.total);
            if(page > 3){
              setPageList([page-3, page-2, page-1])
            }else if(page == 1){
              if(res.data.total > 2){
                setPageList(["1","2","3"]);
              }else if(res.data.total == 2){
                setPageList(["1","2"])
              }else if(res.data.total ==1){
                setPageList(["1"])
              }
            }
          }
          setLoading(true);
        })
        .catch(err => {
         })
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
          //         userid : localStorage.userid
          //     });
          // }
          fetchData(currentPage);
    
          }, [currentPage]);
    return(
        
        <>
         <div className='page_-full-wrapper'>
           <Sidebaar/>
            <div className="app__offcanvas-overlay" onClick={sideCanvasActive}></div>
            <div className="page__body-wrapper">
             <Header />
                <div className="body__overlay"></div>
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
                                            <li className="active"><span>User List</span></li>
                                        </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12 col-md-12'>
                            {/* <div className='email-serach-box'>
                              <form  className="serach">
                                <input type="text" placeholder="Email"  name="email" value=""/>
                                <button type="button">Search</button>
                                </form>
                              </div> */}
                            { 
                             //localStorage && localStorage.type && localStorage.type == 'admin' &&   
                                <div className='add-more'>
                                <Link href='/add-user'>Add User</Link>
                              </div>}
                              <div className='lms-table-wrap'>
                               <Table striped bordered hover >
                                <thead>
                                    <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact No.</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { userStoreData && userStoreData.length > 0 && userStoreData.map((users, u)=>{
                                        return(
                                    <tr key={u}>
                                        <td>{u+1}</td>
                                        <td>{users.name}</td>
                                        <td>{users.email}</td>
                                        <td>{users.contactno}</td>
                                        <td>{users.type}</td>
                                        <td>{users.status}</td>
                                        <td><FontAwesomeIcon icon={faPenToSquare} /></td>
                                    </tr>
                                    )})}
                                </tbody>
                                </Table>
                              </div>
                            <div className='pagination-wrap'>
                                <Pagination>{items}</Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}
export default Users

