import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from '../Tab/Tab';
import './Tabs.css';

class Tabs extends Component {
  render() {
    return (
      <div className="tabs">
        {this.props.items.map((e, i) =>
          <Tab
            key={e}
            item={e}
            active={this.props.activeTab === e}
            onClick={this.props.onClick.bind(this, i)}/>
        )}
      </div>
    );
  }
}

Tabs.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  activeTab: PropTypes.string,
};
Tabs.defaultProps = {
  activeTab: '',
};

export default Tabs;
