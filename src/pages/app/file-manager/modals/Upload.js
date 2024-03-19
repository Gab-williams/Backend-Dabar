import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Button } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { bytesToMegaBytes } from "../../../../utils/Utils";

import {iconsType} from '../components/Icons';
import axios from 'axios';
import { AES, enc } from 'crypto-js'
const Upload = ({ toggle  }) => {
  
  const [files, setFiles] = useState([]);
  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });

  const Imagekitupload = async (data) => {
    try {
      let local = localStorage.getItem('thedabar') ? JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)) : {};
      
      // Ensure CSRF cookie is set
      await apiClient.get('/sanctum/csrf-cookie');
  
      let urlxx = '/api/admin/uploadauth';
      let response = await apiClient.get(urlxx, {
        headers: {
          "Authorization": "Bearer " + local.token,
        }
      });
  
      if (response.data.success) {
        let filename = 'Dabar';
        var formData = new FormData();
        formData.append("file", data);
        formData.append("fileName", filename);
        // tega public key for image kit: public_Wl9bE4KPg58H6+uWmt7exPKW+Wc=
        formData.append("publicKey", "public_Wl9bE4KPg58H6+uWmt7exPKW+Wc=");
        formData.append("signature", response.data.success.signature || "");
        formData.append("expire", response.data.success.expire || 0);
        formData.append("token", response.data.success.token);
  
        let urlxc = "https://upload.imagekit.io/api/v1/files/upload";
        let fetchResponse = await fetch(urlxc, {
          method: "POST",
          body: formData
        });
  
        if (fetchResponse.ok) {
          const responseData = await fetchResponse.json();
          return responseData.url;
        } else {
          console.error("Image upload failed:", fetchResponse.statusText);
          // Handle error as needed
          return null;
        }
      } else {
        console.error("Failed to get upload authorization:", response.statusText);
        // Handle error as needed
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error as needed
      return null;
    }
  }
  
  const handleDropChange = (acceptedFiles) => {
    setFiles(acceptedFiles);
 
  };

  const removeFromList = (name) => {
    let defaultFiles = files;
    defaultFiles = defaultFiles.filter((item) => item.name !== name);
    setFiles([...defaultFiles]);
  };


  const handleAdd =(e)=>{
   e.preventDefault();

   if(files.length > 0){
    files.forEach( async(file) => {
      let imgkit = await Imagekitupload(file);

      if (imgkit) {
        //  console.log(data.name)
        let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
          let formData = new FormData();
          formData.append('name',  file.name)
          formData.append('alter_text',  file.name)
          formData.append('file',  imgkit)
          let url = 'api/admin/mediainsert'
          apiClient.get('/sanctum/csrf-cookie').then( async()=>{
         
         let res = await  apiClient.post(url, formData, {
              headers:{
                "Authorization":"Bearer "+local.token,
                }
            })
            console.log(res)
            if(res.data.message || res.data.success){
              // setUploadModal(false)
              toggle();
            let ansx =  res.data.data.map((item)=>{
                let obj = {name:item.name, file:item.file }  
                return obj;
              })
              // Setdatax(ansx)
            }
      
      
             
          })
        }


    });
   }
 

  }

  return (
    <React.Fragment>
      <a
        href="#close"
        onClick={(ev) => {
          ev.preventDefault();
          toggle();
        }}
        className="close"
      >
        <Icon name="cross-sm"></Icon>
      </a>
      <div className="modal-body modal-body-md">
        <div className="nk-upload-form">
          <h5 className="title mb-3">Upload File</h5>
          <Dropzone onDrop={(acceptedFiles) => handleDropChange(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="dropzone upload-zone small bg-lighter my-2 dz-clickable">
                  <input {...getInputProps()} />
                  <div className="dz-message">
                    <span className="dz-message-text">
                      <span>Drag and drop</span> file here or <span>browse</span>
                    </span>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div className="nk-upload-list">
          <h6 className="title">Uploaded Files</h6>
          {files.length > 0 ? (
            files.map((file, index) => (
              <div className="nk-upload-item" key={index}>
                <div className="nk-upload-icon">
                  {iconsType[file.type] ? iconsType[file.type] : iconsType["others"]}
                </div>
                {console.log(file.type)}
                <div className="nk-upload-info">
                  <div className="nk-upload-title">
                    <span className="title">{file.name}</span>
                  </div>
                  <div className="nk-upload-size">{bytesToMegaBytes(file.size)} MB</div>
                </div>
                <div className="nk-upload-action">
                  <a
                    href="#delete"
                    onClick={(ev) => {
                      ev.preventDefault();
                      removeFromList(file.name);
                    }}
                    className="btn btn-icon btn-trigger"
                  >
                    <Icon name="trash"></Icon>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="d-flex justify-center">
              <span>No files added yet !</span>
            </div>
          )}
        </div>
        <div className="nk-modal-action justify-end">
          <ul className="btn-toolbar g-4 align-center">
            <li>
              <a
                href="#toggle"
                onClick={(ev) => {
                  ev.preventDefault();
                  toggle();
                }}
                className="link link-primary"
              >
                Cancel
              </a>
            </li>
            <li>
              <Button color="primary" onClick={(e)=>handleAdd(e)}>
                Add Files x
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Upload;
