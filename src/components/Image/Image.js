import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Image.css';

class Image extends Component {
  render() {
    return (
      <div class="image-root">
        <img className="image" src={this.props.image}/>
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
};
Image.defaultProps = {
  title: '',
};

export default Image;
