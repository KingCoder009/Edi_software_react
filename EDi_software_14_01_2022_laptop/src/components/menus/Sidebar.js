import React, { useState } from 'react';
import styled from 'styled-components';
import {FiLogOut}from 'react-icons/fi';
import {AiFillCaretRight ,AiFillCloseCircle}from 'react-icons/ai';
import { Button, Navbar } from 'react-bootstrap';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { getUser,getDate,removeUserSession} from '../Utils/Common';


const SidebarNav = styled.nav`
  background:rgb(5, 172, 201);
  width: 200px;
  height: 90vh;
  display: flex;
  margin-top:70px;
  justify-content: center;
  position: fixed;
  
    top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;


const Sidebar = () => {
  const [menuBar , setMenubar] = useState(true)
  const [sidebar, setSidebar] = useState(false);
  const handleLogout = () => {
    removeUserSession();
    window.location.replace("/ediimports");  
  }
  const showSidebar = () =>{ 
    setSidebar(!sidebar)
    setMenubar(!menuBar)
  };

  return (
    <>
<div >
        <Navbar fixed="top" style={{background:"rgb(5, 172, 201)"}} expand="" className="p-3 font-bold font-serif">
                <div style={{fontSize:"13px"}}>
                 <div style={{color:"rgb(245, 241, 241)"}} >
                <b>Welcome: </b><label >{getUser()}</label>
                  <br/>
                 <b>Date: </b><label >{getDate()}</label>
                 </div>
                 </div>
                        <b><h3 style={{color:"white"}}>EDI IMPORT CLEARANCE</h3></b>
                      <Button className="p-1 w-20" onClick={handleLogout} ><FiLogOut style={{marginLeft:"2rem"}} size="20"/></Button>
                    </Navbar>
                    <div className="sidenav">
             {menuBar ? <span onMouseEnter={showSidebar} className="MenuBar"><AiFillCaretRight   style={{marginTop:"45vh"}} size="20px"/>
                 </span> : null }</div>
                    <br/>                    
              <SidebarNav sidebar={sidebar} onMouseLeave={showSidebar}>
            
                <div className="scrollbar scrollbar-primary" style={{width:"100%"}}>
            {/* <SidebarWrap > */}
            <span  className="about"><AiFillCloseCircle onClick={showSidebar} style={{marginLeft:"150px",marginTop:"10%",color:"white"}} size="20px"/> 
             </span>
             {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          {/* </SidebarWrap> */}
          </div>
        </SidebarNav>
      </div>
    </>
  );
};

export default Sidebar;
/**/