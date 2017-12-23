import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Sidebar, Container, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

export default class Account extends React.Component {
  render() {
    return(
      <div>
        <Container text>
          <Header as='h2' icon textAlign='center'>
            <Icon name='home' circular />
            <Header.Content>
              Account
            </Header.Content>
          </Header>
          <div className='row'>
            <div className='column'>

            </div>
          </div>
        </Container>
        <Container text>
        </Container>
      </div>
    )
  }
}
