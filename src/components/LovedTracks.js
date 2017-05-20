import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Track from './Track/Track';

class LovedTracks extends Component {
  renderList() {
    const { items } = this.props;
    return (
      <div>
        {items.map(item =>
          <Track
            key={item.url}
            title={item.name}
            url={item.url}
            artist={item.artist.name}
            artistUrl={item.artist.url}
            image={item.image[3]['#text']}
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

LovedTracks.propTypes = {
  items: PropTypes.array.isRequired,
};
LovedTracks.defaultProps = {};

export default LovedTracks;
