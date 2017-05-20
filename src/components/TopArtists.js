import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

class TopArtists extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.items)}
      </div>
    );
  }
}

TopArtists.propTypes = {
  items: PropTypes.array.isRequired,
};
TopArtists.defaultProps = {};

export default TopArtists;
