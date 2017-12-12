import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsIndex from './ProductsIndex';
const Account = () => (
  <div>
    <h2>Account</h2>
  </div>
)
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div id="navbar-collapse" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/products">Products</Link></li>
              </ul>
              <div className="nav navbar-nav navbar-right">
              </div>
            </div>
          </div>
        </nav>
        <Route path="/account" component={Account}/>
        <Route path="/products" component={ProductsIndex}/>
        { this.props.children }
      </div>
    );
  }
}
