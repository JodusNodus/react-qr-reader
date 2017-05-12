'use strict';

function NoVideoInputDevicesError() {
  this.name = 'NoVideoInputDevicesError';
  this.message = 'No video input devices found';
}
NoVideoInputDevicesError.prototype = new Error();

module.exports = {
  NoVideoInputDevicesError: NoVideoInputDevicesError
};