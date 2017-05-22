import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Username.css';
import BlackUnstyledLink from '../UnstyledLink/BlackUnstyledLink';

class Username extends Component {
  user = this.props.user;
  url = `https://last.fm/user/${this.user}`;

  render() {
    return (
      <BlackUnstyledLink
        className="username"
        href={this.url}
      >
        <span>{this.user}</span>
      </BlackUnstyledLink>
    );
  }
}

Username.propTypes = {
  user: PropTypes.string.isRequired,
};
Username.defaultProps = {};

export default Username;
