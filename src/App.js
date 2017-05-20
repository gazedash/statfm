import React, { Component } from 'react';
import lastfm from './api/last_fm';
import './App.css';
import LovedTracks from './components/LovedTracks';
import TopArtists from './components/TopArtists';

class App extends Component {
  state = { tracks: [], artists: [], tab: 'TopArtists' };

  componentWillMount() {
    lastfm.USER_GET_LOVED_TRACKS({ user: 'sashatobin' })
      .then(data => {
        const { lovedtracks: { track: tracks, ['@attr']: attr } } = data;
        console.log(tracks);
        this.setState({ tracks, attr });
      });
    lastfm.USER_GET_TOP_ARTISTS({ user: 'sashatobin' })
      .then(data => {
        const { topartists: { artist: artists, ['@attr']: attr } } = data;
        console.log(artists);
        this.setState({ artists, attr });
      });
    // console.log(lastfm.USER_GET_TOP_ARTISTS({ user: 'sashatobin' }));
    // console.log(lastfm.USER_GET_LOVED_TRACKS({ user: 'sashatobin' }));
    // console.log(lastfm.get({ method: methods.USER_GET_LOVED_TRACKS, params: { user: 'sashatobin' }}));
  }

  handleClick(tab) {
    console.log(this.state);
    this.setState({ tab });
  }

  renderTabs() {
    return (
      <div>
        {['LovedTracks', 'TopArtists'].map((e) =>
          <a onClick={() => this.handleClick(e)} key={e}>
            <h5 className={this.state.tab === e ? 'active' : null}>{e}</h5>
          </a>
        )}
        <div>
          {this.state.tab === 'LovedTracks' ?
            <LovedTracks items={this.state.tracks}/>
            : <TopArtists items={this.state.artists}>123</TopArtists>
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderTabs()}
      </div>
    );
  }
}

export default App;
