import { paramsToString } from '../utils/index';
export const LAST_FM = 'https://ws.audioscrobbler.com';
export const API_VERSION = '2.0';
// export const GET_SIMILAR_ARTISTS = "artist.getsimilar";
// export const GET_ARTIST_CORRECTION = "artist.getcorrection";
// export const GET_POPULAR_TRACKS = "artist.getTopTracks";
// export const GET_TOP_ALBUMS = "artist.getTopAlbums";
// export const GET_ALBUM_INFO = "album.getInfo";

export const methods = {
    USER_GET_LOVED_TRACKS: 'user.getLovedTracks',
    USER_GET_TOP_ARTISTS: 'user.getTopArtists',
};

export const API_KEY = localStorage.token || 'TODAY_LISTEN';

export class LastFm {
    constructor({ api_key, version }) {
        this.api_key = api_key;
        this.version = version ? version : API_VERSION;
    }

    buildQuery(method) {
        return `${LAST_FM}/${this.version}/?method=${method}&api_key=${this.api_key}&format=json`;
    };

    get({ method, params }) {
        return this.buildQuery(method) + paramsToString(params);
    }
}

export default new LastFm({ api_key: API_KEY, version: API_VERSION });
