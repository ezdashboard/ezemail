"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import $ from "jquery";
import { React,useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Sidebaar from '../template/Sidebaar';
import Header from '../template/Header';
import Link from "next/link"
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';

const Dashbord=()=>{
    const [userType, setUserType] = useState('')
    const [pageList, setPageList] = useState([1,2,3]);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitp, setlimitp] =useState(5);
    const sideCanvasActive= () =>{ 
        $(".expovent__sidebar").removeClass("collapsed");
        $(".expovent__sidebar").removeClass("open");
        $(".app__offcanvas-overlay").removeClass("overlay-open");
    
    }
    const [sideBarAccess, setSideBarAccess] = useState({
        users: false
    });
    const [leadStoreData, setLeadStoreData] = useState([]);
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }
    const [inputData, setInputData] =useState({
        search:''
    })
    const [msg, setMsg] = useState('');
    const inputChangeData =(event)=> {

     const {name, value} = event.target;
     
     setInputData((valuePre)=>{
     return{
       ...valuePre,
       [name]:value
     }
   });
     }
    const getLeadsData = async (userid) => {
        setMsg("");
        if(userid){
            axios.get(`${process.env.API_BASE_URL}leads.php?updatedBy=${userid}&page=${currentPage}ser=${inputData.search}`)
            .then(res => {
                if(res && res.data && res.data.leadRecordsData && res.data.leadRecordsData.length > 0){
                const data = res.data.leadRecordsData.map((item) => {
                  return {
                    id: item.id,
                    clientName: item.clientName,
                    create_at: item.create_at,
                    leadDate:  item.leadDate,
                    leadGenFor: item.leadGenFor,
                    primaryEmail: item.primaryEmail,
                    secondaryEmail:item.secondaryEmail,
                    websiteUrl:item.websiteUrl,
                    contactNumber:item.contactNumber,
                    industry:item.industry,
                    country:item.country,
                    genratedFrom:item.genratedFrom,
                    leadGenBy: item.leadGenBy,
                    serviceName: item.serviceName
                  }
              }
            )
            
            setLeadStoreData(data);
            }else if(res.data.msg){
                setMsg(res.data.msg)
            }
          })
          .catch(err => {
           })
        }
     } 
        const [userId, seTuserId] = useState(null)
        useEffect(() => {
            if (typeof window !== 'undefined' && window.localStorage) {
               let localType = localStorage.getItem('type');
               let userid = localStorage.getItem('tokenAuth');
               if(userid){
                seTuserId(userid);
                // setTimeout(function() {
                    
                // }, 10000);
                getLeadsData(userid)
               }
               if(localType){
                setUserType(localType)
               }  
            }

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
                                            <li><span><Link href="#">Home</Link></span></li>
                                            <li className="active"><span>Dashboard</span></li>
                                        </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12 col-md-12'>
                            <div className='email-serach-box'>
                              <form  className="serach">
                                <input type="text" placeholder="Email"  onChange={inputChangeData} name="search" value={inputData.search}/>
                                <button type="button" onClick={()=>{
                                    getLeadsData(userId)
                                }}>Search</button>
                                </form>
                              </div>
{                           userType &&   
                                <div className='add-more'>
                                <Link href='/addmore'>Add More</Link>
                              </div>}
                              <div className='lms-table-wrap'>
                               <Table striped bordered hover >
                                <thead>
                                    <tr>
                                    <th>S.N.</th>
                                    <th>Generated By</th>
                                    <th>Generated For</th>
                                    <th>Date</th>
                                    <th>Client Name</th>
                                    <th>Email ID(Primary)</th>
                                    <th>Email ID(Secondary)</th>
                                    <th>Website URL</th>
                                    <th>Contact Number</th>
                                    <th>Service</th>
                                    <th>Industry</th>
                                    <th>Country</th>
                                    <th>Generated From</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {leadStoreData && leadStoreData.length > 0 && leadStoreData.map((lead, l)=>{
                                    return(
                                        <tr key={l}>
                                        <td>{l+1}</td>
                                        <td>{lead.leadGenBy}</td>
                                        <td>{lead.leadGenFor}</td>
                                        <td>{lead.leadDate}</td>
                                        <td>{lead.clientName}</td>
                                        <td>{lead.primaryEmail}</td>
                                        <td>{lead.secondaryEmail}</td>
                                        <td>{lead.websiteUrl}</td>
                                        <td>{lead.contactNumber}</td>
                                        <td>{lead.serviceName}</td>
                                        <td>{lead.industry}</td>
                                        <td>{lead.country}</td>
                                        <td>{lead.genratedFrom}</td>                                    
                                    </tr>
                                    )
                                })}
                               
                                </tbody>
                                </Table>
                                {msg && <p className='nofound'>{msg}</p>}
                              </div>
                              <div className='pagination-wrap'>
                            <div className="pagination-wrap" bis_skin_checked="1">
                              <ul className="pagination">
                                {/* <li className="page-item">
                                  <a className="page-link" role="button" tabindex="0" href="#">1</a>
                                  </li> */}
                                  {/* <li className="page-item active"><span className="page-link">2<span className="visually-hidden">(current)</span></span></li> */}
                                  {pageList.map((data, i)=>{

                              return(
                                <li key={i} onClick={()=>{
                              setCurrentPage(data)}} className={currentPage == data ? 'page-item active' : 'page-item'}>
                                {currentPage != data && <a href="#" className='page-link'>{data}</a>}
                                {currentPage == data && 
                                <span className="page-link">{currentPage}<span className="visually-hidden">(current)</span></span>
                                }
                                </li>
                                          )
                                      })}                            
                                  {/* <li className="page-item"><a className="page-link" role="button" tabindex="0" href="#">3</a></li>
                                  <li className="page-item"><a className="page-link" role="button" tabindex="0" href="#">4</a></li>
                                  <li className="page-item"><a className="page-link" role="button" tabindex="0" href="#">5</a></li> */}
                                  </ul>
                            </div>
                                {/* <Pagination>{items}</Pagination> */}
                            </div>                              
                            {/* <div className='pagination-wrap'>
                                <Pagination>{items}</Pagination>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}
export default Dashbord

