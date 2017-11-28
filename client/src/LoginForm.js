import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class LoginForm extends Component {
  handleSubmit() {

  }

  render() {
      return(
        <Form onSubmit={ this.handleSubmit }>
          <Form.Field>
            <label>Email</label>
            <input value={ this.state.email } placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type='password' placeholder='Password' value={ this.state.password } />
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
