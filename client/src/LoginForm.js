import React, { Component } from 'react'
import BaseComponent from './BaseComponent'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import Auth from './lib/Auth';
import PasswordMask from 'react-password-mask';

const auth = new Auth()

class LoginForm extends BaseComponent {

  handleSubmit(e) {
    let password = document.getElementById('password-field').value
    let email = document.getElementById('email-field').value
    auth.login(email, password)
  }

  componentWillMount() {
    this.setState({})
  }

  render() {
    return(
      <Form onSubmit={ this.handleSubmit.bind(this) }>
        <Form.Field>
          <label>Email</label>
          <input id='email-field' value={ this.state.email } placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <PasswordMask
            id="password-field"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default LoginForm
