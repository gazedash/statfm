import fetch from 'isomorphic-fetch';

export function logError(json) {
    if (json.error) {
        console.error(json);
    }
}

export function fetchWrapper(cb) {
  return fetch(cb)
    .then(response => response.json())
    .then(json => {
      logError(json);
      return json;
    })
}
