"use strict";

module.exports = function havePropsChanged(prevProps, nextProps, keys) {
  var changedProps = [];
  keys.forEach(function (key) {
    if (prevProps[key] != nextProps[key]) {
      changedProps.push(key);
    }
  });
  return changedProps;
};