import React, { Component } from 'react';
import PostStore from '../stores/PostStore';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
=import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Blog extends BaseComponent {
  constructor() {
    super()
    this.onClose.bind(this)
    this.getPosts.bind(this)
    this.getPost.bind(this)
  }

  getPosts () {
    PostStore.getPosts().then(function(data){
      let products = PostStore.cachedPosts()
      let first_key = Object.keys(products)[0];
      this.setState({
        'products': products
      })
      this.getPost(first_key)
    }.bind(this))
  }

  getPost (id) {
    PostStore.getPost(id).then(function(data) {
      this.setState({
        'product': data['product']
      })
    }.bind(this)).catch(err => {
      this.setState()
    })
  }

}

export default Blog;
