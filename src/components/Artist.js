import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Artist extends Component {
  renderImage() {
    const { image } = this.props;

    return (
      <div className="image">
        <img className="image" src={image}/>
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <span className="title">
        {title}
      </span>
    );
  }

  render() {
    return (
      <div className="root">
        <a href={this.props.url}>
          {this.renderImage()}
          {this.renderTitle()}
        </a>
      </div>
    )
  }
}

Artist.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
Artist.defaultProps = {};

export default Artist;
