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
import BlackUnstyledLink from './components/UnstyledLink/BlackUnstyledLink';

class App extends Component {
  state = {
    user: null,
    tracks: { [null]: [] },
    artists: { [null]: [] },
    tab: 1,
    tabs: [{ name: 'LovedTracks', value: 'tracks' }, { name: 'TopArtists', value: 'artists' }],
    period: 0,
    periods: [
      { name: 'Overall', value: 'overall' },
      { name: 'Week', value: '7day' },
      { name: 'Month', value: '1month' }],
  };

  componentWillMount() {
    const { pathname } = window.location;
    if (pathname !== '/') {
      this.getData({ user: pathname.substr(1) });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
    this.setState({ height: document.querySelector('.fixed').scrollHeight });
  }

  handleChange = this.handleChange.bind(this);
  handleKeyPress = this.handleKeyPress.bind(this);
  handleClick = this.handleClick.bind(this);
  handlePeriodClick = this.handlePeriodClick.bind(this);
  handleScroll = debounce(this.handleScroll.bind(this), 500);
  handleSubmit = this.handleSubmit.bind(this);
  handleResize = this.handleResize.bind(this);

  handleClick(tab) {
    this.setState({ tab });
  }

  handlePeriodClick(period) {
    const { user, periods } = this.state;
    this.setState({ period });
    const { value } = periods[period];
    if (user) {
      this.getArtists({ user, period: value });
    }
  }

  handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleScroll() {
    if (isBottomOfElement(this.scrollable)) {
      const { user } = this.state;
      const value = this.activeTabValue;
      let attr = this.attrByUser;
      if (value === 'artists') {
        attr = attr[this.periodValue];
      }
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

  handleResize() {
    this.setState({ height: document.querySelector('.fixed').scrollHeight });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  getArtists({ user, page, period }) {
    let value = period ? period : this.periodValue;
    lastfm.USER_GET_TOP_ARTISTS({ user, page, period: value })
      .then(data => {
        if (data && data.topartists) {
          const { topartists: { artist: artists, '@attr': attr } } = data;
          artists.map(track => {
            track.image = track.image[3]['#text'];
            return track;
          });
          // const newArtists = (this.state.artists[user] || []).concat(artists);
          const newArtists = (this.getArtistsByUserAndPeriod(user, value) || []).concat(artists);
          // this.setState({ artists: { [user]: newArtists, attr: { [user]: attr } } });
          this.setState({
            artists: {
              [user]: {
                [value]: newArtists
              },
              attr: {
                [user]: {
                  [value]: attr
                }
              }
            }
          });
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
          const newTracks = (this.getTracksByUser(user) || []).concat(tracks);
          this.setState({ user, tracks: { [user]: newTracks, attr: { [user]: attr } } });
        }
      });
  }

  getData({ user, page }) {
    const value = this.periodValue;
    this.setState({ user, tracks: { [user]: [] }, artists: { [user]: { [value]: [] } } });
    this.getTracks({ user, page });
    this.getArtists({ user, page });
  }

  get period() {
    const { periods, period } = this.state;
    return periods[period];
  }

  get attrByPeriodValue() {
    const { attr } = this.state;
    return attr[this.periodValue];
  }

  get attrByUser() {
    const { user } = this.state;
    return this.state[this.activeTabValue].attr[user];
  }

  get periodValue() {
    return this.period.value;
  }

  get tracksByUser() {
    const { tracks, user } = this.state;
    return tracks[user];
  }

  get artistsByUser() {
    const { artists, user } = this.state;
    return artists[user];
  }

  get artistsByUserAndPeriod() {
    return this.artistsByUser[this.periodValue];
  }

  get activePeriod() {
    const { periods, period } = this.state;
    return periods[period];
  }

  get activePeriodName() {
    return this.activePeriod.name;
  }

  get periodNames() {
    const { periods } = this.state;
    return periods.map((e) => e.name);
  }

  get tabNames() {
    const { tabs } = this.state;
    return tabs.map((e) => e.name);
  }

  get activeTab() {
    const { tab, tabs } = this.state;
    return tabs[tab];
  }

  get activeTabValue() {
    return this.activeTab.value;
  }

  get activeTabName() {
    return this.activeTab.name;
  }

  get isCurrentTab() {
    const { tab } = this.state;
    return tab === 0;
  }

  getArtistsByUserAndPeriod(user, period) {
    return this.state.artists[user][period];
  }

  getTracksByUser(user) {
    return this.state.tracks[user];
  }

  renderHeader() {
    return (
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
        {this.renderPeriod()}
        {this.renderUser()}
      </div>
    );
  }

  renderPeriod() {
    if (!this.isCurrentTab) {
      return (
        <Tabs
          className="periods"
          onClick={this.handlePeriodClick}
          items={this.periodNames}
          activeTab={this.activePeriodName}/>
      );
    }
    return null;
  }

  renderUser() {
    if (this.state.user) {
      return <Username user={this.state.user}/>;
    }
    return null;
  }

  renderTabs() {
    return (
      <div className="app-tabs">
        <Tabs
          onClick={this.handleClick}
          items={this.tabNames}
          activeTab={this.activeTabName}/>
      </div>
    );
  }

  renderContent() {
    return (
      <div
        ref={(scrollable) => this.scrollable = scrollable}
        onScroll={this.handleScroll}
        className="scrollable"
        style={{ paddingTop: this.state.height }}
      >
        {this.isCurrentTab ?
          <LovedTracks items={this.tracksByUser}/>
          : <TopArtists items={this.artistsByUserAndPeriod}/>
        }
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="fixed">
          {this.renderHeader()}
          {this.renderTabs()}
        </div>
        {this.renderContent()}
        <BlackUnstyledLink
          className="footer"
          href="https://github.com/shoegazerwithak/statfm">
          GitHub
        </BlackUnstyledLink>
      </div>
    );
  }
}

export default App;
