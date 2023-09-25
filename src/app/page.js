"use client"
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Roboto } from 'next/font/google';
import { React,useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
 
const roboto=Roboto({
  weight:'900',
  subsets:['latin'],
  display:'swap'
})
const robotolight=Roboto({
  weight:'700',
  subsets:['latin'],
  display:'swap'
})


function Login() {
  const router = useRouter()
  const [closeIcon, setCloseIcon] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [msg, setFormStatus] = useState('')
  const [submitBtn, setSubmitBtn] = useState({})
  const submitCloseIcon = ()=>{
    setCloseIcon(false);
  }
  const [inputData, setInputData] = useState({
    email:'',
    password:''
  });
  const handleChange =(event)=> {
    const {name, value} = event.target;
    // console.log('hlo', value)
    setInputData((valuePre)=>{
   return{
     ...valuePre,
     [name]:value
   }
 });

  }
  const submitLogin =(e)=> {
    if(!inputData.email){
      setFormStatus("Email can not be blank.")
      setCloseIcon(true);
    // }else if(!isValidEmail){
    //   setFormStatus("Invalid Email.")
    //   setCloseIcon(true);
  }else if(!inputData.password){
      setFormStatus("Password can not be blank.")
      setCloseIcon(true);  
  }else{
    axios.post(`${process.env.API_BASE_URL}login.php`,inputData,{
      headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
          const data = res.data;
          if(res &&  res.data && res.data.error && res.data.error.length > 0){
              setFormStatus( res.data.error);
              setCloseIcon(true);
          }else{
              if(data){
                  setInputData({
                    email:"",
                    password:""
                  })
                  setFormStatus("");
                  //setCloseIcon(true);
                  setSubmitBtn({
                    padding: '1rem 0rem',
                    display: 'block',
                    color: '#46c737'
                  })
                  if(data.userData){
                      localStorage.clear();
                      localStorage.setItem("companyname", data.userData[0]['companyname']);
                      localStorage.setItem("title", data.userData[0]['title']);
                      localStorage.setItem("name", data.userData[0]['name']);
                      localStorage.setItem("email", data.userData[0]['email']);
                      localStorage.setItem("logo", data.userData[0]['logo']);
                      localStorage.setItem("userid", data.userData[0]['userid']);
                      localStorage.setItem("tokenAuth", data.userData[0]['tokenAuth'].token);
                      localStorage.setItem("image", data.userData[0]['image']); 
                      localStorage.setItem("type", data.userData[0]['type']); 
                      localStorage.setItem("contactno", data.userData[0]['contactno']);
                      localStorage.setItem("about", data.userData[0]['about']);  
                      localStorage.setItem("location", data.userData[0]['location']);
                      router.push('/dashboard')
                  }
                }
          }

    })
    .catch(err => {
     })
  }
}

  return (
<>
<Head>
</Head>

  <div className="container">
     <div className="row">
        <div className="col-md-12">
           <div className="login-form ">
             <form  className="login ">
             <div className="col-md-12">
                        {closeIcon  ?<span style={submitBtn}>{msg}  <span onClick={submitCloseIcon}><i className="fa fa-times" aria-hidden="true"></i></span></span>: ""}
             </div>
                <h1 className={roboto.className}>Log In To LMS</h1> 
                <input type="text" placeholder="User Name"  name="email" value={inputData.email} onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" value={inputData.password} onChange={handleChange} />
                <button className={robotolight.className} type="button" onClick={()=>{
                  submitLogin()
                }}>Log In</button>
              </form>
            </div>  
        </div>
     </div>
    </div>
</>

  );
}

export default Login;

