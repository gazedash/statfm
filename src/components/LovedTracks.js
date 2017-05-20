import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';

class LovedTracks extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.items)}
      </div>
    );
  }
}

LovedTracks.propTypes = {
  items: PropTypes.array.isRequired,
};
LovedTracks.defaultProps = {};

export default LovedTracks;
