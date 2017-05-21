import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MaterialButton.css'

class MaterialButton extends Component {
  className = `${this.props.className} btn`;
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={this.className}
        type="button"
      >
        <strong>
          {this.props.children}
        </strong>
      </div>
    );
  }
}

MaterialButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};
MaterialButton.defaultProps = {
  onClick: (() => {}),
  className: '',
  children: '',
};

export default MaterialButton;
