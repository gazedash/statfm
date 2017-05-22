import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Title.css';

class Title extends Component {
  className = `${this.props.className} title-root`;
  render() {
    return (
      <div className={this.className}>
        <span className="title">
          {this.props.title}
        </span>
      </div>
    );
  }
}

Title.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])
};
Title.defaultProps = {
  className: '',
};

export default Title;
