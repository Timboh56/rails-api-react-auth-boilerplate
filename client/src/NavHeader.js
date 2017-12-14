import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsIndex from './ProductsIndex';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

const Account = () => (
  <div>
    <h2>Account</h2>
  </div>
)
export default class NavHeader extends React.Component {
  render() {
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
          <div className='container'>
            <Header as='h3'>Application Content</Header>
            <Route path="/account" component={Account}/>
            <Route path="/products" component={ProductsIndex}/>
            { this.props.children }
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      </div>
    );
  }
}
