import React, { useState, useEffect, useRef,useCallback } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Dropzone from "react-dropzone";
import ReactQuill from 'react-quill';
import { useQuill } from "react-quilljs";
// import "../../node_modules/react-quill/dist/quill.snow.css";
import "../../../../node_modules/react-quill/dist/quill.snow.css"
// import ImageKit from 'imagekit';
import { FaRegCopy } from "react-icons/fa";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Col,
  Row,
  Icon,
  Button,
  RSelect,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  Card,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
} from "reactstrap";
import classnames from "classnames";
// import { Editor } from "@tinymce/tinymce-react";
import { templates } from "./data/templates";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { categories } from "./data/category";
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  
  const writers = [
    { value: 'chocolate', label: 'Choc B' },
    { value: 'strawberry', label: 'Adam S ' },
    { value: 'vanilla', label: 'Vanilla' }
  ]


  
  

const history = [
  {
    id: "h1v01",
    content:
      "Hey everyone! Have you met ChatGPT? As an AI language model, I'm trained to answer your questions and have a conversation with you! Ask me anything, and let's get chatting! 😊",
    date: "Feb 23, 2023",
    time: "5:22 PM",
  },
  {
    id: "h1v02",
    content:
      "Are you tired of Googling for answers? Meet ChatGPT - your one-stop solution for all your queries! I'm an AI language model trained to provide you with accurate and informative responses. Try me out! 💬",
    date: "Feb 23, 2023",
    time: "5:22 PM",
  },
  {
    id: "h1v03",
    content:
      "OpenAI is changing the game for data-driven innovation. With its cutting-edge technology, we can harness the power of data in ways we never thought possible.",
    date: "Feb 23, 2023",
    time: "5:22 PM",
  },
];

const generatorform = {
  templates: [
    {
      id: "tid01",
      label: "Blog Ideas",
      value: "Blog Ideas",
    },
    {
      id: "tid02",
      label: "Blog Post Outline",
      value: "Blog Post Outline",
    },
    {
      id: "tid03",
      label: "Blog Post Writer",
      value: "Blog Post Writer",
    },
    {
      id: "tid04",
      label: "Blog Paragraph Writer",
      value: "Blog Paragraph Writer",
    },
    {
      id: "tid05",
      label: "Pros & Cons",
      value: "Pros & Cons",
    },
    {
      id: "tid06",
      label: "Blog Conclusions",
      value: "Blog Conclusions",
    },
    {
      id: "tid07",
      label: "Social Media Posts",
      value: "Social Media Posts",
    },
    {
      id: "tid08",
      label: "Facebook Headlines",
      value: "Facebook Headlines",
    },
    {
      id: "tid09",
      label: "Google Ads Description",
      value: "Google Ads Description",
    },
    {
      id: "tid10",
      label: "YouTube Tags Generator",
      value: "YouTube Tags Generator",
    },
    {
      id: "tid11",
      label: "LinkedIn Posts",
      value: "LinkedIn Posts",
    },
    {
      id: "tid12",
      label: "Twitter Generator",
      value: "Twitter Generator",
    },
    {
      id: "tid13",
      label: "Website Headlines/Copy",
      value: "Website Headlines/Copy",
    },
    {
      id: "tid14",
      label: "FAQs Generator",
      value: "FAQs Generator",
    },
    {
      id: "tid15",
      label: "About Us",
      value: "About Us",
    },
    {
      id: "tid16",
      label: "Testimonials/Reviews",
      value: "Testimonials/Reviews",
    },
  ],
  prompt: "Write a Facebook post about openai that revolutionizes the world through the power of data.",
  keywords: ["chatgpt", "openai", "facebook"],
  language: [
    { value: "English US", label: "English US" },
    { value: "English UK", label: "English UK" },
    { value: "Español", label: "Español" },
    { value: "Français", label: "Français" },
  ],
  tone: [
    { value: "Friendly", label: "Friendly" },
    { value: "Creative", label: "Creative" },
    { value: "Extreme", label: "Extreme" },
  ],
};

