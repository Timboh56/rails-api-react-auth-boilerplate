import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsIndex from './ProductsIndex';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import Account from './Account';
import LoginForm from './LoginForm';

export default class NavHeader extends React.Component {
  render() {
    if (this.props.signed_in && this.props.signed_in == true) {
      return (
        <div>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              width='thin'
              direction='right'
              visible='true'
              icon='labeled'
              vertical
              inverted
            >

              <Menu.Item name='home'>
                <Icon name='home' />
                <Link to="/account">Account</Link>
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
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            width='thin'
            direction='right'
            visible='true'
            icon='labeled'
            vertical
            inverted
          >

            <Menu.Item name='home'>
              <Icon name='home' />
              <Link to="/login">Login</Link>
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
      )
    }
  }
}
