import React, { Component } from 'react'
import BaseComponent from './BaseComponent'
import { Message, Button, Checkbox, Form, Container } from 'semantic-ui-react'
import Auth from './lib/Auth';
import PasswordMask from 'react-password-mask';

class RegistrationForm extends BaseComponent {

  handleSubmit(e) {
    let password = document.getElementById('password-field').value
    let email = document.getElementById('email-field').value
    Auth.register(email, password).then(function(data) {
      if (data.errors) {
        this.setState({
          'errors': data.errors,
          'loggedIn': false
        })
      } else {
        this.setState({
          'loggedIn': true
        })
      }
    }.bind(this))
  }

  render() {
    if (this.state && this.state['loggedIn'] == true) {
      return(
        <div classnames='flash flash-message alert alert-info'>
          <h2> Succesfully registered and logged in! </h2>
        </div>
      )
    } else {
      return(
        <Container>
          <h2> Register </h2>
          <Form onSubmit={ this.handleSubmit.bind(this) }>
              { this.state && this.state.errors && <Message>
                                { this.state.errors.join(", ") }
                            </Message>
              }
            <Form.Field>
              <label>Email</label>
              <input id='email-field' placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <PasswordMask
                id="password-field"
                name="password"
                placeholder="Enter password"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Register</Button>
          </Form>
        </Container>
      )

    }
  }
}

export default RegistrationForm