const DocumentEditor = () => {
  const editorRef = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  let tabValue = urlParams.get("tab") === null ? "AIWriter" : urlParams.get("tab").toString();
  const original = window.location.origin
  const [activeTab, setActiveTab] = useState(tabValue);
  const [currentStep, setCurrentStep] = useState("list");
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [copyState, setCopyState] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const navigate = useNavigate();
  useEffect(() => {
    setActiveTab(tabValue);
  }, [tabValue]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleForm = (template) => {
    setCurrentStep("form");
    const cTemplate = generatorform.templates.filter((item) => item.label === template);
    setSelectedTemplate(cTemplate[0]);
  };

 

  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true
  });

  const uploadToImageKit = async (file) => {
    console.log(file)
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
    let urlxx = '/api/admin/uploadauth';
    apiClient.get(urlxx,  {
    headers:{
      "Authorization":"Bearer "+local.token,
      }
    }).then( async res=>{
      if(res.data.success){
        let filename = 'Dabar'
        var formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", filename);
        formData.append("publicKey", "public_JTJgA6cHXctE0Rt6gwXWQsAygjA=");
            formData.append("signature", res.data.success.signature || "");
          formData.append("expire", res.data.success.expire || 0);
        formData.append("token", res.data.success.token);
            let urlxc = "https://upload.imagekit.io/api/v1/files/upload";
           let responsex = await fetch(urlxc, {
                 method: "POST",
                 body: formData
             })
             const responseData = await responsex.json();
              //  let imagekit = responseData.url


                  // Get the current content state of the editor
                  const currentContentState = editorState.getCurrentContent();

                  // Create an entity for the image with the src attribute set to the ImageKit URL
                  const contentStateWithEntity = currentContentState.createEntity('IMAGE', 'IMMUTABLE', {
                    src: responseData.url,
                  });

                  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                  
                  // Add the image to the content state
                  const newContentState = ContentState.createFromBlockArray(
                    contentStateWithEntity.getBlockMap().toArray(),
                    contentStateWithEntity.getEntityMap()
                  );

                  const newEditorState = EditorState.set(editorState, { currentContent: newContentState });

                  // Replace the selected text with the image entity
                  const newEditorStateWithImage = RichUtils.toggleLink(
                    newEditorState,
                    newEditorState.getSelection(),
                    entityKey
                  );

                  // Update the editor state
                  onEditorStateChange(newEditorStateWithImage);

                  // Return the data structure expected by the editor
                  return { data: { link: responseData.url } };      }
    })
  })
  };

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
        formData.append("publicKey", "public_JTJgA6cHXctE0Rt6gwXWQsAygjA=");
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




  // const quillRef = useRef(null);
 


  // const handleSendImage = async (img)=>{
  //   const imageFile = await fetch(img).then((res) => res.blob());
  //   const imageKitUrl = await uploadToImageKit(imageFile);
  //   return  imageKitUrl;
  // }



  
   
//   const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   },
//   richText: true,
//   handlers: {
//     image: handleImageInsert,
//   },
// };
  
 const handleImageInsert  = ()=>  {
  if (quill) {
    const content = quill.getContents();
    // console.log(content)
  }
};

  const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {
      image:handleImageInsert,
    },
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  // "image",
  // "video",
  // "code-block",
  ]

const {quill, quillRef} = useQuill(modules, formats);
  
// console.log(quillRef)

  const location = useLocation();
  const editid = location.state;

  const [body, Setbody] = useState("")
  const [presummary, Setpresummary] = useState("")
  const [read_time, Setread_time] = useState("")
  const [category_id, Setcategory_id] = useState("")
  const [writer_id, Setwriter_id] = useState("")
  const [localx, Setlocalx] = useState("")
  const [heading, Setheading] = useState("")
  const [main_image, Setmain_image] = useState("")
  const [keypoints, Setkeypoints] = useState("")
  const [thumbnail, Setthumbnail] = useState("")
  const [schedule_story_time, Setschedule_story_time] = useState(new Date())
  const [status, Setstatus] = useState(0)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
    let formData = new FormData();
    let thumbnailx =  await Imagekitupload(thumbnail);
   let main_imagex =   await Imagekitupload(main_image);
   const contentStatex = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    formData.append('body',  contentStatex)
    formData.append('presummary',  presummary)
    formData.append('read_time',  read_time)
    formData.append('category_id',  category_id)
    formData.append('writer_id',  writer_id)
    formData.append('main_image', main_imagex)
    formData.append('keypoint', keypoints)
    formData.append('thumbnail', thumbnailx)
    formData.append("heading", heading)
    formData.append('status', status)
    formData.append("schedule_story_time", schedule_story_time)
    let url = 'api/admin/createstory'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.post(url, formData, {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        console.log(res)
        if(res.data.success){
          window.location.href = original+'/demo9/copywriter'

        }
      })
    })

  }

 

