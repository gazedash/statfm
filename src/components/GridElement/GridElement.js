import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import './GridElement.css';

class GridElement extends Component {
  render() {
    return (
      <div className="grid-element-root">
        {this.props.children}
      </div>
    );
  }
}

GridElement.propTypes = {
  children: PropTypes.node,
};
GridElement.defaultProps = {};

export default GridElement;
