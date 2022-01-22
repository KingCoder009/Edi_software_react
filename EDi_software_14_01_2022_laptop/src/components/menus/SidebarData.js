import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Master',
    path:"#",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Country',
        path: '/master/getcountry',
        cName: 'sub-nav'
      },
      {
        title: 'State',
        path: '/master/delivery_state_setails',
        cName: 'sub-nav'
      },
      {
        title: 'ClearanceLocetion',
        path: '/master/clr/loc',
        cName: 'sub-nav'
      },
   
	  {
        title: 'Orgin.CargoCompany/Orgin.Customer',
        path: '/master/clr/origin',
        cName: 'sub-nav'
      },
 
	  {
        title: 'Parent Orgin Customer',
        path: '/master/prnt/origin',
       cName: 'sub-nav'
      },
	  {
        title: 'Clearance Organizetion',
        path: '/master/clr/organizetion',
        cName: 'sub-nav'
      },
	  {
        title: 'Company',
        path: '/master/company',
        cName: 'sub-nav'
      },
	  {
        title: 'Designetion',
        path: '/master/designetion',
        cName: 'sub-nav'
      },
	  {
        title: 'Department',
        path: '/master/dprtmnt',
        cName: 'sub-nav'
      },
	  {
        title: 'Emplayee',
        path: '/master/employe',
        cName: 'sub-nav'
      },
	  {
        title: 'Transist Type',
        path: '/master/trnstyp',
       cName: 'sub-nav'
      },
	  {
        title: 'ShipmentCompany',
        path: '/master/shpmnt/cmpny',
        cName: 'sub-nav'
      },
	  {
        title: 'Items Value',
        path: '/master/itemdetails',
        cName: 'sub-nav'
      },
      
    ],
    
  },
  {
    title:"kyc",
    path:"/kyc/SenderRecever",
    icon: <IoIcons.IoIosPaper />,
},
  {
    title: 'Reports',
    path:"#",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Clearance Document',
        path: '/reports/clr_docs',
        cName: 'sub-nav'
      },
      // {
      //   title: 'MAWB Tracking',
      //   path: '/reports/reports2',
      //   cName: 'sub-nav'
      // },
      {
        title: 'EDI Documents',
        path: '/reports/edi_docs',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Operation',
    path:"#",
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'MAWB-Invoice Entry',
        path: '/operation/mawb_invoice_entry',
        cName: 'sub-nav'
      },
      {
        title: 'Invoice Entry Updation',
        path: '/operation/invoic_updetion',
        cName: 'sub-nav'
      },
      {
        title: 'Data Correction',
        path: '/operation/data_crction',
        cName: 'sub-nav'
      },
      {
        title: 'IGM Generetion',
        path: '/operation/igm_genaretion',
        cName: 'sub-nav'
      }
    ]
  },
  
];
