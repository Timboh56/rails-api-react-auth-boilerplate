import React, { Component } from 'react';
import PostStore from '../stores/PostStore';
import BaseComponent from './BaseComponent';
import LoadingContainer from './LoadingContainer';
import PostContainer from './PostContainer';
import { Container, Header, Message, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Blog extends BaseComponent {
  constructor() {
    super()
    this.getPosts.bind(this)
    this.getPost.bind(this)
  }

  componentDidMount () {
    this.getPosts()
  }

  getPosts () {
    PostStore.getPosts().then(function(data){
      let posts = PostStore.cachedPosts()
      let first_key = Object.keys(posts)[0];
      this.setState({
        'posts': posts
      })
      this.getPost(first_key)
    }.bind(this))
  }

  getPost (id) {
    PostStore.getPost(id).then(function(data) {
      this.setState({
        'post': data['post']
      })
    }.bind(this)).catch(err => {
      this.setState()
    })
  }

  render() {
    if (this.state && this.state.posts) {
      let posts = this.state.posts

      return(
        <Container>
          <Message>
            <Header>
            {
              Object.keys(posts).map(
                (key) => {
                  return (
                    <PostContainer postKey={ key } />
                  )
                }
              )
            }
            </Header>
          </Message>
        </Container>
      )
    } else {
      return(
        <div>
        </div>
      )
    }

  }

}

export default Blog;
