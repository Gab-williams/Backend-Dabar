import React, {useState} from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Button, PreviewCard } from "../../components/Component";
import { Link } from "react-router-dom";
import axios from 'axios';
const ForgotPassword = () => {
  let original = window.location.origin

  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });
 const [email, Setemail] = useState("")
 const [message, Setmessage] = useState("")
const  handleRedirct = ()=>{
  window.location.href = `${original}/demo9/auth-login`
  }

 const  handleSubmit = (e)=>{
    e.preventDefault();
    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    formData.append('email',  email)
    let url = 'api/reset'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.post(url, formData, headers).then(res=>{
        if(res.data.message){
          Setmessage(res.data.message)
        }
      })
    })
    
  }
  return (
    <>
      <Head title="Forgot-Password" />
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src="https://ik.imagekit.io/jtcvnfckl/logo.png?updatedAt=1708008457511" alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src="https://ik.imagekit.io/jtcvnfckl/logo.png?updatedAt=1708008457511" alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h5">Reset password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {message&& <h2 style={{ textAlign:"center", justifyContent:"center", display:"flex", fontSize:"19px"}}>{message}</h2>}
            <form>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="default-01"
                  value={email}
                  onChange={(e)=>Setemail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <Button color="primary" size="lg" className="btn-block" onClick={(e) => handleSubmit(e)}>
                  Send Reset Link
                </Button>
              </div>
            </form>
            <div className="form-note-s2 text-center pt-4" style={{ cursor:"pointer" }}>
              <a onClick={handleRedirct} >
                <strong onClick={handleRedirct} >Return to login</strong>
              </a>
            </div>
          </PreviewCard>
        </Block>
        <AuthFooter />
    </>
  );
};
export default ForgotPassword;
