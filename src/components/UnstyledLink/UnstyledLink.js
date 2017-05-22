import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UnstyledLink.css';

class UnstyledLink extends Component {
  className = `${this.props.className} unstyled-link`;

  render() {
    return (
      <a
        title={this.props.title}
        rel="noopener noreferrer"
        target="_blank"
        style={this.props.style}
        className={this.className}
        href={this.props.href}
      >
        {this.props.children}
      </a>
    );
  }
}

UnstyledLink.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
UnstyledLink.defaultProps = {
  title: '',
  className: '',
  style: {},
  href: '',
};

export default UnstyledLink;