// storydatalist
const [writerdata, Setwriterdata] = useState([])
const [categorydata, Setcategorydata] = useState([])

const [categoryword, Setcategoryword] = useState("") 
const [writerword, Setwriterword] = useState("")
const [mediapic, Setmediapic] = useState([])
useEffect(()=>{
  let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
 
  if(local){
    Setlocalx(local)
   }else{
     localStorage.removeItem('thedabar')
     window.location.href=`${original}/demo9/auth-login`;
   }
  let url = 'api/admin/storydatalist'
  apiClient.get('/sanctum/csrf-cookie').then(()=>{
    apiClient.get(url,   {
      headers:{
        "Authorization":"Bearer "+local.token,
        }
    }).then(res=>{
      if(res.data.message){
         let answriter =   res.data.message.writer.map((item)=>{
          return {id:item.id, value:item.name, label:item.name}
         })
         Setwriterdata(answriter)
         let anscategory = res.data.message.category.map((item)=>{
          return {id:item.id, value:item.name, label:item.name}
         })
         Setcategorydata(anscategory)
      }
    })
  })

  // mediadata

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
         let objdata = [{name:'Select Image', file:"Select Image"}]
       data.map((item)=>{
        let obj = {name:item.name, file:item.file }  
        objdata.push(obj)
       })
       Setmediapic(objdata)
      } 
    })

  })

},[])





useEffect(()=>{
  let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}

  if(editid){
    let url = 'api/admin/storyedit/'+parseInt(editid)
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.message){
        let answriter = writerdata.find((item)=>item.id == res.data.message.writer_id)
       let anscategory = categorydata.find((item)=>item.id == res.data.message.category_id)
          Setpresummary(res.data.message.presummary)
          Setread_time(res.data.message.read_time)
          Setheading(res.data.message.heading)
          Setmain_image(res.data.message.main_image)
          Setthumbnail(res.data.message.thumbnail)
          Setkeypoints(res.data.message.keypoint)
          Setschedule_story_time(new Date(res.data.message.schedule_story_time))
          Setwriter_id(res.data.message.writer_id)
          Setcategory_id(res.data.message.category_id)
          let stringx = "<p>dhdhjdjdsj</p>";
          var parser = new DOMParser();
          var parsedHtml = parser.parseFromString(res.data.message.body, "text/html");
         let changedraft = htmlToDraft(parsedHtml.body.innerHTML)
         const contentState = ContentState.createFromBlockArray(changedraft.contentBlocks);
          let ansx = EditorState.createWithContent(contentState)
          setEditorState(ansx)
          // let answriterx = (answriter && typeof answriter === 'object' && Object.keys(answriter).length > 0) ? answriter.value : "";
          // let anscategoryx = (anscategory && Object.keys(anscategory).length > 0) ? anscategory.value : "";
          
          Setwriterword(answriter)
           Setcategoryword(anscategory)
      
          Setbody(res.data.message.body)
        }
      })
    })

  }
},[editid, writerdata, categorydata])



const handleCategory = (categoryword)=>{
  Setcategoryword(categoryword)
const selectedValue = categoryword ? categoryword.value : null;
let info = categorydata.find((item)=>item.value == selectedValue)
Setcategory_id(info.id)

}

const handleWriter = (writerword)=>{
  Setwriterword(writerword)
  const selectedValue = writerword ? writerword.value : null;
  let info = writerdata.find((item)=>item.value == selectedValue)
  Setwriter_id(info.id)
}
// 
const handleEdit = async(e)=>{
e.preventDefault();
let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}


