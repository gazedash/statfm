import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Track.css'

class Track extends Component {
  renderImage() {
    const { image } = this.props;

    return (
      <div className="image">
        <img src={image}/>
      </div>
    );
  }

  renderArtist() {
    const { artist, artistUrl } = this.props;

    return (
      <a href={artistUrl}>
        <span className="title">
          {artist}
        </span>
      </a>
    );
  }

  renderTitle() {
    const { title } = this.props;

    return (
      <div className="title">
        {title}
      </div>
    );
  }

  render() {
    return (
      <div className="root">
        {this.renderArtist()}
        <a href={this.props.url}>
          {this.renderImage()}
          {this.renderTitle()}
        </a>
      </div>
    );
  }
}

Track.propTypes = {
  artist: PropTypes.string.isRequired,
  artistUrl: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
Track.defaultProps = {};

export default Track;
