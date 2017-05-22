import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Title.css';

class Title extends Component {
  render() {
    return (
      <span className="title">
        {this.props.title}
      </span>
    );
  }
}

Title.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])
};
Title.defaultProps = {};

export default Title;
