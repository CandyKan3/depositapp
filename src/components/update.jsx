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


export default class Update extends Component {
  constructor (props){
  super(props);

  this.state = {
      data: [],
      email: "",
      dates:"",
      sessions: "",
      deposits: "",
      notes: "",
      redirect: false,
      edit: false
    };



  this.renderRedirect = this.renderRedirect.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
  this.deleteSubmit = this.deleteSubmit.bind(this);
  this.editSubmit = this.editSubmit.bind(this);
  this.handleSubmit2 = this.handleSubmit2.bind(this);

}

render(){
   const { data} = this.state;
  const redirectToReferrer = this.state.redirect;
    const editing = this.state.edit;
       if (redirectToReferrer === true) {
         message.success('Client Updated!');
           return <Redirect to="/menu" />
       }
       if(editing){
         return (
           data.map(data=>
           <ul key={data.email}>
           <Form className = "form" onSubmit={this.handleSubmit2} >
             <React.Fragment>
             <Form.Row>
               <Col>
                 <Form.Label>Please enter client's email</Form.Label>
                 <Form.Control placeholder="i.e booking@madetolasttattoo"  value={this.state.email} onChange={ e => this.setState({ email : e.target.value }) } />

               </Col>
               <Col>
                 <Form.Label>Please enter todays date</Form.Label>
                 <Form.Control placeholder="test"value={this.state.date} onChange={ e => this.setState({ date: e.target.value }) }/>
               </Col>
               </Form.Row>
               <Form.Row>
                 <Col>
                   <Form.Label>Please enter number of sessions</Form.Label>
                   <Form.Control value={this.state.sessions} onChange={ e => this.setState({ sessions : e.target.value }) } />

                 </Col>
                 <Col>
                   <Form.Label>Please enter deposit amount</Form.Label>
                   <Form.Control placeholder={this.state.deposits} value={this.state.deposits} onChange={ e => this.setState({ deposits: e.target.value }) }/>
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

             </ul>
           )

       );
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
    <h2>Update deposits</h2>


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
          <Button key="2" variant="danger"onClick={this.deleteSubmit}>
            Delete
          </Button>,
          <Button key="1" type="primary" onClick={this.editSubmit}>
            Edit
          </Button>

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
renderRedirect = () => {
if (this.state.redirect) {
 return <Redirect to='/menu' />
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
    });

  }
  deleteSubmit(event) {
      var that = this;
    console.log("HERE");
      event.preventDefault();
      const data ={"email": that.state.data[0].email}
      console.log(data);
      fetch('/api/delete', {
        method: 'POST',
        headers: {
     'Content-Type':'application/json'
   },
        body: JSON.stringify(data)})

      .then(this.setRedirect)


    }
    editSubmit(event){
      var that = this;
    console.log("HERE");
    this.setState({"date": this.state.data[0].date})
    this.setState({"sessions": this.state.data[0].sessions})
    this.setState({"deposits": this.state.data[0].amount})
    this.setState({"notes": this.state.data[0].notes})

    this.setState({edit: true});
      event.preventDefault();
    }
    handleSubmit2(event){
      console.log("HERE");
        event.preventDefault();
        const data ={"email": this.state.email, "date": this.state.date, "sessions": this.state.sessions, "deposits":this.state.deposits ,"notes": this.state.notes}
        console.log(data);
        fetch('/api/update', {
          method: 'POST',
          headers: {
       'Content-Type':'application/json'
     },
          body: JSON.stringify(data)}
        ).then(res => console.log(res)).then(this.setRedirect);

      }
}
