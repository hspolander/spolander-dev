export const jsonToQueryString = json => 
  '?' +
  Object.keys(json)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    .join('&');
;

export const removeFalsy = obj => {
  let newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) { 
      newObj[prop] = obj[prop]; 
    }
  });
  return newObj;
};