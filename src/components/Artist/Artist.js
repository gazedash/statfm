import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import GridElement from '../GridElement/GridElement';
import BlackUnstyledLink from '../UnstyledLink/BlackUnstyledLink';
import './Artist.css';

class Artist extends Component {
  render() {
    return (
      <GridElement>
        <BlackUnstyledLink title={this.props.title} href={this.props.url}>
          <div className="artist-container">
            <Title title={this.props.title}/>
            <Image image={this.props.image}/>
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
