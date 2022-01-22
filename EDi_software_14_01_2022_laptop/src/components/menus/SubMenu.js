import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
   margin-left:10px;
  list-style: none;
   alignItems: center;
  height: 50px;
  text-decoration: none;
  font-size: 15px;

  &:hover {
    background:gray;
    border-left: 4px solid #632ce4;
    color:white;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 20px;
`;

const DropdownLink = styled(Link)`
  background: white;
  height: 40px;
  padding-left: 3px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid khaki;
  font-size: 12px;

  &:hover {
    background: gray;
    border-left: 4px solid blue;
    color:white;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
