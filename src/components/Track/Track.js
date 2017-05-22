import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import GridElement from '../GridElement/GridElement';
import BlackUnstyledLink from '../UnstyledLink/BlackUnstyledLink'

class Track extends Component {
  renderArtist() {
    const { artist, artistUrl } = this.props;

    return (
      <BlackUnstyledLink href={artistUrl}>
        <Title title={artist}/>
      </BlackUnstyledLink>
    );
  }

  render() {
    return (
      <GridElement>
        <div>
          <BlackUnstyledLink href={this.props.url}>
            <div>
              <Image title={`${this.props.artist} - ${this.props.title}`} image={this.props.image}/>
            </div>
          </BlackUnstyledLink>
        </div>
      </GridElement>
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
