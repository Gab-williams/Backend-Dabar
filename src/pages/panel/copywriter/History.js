import React, {useState, useEffect} from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, BlockDes, Col, Row, Icon, Button } from "../../../components/Component";
import { Link } from "react-router-dom";
import { history } from "./data/history";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Card } from "reactstrap";
import axios from 'axios';
import { AES, enc } from 'crypto-js';

const History = () => {
    const itemCount = 2;
    const [showCount,setShowCount] = useState(itemCount);
    const [data, Setdata] = useState([])
    let local = localStorage.getItem('thedabar')?JSON.parse(AES.decrypt(localStorage.getItem('thedabar'), 'TheDabar').toString(enc.Utf8)):{}

    const apiClient = axios.create({
        baseURL: "https://dabarmedia.com/",
        withCredentials: true
      });

    useEffect(()=>{


        apiClient.get('/sanctum/csrf-cookie').then( async()=>{
            let urlxx = 'api/admin/stories_unique_date'
        let res  =  await apiClient.get(urlxx,   {
              headers:{
                "Authorization":"Bearer "+local.token,
                }
            })
            if(res.data.success){
            Setdata(res.data.success)  
            }
           

        })

    },[])


  return (
    <React.Fragment>
      <Head title="History"></Head>
      <Content>
        {/* <Block>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
              <h4 className="mb-0">Words Generated</h4>
              <div className="caption-text text-dark">940 <span className="text-base">of 5000 words used.</span></div>
          </div>
          <div className="progress progress-md bg-primary bg-opacity-10 mt-3"> 
              <div className="progress-bar bg-primary" style={{width:"55%"}}></div> 
          </div> 
          <div className="fs-14px text-dark mt-2">To increase your limit, check our <Link to={`${process.env.PUBLIC_URL}/copywriter/pricing-plans`}>Pricing &amp; Plans</Link>.</div>
        </Block> */}
        <Block>
        <div className="nk-history">
            {data.map((item, index)=> {
                  let timez = new Date(item.date)
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
                    <React.Fragment key={data.length}>
                        { 
                                   
                                       

                                        <div key={index} className="nk-history-item">
                                        <div className="nk-history-symbol">
                                            <div className="nk-history-symbol-dot"></div>
                                        </div>
                                        <div className="nk-history-content">
                                            <h5>{formattedDate}</h5>
                                        </div>
                                    </div>
                                    
                            
                        }
                          {item.data.length > 0 && item.data.map((one, inedxz)=>  {
                            return <div key={inedxz} className="nk-history-item">
                                    <div className="nk-history-symbol">
                                        {/* <div className={`nk-history-symbol-dot border-${hitem.template.theme}`}></div> */}
                                    </div>
                                    <div className="nk-history-content">
                                        <VariantCard  item={one} />
                                    </div>
                                </div>
                              
                               
                            }
                        )}
                 
                    
                    </React.Fragment>
                )
            }
            )}

        </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};

const VariantCard = ({item}) =>{
    console.log(item)
    const [copyState, setCopyState] = useState(false);
    const onCopyClick = () => {
        setCopyState(true);
        setTimeout(() => setCopyState(false), 2000);
    };

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
    return(
        <Card>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                        {/* <div className={`user-avatar xs text-${template.theme} bg-${template.theme}-dim`}>
                            <Icon name={template.icon}></Icon>
                        </div> */}
                        <h5 className="fs-14px fw-normal ms-2">{item.heading}</h5>
                    </div>
                    {/* <CopyToClipboard text={item.content} onCopy={onCopyClick}>
                        <Button size="sm" color="blank" className="clipboard-init mx-n2">
                            <span className="clipboard-text align-center"></span>
                            {copyState ? <><Icon name='copy-fill'></Icon><span>Copied</span></> : <><Icon name='copy'></Icon><span>Copy</span></>}
                        </Button>
                    </CopyToClipboard> */}
                </div>
                <p className="lead text-base">
                    {item.presummary}
                </p>
                <ul className="nk-history-meta">
                    <li>{item.formattedDate}</li>
                    <li>{`${item.presummary.split(' ').length} Words / ${item.presummary.trim().length} Characters` }</li>
                </ul>
            </div>
        </Card>
    )
}

export default History;
