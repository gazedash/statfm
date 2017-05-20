import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

class Track extends Component {
  renderImage() {
    const {image} = this.props;

    return (
      <div>
        {JSON.stringify(image)}
      </div>
    )
  }

  renderArtist() {
    const {artist} = this.props;

    return (
      <div>
        {JSON.stringify(artist)}
      </div>
    )
  }

  renderTitle() {
    const {title} = this.props;

    return (
      <div>
        {JSON.stringify(title)}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderImage()}
        {this.renderArtist()}
        {this.renderTitle()}
      </div>
    );
  }
}

Track.propTypes = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
Track.defaultProps = {};

export default Track;
