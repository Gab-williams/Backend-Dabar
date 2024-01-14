import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { AES, enc } from 'crypto-js';
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("")
  const [emailmessage, Setemailmessage] = useState("")
  const [passwordmessage, Setpasswordmessage] = useState("")


  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true
  });

  // const {  register, handleSubmit, formState: { errors } } = useForm();
   const handleSubmit = (e)=>{
    e.preventDefault();
    setLoading(true)
    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    formData.append('email',  email)
    formData.append('password',  password)
    let url = 'api/admin_login'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.post(url, formData, headers).then(res=>{
        if(res.data.message){
          setLoading(false)
          const encrypt= AES.encrypt(JSON.stringify(res.data.data), 'TheDabar').toString();
          localStorage.setItem('thedabar', encrypt);
          setTimeout(()=>{
                Setemail("")
                Setpassword("")
          },3000)
          window.location.href = `http://localhost:3000/demo9/copywriter`;
        }else{
          setLoading(false)
          // res.data.error
          Setemailmessage(res.data.error)
          Setpasswordmessage(res.data.error)
          setTimeout(()=>{
            Setemailmessage("")
            Setpasswordmessage("")
           },3000)
        }

      }).catch(err=>{
        let error = err.response.data.errors
        if(error.email){
          setLoading(false)
          Setemailmessage(error.email[0])
          setTimeout(()=>{
            Setemailmessage("")
            },3000)
        }else if (error.password){
          setLoading(false)
          Setpasswordmessage(error.password[0])
          setTimeout(()=>{
            Setpasswordmessage("")
            },3000)
        }

      })

    })

   }

  return <>
    <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>

        <PreviewCard className="" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
              <BlockDes>
                <p>Access Dashlite using your email and passcode.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter">
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  value={email}
                  onChange={(e)=>Setemail(e.target.value)}
                  defaultValue="info@softnio.com"
                  placeholder="Enter your email address"
                  className="form-control-lg form-control" />
                 {emailmessage &&<span className="invalid">{emailmessage}</span> }  
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Passcode
                </label>
                <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                  Forgot Code?
                </Link>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                   value={password}
                   onChange={(e)=>Setpassword(e.target.value)}
                  defaultValue="123456"
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                  {passwordmessage&& <span className="invalid">{passwordmessage}</span>}
               
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary" onClick={(e)=>handleSubmit(e)}>
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
          <div className="form-note-s2 text-center pt-4">
            New on our platform? <Link to={`${process.env.PUBLIC_URL}/auth-register`}>Create an account</Link>
          </div>
          <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div>
          {/* <ul className="nav justify-center gx-4">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Facebook
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#socials"
                onClick={(ev) => {
                  ev.preventDefault();
                }}
              >
                Google
              </a>
            </li>
          </ul> */}
        </PreviewCard>
      </Block>
      <AuthFooter />
  </>;
};
export default Login;
