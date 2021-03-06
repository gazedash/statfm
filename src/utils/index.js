import _ from 'lodash';

export function paramsToString(params) {
  let res = '&';
  _.forEach(params, (value, key) => {
    if (value || value === 0) res += `${key}=${value}&`;
  });
  return res;
}

export function isBottomOfElement(element) {
  return element.scrollTop + element.offsetHeight + 300 >= element.scrollHeight;
}
