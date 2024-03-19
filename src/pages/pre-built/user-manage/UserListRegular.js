import React, { useContext, useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
} from "../../../components/Component";
import { filterRole, filterStatus, userData } from "./UserData";
import { bulkActionOptions, findUpper } from "../../../utils/Utils";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
const UserListRegularPage = () => {
  const { contextData } = useContext(UserContext);
  const [data, setData] = contextData;
  let original = window.location.origin

  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    balance: 0,
    phone: "",
    status: "Active",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    balance: 0,
    phone: "",
    status: "",
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const [userdata, Setuserdata] = useState([])
   const [last, Setlast] = useState(1)
  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });
  let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}
  useEffect(()=>{
    if(local){

    }else{
      window.location.href = `${original}/demo9/copywriter`;

    }

    let url = `api/admin/alluser?number=${1}`
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.success){
          Setuserdata(res.data.success.data)
        }
      })
    })


  },[])
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
    newData = userData.map((item) => {
      item.checked = false;
      return item;
    });
    setData([...newData]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = userData.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) ||
          item.email.toLowerCase().includes(onSearchText.toLowerCase())
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...userData]);
    }
  }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
    // searchuser
   if(e.target.value.length > 0){
    let url = `api/admin/searchuser?search=${e.target.value} &number=${1}`
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.success){
          Setuserdata(res.data.success.data)
          Setlast(res.data.success.last_page)
        }
      })
    })
   }else{
    let url = `api/admin/alluser?number=${1}`
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.success){
          Setuserdata(res.data.success.data)
        }
      })
    })
    
   }
  


  };

  // function to change the selected property of an item
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].checked = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      balance:0,
      phone: "",
      status: "Active",
    });
  };

  const closeModal = () => {
    setModal({ add: false })
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false })
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    const { name, email, balance, phone } = submitData;
    let submittedData = {
      id: data.length + 1,
      avatarBg: "purple",
      name: name,
      role: "Customer",
      email: email,
      balance: balance,
      phone: phone,
      emailStatus: "success",
      kycStatus: "alert",
      lastLogin: "10 Feb 2020",
      status: formData.status,
      country: "Bangladesh",
    };
    setData([submittedData, ...data]);
    resetForm();
    setModal({ edit: false }, { add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
    const { name, email, phone } = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarBg: item.avatarBg,
          name: name,
          image: item.image,
          role: item.role,
          email: email,
          balance: editFormData.balance,
          phone: phone,
          emailStatus: item.emailStatus,
          kycStatus: item.kycStatus,
          lastLogin: item.lastLogin,
          status: editFormData.status,
          country: item.country,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
  };
   const [singleobj, Setsingleobj] = useState({})
  // function that loads the want to editted data
  const onEditClick = (id) => {
  
        setModal({ edit: true }, { add: false });
        setEditedId(id);
       let userdatax =  userdata.find((item)=>item.id == id)
       Setsingleobj(userdatax)
  };

  // function to change to suspend property for an item
  const suspendUser = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].status = "Suspend";
    setData([...newData]);
  };

  // function to change the check property of an item
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.checked = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function which fires on applying selected action
  const onActionClick = (e) => {
    if (actionText === "suspend") {
      let newData = data.map((item) => {
        if (item.checked === true) item.status = "Suspend";
        return item;
      });
      setData([...newData]);
    } else if (actionText === "delete") {
      let newData;
      newData = data.filter((item) => item.checked !== true);
      setData([...newData]);
    }
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = (ans)=>{
    let Answer = ans.selected + 1;
    let url = `api/admin/alluser?number=${Answer}`
    apiClient.get('/sanctum/csrf-cookie').then(()=>{
      apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      }).then(res=>{
        if(res.data.success){
          Setuserdata(res.data.success.data)
        }
      })
    })
  }

  const handleDelete = (deleteid)=>{
    // deleteuser
    console.log(deleteid)
    let formData = new FormData();
formData.append('id',  deleteid)
formData.append('_method',  'delete')
let urlxs = 'api/admin/deleteuser'
apiClient.get('/sanctum/csrf-cookie').then(()=>{
  apiClient.post(urlxs, formData, {
    headers: {
      "Authorization": "Bearer " + local.token,
    }
  }).then(res=>{
    if(res.data.success){
      window.location.href = original+'/demo9/user-list-regular'
    }
  })
})
  }


  const handlegetallUser = (e)=>{
    e.preventDefault()
    let url = `api/admin/allusercsv`
    apiClient.get('/sanctum/csrf-cookie').then(async()=>{

     let wait = await apiClient.get(url,   {
        headers:{
          "Authorization":"Bearer "+local.token,
          }
      })


      const blob = new Blob([wait.data], { type: wait.headers['content-type'] });

            // Create a URL for the blob
            const urldownload = window.URL.createObjectURL(blob);
            window.open(urldownload, '_blank');
    })
  }

  return (
    <React.Fragment>
      <Head title="User List - Regular"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h3" page>
                Users Lists 
              </BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total 2,595 users.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button onClick={(e)=>handlegetallUser(e)} color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span onClick={(e)=>handlegetallUser(e)}>Export</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                        <Icon name="plus"></Icon>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    <div className="form-wrap">
                      <RSelect
                        options={bulkActionOptions}
                        className="w-130px"
                        placeholder="Bulk Action"
                        onChange={(e) => onActionText(e)}
                      />
                    </div>
                    <div className="btn-wrap">
                      <span className="d-none d-md-block">
                        <Button
                          disabled={actionText !== "" ? false : true}
                          color="light"
                          outline
                          className="btn-dim"
                          onClick={(e) => onActionClick(e)}
                        >
                          Apply
                        </Button>
                      </span>
                      <span className="d-md-none">
                        <Button
                          color="light"
                          outline
                          disabled={actionText !== "" ? false : true}
                          className="btn-dim btn-icon"
                          onClick={(e) => onActionClick(e)}
                        >
                          <Icon name="arrow-right"></Icon>
                        </Button>
                      </span>
                    </div>
                  </div>
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
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"></Icon>
                                </DropdownToggle>
                                <DropdownMenu
                                  end
                                  className="filter-wg dropdown-menu-xl"
                                  style={{ overflow: "visible" }}
                                >
                                  <div className="dropdown-head">
                                    <span className="sub-title dropdown-title">Filter Users</span>
                                    <div className="dropdown">
                                      <a
                                        href="#more"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                        className="btn btn-sm btn-icon"
                                      >
                                        <Icon name="more-h"></Icon>
                                      </a>
                                    </div>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col size="6">
                                        <div className="custom-control custom-control-sm custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="hasBalance"
                                          />
                                          <label className="custom-control-label" htmlFor="hasBalance">
                                            {" "}
                                            Have Balance
                                          </label>
                                        </div>
                                      </Col>
                                      <Col size="6">
                                        <div className="custom-control custom-control-sm custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="hasKYC"
                                          />
                                          <label className="custom-control-label" htmlFor="hasKYC">
                                            {" "}
                                            KYC Verified
                                          </label>
                                        </div>
                                      </Col>
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Role</label>
                                          <RSelect options={filterRole} placeholder="Any Role" />
                                        </div>
                                      </Col>
                                      <Col size="6">
                                        <div className="form-group">
                                          <label className="overline-title overline-title-alt">Status</label>
                                          <RSelect options={filterStatus} placeholder="Any Status" />
                                        </div>
                                      </Col>
                                      <Col size="12">
                                        <div className="form-group">
                                          <button type="button" className="btn btn-secondary">
                                            Filter
                                          </button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <a
                                      href="#reset"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                      className="clickable"
                                    >
                                      Reset Filter
                                    </a>
                                    <a
                                      href="#save"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Save Filter
                                    </a>
                                  </div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle color="tranparent" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <Icon name="setting"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end className="dropdown-menu-xs">
                                  <ul className="link-check">
                                    <li>
                                      <span>Show</span>
                                    </li>
                                    <li className={itemPerPage === 10 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                    <li className={itemPerPage === 15 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(15);
                                        }}
                                      >
                                        15
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>Order</span>
                                    </li>
                                    <li className={sort === "dsc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        DESC
                                      </DropdownItem>
                                    </li>
                                    <li className={sort === "asc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        ASC
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
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
                <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      onChange={(e) => selectorCheck(e)}
                      id="uid"
                    />
                    <label className="custom-control-label" htmlFor="uid"></label>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span className="sub-text">User</span>
                </DataTableRow>
                <DataTableRow size="mb">
                  <span className="sub-text">phone</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="sub-text">role</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">username</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span className="sub-text">Status</span>
                </DataTableRow>
                {/* <DataTableRow size="md">
                  <span className="sub-text">Status</span>
                </DataTableRow> */}
                <DataTableRow className="nk-tb-col-tools text-end">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      color="tranparent"
                      className="btn btn-xs btn-outline-light btn-icon dropdown-toggle"
                    >
                      <Icon name="plus"></Icon>
                    </DropdownToggle>
                    <DropdownMenu end className="dropdown-menu-xs">
                      <ul className="link-tidy sm no-bdr">
                        <li>
                          <div className="custom-control custom-control-sm custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="bl" />
                            <label className="custom-control-label" htmlFor="bl">
                              Balance
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-control-sm custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="ph" />
                            <label className="custom-control-label" htmlFor="ph">
                              Phone
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-control-sm custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="vri" />
                            <label className="custom-control-label" htmlFor="vri">
                              Verified
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-control-sm custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="st" />
                            <label className="custom-control-label" htmlFor="st">
                              Status
                            </label>
                          </div>
                        </li>
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {userdata.length > 0
                ? userdata.map((item, index) => {
                    return (
                      <DataTableItem key={index}>
                        <DataTableRow className="nk-tb-col-check">
                          <div className="custom-control custom-control-sm custom-checkbox notext">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              defaultChecked={item.checked}
                              id={item.id + "uid1"}
                              key={Math.random()}
                              onChange={(e) => onSelectChange(e, item.id)}
                            />
                            <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                          </div>
                        </DataTableRow>
                        <DataTableRow>
                          <Link to={`${process.env.PUBLIC_URL}/user-details-regular/${item.id}`}>
                            <div className="user-card">
                              {/* <UserAvatar
                                theme={item.avatarBg}
                                text={findUpper(item.name)}
                                image={item.image}
                              ></UserAvatar> */}
                              <div className="user-info">
                                <span className="tb-lead">
                                  {item.lastname+" "+item.firstname}
                                  {/* <span
                                    className={`dot dot-${
                                      item.status === "Active"
                                        ? "success"
                                        : item.status === "Pending"
                                        ? "warning"
                                        : "danger"
                                    } d-md-none ms-1`}
                                  ></span> */}
                                </span>
                                <span>{item.email?item.email:"null"}</span>
                              </div>
                            </div>
                          </Link>
                        </DataTableRow>
                        <DataTableRow size="mb">
                          <span className="tb-amount">
                            {item.phone?item.phone:"null"} 
                          </span>
                        </DataTableRow>
                        <DataTableRow size="md">
                          <span>{item.role?item.role:"null"}</span>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <ul className="list-status">
                            <li>
                             
                              <span>{item.username?item.username:"null"}</span>
                            </li>
                         
                          </ul>
                        </DataTableRow>
                        <DataTableRow size="lg">
                          <span>{item.status == 1?"Active":"InActive"}</span>
                        </DataTableRow>
                        {/* <DataTableRow size="md">
                          <span
                            className={`tb-status text-${
                              item.status === "Active" ? "success" : item.status === "Pending" ? "warning" : "danger"
                            }`}
                          >
                            {item.status}
                          </span>
                        </DataTableRow> */}
                        <DataTableRow className="nk-tb-col-tools">
                          <ul className="nk-tb-actions gx-1">
                            {/* <li className="nk-tb-action-hidden" onClick={() => onEditClick(item.id)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"edit" + item.id}
                                icon="edit-alt-fill"
                                direction="top"
                                text="Edit"
                              />
                            </li> */}
                            {/* {item.status !== "Suspend" && (
                              <React.Fragment>
                                <li className="nk-tb-action-hidden" onClick={() => suspendUser(item.id)}>
                                  <TooltipComponent
                                    tag="a"
                                    containerClassName="btn btn-trigger btn-icon"
                                    id={"suspend" + item.id}
                                    icon="user-cross-fill"
                                    direction="top"
                                    text="Suspend"
                                  />
                                </li>
                              </React.Fragment>
                            )} */}
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu end>
                                  <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onEditClick(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="edit"></Icon>
                                        <span>Edit</span>
                                      </DropdownItem>
                                    </li>


                                    <li onClick={() =>handleDelete(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="delete"></Icon>
                                        <span>Delete</span>
                                      </DropdownItem>
                                    </li>

                                    {/* {item.status !== "Suspend" && (
                                      <React.Fragment>
                                        <li className="divider"></li>
                                        <li onClick={() => suspendUser(item.id)}>
                                          <DropdownItem
                                            tag="a"
                                            href="#suspend"
                                            onClick={(ev) => {
                                              ev.preventDefault();
                                            }}
                                          >
                                            <Icon name="na"></Icon>
                                            <span>Suspend User</span>
                                          </DropdownItem>
                                        </li>
                                      </React.Fragment>
                                    )} */}
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
              {currentItems.length > 0 ? (
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


              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
        {/*  setModal({ edit: false }, { add: false }); */}
        <AddModal modal={modal.add} formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} filterStatus={filterStatus} setModal={setModal} />
        <EditModal modal={modal.edit} formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit}  filterStatus={filterStatus} local={local} editId={editId} apiClient={apiClient} singleobj={singleobj} setModal={setModal}/>
        
      </Content>
    </React.Fragment>
  );
};
export default UserListRegularPage;
