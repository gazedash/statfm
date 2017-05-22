import React, { Component } from 'react';
import { debounce } from 'lodash';
import lastfm from './api/last_fm';
import './App.css';
import LovedTracks from './components/LovedTracks/LovedTracks';
import TopArtists from './components/TopArtists/TopArtists';
import { isBottomOfElement } from './utils/index';
import CustomInput from './components/CustomInput/CustomInput';
import MaterialButton from './components/MaterialButton/MaterialButton';
import Username from './components/Username/Username';
import Tabs from './components/Tabs/Tabs';

class App extends Component {
  state = {
    user: null,
    tracks: { [null]: [] },
    artists: { [null]: [] },
    tab: 1,
    tabs: [{ name: 'LovedTracks', value: 'tracks' }, { name: 'TopArtists', value: 'artists' }],
  };

  componentWillMount() {
    const {pathname} = window.location;
    if (pathname !== '/') {
      this.getData({ user: pathname.substr(1) });
    }
  }


  handleChange = this.handleChange.bind(this);
  handleKeyPress = this.handleKeyPress.bind(this);
  handleClick = this.handleClick.bind(this);
  handleScroll = debounce(this.handleScroll.bind(this), 500);
  handleSubmit = this.handleSubmit.bind(this);

  getArtists({ user, page }) {
    lastfm.USER_GET_TOP_ARTISTS({ user, page })
      .then(data => {
        if (data && data.topartists) {
          const { topartists: { artist: artists, '@attr': attr } } = data;
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
          const { lovedtracks: { track: tracks, '@attr': attr } } = data;
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

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleScroll() {
    if (isBottomOfElement(this.scrollable)) {
      const { tab, tabs, user } = this.state;
      const { value } = tabs[tab];
      const attr = this.state[value].attr[user];
      const { page, totalPages } = attr;
      const shouldFetch = page !== totalPages;
      if (shouldFetch) {
        const params = { user, page: parseInt(page, 10) + 1 };
        if (value === 'artists') {
          this.getArtists(params);
        }
        if (value === 'tracks') {
          this.getTracks(params);
        }
      }
    }
  }

  handleSubmit() {
    const { name } = this.state;
    if (name) {
      this.getData({ user: this.state.name });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  renderHeader() {
    return (
      <div>
        <div className="form">
          <CustomInput
            onKeyPress={this.handleKeyPress}
            className="search"
            name="name"
            type="text"
            onChange={this.handleChange}
          />
          <MaterialButton
            className="submit"
            onClick={this.handleSubmit}
          >
            Let's go
          </MaterialButton>
          {this.renderUser()}
        </div>
      </div>
    );
  }

  renderUser() {
    if (this.state.user) {
      return <Username user={this.state.user}/>
    }
    return null;
  }

  renderTabs() {
    const { tab, tabs } = this.state;
    const tabNames = tabs.map((e) => e.name);
    const { name } = tabs[tab];
    return (
      <div>
        <Tabs onClick={this.handleClick} items={tabNames} activeTab={name}/>
      </div>
    );
  }

  renderContent() {
    const { user, tab, tabs, tracks, artists } = this.state;
    const { name } = tabs[tab];
    const condition = name === 'LovedTracks';

    return (
      <div
        ref={(scrollable) => this.scrollable = scrollable}
        onScroll={this.handleScroll}
        className="scrollable"
      >
        {condition ?
          <LovedTracks items={tracks[user]}/>
          : <TopArtists items={artists[user]}/>
        }
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
