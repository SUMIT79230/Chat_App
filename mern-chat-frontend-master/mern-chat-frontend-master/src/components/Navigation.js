import React from "react";
import { Nav, Navbar, Container, Button, NavDropdown } from "react-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";

function Navigation() 
{
    const user = useSelector((state) => state.user);

    const [logoutUser] = useLogoutUserMutation();

    async function handleLogout(e) 
    {
        e.preventDefault();
        
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
    return (
        <Navbar expand="lg" style={{marginLeft:150,marginTop:8,borderBottomLeftRadius:20 ,height:70,backgroundColor:'black'}}   >
            <Container>

                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} style={{ width:50, height:50 ,marginLeft:-150,marginTop:10 ,borderRadius:'10px'}} />
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="ms-auto">

                        {!user && (
                            <LinkContainer to="/login" style = {{color:'black' ,border:'1px solid white',borderRadius:'10px',marginRight:30,paddingLeft:30,width:100,backgroundColor:"white"}}>
                                 <Nav.Link >Login</Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer to="/chat" style = {{color:'black' ,border:'1px solid white',borderRadius:'10px',paddingLeft:30,width:100,marginRight:10,backgroundColor:'white'}} >
                            <Nav.Link >Chat</Nav.Link>
                        </LinkContainer>

                        {user && (
                            <NavDropdown
                                title={
                                    <>
                                    <span style={{ color: "white", border:'2px solid white', padding:10,paddingBottom:15 ,borderRadius:20 }}>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "10px" }} />
                                        {user.name}</span>
                                    </>
                                }
                                id="basic-nav-dropdown" 
                            >
                                {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item> */}
                  

                                <NavDropdown.Item>
                                    <Button variant="danger" onClick={handleLogout} >
                                        Logout
                                    </Button>
                                </NavDropdown.Item>

                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    
    );
}

export default Navigation;