const contentStatex = draftToHtml(convertToRaw(editorState.getCurrentContent()));
if(Object.prototype.toString.call(thumbnail) === '[object Object]' && Object.prototype.toString.call(main_image) === '[object Object]'){
  let thumbnailx =  await Imagekitupload(thumbnail);
let main_imagex =   await Imagekitupload(main_image);
  let formData = new FormData();
  formData.append('body',  contentStatex)
  formData.append('presummary',  presummary)
  formData.append('read_time',  read_time)
  formData.append("heading", heading)
  formData.append('main_image', main_imagex)
  formData.append('keypoint', keypoints)
  formData.append('thumbnail', thumbnailx)
  formData.append("schedule_story_time", schedule_story_time)
  formData.append('status', status)
  formData.append('_method', 'put')
  formData.append('category_id',  category_id)
  formData.append('writer_id',  writer_id)
  formData.append('id',  editid)
  let url = 'api/admin/editstory'
  apiClient.get('/sanctum/csrf-cookie').then(()=>{
    apiClient.post(url, formData, {
      headers:{
        "Authorization":"Bearer "+local.token,
        }
    }).then(res=>{
      if(res.data.success){
       
        window.location.href = original+'/demo9/copywriter'
  
      }
    })
  })

}else{

  let formData = new FormData();
  formData.append('body',  contentStatex)
  formData.append('presummary',  presummary)
  formData.append('read_time',  read_time)
  formData.append("heading", heading)
  formData.append('main_image', main_image)
  formData.append('keypoint', keypoints)
  formData.append('thumbnail', thumbnail)
  formData.append("schedule_story_time", schedule_story_time)
  formData.append('status', status)
  formData.append('_method', 'put')
  formData.append('category_id',  category_id)
  formData.append('writer_id',  writer_id)
  formData.append('id',  editid)
  let url = 'api/admin/editstory'
  apiClient.get('/sanctum/csrf-cookie').then(()=>{
    apiClient.post(url, formData, {
      headers:{
        "Authorization":"Bearer "+local.token,
        }
    }).then(res=>{
      if(res.data.success){
       
        window.location.href = original+'/demo9/copywriter'
  
      }
    })
  })


}


}





const onEditorStateChange = (newEditorState) => {
  console.log(newEditorState)
  const contentState = convertToRaw(newEditorState.getCurrentContent());

  const contentStatex = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  console.log('Editor Content State:', contentStatex);
  setEditorState(newEditorState);
};

const [story_data, Setstory_data] = useState("")
const [story_link, Setstory_link] = useState("")
const handlestory = async (data) => {
  Setstory_data(data);
  let imgkit = await Imagekitupload(data);
   if (imgkit) {
  //  console.log(data.name)
  let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
    Setstory_link(imgkit);
    let formData = new FormData();
    formData.append('name',  data.name)
    formData.append('alter_text',  data.name)
    formData.append('file',  imgkit)
    let url = 'api/admin/mediainsert'
    apiClient.get('/sanctum/csrf-cookie').then( async()=>{
   
   let res =   apiClient.post(url, formData, {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      })

      if(res.data.message){

      }


       
    })
  } 

}

const [textin, Settextin] = useState("")
const [selectmedia, Setselectmedia] = useState('')
const handleSelectStatus = (text)=>{
  Settextin(text)
  if(text == 'Publish'){
   Setstatus(1)
  }else{
    Setstatus(0) 
  }
}

