import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CustomInput.css';

class CustomInput extends Component {
  render() {
    return (
      <div className="group">
        <input
          spellCheck={false}
          className="custom-input"
          name={this.props.name}
          type={this.props.type}
          onChange={this.props.onChange}
        />
        <span className="highlight"/>
        <span className="bar"/>
        <label>Name</label>
      </div>
    );
  }
}

CustomInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
CustomInput.defaultProps = {};

export default CustomInput;
