import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsIndex from './ProductsIndex';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import Account from './Account';
import Auth from './lib/Auth';
import LoginForm from './LoginForm';

export default class NavHeader extends React.Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  logout() {
    Auth.logout().then(data => {
      debugger
    })
  }

  render() {
    const { visible } = this.state
    if (this.props.signed_in && this.props.signed_in == true) {
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
              direction='right'
              visible={ visible }
              icon='labeled'
              vertical
              inverted
            >

              <Menu.Item name='home'>
                <Icon name='home' />
                <Link to="/account">Account</Link>
              </Menu.Item>
              <Menu.Item name='home' onClick={ this.logout.bind(this) }>
                <Icon name='logout' />
                Logout
              </Menu.Item>
              <Menu.Item name='shop'>
                <Icon name='shop' />
                <Link to="/products">Products</Link>
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
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
              <Menu.Item name='home'>
                <Icon name='home' />
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item name='home' onClick={ this.logout.bind(this) }>
                <Icon name='logout' />
                <Link to="/logout">Logout</Link>
              </Menu.Item>
              <Menu.Item name='home'>
                <Icon name='user' />
                <Link to="/register">Register</Link>
              </Menu.Item>
              <Menu.Item name='shop'>
                <Icon name='shop' />
                <Link to="/products">Products</Link>
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
