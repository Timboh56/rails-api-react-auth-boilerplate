import React, { Component } from 'react';
import BaseComponent from './BaseComponent';
import { Header, Container} from 'semantic-ui-react'
import PostStore from '../stores/PostStore';

class PostContainer extends BaseComponent {
  componentWillMount() {
    let key = this.props.postKey
    let post = PostStore.getPost(key).then(data => {
      this.setState(data)
    })
  }
  render(){
    let postKey = this.props.postKey
    let post = PostStore.getPost(postKey)
    return(
      <Container className='post-container'>
        <Header as='h2'>
          { post.title }
        </Header>
        <div className='row'>
          { post.content }
        </div>
      </Container>
    )
  }

}

export default PostContainer;
