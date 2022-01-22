import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink,
     MDBContainer, MDBIcon, MDBBtn } from "mdbreact";
import { AiOutlineUser } from "react-icons/ai";

class SideNavPage extends Component {
  state = {
    sideNavLeft: false,
  }

sidenavToggle = sidenavId => () => {
  const sidenavNr = `sideNav${sidenavId}`
  this.setState({
    [sidenavNr]: !this.state[sidenavNr]
  });
};

render() {
    return (
      <Router>
        <MDBContainer>
          <MDBBtn onClick={this.sidenavToggle("Left")}>
            <MDBIcon size="lg" icon="bars" />
          </MDBBtn>
          <MDBSideNav slim fixed mask="rgba-blue-strong" triggerOpening={this.state.sideNavLeft} breakWidth={1300}
            className="sn-bg-1">
            <li>
              <div className="logo-wrapper sn-ad-avatar-wrapper">
                <a href="#!">
                  <AiOutlineUser className="rounded-circle" />
                  <span>Anna Deynah</span>
                </a>
              </div>
            </li>

            <MDBSideNavNav>
              <MDBSideNavLink to="/other-page" topLevel>
                <MDBIcon icon="pencil-alt" className="mr-2" />Submit listing</MDBSideNavLink>
              <MDBSideNavCat name="Submit blog" id="submit-blog" icon="chevron-right">
                <MDBSideNavLink>Submit listing</MDBSideNavLink>
                <MDBSideNavLink>Registration form</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="Instruction" id="instruction" icon="hand-pointer" href="#">
                <MDBSideNavLink>For bloggers</MDBSideNavLink>
                <MDBSideNavLink>For authors</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="About" id="about" icon="eye">
                <MDBSideNavLink>Instruction</MDBSideNavLink>
                <MDBSideNavLink>Monthly meetings</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="Contact me" id="contact-me" icon="envelope">
                <MDBSideNavLink>FAQ</MDBSideNavLink>
                <MDBSideNavLink>Write a message</MDBSideNavLink>
              </MDBSideNavCat>
            </MDBSideNavNav>
          </MDBSideNav>
        </MDBContainer>
      </Router>
    );
  }
}

export default SideNavPage;
/*  <AppBar>
        <Toolbar>
<FormControl required  className={classes.formControl}>
        <InputLabel>Country</InputLabel>
        <Select
           value={values.drp_countryId}
          onChange={(e) => setValues({...values,drp_countryId: e.target.value})}autoComplete="off">
          <MenuItem className="p-0" value={values.txt_selectedCountryID} selected disabled={true}>---- SELECT ----</MenuItem>
                                        {
                                           drpcountry.map((countrys) =>
                                                <MenuItem key={countrys.countryId}
                                                    value={countrys.countryId}>
                                                    {countrys.countryName}
                                                </MenuItem>
                                            )
                                        }
        </Select>
      </FormControl>
    <FormControl required className={classes.formControl} >
        <InputLabel>Filter by Orgine</InputLabel>
        <Select
           value={values.drp_countryId}
          onChange={(e) => setValues({...values,drp_countryId: e.target.value})}autoComplete="off">
          <MenuItem className="p-0" value={values.txt_selectedCountryID} selected disabled={true}>---- SELECT ----</MenuItem>
        </Select>
      </FormControl>
      <Typography  className={classes.title} >
            MAWB-Invoice Entry
          </Typography>
      </Toolbar>
    </AppBar> */