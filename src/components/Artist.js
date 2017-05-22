import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from './Image/Image';
import Title from './Title/Title';
import GridElement from './GridElement/GridElement';
import BlackUnstyledLink from './UnstyledLink/BlackUnstyledLink'

class Artist extends Component {
  render() {
    return (
      <GridElement>
        <BlackUnstyledLink href={this.props.url}>
          <div>
            <Image title={this.props.title} image={this.props.image}/>
          </div>
        </BlackUnstyledLink>
      </GridElement>
    );
  }
}

Artist.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
Artist.defaultProps = {};

export default Artist;
