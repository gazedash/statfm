import React, { Component } from 'react';
import lastfm from './api/last_fm';
import './App.css';
import LovedTracks from './components/LovedTracks';
import TopArtists from './components/TopArtists';

class App extends Component {
  state = { user: null, tracks: { [null]: [] }, artists: { [null]: [] }, tab: 'TopArtists' };
  handleChange = this.handleChange.bind(this);
  onSubmit = this.onSubmit.bind(this);

  getData(user) {
    this.setState({ user, tracks: { [user]: [] }, artists: { [user]: [] } });
    lastfm.USER_GET_LOVED_TRACKS({ user })
      .then(data => {
        const { lovedtracks: { track: tracks, ['@attr']: attr } } = data;
        console.log(tracks);
        this.setState({ user, tracks: { [user]: tracks }, attr: { [user]: attr } });
      });
    lastfm.USER_GET_TOP_ARTISTS({ user })
      .then(data => {
        const { topartists: { artist: artists, ['@attr']: attr } } = data;
        console.log(artists);
        this.setState({ artists: { [user]: artists }, attr: { [user]: attr } });
      });
  }

  handleClick(tab) {
    console.log(this.state);
    this.setState({ tab });
  }

  renderTabs() {
    const { user, tab, tracks, artists } = this.state;
    return (
      <div>
        {['LovedTracks', 'TopArtists'].map((e) =>
          <a onClick={() => this.handleClick(e)} key={e}>
            <h5 className={tab === e ? 'active' : null}>{e}</h5>
          </a>
        )}
        <div>
          {tab === 'LovedTracks' ?
            <LovedTracks items={tracks[user]}/>
            : <TopArtists items={artists[user]}>123</TopArtists>
          }
        </div>
      </div>
    );
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  onSubmit() {
    this.getData(this.state.name);
  }

  render() {
    return (
      <div className="App">
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
        />
        <button onClick={this.onSubmit}>go</button>
        {this.renderTabs()}
      </div>
    );
  }
}

export default App;