const handleMove =(e)=>{
  console.log(e.target.value)
  if(e.target.value != 'Select Image'){
    Setselectmedia(e.target.value)
  }
}

    const handleCopy = (wordx)=>{
        navigator.clipboard.writeText(wordx)
    }

  
  return (
    <React.Fragment>
      <Head title="Document Editor"></Head>
      <Content>
        <Card>
          <div className="nk-editor">
            <div className="nk-editor-header">
              <div className="nk-editor-title">
                <h4 className="me-3 mb-0 line-clamp-1">2023-02-03 Untitled</h4>
                <ul className="d-inline-flex align-item-center">
                  <li>
                    <Button size="sm" color="trigger" className="btn-icon">
                      <Icon name="pen"></Icon>
                    </Button>
                  </li>
                  <li>
                    <Button size="sm" color="trigger" className="btn-icon">
                      <Icon name="star"></Icon>
                    </Button>
                  </li>
                  <li className="d-xl-none">
                    <UncontrolledDropdown>
                      <DropdownToggle color="trigger" className="btn btn-sm btn-icon">
                        <Icon name="download-cloud"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end className="dropdown-menu-sm">
                        <div className="dropdown-content">
                          
                           <li>
                              <a href="#">
                                <Icon name="file-docs"></Icon>
                                <span>Docs</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <Icon name="file-text"></Icon>
                                <span>Text</span>
                              </a>
                            </li>
                        </div>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                  <li className="d-xl-none ms-1">
                    {editid? 
                     <Button onClick={(e)=>handleEdit(e)} size="sm" color="primary" className="btn-icon">
                     <Icon onClick={(e)=>handleEdit(e)} name="edit"></Icon> 
                   </Button>
                    :
                    <Button onClick={(e)=>handleSubmit(e)} size="sm" color="primary" className="btn-icon">
                    <Icon onClick={(e)=>handleSubmit(e)} name="save"></Icon> 
                  </Button>
                    }
                    
                  </li>
                </ul>
              </div>
              <div className="nk-editor-tools d-none d-xl-flex">
                <ul className="d-inline-flex gx-3 gx-lg-4 pe-4 pe-lg-5">
                  <li>
                    <span className="sub-text text-nowrap">
                      Words <span className="text-dark">25</span>
                    </span>
                  </li>
                  <li>
                    <span className="sub-text text-nowrap">
                      Characters <span className="text-dark">84</span>
                    </span>
                  </li>
                </ul>
                <ul className="d-inline-flex gx-3">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle className="btn btn-md btn-light rounded-pill">
                        <span>{textin?textin:"Select Status"} </span>
                        <Icon name="chevron-down"></Icon>
                      </DropdownToggle>
                      <DropdownMenu end className="dropdown-menu-sm">
                        <div className="dropdown-content">
                          <ul className="link-list-opt">
                            <li>
                              <a>
                                
                                <span onClick={(e)=>handleSelectStatus(e.target.innerText)}>Publish</span>
                              </a>
                            </li>
                            <li>
                              <a >
                                
                                <span onClick={(e)=>handleSelectStatus(e.target.innerText)}>Draft</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                  <li>
                    {editid?<Button onClick={(e)=>handleEdit(e)} size="md" color="primary" className="rounded-pill">
                     Edit 
                   </Button>:
                     <Button onClick={(e)=>handleSubmit(e)} size="md" color="primary" className="rounded-pill">
                     Save 
                   </Button>
                    }
                   
                  </li>
                </ul>
              </div>
            </div>
            <div className="nk-editor-main">
              <div className="nk-editor-base">
                <Nav tabs className="nav-sm nav-tabs-s1 px-3">
                  <NavItem>
                    <NavLink
                      tag="a"
                      href="#tab"
                      className={classnames({ active: activeTab === "AIWriter" })}
                      onClick={(ev) => {
                        ev.preventDefault();
                        toggleTab("AIWriter");
                      }}
                    >
                      Metadata
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="m-4">
                  <TabPane tabId="AIWriter">
                    {currentStep === "list" && (
                      <>
                        
                         <Col className="mt-2">
                          <div className="form-group">
                            <label className="form-label">Heading</label>
                            <div className="form-control-wrap">
                              <input type="text"  value={heading}  onChange={(e)=>Setheading(e.target.value)} classNamePrefix="react-select"  className="form-control"/>
                            </div>
                          </div>
                        </Col>


                        <div className="mt-2">
                          <Label htmlFor="default-0" className="form-label">
                            Summary
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              type="text"
                              value={presummary}
                              onChange={(e)=>Setpresummary(e.target.value)}
                              id="default-0"
                              placeholder="Input placeholder"
                            />
                          </div>
                        </div>

                        <Col className="mt-2">
                          <div className="form-group">
                            <label className="form-label">Main Image</label>
                            <div className="form-control-wrap">
                              <input type="file"   onChange={(e)=>Setmain_image(e.target.files[0])} classNamePrefix="react-select"  className="form-control"/>
                            </div>
                          </div>
                        </Col>

                        <Col className="mt-2">
                          <div className="form-group">
                            <label className="form-label">Thumnail</label>
                            <div className="form-control-wrap">
                              <input type="file"   onChange={(e)=>Setthumbnail(e.target.files[0])} classNamePrefix="react-select"  className="form-control"/>
                            </div>
                          </div>
                        </Col>

                        <div className="mt-2">
                          <Label htmlFor="default-0" className="form-label">
                            Read Time
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              type="text"
                              id="default-0"
                              value={read_time}
                              onChange={(e)=>Setread_time(e.target.value)}
                              placeholder="Input placeholder"
                            />
                          </div>
                        </div>


                        <div className="mt-2">
                          <Label htmlFor="default-0" className="form-label" >
                            Key Points
                          </Label>
                          <div className="form-control-wrap">
                          <ReactQuill
                          // modules={DocumentEditor.modules}
                          formats={DocumentEditor.formats}
                          onChange={(e)=>Setkeypoints(e)}
                          style={{
                            height:"20%", 
                            border: 'none',
                            outline: 'none',
                          }}
                          value={keypoints}
                          id="word"
                          name="word"
                          readOnly={false}
                          placeholder="write your story"
                          theme="snow"
                          />
                          </div>
                        </div>
                           
                       
                        <Col className="mt-2">
                          <div className="form-group">
                            <label className="form-label">Schedule Story Time</label>
                            {/* <RSelect options={options} /> */}
                            <div className="form-control-wrap">
                              <DatePicker 
                              selected={schedule_story_time} 
                              minDate={new Date()} 
                              onChange={(date)=>Setschedule_story_time(date)} 
                              showTimeSelect
                              timeIntervals={15} // Optional: Set the time intervals in minutes
                              dateFormat="MMMM d, yyyy h:mm aa"
                              classNamePrefix="react-select" 
                               className="form-control" />
                            </div>
                          </div>
                        </Col>
                       
                        {/* categorydata */}
                        <Col className="mt-2">
                          <div className="form-group">
                            <label className="form-label">Categories</label>
                            {/* <RSelect options={options} /> */}
                            <div className="form-control-select">
                              <Select options={categorydata} value={categoryword}  onChange={handleCategory} isMulti={false} classNamePrefix="react-select" className='react-select-container' />
                            </div>
                          </div>
                        </Col>
                 
                        <Col className="mt-2">
                          <div className="form-group">
                            <label className="form-label">Writer</label>
                            <div className="form-control-select">
                              <Select options={writerdata} value={writerword}  onChange={handleWriter} classNamePrefix="react-select" className='react-select-container' />
                            </div>
                          </div>
                        </Col>


                        <div className="mt-2">
                          <Label htmlFor="default-0" className="form-label">
                            Select From Existing Image
                          </Label>
                          <div className="form-control-wrap">
                            <select className="form-control" onChange={handleMove} >
                              {mediapic.map((item, index)=>{
                                return <option key={index} value={item.file}>{item.name}</option>
                              })} 
                              </select>
                          </div>
                          {/* selectmedia */}
                          {selectmedia&&<section style={{ display:"flex", flexDirection:"row" }}>
                          <div style={{ width:"40px", height:"10px" }}>
                              <img src={selectmedia} className="w-full h-full" />
                            </div>
                            <div style={{ display:"flex", justifyItems:"center", alignItems:"center" }}>
                                  <button onClick={()=>handleCopy(selectmedia)}>
                                  <FaRegCopy  />
                                    </button>        
                            </div>
                          </section>}
                          
                         

                          </div>

                        <div className="mt-2">
                          <Label htmlFor="default-0" className="form-label">
                            Image Uploader
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              type="file"
                              id="default-0"
                             
                              onChange={(e)=>handlestory(e.target.files[0])} 
                              placeholder="Input placeholder"
                            />
                          </div>
                         {story_link&&<p style={{ fontSize:"12px" }}>copy link: {story_link} </p> }  
                        </div>

                      

                          
                        <Col className="mt-2">
                          <div className="form-group">
                          <label className="form-label">Story</label>
                            <div className="form-control-select">
                            {/* <ReactQuill
                            // formats={formats}
                            modules={modules}
                              //  modules={DocumentEditor.modules}
                              // formats={DocumentEditor.formats}
                              onChange={(e)=>Setbody(e)}
                              ref={quillRef}
                              style={{
                               height:"40%", 
                                border: 'none',
                                outline: 'none',
                              }}
                              theme="snow"
                              value={body}
                              id="word"
                              name="word"
                              // readOnly={false}
                              placeholder="write your story"
                             
                              /> */}

                              <div style={{ width:'100%', height: 200,  overflowY: 'auto' }}>
                              <WysiwygEditor
                                      editorState={editorState}
                                      onEditorStateChange={onEditorStateChange}
                                      toolbar={{
                                        image: {
                                          uploadCallback: uploadToImageKit,
                                          alt: { present: true, mandatory: true },
                                        },
                                      }}
                                    />
                                  </div>
                            </div>
                          </div>
                        </Col>
                       
                        
                      </>
                    )}
                    {currentStep === "form" && (
                      <div className="px-3 py-3">
                        <Row className="gy-4 gx-4">
                          <Col size="12">
                            <div className="form-group">
                              <label className="form-label">Select Template</label>
                              <div className="form-control-wrap">
                                <RSelect options={generatorform.templates} defaultValue={selectedTemplate} />
                              </div>
                            </div>
                          </Col>
                          <Col size="12">
                            <div className="form-group">
                              <label className="form-label">What do you want to generate?</label>
                              <div className="form-control-wrap">
                                <textarea
                                  cols="30"
                                  rows="4"
                                  className="form-control"
                                  defaultValue={generatorform.prompt}
                                ></textarea>
                              </div>
                              <div className="form-note d-flex justify-content-end mb-n1">
                                <span>0/500 Characters</span>
                              </div>
                            </div>
                          </Col>
                          <Col size="12">
                            <div className="form-group">
                              <label htmlFor="PrimaryKeywords" className="form-label">
                                Primary Keywords
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  id="PrimaryKeywords"
                                  type="text"
                                  className="form-control"
                                  defaultValue={generatorform.keywords}
                                />
                              </div>
                              <div className="form-note d-flex justify-content-between">
                                <span>Separated with a comma</span>
                                <span>0/10</span>
                              </div>
                            </div>
                          </Col>
                          <Col size="6">
                            <div className="form-group">
                              <label className="form-label">Select Language</label>
                              <div className="form-control-wrap">
                                <RSelect options={generatorform.language} defaultValue={generatorform.language[0]} />
                              </div>
                            </div>
                          </Col>
                          <Col size="6">
                            <div className="form-group">
                              <label className="form-label">Select Tone</label>
                              <div className="form-control-wrap">
                                <RSelect options={generatorform.tone} defaultValue={generatorform.tone[0]} />
                              </div>
                            </div>
                          </Col>
                          <Col size="6">
                            <div className="form-group d-flex align-items-center flex-row-reverse">
                              <label htmlFor="Variant" className="form-label ms-3 mb-0 flex-grow-1">
                                Variant
                              </label>
                              <div className="form-control-wrap w-70px">
                                <input id="Variant" type="number" className="form-control" defaultValue="1" />
                              </div>
                            </div>
                          </Col>
                          <Col size="6">
                            <Button
                              type="submit"
                              color="primary"
                              className="btn-block"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentStep("result");
                              }}
                            >
                              Generate
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {currentStep === "result" && (
                      <>
                        <div className="p-3 ">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="user-avatar xs text-primary bg-primary-dim">
                                <em className="icon ni ni-pen-fill"></em>
                              </div>
                              <h5 className="fs-14px fw-normal ms-2">Social Media Post</h5>
                            </div>
                            <a href="#" className="link">
                              Edit Prompt
                            </a>
                          </div>
                          <div className="card bg-lighter shadow-none mt-3">
                            <div className="p-3">
                              <p className="small text-dark">{generatorform.prompt}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 border-top border-light">
                          <Row className="g-3">
                            {history.map((item, index) => {
                              return (
                                <Col size="12" key={index}>
                                  <VariantCard item={item} index={index} />
                                </Col>
                              );
                            })}
                          </Row>
                          <div className="mt-4">
                            <Button
                              type="submit"
                              color="primary"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentStep("form");
                              }}
                            >
                              Back
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </TabPane>
                  <TabPane tabId="History">
                    <div className="px-3 py-4">
                      <div className="d-flex flex-wrap justify-content-between mb-3">
                        <h6 className="mb-0 me-3">Generation History</h6>
                        <div className="fs-11px">
                          <span className="text-dark">1763</span> words left.{" "}
                          <Link to={`${process.env.PUBLIC_URL}/copywriter/pricing-plans`}>Go Unlimited</Link>
                        </div>
                      </div>
                      <Row className="g-4">
                        {history.map((item, index) => {
                          const onCopyClick = () => {
                            setCopyState(true);
                            setTimeout(() => setCopyState(false), 2000);
                          };
                          return (
                            <Col size="12" key={index}>
                              <Card>
                                <div className="p-3">
                                  <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="badge badge-dim bg-primary rounded-pill align-center">
                                      <Icon name="pen-fill fs-11px"></Icon>
                                      <span>Social Media Post</span>
                                    </div>
                                    <ul className="d-flex align-items-center gx-1">
                                      <li>
                                        <button className="btn btn-sm btn-icon btn-trigger">
                                          <Icon name="chevrons-left"></Icon>
                                        </button>
                                      </li>
                                      <li className={copyState ? "clipboard-success" : ""}>
                                        <CopyToClipboard text={item.content} onCopy={onCopyClick}>
                                          <Button size="sm" color="blank" className="clipboard-init btn-icon">
                                            <span className="clipboard-text">
                                              {copyState ? <Icon name="copy-fill"></Icon> : <Icon name="copy"></Icon>}
                                            </span>
                                          </Button>
                                        </CopyToClipboard>
                                      </li>
                                    </ul>
                                  </div>
                                  <p className="text-dark">{item.content}</p>
                                  <div className="d-flex justify-content-between align-items-center fs-11px text-base">
                                    <span>
                                      {item.date} &nbsp; {item.time}
                                    </span>
                                    <span>{`${item.content.split(" ").length} Words`}</span>
                                  </div>
                                </div>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
              {/* <div className="nk-editor-body nk-editor-style-clean nk-editor-full">
                <Editor
                  apiKey="msm6bl1gm9gwg3hs5wjpi5a6icimdjzvgof4ls8bhsoh1fuv"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={
                    currentStep === "result"
                      ? "<h1>The Importance of Business Metrics in Product Design Industry</h1><h3>Introduction</h3><p>In the product design industry, creating a successful product is a top priority for any business. However, creating a product that sells and brings in revenue is equally important. This is where business metrics come into play. Business metrics are key performance indicators (KPIs) that measure a company's success in achieving its goals. In this blog post, we will discuss the importance of business metrics in the product design industry.</p><h3>Understanding Customer Needs</h3><p>One of the most important aspects of product design is understanding customer needs. Business metrics help companies gather data on customer behavior, such as purchase history, product reviews, and customer feedback. By analyzing this data, companies can determine what products are in demand and what features customers are looking for. This helps companies design products that meet customer needs, which can increase sales and customer satisfaction.</p><h3>Measuring Product Performance</h3><p>Business metrics also help companies measure the performance of their products. Metrics such as sales revenue, profit margin, and customer retention rate can provide insight into how well a product is performing in the market. By analyzing these metrics, companies can make data-driven decisions about product design, pricing, and marketing strategies. This can increase profitability and help companies stay competitive in the market.</p><h3>Identifying Areas for Improvement</h3><p>Finally, business metrics can help companies identify areas for improvement in their product design process. Metrics such as product development cycle time, defect rate, and customer satisfaction can help companies pinpoint areas where they can improve their processes. By addressing these areas, companies can streamline their product design process and improve the quality of their products.</p>"
                      : ""
                  }
                  init={{
                    menubar: false,
                    branding: false,
                    notification: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code",
                    ],
                    toolbar:
                      "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
                  }}
                /> 

                <ReactQuill
               modules={DocumentEditor.modules}
               formats={DocumentEditor.formats}
               onChange={(e)=>Setbody(e)}
               style={{
                height:"92%", 
                border: 'none',
                outline: 'none',
              }}
               value={body}
               id="word"
               name="word"
               readOnly={false}
               placeholder="write your story"
               theme="snow"
               />
              </div>*/}

                 
            </div>
          </div>
        </Card>
      </Content>
    </React.Fragment>
  );
};

const VariantCard = ({ item, index }) => {
  const [copyState, setCopyState] = useState(false);
  const onCopyClick = () => {
    setCopyState(true);
    setTimeout(() => setCopyState(false), 2000);
  };
  return (
    <Card>
      <div className="p-3">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <div className="text-primary fs-12px">Variant {index + 1}</div>
          <ul className="d-flex align-items-center gx-1">
            <li>
              <button className="btn btn-sm btn-icon btn-trigger">
                <em className="icon ni ni-chevrons-left"></em>
              </button>
            </li>
            <li className={copyState ? "clipboard-success" : ""}>
              <CopyToClipboard text={item.content} onCopy={onCopyClick}>
                <Button size="sm" color="blank" className="clipboard-init btn-icon">
                  <span className="clipboard-text">
                    {copyState ? <Icon name="copy-fill"></Icon> : <Icon name="copy"></Icon>}
                  </span>
                </Button>
              </CopyToClipboard>
            </li>
          </ul>
        </div>
        <p className="small text-dark">{item.content}</p>
        <div className="d-flex justify-content-between align-items-center fs-11px text-base">
          <span>{`${item.content.split(" ").length} Words`}</span>
        </div>
      </div>
    </Card>
  );
};

export default DocumentEditor;

DocumentEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  // "image",
  // "video",
  // "code-block",
  ]

  // DocumentEditor.modules  = {
  //       toolbar: {
  //     container: [
  //       [{ header: [1, 2, false] }],
  //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       ['link', 'image'],
  //       ['clean'],
  //     ],
  //     handlers: {
  //       image: this.dleImageInsert,
  //     },
  //   },
  // }

 
