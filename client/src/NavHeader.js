import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsIndex from './ProductsIndex';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import Account from './Account';
import Auth from './actions/Auth';
import LoginForm from './LoginForm';

export default class NavHeader extends React.Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  logout() {
    Auth.logout().then(data => {
      debugger
    })
  }

  render() {
    const { visible } = this.state
    if (this.props.signedIn && this.props.signedIn== true) {
      return (
        <div>
          <Button onClick={this.toggleVisibility}>
            Toggle Visibility
          </Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              direction='left'
              visible={ visible }
              icon='labeled'
              vertical
              inverted
            >

              <Menu.Item as={ Link } to='/' name='home'>
                <Icon name='home' />
                Account
              </Menu.Item>
              <Menu.Item onClick={ this.logout.bind(this) }>
                <Icon name='arrow left' />
                Logout
              </Menu.Item>
              <Menu.Item as={ Link } to='/products' name='shop'>
                <Icon name='shop' />
                Products
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher value='hi'>
              { this.props.children }
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      );
    } else {
      return(
        <div>
          <Button id='sidebar-btn' onClick={this.toggleVisibility}>
            <Icon name='sidebar' />
          </Button>
          <Sidebar.Pushable id='nav-sidebar' as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              direction='left'
              visible={ visible }
              icon='labeled'
              vertical
              inverted
            >
              <Menu.Item as={ Link } to='/login' name='home'>
                <Icon name='home' />
                Login
              </Menu.Item>
              <Menu.Item as={ Link } to='/signup' name='home'>
                <Icon name='user' />
                Register
              </Menu.Item>
              <Menu.Item as={ Link } to='/products' name='shop'>
                <Icon name='shop' />
                Products
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              { this.props.children }
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      )
    }
  }
}
