import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsIndex from './ProductsIndex';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container } from 'semantic-ui-react'
import Account from './Account';
import Auth from '../actions/Auth';
import LoginForm from './LoginForm';
import UserStore from '../stores/UserStore';
import '../css/aos.css';

export default class NavHeader extends React.Component {
  constructor() {
    super()
    UserStore.addChangeListener(this.onChange.bind(this))
  }

  onChange() {
    this.setState({
      'signed_in': UserStore.isAuthenticated()
    })

  }

  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  logout() {
    Auth.logout()
  }

  render() {
    const { visible } = this.state
    if (this.props.signedIn && this.props.signedIn== true) {
      return (
        <div>
          <Button
            className={
              (this.state.visible == false ? 'unlit-button transition' : 'transition') }
              id='sidebar-btn'
              onClick={this.toggleVisibility}
            >
            <Icon name='sidebar' />
          </Button>
          <Sidebar
            as={Menu}
            id='nav-sidebar'
            animation='push'
            width='thin'
            visible={visible}
            icon='labeled'
            vertical
            inverted
          >
            <Menu.Item as={ Link } to='/' name='home'>
              <Icon name='home' />
              Account
            </Menu.Item>
            <Menu.Item as={ Link } to='/blog' name='shop'>
              <Icon name='chat' />
              Blog
            </Menu.Item>
            <Menu.Item as={ Link } to='/products' name='shop'>
              <Icon name='shop' />
              Shop
            </Menu.Item>
            <Menu.Item onClick={ this.logout.bind(this) }>
              <Icon name='arrow left' />
              Logout
            </Menu.Item>
          </Sidebar>
          <div className='pll'>
            { this.props.children }
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <Button
            className={
              (this.state.visible == false ? 'unlit-button transition' : 'transition') }
              id='sidebar-btn'
              onClick={this.toggleVisibility}
            >
            <Icon name='sidebar' />
          </Button>
          <Sidebar
            as={Menu}
            id='nav-sidebar'
            animation='push'
            width='thin'
            visible={visible}
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
          <div className='pll'>
            { this.props.children }
          </div>
        </div>
      )
    }
  }
}
