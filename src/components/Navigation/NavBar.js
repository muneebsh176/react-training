import React, { useState } from 'react'
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler
} from 'reactstrap'

import { NavLink as RRNavLink } from 'react-router-dom'

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="#">GitHub Repos Summary</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/commits/">
                Commits
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/summary/">
                Summary
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>{user}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar
