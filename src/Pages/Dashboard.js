import React, { useState } from 'react';

// Assets
import NavbarLogo from './../Assets/navbaerLogo.svg';
import NavbarAvatar from './../Assets/navbarAvatar.svg';

// Libraries
import { useHistory } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import { Container, Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
// Components
import CustomCard from './../Components/Card';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  // ==============================================
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Content, setContent] = useState("");
  const [Gender, setGender] = useState("");
  // ================================================


  // ==================================================

  const createUser = () => {
    const User = {
      userName: Name,
      userEmail: Email,
      userGender: Gender,
      userContent: Content
    }

    const newAllUsers = JSON.parse(localStorage.getItem("allUsers"));
    newAllUsers.push(User);
    localStorage.setItem("allUsers", JSON.stringify(newAllUsers));
  }


  // =======================================================



  let history = useHistory();

  // Logout
  const logout = () => {
    localStorage.clear();
    history.push('/');
  }

  // Modal
  const [modal, setModal] = useState(false);

  const toggleM = () => setModal(!modal);



  // Grab all users from localStroage
  let AllUsers = JSON.parse(localStorage.getItem("allUsers"));

  return (
    <>
      <Navbar color="white" className="border-bottom" light expand="md">
        <Container>
          <NavbarBrand href="/">
            <img src={NavbarLogo} className="img-fluid" />
          </NavbarBrand>

          {/* <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>

            <Nav className="m-auto" navbar>
              
              <NavItem>
                <NavLink style={{ textDecoration: "none" }} activeClassName="activeClass" className="text-dark" to="/dashboard">Home</NavLink>
              </NavItem>

              <NavItem>
                <NavLink style={{ textDecoration: "none" }} activeClassName="activeClass" className="text-dark ml-md-3" to="/d">Profile</NavLink>
              </NavItem>

            </Nav>
          </Collapse> */}

          <UncontrolledDropdown >
            <DropdownToggle tag="div" caret>
              <img src={NavbarAvatar} className="img-fluid" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}>Logout</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Profile</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

        </Container>
      </Navbar>

      <Container className="my-3">

        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleM}>
          <ModalHeader toggle={toggleM}>Add New</ModalHeader>
          <ModalBody>
            <div>
              <FormGroup>
                <Label className="grayColor mb-1" for="name">Name</Label>
                <Input onChange={(e) => setName(e.target.value)} className="inputBg border-0 rounded-sm" type="text" name="name" id="name" placeholder="Jonathan monroe" />
              </FormGroup>

              <FormGroup className="mt-4">
                <Label className="grayColor mb-1" for="name">Gender</Label>
                <Input onChange={(e) => setGender(e.target.value)} className="inputBg border-0 rounded-sm" type="select" name="select" id="exampleSelect">
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </Input>
              </FormGroup>

              <FormGroup className="mt-4">
                <Label className="grayColor mb-1" for="exampleEmail">Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} className="inputBg border-0 rounded-sm" type="email" name="email" id="exampleEmail" placeholder="johnmartin@email.com" />
              </FormGroup>

              <FormGroup className="mt-4">
                <Label className="grayColor mb-1" for="exampleText">Content</Label>
                <Input onChange={(e) => setContent(e.target.value)} className="inputBg border-0 rounded-sm" type="textarea" name="text" id="exampleText" />
              </FormGroup>


              <div className="mt-4">&nbsp;</div>

              <button onClick={() => {
                createUser();
                toggleM();
              }} className="btn btn-danger btn-block btn-lg rounded-sm mb-2">
                <span style={{ fontSize: "16px" }}>Create</span>
              </button>

            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>



        <Row>
          <Col md="4">
            <Card onClick={toggleM} className="text-center grayColor border-dashed mt-3" style={{ height: "278px", cursor: "pointer" }}>
              <CardBody className="d-flex flex-column justify-content-center align-items-center">

                <span className="h4">
                  <FiPlus />
                </span>

                <p className="font18">
                  Add New
                </p>
              </CardBody>
            </Card>
          </Col>

          {AllUsers ?
            <>
              {AllUsers.map(user => {
                return (
                  <Col key={user.userName} md="4">
                    <CustomCard gender={user.userGender} name={user.userName} email={user.userEmail} />
                  </Col>
                );
              })}
            </>
            : null}


        </Row>



      </Container>
    </>
  )
}

export default Dashboard
