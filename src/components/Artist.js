import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Artist extends Component {
  renderImage() {
    const { image } = this.props;

    return (
      <div>
        {JSON.stringify(image)}
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <div>
        {JSON.stringify(title)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderImage()}
        {this.renderTitle()}
      </div>
    );
  }
}

Artist.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
Artist.defaultProps = {};

export default Artist;
