import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import Artist from './Artist';

class TopArtists extends Component {
  renderList() {
    const { items } = this.props;
    return (
      <div>
        {items.map(item =>
          <Artist
            key={item.url}
            title={item.name}
            url={item.url}
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

TopArtists.propTypes = {
  items: PropTypes.array.isRequired,
};
TopArtists.defaultProps = {};

export default TopArtists;
