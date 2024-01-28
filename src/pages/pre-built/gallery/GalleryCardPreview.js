import React, { useState, useEffect } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import GalleryCard from "../../../components/partials/gallery/GalleryCard";
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal } from "reactstrap";
import {
  BlockBetween,
  BlockDes,
  Block,
  BlockHeadContent,
  BlockHead,
  BlockTitle,
  Col,
  Row,
  Icon,
  // Button,
  UserAvatar
} from "../../../components/Component";
import { galleryData } from "./GalleryData";
import Upload from "../../app/file-manager/modals/Upload"
// import 
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import { Card } from "reactstrap";
import ImageContainer from '../../../components/partials/gallery/GalleryImage';

const GalleryCardPreview = () => {
  const [data, Setdata] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);

  const toggleUploadModal = () => {
    setUploadModal(!uploadModal);
  };
   console.log(uploadModal)
  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });
  
  useEffect(()=>{
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
     let interval = setInterval(()=>{
      
      let urlxx = 'api/mediadata'
      apiClient.get('/sanctum/csrf-cookie').then(()=>{
        apiClient.get(urlxx,   {
          headers:{
            "Authorization":"Bearer "+local.token,
            }
        }).then(res=>{
          if(res.data.success){
          //  Setmediapic
           let data = res.data.success
            //  let objdata = [{name:'Select Image', file:"Select Image"}]
         let ansx =  data.map((item)=>{
            let obj = {name:item.name, file:item.file }  
             return obj
           })
           Setdata(ansx)
          } 
        })
      })

     },1500)
  

     return(() =>clearInterval(interval))
  },[])

  return (
    <React.Fragment>
      <Head title="Gallery"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween className="g-3">
            <BlockHeadContent>
              <BlockTitle page>Image Gallery</BlockTitle>
              <BlockDes className="text-soft">
                {/* <p>
                  You have total <span className="text-base">1,257</span> Media.
                </p> */}
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              {/* <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                <Icon name="download-cloud"></Icon>
                <span>Download All</span>
              </Button> */}
              <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                <Icon name="download-cloud"></Icon>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>


        <div className="nk-fmg-body-head d-none d-lg-flex">
            <div className="nk-fmg-search">
                {/* <Icon name="search"></Icon> */}
                {/* <input
                    type="text"
                    className="form-control border-transparent form-focus-none"
                    placeholder="Search files, folders"
                    // value={fileManager.search}
                    // onChange={(ev) => fileManagerUpdate.search(ev.target.value)}
                /> */}
            </div>
            <div className="nk-fmg-actions">
            <ul className="nk-block-tools g-3">
                <li>
                    <UncontrolledDropdown>
                    {/* <DropdownToggle
                        tag="a"
                        href="#toggle"
                        onClick={(ev) => ev.preventDefault()}
                        className="btn btn-light"
                    >
                        <Icon name="plus"></Icon> <span>Create</span>
                    </DropdownToggle> */}
                    <DropdownMenu end>
                        <ul className="link-list-opt no-bdr">
                        <li>
                            <DropdownItem
                            tag="a"
                            href="#upload"
                            onClick={(ev) => {
                                ev.preventDefault();
                                // toggleUploadModal();
                            }}
                            >
                            <Icon name="upload-cloud"></Icon>
                            <span>Upload File</span>
                            </DropdownItem>
                        </li>
                        <li>
                            <DropdownItem
                            tag="a"
                            href="#upload"
                            onClick={(ev) => {
                                ev.preventDefault();
                                // toggleCreateModal();
                            }}
                            >
                            <Icon name="folder-plus"></Icon>
                            <span>Create Folder</span>
                            </DropdownItem>
                        </li>
                        </ul>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </li>
                <li>
                    <Button color="primary"
                     onClick={() => toggleUploadModal()}
                     >
                    <Icon name="upload-cloud"></Icon> <span>Upload</span>
                    </Button>
                </li>
            </ul>
        </div>
        </div>

        <Block>
          <Row className="g-gs">
            {data.map((item, index) => {
              return (
                <Col sm={6} lg={4} key={index}>
                                    {/* <GalleryCard
                    img={item.img}
                    // userName={item.userName}
                    // userEmail={item.userEmail}
                    theme={item.theme}
                    userImg={item.userImg}
                    heartCount={item.heart}
                  /> */}


            <Card className=" gallery">
                  <ImageContainer img={item.file} />
                  <div className="gallery-body card-inner align-center justify-between flex-wrap g-2">
                    <div className="user-card">
                      {/* <UserAvatar theme={theme} text={findUpper(userName)} image={userImg}></UserAvatar> */}
                      {/* <div className="user-info">
                        <span className="lead-text">{userName}</span>
                        <span className="sub-text">{userEmail}</span>
                      </div> */}
                    </div>
                    <div>
                      {/* <Button className="btn-p-0 btn-nofocus" onClick={() => onHeartClick()}>
                        <Icon name={`${heart ? "heart-fill" : "heart"}`}></Icon>
                        <span>{heart ? heartCount + 1 : heartCount}</span>
                      </Button> */}
                    </div>
                  </div>
                </Card>
                </Col>
              );
            })}
          </Row>
        </Block>
      </Content>
      <Modal isOpen={uploadModal} size="md" toggle={toggleUploadModal}>
            <Upload toggle={toggleUploadModal} setUploadModal={setUploadModal}   />
        </Modal>
    </React.Fragment>
  );
};

export default GalleryCardPreview;
