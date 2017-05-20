import _ from 'lodash';

export function paramsToString(params) {
    let res = '&';
    _.forEach(params, (value, key) => {
        if (value || value === 0) res += `${key}=${value}&`;
    });
    return res;
}