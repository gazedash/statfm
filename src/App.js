import React, { Component } from 'react';
import { debounce } from 'lodash';
import lastfm from './api/last_fm';
import './App.css';
import LovedTracks from './components/LovedTracks/LovedTracks';
import TopArtists from './components/TopArtists';
import { isBottomOfElement } from './utils/index';
import CustomInput from './components/CustomInput/CustomInput';
import MaterialButton from './components/MaterialButton/MaterialButton';

class App extends Component {
  state = {
    user: null,
    tracks: { [null]: [] },
    artists: { [null]: [] },
    tab: 1,
    tabs: [{ name: 'LovedTracks', value: 'tracks' }, { name: 'TopArtists', value: 'artists' }],
  };

  handleChange = this.handleChange.bind(this);
  handleScroll = debounce(this.handleScroll.bind(this), 500);
  onSubmit = this.onSubmit.bind(this);

  handleScroll() {
    if (isBottomOfElement(this.scrollable)) {
      const { tab, tabs, user } = this.state;
      const { value } = tabs[tab];
      const attr = this.state[value].attr[user];
      const { page, totalPages } = attr;
      const shouldFetch = page !== totalPages;
      if (shouldFetch) {
        const params = { user, page: parseInt(page) + 1 };
        if (value === 'artists') {
          this.getArtists(params);
        }
        if (value === 'tracks') {
          this.getTracks(params);
        }
      }
    }
  }

  getArtists({ user, page }) {
    lastfm.USER_GET_TOP_ARTISTS({ user, page })
      .then(data => {
        if (data && data.topartists) {
          const { topartists: { artist: artists, ['@attr']: attr } } = data;
          artists.map(track => {
            track.image = track.image[3]['#text'];
            return track;
          });
          const newArtists = (this.state.artists[user] || []).concat(artists);
          this.setState({ artists: { [user]: newArtists, attr: { [user]: attr } } });
        }
      });
  }

  getTracks({ user, page }) {
    lastfm.USER_GET_LOVED_TRACKS({ user, page })
      .then(data => {
        if (data && data.lovedtracks) {
          const { lovedtracks: { track: tracks, ['@attr']: attr } } = data;
          tracks.map(track => {
            track.image = track.image[3]['#text'];
            return track;
          });
          const newTracks = (this.state.tracks[user] || []).concat(tracks);
          this.setState({ user, tracks: { [user]: newTracks, attr: { [user]: attr } } });
        }
      });
  }

  getData({ user, page }) {
    this.setState({ user, tracks: { [user]: [] }, artists: { [user]: [] } });
    this.getTracks({ user, page });
    this.getArtists({ user, page });
  }

  handleClick(tab) {
    this.setState({ tab });
  }

  renderTabs() {
    const { user, tab, tabs, tracks, artists } = this.state;
    const { name } = tabs[tab];
    return (
      <div>
        <div className="tabs">
          {tabs.map((e, i) =>
            <a className="tab" onClick={() => this.handleClick(i)} key={e.name}>
              <h5 className={name === e.name ? 'active' : null}>{e.name}</h5>
            </a>
          )}
        </div>
        <div ref={(scrollable) => this.scrollable = scrollable} onScroll={this.handleScroll} className="scrollable">
          {name === 'LovedTracks' ?
            <LovedTracks items={tracks[user]}/>
            : <TopArtists items={artists[user]}>123</TopArtists>
          }
        </div>
      </div>
    );
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  onSubmit() {
    const { name } = this.state;
    if (name) {
      this.getData({ user: this.state.name });
    }
  }

// <input
// name="name"
// type="text"
// onChange={this.handleChange}
// />
  renderUsername() {
    const { user } = this.state;
    const url = `https://last.fm/user/${user}`;
    return (
      <div className="user">
        <a href={url}>
          <span>{this.state.user}</span>
        </a>
      </div>
    );
  }

  renderHeader() {
    return (
      <div>
        <div className="form">
          <CustomInput className="search" name="name" type="text" onChange={this.handleChange}/>
          <MaterialButton className="submit" onClick={this.onSubmit}>Let's go</MaterialButton>
          {this.renderUsername()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.renderTabs()}
      </div>
    );
  }
}

export default App;
