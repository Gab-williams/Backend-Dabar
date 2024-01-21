import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, BlockDes, Col, Row, Icon, Button,
  PaginationComponent,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem } from "../../../components/Component";
  import { Link, useNavigate } from "react-router-dom";
  import { 
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem, Badge } from "reactstrap";

import { documents } from "./data/document";
import { AES, enc } from 'crypto-js';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
const DocumentDrafts = () => {

  const [data, setData] = useState(documents);

  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");

  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const [story, Setstory] = useState([])

  const bgcolor = ['dark', 'info', 'primary', 'warning', 'secondary', 'danger', 'gray'];
  const local =  localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
  const original = window.location.origin
  useEffect(()=>{
    if(local){
      
     }else{
       localStorage.removeItem('thedabar')
       window.location.href=`${original}/demo9/auth-login`;
     }
 
  },[local])

  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true
  });
    const [last, Setlast] = useState(0)

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    let newData;
    newData = documents.map((item) => {
      item.checked = false;
      return item;
    });
    setData([...newData]);

    let url = 'api/admin/unpublishedstories'
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        console.log(res)
        if(res.data.message){
          Setstory(res.data.message.data)
          Setlast(res.data.message.last_page)
        }
      })
    })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = documents.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.type.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...documents]);
    }
  }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
    let url = `api/admin/searchunpublishedstories?search=${e.target.value}&number=${1}`
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        console.log(res)
        if(res.data.success){
          Setstory(res.data.success.data)

        }
      })
    })
  };


  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const navigate = useNavigate();
  const handleEdit =(e,id)=>{
    e.preventDefault();
    console.log(e.target, id)
   navigate('/demo9/copywriter/document-editor', {state:id})
  }

  const handleCreate =(e)=>{
    e.preventDefault();
   
   navigate('/demo9/copywriter/document-editor')
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


  const handleNext = (ans)=>{
    let Answer = ans.selected + 1;
    if(onSearchText != ""){
  
      let url = `api/admin/searchunpublishedstories?search=${onSearchText}&number=${Answer}`
      apiClient.get('/sanctum/csrf-cookie').then(()=>{
        apiClient.get(url,   {
          headers:{
            "Authorization":"Bearer "+local.token,
            }
        }).then(res=>{
          console.log(res)
          if(res.data.success){
            Setstory(res.data.success)
  
          }
        })
      })
  
    }else{
    //  unpublishedstories
      let url = `api/admin/unpublishedstories?number=${Answer}`
      apiClient.get('/sanctum/csrf-cookie').then(()=>{
        apiClient.get(url,   {
          headers:{
            "Authorization":"Bearer "+local.token,
            }
        }).then(res=>{
          console.log(res)
          if(res.data.message){
            Setstory(res.data.message.data)
  
          }
        })
      })
  
    }
  
   }



  return (
    <React.Fragment>
      <Head title="Document Drafts"></Head>
      <Content>
        <BlockHead size="lg">
          <div className="nk-block-head-sub"><span></span></div>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle className="page-title">Document Drafts</BlockTitle>
              <BlockDes>
                <p>List of all drafts you have generated.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <a href="#" className="btn btn-primary d-none d-sm-inline-flex"><em className="icon ni ni-plus"></em><span onClick={(e)=>handleCreate(e)}>Create New</span></a>
              <a href="#" className="btn btn-icon btn-primary d-inline-flex d-sm-none"><em className="icon ni ni-plus"></em></a>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
        <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-title">
                    <h5 className="title">Drafts List</h5>
                </div>
                <div className="card-tools me-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                          <div className="dot dot-primary"></div>
                          <Icon name="filter-alt"></Icon>
                        </DropdownToggle>
                        <DropdownMenu
                          end
                          style={{ overflow: "visible" }}
                        >
                          <div className="dropdown-content">
                              <ul className="link-check">
                                  <li>
                                      <a href="#"><Icon name="calendar-check"></Icon><span>Date Created</span></a>
                                  </li>
                                  <li className="active">
                                      <a href="#"><Icon name="edit"></Icon><span>Last Modified</span></a>
                                  </li>
                                  <li>
                                      <a href="#"><Icon name="text-a"></Icon><span>Alphabetical</span></a>
                                  </li>
                              </ul>
                          </div>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by user or email"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody>
              <DataTableHead>
                <DataTableRow>
                  <h6 className="overline-title">Name</h6>
                </DataTableRow>
                <DataTableRow size="sm">
                  <h6 className="overline-title">Type</h6>
                </DataTableRow>
                <DataTableRow size="md">
                  <h6 className="overline-title">Last Modified</h6>
                </DataTableRow>
                <DataTableRow></DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {story.length > 0
                ? story.map((item, index) => {
                     
                  const randomIndex = Math.floor(Math.random() * index + 1);
                  // Use the random index to get a random element from the array
                  const randomColor = bgcolor[randomIndex];

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

                    return (
                      <DataTableItem key={item.id}>
                        <DataTableRow>
                          <div className="caption-text">{item.heading}</div>
                        </DataTableRow>
                        <DataTableRow size="sm">
                          <Badge color={randomColor} className="badge-dim rounded-pill">{item.category_id}</Badge>
                        </DataTableRow>
                        <DataTableRow size="md">
                          <div className="sub-text d-inline-flex flex-wrap gx-2">{formattedDate}</div>
                        </DataTableRow>
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            <li>
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
                                        href="#edit"
                                        onClick={(e) =>handleEdit(e, item.id)}
                                      >
                                        <Icon name="edit"></Icon>
                                        <span>Edit</span>
                                      </DropdownItem>
                                    </li>
                                    <li>
                                      <DropdownItem
                                        tag="a"
                                        href="#trash"
                                        onClick={(e) =>handleDelete(e, item.id)}
                                      >
                                        <Icon name="trash"></Icon>
                                        <span>Delete</span>
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">

            <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                    pageCount={last}
                    breakLabel={"..."}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={1}
                    onPageChange={handleNext}
                    containerClassName={'pagination'}
                    // pageClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item disabled'}
                    nextClassName={'page-item disabled'}
                    previousLinkClassName={'page-link-prev page-link'}
                    nextLinkClassName={'page-link-next page-link'}
                  />
              {/* {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )} */}
            </div>
          </DataTable>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default DocumentDrafts;
