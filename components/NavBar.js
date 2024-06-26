/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#292929' }} variant="dark">
      <Container>
        <Link passHref href="/">
          {/* <Navbar.Brand>HHPW</Navbar.Brand> */}
          <img
            src="https://i.ibb.co/tC4GqkH/hhpw.png"
            alt="hhpw_logo"
            style={{ width: '75px', height: '75px' }}
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/orders">
              <Nav.Link>View Orders</Nav.Link>
            </Link>
            <Link passHref href="/order/new">
              <Nav.Link>Create Order</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>View Revenue</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
