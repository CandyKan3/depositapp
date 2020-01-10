import { Button, Card, Col, Row} from 'antd';
import Logo from './tatlogo2.png';
import { Redirect } from 'react-router-dom'
import React from 'react';
export default class Menu extends React.Component {
  constructor (props){
  super(props);

  this.state = {

      deposit: false,
      checkout:  false,
      update: false

    };




}

  setDeposit = () => {
this.setState({
deposit: true
})
}
setCheckout = () => {
this.setState({
checkout: true
})
}
setUpdate = () => {
this.setState({
update: true
})
}
  render() {
    const redirectToReferrer = this.state.deposit;
     if (redirectToReferrer === true) {
         return <Redirect to="/deposit" />
     }
     const redirectToReferrer2 = this.state.checkout;
      if (redirectToReferrer2 === true) {
          return <Redirect to="/checkout" />
      }
      const redirectToReferrer3 = this.state.update;
       if (redirectToReferrer3 === true) {
           return <Redirect to="/update" />
       }
    return (
      <div>
      <Row gutter={6}>
      <Col span={8}>

      </Col>
      <Col span={8}>
<img src={Logo} height="400" width="400" />
      <br>
      </br>
      <Card>
          <Button size="large"block onClick={this.setDeposit}>
            New Deposit
          </Button>
          <Button block size="large" onClick={this.setCheckout}>Checkout</Button>
          <Button block size="large" onClick={this.setUpdate}>Update Appointments</Button>

          </Card>
          </Col>
          </Row>
        </div>
    )};
  }
