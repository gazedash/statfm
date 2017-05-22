import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import Title from '../Title/Title';
import GridElement from '../GridElement/GridElement';
import BlackUnstyledLink from '../UnstyledLink/BlackUnstyledLink'
import './Track.css';

class Track extends Component {
  trackFullName = `${this.props.artist} - ${this.props.title}`;

  renderArtist() {
    const { artistUrl } = this.props;

    return (
      <BlackUnstyledLink href={artistUrl}>
        <Title className="track-left" title={this.props.artist}/>
        <Title className="track-title track-left" title={this.props.title}/>
      </BlackUnstyledLink>
    );
  }

  render() {
    return (
      <GridElement>
        <div>
          {this.renderArtist()}
          <BlackUnstyledLink title={this.trackFullName} href={this.props.url}>
            <div>
              <Image image={this.props.image}/>
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
