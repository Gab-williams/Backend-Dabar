import React, {useEffect, useState} from "react";
import {
  Modal,
  ModalBody,
  Form,
} from "reactstrap";
import {
  Icon,
  Col,
  Button,
  RSelect,
} from "../../../components/Component";
import { AES, enc } from 'crypto-js';
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from 'axios';
const AddModal = ({modal,closeModal,onSubmit, formData, setFormData,filterStatus, setModal}) => {
    useEffect(() => {
        reset(formData)
      }, [formData]);
  const {reset, register,  formState: { errors } } = useForm();
  let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });
  const [firstname, Setfirstname] = useState("")
  const [lastname, Setlastname] = useState("")
  const [email, Setemail] = useState("")
  const [role, Setrole] = useState("")
  const [errorfirstname, Seterrorfirstname] = useState("")
  const [erroremail, Seterroremail] = useState("")
  const [errorlastname, Seterrorlastname] = useState("")
  const [errorrole, Seterrorrole] = useState("")
  const options = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Marketer', label: 'Marketer' },
  ]

  

  const handleSubmit =(e)=>{
    e.preventDefault();

    // if(role != 'Admin' || role != 'admin'){

      let formData = new FormData();
      formData.append('firstname',  firstname)
      formData.append('lastname',  lastname)
      formData.append('email',  email)
      formData.append('role',  role.value)
      let url = 'api/admin/editor_register'
      apiClient.get('/sanctum/csrf-cookie').then(()=>{
        apiClient.post(url, formData, {
          headers:{
            "Authorization":"Bearer "+local.token,
            }
        }).then(res=>{
           if(res.data.success){
            setModal({ edit: false }, { add: false });

           }
        }).catch(err=>{
          let error = err.response.data.errors
          if(error.firstname){
           Seterrorfirstname(error.firstname[0])
          }else if(error.lastname){
            Seterrorlastname(error.lastname[0])
          }else if(error.email){
            Seterroremail(error.email[0])
          }else if(error.role){
            Seterrorrole(error.role[0])
          }
      
        })
      })
    // }else{



    // }
  

  }



  return (

        <Modal isOpen={modal} toggle={() => closeModal()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                closeModal()
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add User </h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate >
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Firstname</label>
                      <input
                        className="form-control"
                        type="text"
                        value={firstname}
                        onChange={(e)=>Setfirstname(e.target.value)}
                        placeholder="Enter name" />
                      {errorfirstname && <span className="invalid">{errorfirstname}</span>}
                    </div>
                  </Col>


                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Lastname</label>
                      <input
                        className="form-control"
                        type="text"
                        value={lastname}
                        onChange={(e)=>Setlastname(e.target.value)}
                        placeholder="Lastname" />
                      {errorlastname && <span className="invalid">{errorlastname}</span>}
                    </div>
                  </Col> 


                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Email </label>
                      <input
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={(e) =>Setemail(e.target.value)}
                        placeholder="Enter email" />
                      {erroremail && <span className="invalid">{erroremail}</span>}
                    </div>
                  </Col>
                  {/*<Col md="6">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        {...register('phone', { required: "This field is required" })}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                         />
                        
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </div>
                  </Col>*/}
                 
                  <Col md="12">
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <div className="form-control-wrap">
                             <div className="form-control-select">
                              <Select options={options} value={role}  onChange={(e)=>Setrole(e)} isMulti={false} classNamePrefix="react-select" className='react-select-container' />
                            </div>
                      </div>
                      {errorrole && <span className="invalid">{errorrole}</span>}
                    </div>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" onClick={(e)=>handleSubmit(e)}>
                          Add User
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            closeModal();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
  );
};
export default AddModal;
