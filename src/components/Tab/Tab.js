import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Tab.css';

class Tab extends Component {
  render() {
    return (
      <a className="tab" onClick={this.props.onClick} key={this.props.item}>
        <h5 className={this.props.active ? 'tab-active' : null}>{this.props.item}</h5>
      </a>
    );
  }
}

Tab.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
Tab.defaultProps = {};

export default Tab;
