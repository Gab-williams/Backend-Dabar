import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
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
import { Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
const ConfirmVerify = () => {
  const [passState, setPassState] = useState(false);
  const [passStatex, setPassStatex] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register,  formState: { errors } } = useForm();
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`${process.env.PUBLIC_URL}/auth-success`);
    }, 1000);
  };
let original = window.location.origin
  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });

  

  let {email } = useParams();
  const [password, Setpassword] = useState("")
  const [confirm_password, Setconfirm_password] = useState("")
  const [errorpassword, Seterrorpassword] = useState("")
  const [errorconfirm_password, Seterrorconfirm_password] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault();
    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    formData.append('password',  password)
    formData.append('password_confirmation', confirm_password)
    formData.append('email', email)
    formData.append('_method', 'put')
    let urltwo = '/api/resetpassword';
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.post(urltwo, formData, headers).then(res=>{
       if(res.data.success){
        setLoading(false)
        window.location.href = `${original}/demo9/auth-login`;

       }
      }).catch(err=>{
        let error = err.response.data.errors
        if(error.password){
          Seterrorpassword(error.password[0])
        }else if(error.password_confirmation){
          Seterrorpassword(error.password_confirmation[0])
        }

      })

    })
  }


  return <>
    <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>
        <PreviewCard className="" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Register</BlockTitle>
              <BlockDes>
                <p>Create New Dashlite Account</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          <form className="is-alter">
           
           

            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  password
                </label>
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
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errorpassword && <span className="invalid">{errorpassword}</span>}
              </div>
            </div>


            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                 confirm password
                </label>
              </div>
              <div className="form-control-wrap">
              <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassStatex(!passStatex);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passStatex ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passStatex ? "text" : "password"}
                  id="password"
                  value={confirm_password}
                  onChange={(e)=>Setconfirm_password(e.target.value)}
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passStatex ? "is-hidden" : "is-shown"}`} />
                {errorconfirm_password && <span className="invalid">{errorconfirm_password}</span>}
              </div>
            </div>




            
            <div className="form-group">
              <Button type="submit" color="primary" size="lg" className="btn-block" onClick={(e)=>handleSubmit(e)}>
                {loading ? <Spinner size="sm" color="light" /> : "Confirm"}
              </Button>
            </div>
          </form>
          {/* <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account?{" "}
            <Link to={`demo9/auth-login`}>
              <strong>Sign in instead</strong>
            </Link>
          </div> */}
          {/* <div className="text-center pt-4 pb-3">
            <h6 className="overline-title overline-title-sap">
              <span>OR</span>
            </h6>
          </div> */}
          {/* <ul className="nav justify-center gx-8">
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
export default ConfirmVerify;
