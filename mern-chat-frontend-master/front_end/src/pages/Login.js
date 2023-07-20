import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";

function Login() 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { socket } = useContext(AppContext);

    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    function handleLogin(e) {
        e.preventDefault();

        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                socket.emit("new-user");
                navigate("/chat");
            }
        });
    }

    return (
        <Container>
            <Row>

                <div className="master">
                <Col md={5} className="login__bg" style={{width:"50%", marginTop:80}}></Col>
                
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column"  style={{marginLeft:"-174px"}}>
                <hr className = "vertical_line"  />

                    {/* <Form style={{ width: "80%", maxWidth: 500,border:'solid 1px black',paddingLeft:20,paddingRight:20,paddingTop:270,borderRadius:'20px'}} onSubmit={handleLogin}> */}
                    
                    <Form className ="Login_form_outside" onSubmit={handleLogin}>
                    <div className ="form_inner ">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {error && <p className="alert alert-danger">{error.data}</p>}
                            <div className="text-login">Welcome to Chat-App</div>
                            <br></br>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <Form.Text className="text-muted">* Don't share your email with anyone else.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>

                        
                        <Button variant="primary" type="submit">
                            {isLoading ? <Spinner animation="grow" /> : "Login"}
                        </Button>

                        <div className="py-4">
                            <p className="text-center">
                                Don't have an account ? <Link to="/signup">Signup</Link>
                            </p>
                        </div>

                        </div> 
                    </Form>
                        
                      
                    
                </Col>
                </div>
            </Row>
        </Container>
    );
}

export default Login;
