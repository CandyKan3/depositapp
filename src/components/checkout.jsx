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
import { PageHeader, Tabs, Statistic, Descriptions, message } from 'antd';


export default class Login extends Component {
  constructor (props){
  super(props);

  this.state = {
      data: [],
      email: "",
      redirect: false,
      redirect2: false
    };


  this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  this.renderRedirect = this.renderRedirect.bind(this);
    this.renderRedirect2 = this.renderRedirect2.bind(this);


}

render(){
   const { data} = this.state;
  const redirectToReferrer = this.state.redirect;
       if (redirectToReferrer === true) {
         message.success('Checkout Completed!');
           return <Redirect to="/menu" />
       }
       const redirectToReferrer2 = this.state.redirect2;
            if (redirectToReferrer2 === true) {
              message.success('Checkout Completed!');
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
    <h2>Checkout</h2>


          <Form className = "form" onSubmit={this.handleSubmit} >
            <React.Fragment>
            <Form.Row>
              <Col>
                <Form.Label>Please enter client's email</Form.Label>
                <Form.Control placeholder="i.e booking@madetolasttattoo"  value={this.state.email} onChange={ e => this.setState({ email : e.target.value }) } />
                <br>
                </br>
                <Button variant="primary" type="submit">
                  Lookup
                </Button>
              </Col>


<br></br>
</Form.Row>
{data.map(data=>
  <ul key={data.email}>
  <PageHeader
      ghost={false}
        onBack={() => window.history.back()}
        title={data.email}
        subTitle="Client"
        extra={[
          <Button key="1" type="primary" onClick={this.handleSubmit2}>
            Checkout
          </Button>,
        ]} >

        <Descriptions size="Large" column={3}>
          <Descriptions.Item label="Number of Sessions">{data.sessions}</Descriptions.Item>
          <Descriptions.Item label="Date Created">{data.date}</Descriptions.Item>
              <Descriptions.Item label="Notes">{data.notes}</Descriptions.Item>
          <Descriptions.Item>
          <Statistic title="Deposit" prefix="$" value={data.amount} />
          </Descriptions.Item>

        </Descriptions>
        </PageHeader>

  </ul>
)}


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
setRedirect2 = () => {
this.setState({
  redirect2: true
})
}
renderRedirect = () => {
if (this.state.redirect) {
 return <Redirect to='/menu' />
}
}
renderRedirect2 = () => {
if (this.state.redirect2) {
 return <Redirect to='/total' />
}
}
handleSubmit(event) {
    var that = this;
  console.log("HERE");
    event.preventDefault();
    const data ={"email": this.state.email}
    console.log(data);
    fetch('/api/checkout', {
      method: 'POST',
      headers: {
   'Content-Type':'application/json'
 },
      body: JSON.stringify(data)})

    .then(res => res.json())
    .then(function(data) {

      that.setState({ data: data.title });
    if(data.title ==""){
           message.error('No deposit with that email!');
        }
    });

  }
  handleSubmit2(event) {
      var that = this;
    console.log(that.state.data[0], "DATA");
      event.preventDefault();
      let data ={"sessions": that.state.data[0].sessions, "email": that.state.data[0].email}
      console.log(data);
      fetch('/api/total', {
        method: 'POST',
        headers: {
     'Content-Type':'application/json'
   },
        body: JSON.stringify(data)})

      .then(res => console.log(res)).then(this.setRedirect2)


    }
}
