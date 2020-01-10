import { Form, Icon, Input, Button, Checkbox, Card, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

        console.log('Received values of form: ', e.user)
        this.setRedirect();

      }
      setRedirect = () => {
this.setState({
  redirect: true
})
}

      constructor (props){
      super(props);

      this.state = {
          names: "",
          dates: "",
          notes: "",
          redirect: false
        };


      this.handleSubmit = this.handleSubmit.bind(this);


    }


  render() {
    const redirectToReferrer = this.state.redirect;
     if (redirectToReferrer === true) {
         return <Redirect to="/menu" />
     }
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={6}>
      <Col span={8}>

      </Col>
      <Col span={8}>
        <Card title="Login" bordered={false}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>

              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username" id = "user"
              />
          </Form.Item>
          <Form.Item>

              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
          </Form.Item>
          <Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>

          </Form.Item>
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
        </Form>
        </Card>


      </Col>
    </Row>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br><br>
    </br>
      </div>
    );
  }
}
