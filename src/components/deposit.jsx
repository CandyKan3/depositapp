import React, { Component} from "react";
import Logo from "./tatlogo2.png";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Redirect } from 'react-router-dom';
import { PageHeader, message } from 'antd';


export default class Login extends Component {
  constructor (props){
  super(props);

  this.state = {
      email: "",
      dates: "",
      sessions: "",
      deposits: "",
          notes: "",
      redirect: false,
      success: false,
    };


  this.handleSubmit = this.handleSubmit.bind(this);
  this.renderRedirect = this.renderRedirect.bind(this);


}

render(){
      const success= this.state.success;
  const redirectToReferrer = this.state.redirect;
       if (redirectToReferrer === true) {
message.success('Deposit made!');
           return <Redirect to="/menu" />
       }

  return (
    <div class="form-group">
    <Container className="App">
    <br>
    </br>
    <PageHeader
        ghost={false}
        title=" "
          onBack={() => window.location="/menu"}
          / >
    <h2>Create a Deposit</h2>

          <Form className = "form" onSubmit={this.handleSubmit} >
            <React.Fragment>
            <Form.Row>
              <Col>
                <Form.Label>Please enter client's email</Form.Label>
                <Form.Control placeholder="i.e booking@madetolasttattoo"  value={this.state.email} onChange={ e => this.setState({ email : e.target.value }) } />

              </Col>
              <Col>
                <Form.Label>Please enter todays date</Form.Label>
                <Form.Control placeholder="01/01/2020" value={this.state.dates} onChange={ e => this.setState({ dates: e.target.value }) }/>
              </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Please enter number of sessions</Form.Label>
                  <Form.Control placeholder="i.e 4"  value={this.state.sessions} onChange={ e => this.setState({ sessions : e.target.value }) } />

                </Col>
                <Col>
                  <Form.Label>Please enter deposit amount</Form.Label>
                  <Form.Control placeholder="100$" value={this.state.deposits} onChange={ e => this.setState({ deposits: e.target.value }) }/>
                </Col>
                </Form.Row>


              <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows="3" name = "notes" value={this.state.notes} onChange={ e => this.setState({ notes: e.target.value }) }/>
              </Form.Group>



    <Button variant="primary" type="submit">
      Submit
    </Button>

    </React.Fragment>


          </Form>

          </Container>
    </div>
  );
}
setRedirect = () => {
this.setState({
  redirect: true
})
}
renderRedirect = () => {
if (this.state.redirect) {
 return <Redirect to='/menu' />
}
}
handleSubmit(event) {
  console.log("HERE");
    event.preventDefault();
    const data ={"email": this.state.email, "date": this.state.dates, "sessions": this.state.sessions, "deposits":this.state.deposits ,"notes": this.state.notes}
    console.log(data);
    fetch('/api/meeting', {
      method: 'POST',
      headers: {
   'Content-Type':'application/json'
 },
      body: JSON.stringify(data)}
    ).then(res => console.log(res)).then(this.setRedirect);

  }
}
