import React, {useState, useEffect} from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, BlockDes, Col, Row, Icon, UserAvatar } from "../../../components/Component";
import { Link, useNavigate } from "react-router-dom";
import { Card, DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem, Badge } from "reactstrap";
import { templates } from "./data/templates";
import { documents } from "./data/document";
import classnames from "classnames";
import axios from 'axios';
import { AES, enc } from 'crypto-js';
const statusCard = [
  {
    title: "Articles Available",
    theme:"primary",
    link: {
      text: "See History",
      to:"history"
    },
    amount:"452",
    amountText:"Articles",
    total:"2000",
    note: "free words generated"
  },
  {
    title: "Drafts Available",
    theme:"warning",
    link: {
      text: "See All",
      to:"document-drafts"
    },
    amount:"3",
    amountText:"Drafts",
    total:"10",
    note: "free drafts created"
  },
  {
    title: "Documents Available",
    theme:"info",
    link: {
      text: "See All",
      to:"document-saved"
    },
    amount:"6",
    amountText:"Documents",
    total:"10",
    note: "free documents created"
  },
  {
    title: "Categories Available",
    theme:"danger",
    link: {
      text: "All Categories",
      to:"document-categories"
    },
    amount:"12",
    amountText:"Categories",
    total:"16",
    note: "tools used to generate"
  },
]








const Dashboard = () => {
  const [dash, Setdash] = useState([])
  const [tabledata, Settabledata] = useState([])
  const original = window.location.origin

  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true
  });

  const navigate = useNavigate();
  useEffect(()=>{
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}

    if(local){
      let answer =   JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8))
    
     }else{
       localStorage.removeItem('thedabar')
       window.location.href=`${original}/demo9/auth-login`;
     }

    let url = 'api/admin/dashboardata'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.message){
          Setdash(res.data.message)
          console.log(res.data.message)
        }
      })
    })

    let urlx = 'api/admin/recentstories'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(urlx,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.message){
          Settabledata(res.data.message)
        }
      })
    })
  },[])

  const handleEdit =(e,id)=>{
    e.preventDefault();
    console.log(e.target, id)
   navigate('/demo9/copywriter/document-editor', {state:id})
  }

  const handleDelete = (e, id)=>{
    e.preventDefault(); 
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
let formData = new FormData();
formData.append('id',  id)
let urlxs = 'api/admin/deletesinglestory'
apiClient.get('/sanctum/csrf-cookie').then(()=>{
  apiClient.post(urlxs, formData, {
    headers: {
      "Authorization": "Bearer " + local.token,
    }
  }).then(res=>{
    if(res.data.message){
      window.location.href = original+'/demo9/copywriter'
    }
  })
})
  }

  return (
    <React.Fragment>
      <Head title="Dashboard"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle className="page-title">Welcome Back </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            { dash.map((item,index) =>
              <Col key={index} xxl="3" sm="6">
                  <Card className={`card-full bg-${item.theme}`}>
                      <div className="card-inner">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                              <div className="fs-6 text-white text-opacity-75 mb-0">{item.title}</div>
                              {item.name && <a className="link link-white">{item.name}</a>}
                          </div>
                          <h5 className="fs-1 text-white">{item.list} <small className="fs-3">{item.title}</small></h5>
                          <div className="fs-7 text-white text-opacity-75 mt-1">
                            <span className="text-white"></span>
                          </div>
                      </div>
                  </Card>
              </Col>
            )}
          </Row>
        </Block>
       
   
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">Recent Documents</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <Link to={`${process.env.PUBLIC_URL}/copywriter/document-saved`} className="link"><span>See All</span> <Icon name="chevron-right" /></Link>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Card>
            <table className="table">
              <thead>
                  <tr className="nk-tb-item nk-tb-head">
                      <th className="nk-tb-col nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                              <input type="checkbox" className="custom-control-input" id="did-all" />
                              <label className="custom-control-label" htmlFor="did-all"></label>
                          </div>
                      </th>
                      <th className="nk-tb-col">
                          <h6 className="overline-title">Name</h6>
                      </th>
                      <th className="nk-tb-col tb-col-sm">
                          <h6 className="overline-title">Type</h6>
                      </th>
                      <th className="nk-tb-col tb-col-md">
                          <h6 className="overline-title">Last Modified</h6>
                      </th>
                      <th className="nk-tb-col"></th>
                  </tr>
              </thead>
              <tbody>
                {tabledata.length > 0? tabledata.map((item,index)=>{
                           let timez = new Date(item.created_at)
                           const monthNames = [
                             "Jan", "Feb", "Mar",
                             "Apr", "May", "Jun", "Jul",
                             "Aug", "Sept", "Oct",
                             "Nov", "Dec"
                           ];   
                           const day = timez.getDate();
                           const monthIndex = timez.getMonth();
                           const year = timez.getFullYear();
                           const formattedDate = `${monthNames[monthIndex]} ${day}  ${year}`;
                 return <tr key={index} className="nk-tb-item">
                    <td className="nk-tb-col nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" className="custom-control-input" id={item.id} />
                            <label className="custom-control-label" htmlFor={item.id}></label>
                        </div>
                    </td>
                    <td className="nk-tb-col">
                      <div className="caption-text">{item.heading}</div>
                    </td>
                    <td className="nk-tb-col tb-col-sm">
                      <Badge color={'info'} className="badge-dim rounded-pill">{item.category_id}</Badge>
                    </td>
                    <td className="nk-tb-col tb-col-md">
                      <div className="sub-text d-inline-flex flex-wrap gx-2">{formattedDate}</div>
                    </td>
                    <td className="nk-tb-col tb-col-end">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu end>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#eye"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="eye"></Icon>
                                <span>View Document</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(e) =>handleEdit(e, item.id)}>
                                <Icon name="edit"></Icon>
                                <span>Edit</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(e) =>handleDelete(e, item.id)}>
                                <Icon name="trash"></Icon>
                                <span>Delete</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>}
                ):""}
              </tbody>
            </table>
          </Card>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default Dashboard;
