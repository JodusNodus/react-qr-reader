'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var PropTypes = require('prop-types');
var getDeviceId = require('./getDeviceId');
var havePropsChanged = require('./havePropsChanged');

// Require adapter to support older browser implementations
require('webrtc-adapter');

// Inline worker.js as a string value of workerBlob.
var workerBlob = void 0;
if (typeof Blob === 'function') {
  // eslint-disable-next-line
  workerBlob = new Blob(["!function(e,n){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=n():\"function\"==typeof define&&define.amd?define([],n):\"object\"==typeof exports?exports.jsQR=n():e.jsQR=n()}(this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,\"a\",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p=\"\",n(n.s=3)}([function(e,n,t){\"use strict\";n.__esModule=!0;var r=function(){function e(e,n){this.width=n,this.height=e.length/n,this.data=e}return e.createEmpty=function(n,t){return new e(new Uint8ClampedArray(n*t),n)},e.prototype.get=function(e,n){return!!this.data[n*this.width+e]},e.prototype.set=function(e,n,t){this.data[n*this.width+e]=t?1:0},e.prototype.copyBit=function(e,n,t){return this.get(e,n)?t<<1|1:t<<1},e.prototype.setRegion=function(e,n,t,r){for(var i=e+t,o=n+r,a=n;a<o;a++)for(var f=e;f<i;f++)this.set(f,a,!0)},e.prototype.mirror=function(){for(var e=0;e<this.width;e++)for(var n=e+1;n<this.height;n++)this.get(e,n)!=this.get(n,e)&&(this.set(e,n,!this.get(e,n)),this.set(n,e,!this.get(n,e)))},e}();n.BitMatrix=r},function(e,n,t){\"use strict\";function r(e,n){return e^=n,o[15&e]+o[e>>4&15]+o[e>>8&15]+o[e>>12&15]+o[e>>16&15]+o[e>>20&15]+o[e>>24&15]+o[e>>28&15]}function i(e){return\"[object Number]\"===Object.prototype.toString.call(e)&&e!==+e}n.__esModule=!0;var o=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];n.numBitsDiffering=r,n.isNaN=i},function(e,n,t){\"use strict\";function r(e){if(e<1||e>40)throw new Error(\"Invalid version number \"+e);return w[e-1]}n.__esModule=!0;var i=t(1),o=[31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017],a=function(){function e(e,n){this.count=e,this.dataCodewords=n}return e}(),f=function(){function e(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];this.ecCodewordsPerBlock=e,this.ecBlocks=n}return e.prototype.getNumBlocks=function(){return this.ecBlocks.reduce(function(e,n){return e+n.count},0)},e.prototype.getTotalECCodewords=function(){return this.ecCodewordsPerBlock*this.getNumBlocks()},e}(),u=function(){function e(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];this.versionNumber=e,this.alignmentPatternCenters=n,this.ecBlocks=t;var i=0,o=this.ecBlocks[0].ecCodewordsPerBlock;this.ecBlocks[0].ecBlocks.forEach(function(e){i+=e.count*(e.dataCodewords+o)}),this.totalCodewords=i}return e.prototype.getDimensionForVersion=function(){return 17+4*this.versionNumber},e.prototype.getECBlocksForLevel=function(e){return this.ecBlocks[e.ordinal]},e.decodeVersionInformation=function(e){for(var n=1/0,t=0,a=0;a<o.length;a++){var f=o[a];if(f==e)return r(a+7);var u=i.numBitsDiffering(e,f);u<n&&(t=a+7,n=u)}return n<=3?r(t):null},e}();n.Version=u;var w=[new u(1,[],new f(7,new a(1,19)),new f(10,new a(1,16)),new f(13,new a(1,13)),new f(17,new a(1,9))),new u(2,[6,18],new f(10,new a(1,34)),new f(16,new a(1,28)),new f(22,new a(1,22)),new f(28,new a(1,16))),new u(3,[6,22],new f(15,new a(1,55)),new f(26,new a(1,44)),new f(18,new a(2,17)),new f(22,new a(2,13))),new u(4,[6,26],new f(20,new a(1,80)),new f(18,new a(2,32)),new f(26,new a(2,24)),new f(16,new a(4,9))),new u(5,[6,30],new f(26,new a(1,108)),new f(24,new a(2,43)),new f(18,new a(2,15),new a(2,16)),new f(22,new a(2,11),new a(2,12))),new u(6,[6,34],new f(18,new a(2,68)),new f(16,new a(4,27)),new f(24,new a(4,19)),new f(28,new a(4,15))),new u(7,[6,22,38],new f(20,new a(2,78)),new f(18,new a(4,31)),new f(18,new a(2,14),new a(4,15)),new f(26,new a(4,13),new a(1,14))),new u(8,[6,24,42],new f(24,new a(2,97)),new f(22,new a(2,38),new a(2,39)),new f(22,new a(4,18),new a(2,19)),new f(26,new a(4,14),new a(2,15))),new u(9,[6,26,46],new f(30,new a(2,116)),new f(22,new a(3,36),new a(2,37)),new f(20,new a(4,16),new a(4,17)),new f(24,new a(4,12),new a(4,13))),new u(10,[6,28,50],new f(18,new a(2,68),new a(2,69)),new f(26,new a(4,43),new a(1,44)),new f(24,new a(6,19),new a(2,20)),new f(28,new a(6,15),new a(2,16))),new u(11,[6,30,54],new f(20,new a(4,81)),new f(30,new a(1,50),new a(4,51)),new f(28,new a(4,22),new a(4,23)),new f(24,new a(3,12),new a(8,13))),new u(12,[6,32,58],new f(24,new a(2,92),new a(2,93)),new f(22,new a(6,36),new a(2,37)),new f(26,new a(4,20),new a(6,21)),new f(28,new a(7,14),new a(4,15))),new u(13,[6,34,62],new f(26,new a(4,107)),new f(22,new a(8,37),new a(1,38)),new f(24,new a(8,20),new a(4,21)),new f(22,new a(12,11),new a(4,12))),new u(14,[6,26,46,66],new f(30,new a(3,115),new a(1,116)),new f(24,new a(4,40),new a(5,41)),new f(20,new a(11,16),new a(5,17)),new f(24,new a(11,12),new a(5,13))),new u(15,[6,26,48,70],new f(22,new a(5,87),new a(1,88)),new f(24,new a(5,41),new a(5,42)),new f(30,new a(5,24),new a(7,25)),new f(24,new a(11,12),new a(7,13))),new u(16,[6,26,50,74],new f(24,new a(5,98),new a(1,99)),new f(28,new a(7,45),new a(3,46)),new f(24,new a(15,19),new a(2,20)),new f(30,new a(3,15),new a(13,16))),new u(17,[6,30,54,78],new f(28,new a(1,107),new a(5,108)),new f(28,new a(10,46),new a(1,47)),new f(28,new a(1,22),new a(15,23)),new f(28,new a(2,14),new a(17,15))),new u(18,[6,30,56,82],new f(30,new a(5,120),new a(1,121)),new f(26,new a(9,43),new a(4,44)),new f(28,new a(17,22),new a(1,23)),new f(28,new a(2,14),new a(19,15))),new u(19,[6,30,58,86],new f(28,new a(3,113),new a(4,114)),new f(26,new a(3,44),new a(11,45)),new f(26,new a(17,21),new a(4,22)),new f(26,new a(9,13),new a(16,14))),new u(20,[6,34,62,90],new f(28,new a(3,107),new a(5,108)),new f(26,new a(3,41),new a(13,42)),new f(30,new a(15,24),new a(5,25)),new f(28,new a(15,15),new a(10,16))),new u(21,[6,28,50,72,94],new f(28,new a(4,116),new a(4,117)),new f(26,new a(17,42)),new f(28,new a(17,22),new a(6,23)),new f(30,new a(19,16),new a(6,17))),new u(22,[6,26,50,74,98],new f(28,new a(2,111),new a(7,112)),new f(28,new a(17,46)),new f(30,new a(7,24),new a(16,25)),new f(24,new a(34,13))),new u(23,[6,30,54,74,102],new f(30,new a(4,121),new a(5,122)),new f(28,new a(4,47),new a(14,48)),new f(30,new a(11,24),new a(14,25)),new f(30,new a(16,15),new a(14,16))),new u(24,[6,28,54,80,106],new f(30,new a(6,117),new a(4,118)),new f(28,new a(6,45),new a(14,46)),new f(30,new a(11,24),new a(16,25)),new f(30,new a(30,16),new a(2,17))),new u(25,[6,32,58,84,110],new f(26,new a(8,106),new a(4,107)),new f(28,new a(8,47),new a(13,48)),new f(30,new a(7,24),new a(22,25)),new f(30,new a(22,15),new a(13,16))),new u(26,[6,30,58,86,114],new f(28,new a(10,114),new a(2,115)),new f(28,new a(19,46),new a(4,47)),new f(28,new a(28,22),new a(6,23)),new f(30,new a(33,16),new a(4,17))),new u(27,[6,34,62,90,118],new f(30,new a(8,122),new a(4,123)),new f(28,new a(22,45),new a(3,46)),new f(30,new a(8,23),new a(26,24)),new f(30,new a(12,15),new a(28,16))),new u(28,[6,26,50,74,98,122],new f(30,new a(3,117),new a(10,118)),new f(28,new a(3,45),new a(23,46)),new f(30,new a(4,24),new a(31,25)),new f(30,new a(11,15),new a(31,16))),new u(29,[6,30,54,78,102,126],new f(30,new a(7,116),new a(7,117)),new f(28,new a(21,45),new a(7,46)),new f(30,new a(1,23),new a(37,24)),new f(30,new a(19,15),new a(26,16))),new u(30,[6,26,52,78,104,130],new f(30,new a(5,115),new a(10,116)),new f(28,new a(19,47),new a(10,48)),new f(30,new a(15,24),new a(25,25)),new f(30,new a(23,15),new a(25,16))),new u(31,[6,30,56,82,108,134],new f(30,new a(13,115),new a(3,116)),new f(28,new a(2,46),new a(29,47)),new f(30,new a(42,24),new a(1,25)),new f(30,new a(23,15),new a(28,16))),new u(32,[6,34,60,86,112,138],new f(30,new a(17,115)),new f(28,new a(10,46),new a(23,47)),new f(30,new a(10,24),new a(35,25)),new f(30,new a(19,15),new a(35,16))),new u(33,[6,30,58,86,114,142],new f(30,new a(17,115),new a(1,116)),new f(28,new a(14,46),new a(21,47)),new f(30,new a(29,24),new a(19,25)),new f(30,new a(11,15),new a(46,16))),new u(34,[6,34,62,90,118,146],new f(30,new a(13,115),new a(6,116)),new f(28,new a(14,46),new a(23,47)),new f(30,new a(44,24),new a(7,25)),new f(30,new a(59,16),new a(1,17))),new u(35,[6,30,54,78,102,126,150],new f(30,new a(12,121),new a(7,122)),new f(28,new a(12,47),new a(26,48)),new f(30,new a(39,24),new a(14,25)),new f(30,new a(22,15),new a(41,16))),new u(36,[6,24,50,76,102,128,154],new f(30,new a(6,121),new a(14,122)),new f(28,new a(6,47),new a(34,48)),new f(30,new a(46,24),new a(10,25)),new f(30,new a(2,15),new a(64,16))),new u(37,[6,28,54,80,106,132,158],new f(30,new a(17,122),new a(4,123)),new f(28,new a(29,46),new a(14,47)),new f(30,new a(49,24),new a(10,25)),new f(30,new a(24,15),new a(46,16))),new u(38,[6,32,58,84,110,136,162],new f(30,new a(4,122),new a(18,123)),new f(28,new a(13,46),new a(32,47)),new f(30,new a(48,24),new a(14,25)),new f(30,new a(42,15),new a(32,16))),new u(39,[6,26,54,82,110,138,166],new f(30,new a(20,117),new a(4,118)),new f(28,new a(40,47),new a(7,48)),new f(30,new a(43,24),new a(22,25)),new f(30,new a(10,15),new a(67,16))),new u(40,[6,30,58,86,114,142,170],new f(30,new a(19,118),new a(6,119)),new f(28,new a(18,47),new a(31,48)),new f(30,new a(34,24),new a(34,25)),new f(30,new a(20,15),new a(61,16)))];n.getVersionForNumber=r},function(e,n,t){\"use strict\";function r(e){return i(l.decode(e))}function i(e){var n=\"\";if(null!=e&&void 0!=e)for(var t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return n}function o(e,n){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e[r]?1:0;return new h.BitMatrix(t,n)}function a(e,n,t){return i(f(e,n,t))}function f(e,n,t){var r=c(e,n,t),i=w.locate(r);if(!i)return null;var o=s.extract(r,i);return o?l.decode(o):null}n.__esModule=!0;var u=t(4),w=t(5),s=t(6),l=t(9),h=t(0),c=u.binarize;n.binarizeImage=c;var d=w.locate;n.locateQRInBinaryImage=d;var v=s.extract;n.extractQRFromBinaryImage=v,n.decodeQR=r,n.createBitMatrix=o,n.decodeQRFromImage=a,n.decodeQRFromImageAsByteArray=f},function(e,n,t){\"use strict\";function r(e,n,t){return e<n?n:e>t?t:e}function i(e,n,t){if(e.length!==n*t*4)throw new Error(\"Malformed data passed to binarizer.\");for(var i=new u(n,t),w=0;w<n;w++)for(var s=0;s<t;s++){var l=e[4*(s*n+w)+0],h=e[4*(s*n+w)+1],c=e[4*(s*n+w)+2];i.set(w,s,.2126*l+.7152*h+.0722*c)}for(var d=Math.ceil(n/a),v=Math.ceil(t/a),g=new u(d,v),p=0;p<v;p++)for(var y=0;y<d;y++){for(var m=0,b=1/0,M=0,s=0;s<a;s++)for(var w=0;w<a;w++){var x=i.get(y*a+w,p*a+s);m+=x,b=Math.min(b,x),M=Math.max(M,x)}var B=m/Math.pow(a,2);if(M-b<=f&&(B=b/2,p>0&&y>0)){var C=(g.get(y,p-1)+2*g.get(y-1,p)+g.get(y-1,p-1))/4;b<C&&(B=C)}g.set(y,p,B)}for(var z=o.BitMatrix.createEmpty(n,t),p=0;p<v;p++)for(var y=0;y<d;y++){for(var E=r(y,2,d-3),A=r(p,2,v-3),m=0,S=-2;S<=2;S++)for(var O=-2;O<=2;O++)m+=g.get(E+S,A+O);for(var I=m/25,w=0;w<a;w++)for(var s=0;s<a;s++){var R=i.get(y*a+w,p*a+s);z.set(y*a+w,p*a+s,R<=I)}}return z}n.__esModule=!0;var o=t(0),a=8,f=24,u=function(){function e(e,n){this.width=e,this.data=new Uint8ClampedArray(e*n)}return e.prototype.get=function(e,n){return this.data[n*this.width+e]},e.prototype.set=function(e,n,t){this.data[n*this.width+e]=t},e}();n.binarize=i},function(e,n,t){\"use strict\";function r(e){for(var n=0,t=0;t<5;t++){var r=e[t];if(0===r)return!1;n+=r}if(n<7)return!1;var i=(n<<h)/7,o=i/2;return Math.abs(i-(e[0]<<h))<o&&Math.abs(i-(e[1]<<h))<o&&Math.abs(3*i-(e[2]<<h))<3*o&&Math.abs(i-(e[3]<<h))<o&&Math.abs(i-(e[4]<<h))<o}function i(e,n){var t=n-e[4]-e[3]-e[2]/2;return t!==t?null:t}function o(e,n){var t=e.x-n.x,r=e.y-n.y;return Math.sqrt(t*t+r*r)}function a(e,n,t){var r=n.x,i=n.y;return(t.x-r)*(e.y-i)-(t.y-i)*(e.x-r)}function f(e){var n,t,r,i=o(e[0],e[1]),f=o(e[1],e[2]),u=o(e[0],e[2]);if(f>=i&&f>=u?(t=e[0],n=e[1],r=e[2]):u>=f&&u>=i?(t=e[1],n=e[0],r=e[2]):(t=e[2],n=e[0],r=e[1]),a(n,t,r)<0){var w=n;n=r,r=w}return{bottomLeft:{x:n.x,y:n.y},topLeft:{x:t.x,y:t.y},topRight:{x:r.x,y:r.y}}}function u(e){function n(n,t){return n=Math.floor(n),t=Math.floor(t),e.get(n,t)}function t(t,i,o,a){for(var f=e.height,u=e.width,w=[0,0,0,0,0],s=0;t-s>=0&&n(i-s,t-s);)w[2]++,s++;if(t-s<0||i-s<0)return!1;for(;t-s>=0&&i-s>=0&&!n(i-s,t-s)&&w[1]<=o;)w[1]++,s++;if(t-s<0||i-s<0||w[1]>o)return!1;for(;t-s>=0&&i-s>=0&&n(i-s,t-s)&&w[0]<=o;)w[0]++,s++;if(w[0]>o)return!1;for(s=1;t+s<f&&i+s<u&&n(i+s,t+s);)w[2]++,s++;if(t+s>=f||i+s>=u)return!1;for(;t+s<f&&i+s<u&&!n(i+s,t+s)&&w[3]<o;)w[3]++,s++;if(t+s>=f||i+s>=u||w[3]>=o)return!1;for(;t+s<f&&i+s<u&&n(i+s,t+s)&&w[4]<o;)w[4]++,s++;if(w[4]>=o)return!1;var l=w[0]+w[1]+w[2]+w[3]+w[4];return Math.abs(l-a)<2*a&&r(w)}function o(t,o,a,f){for(var u=e.height,w=[0,0,0,0,0],s=t;s>=0&&n(o,s);)w[2]++,s--;if(s<0)return null;for(;s>=0&&!n(o,s)&&w[1]<=a;)w[1]++,s--;if(s<0||w[1]>a)return null;for(;s>=0&&n(o,s)&&w[0]<=a;)w[0]++,s--;if(w[0]>a)return null;for(s=t+1;s<u&&n(o,s);)w[2]++,s++;if(s==u)return null;for(;s<u&&!n(o,s)&&w[3]<a;)w[3]++,s++;if(s==u||w[3]>=a)return null;for(;s<u&&n(o,s)&&w[4]<a;)w[4]++,s++;if(w[4]>=a)return null;var l=w[0]+w[1]+w[2]+w[3]+w[4];return 5*Math.abs(l-f)>=2*f?null:r(w)?i(w,s):null}function a(){var e=0,n=0,t=d.length;if(d.forEach(function(t){t.count>=w&&(e++,n+=t.estimatedModuleSize)}),e<3)return!1;for(var r=n/t,i=0,o=0;o<t;o++){var a=d[o];i+=Math.abs(a.estimatedModuleSize-r)}return i<=.05*n}function u(t,o,a,f){for(var u=e.width,w=[0,0,0,0,0],s=t;s>=0&&n(s,o);)w[2]++,s--;if(s<0)return null;for(;s>=0&&!n(s,o)&&w[1]<=a;)w[1]++,s--;if(s<0||w[1]>a)return null;for(;s>=0&&n(s,o)&&w[0]<=a;)w[0]++,s--;if(w[0]>a)return null;for(s=t+1;s<u&&n(s,o);)w[2]++,s++;if(s==u)return null;for(;s<u&&!n(s,o)&&w[3]<a;)w[3]++,s++;if(s==u||w[3]>=a)return null;for(;s<u&&n(s,o)&&w[4]<a;)w[4]++,s++;if(w[4]>=a)return null;var l=w[0]+w[1]+w[2]+w[3]+w[4];return 5*Math.abs(l-f)>=f?null:r(w)?i(w,s):null}function h(e,n,r,a){var f=e[0]+e[1]+e[2]+e[3]+e[4],w=i(e,r);if(null==w)return!1;var s=o(n,Math.floor(w),e[2],f);if(null!=s&&null!=(w=u(Math.floor(w),Math.floor(s),e[2],f))&&(!a||t(Math.floor(s),Math.floor(w),e[2],f))){for(var l=f/7,h=!1,v=0;v<d.length;v++){var g=d[v];if(g.aboutEquals(l,s,w)){d.splice(v,1,g.combineEstimate(s,w,l)),h=!0;break}}if(!h){var p=new c(w,s,l);d.push(p)}return!0}return!1}var d=[],v=!1,g=e.height,p=e.width,y=Math.floor(3*g/(4*l));y<s&&(y=s);for(var m=!1,b=[0,0,0,0,0],M=y-1;M<g&&!m;M+=y){b=[0,0,0,0,0];for(var x=0,B=0;B<p;B++)if(n(B,M))1==(1&x)&&x++,b[x]++;else if(0==(1&x))if(4===x)if(r(b)){var C=h(b,M,B,!1);if(!C){b=[b[2],b[3],b[4],1,0],x=3;continue}if(y=2,v)m=a();else{var z=function(){if(d.length<=1)return 0;var e=null;return d.forEach(function(n){if(n.count>=w){if(null!=e)return v=!0,Math.floor(Math.abs(e.x-n.x)-Math.abs(e.y-n.y))/2;e=n}}),0}();z>b[2]&&(M+=z-b[2]-y,B=p-1)}b=[0,0,0,0,0],x=0}else b=[b[2],b[3],b[4],1,0],x=3;else b[++x]++;else b[x]++;if(r(b)){var C=h(b,M,p,!1);C&&(y=b[0],v&&(m=a()))}}var E=function(){var e=d.length;if(e<3)return null;if(e>3){var n=0,t=0;d.forEach(function(e){var r=e.estimatedModuleSize;n+=r,t+=r*r});var r=n/e,i=Math.sqrt(t/e-r*r);d.sort(function(e,n){var t=Math.abs(n.estimatedModuleSize-r),i=Math.abs(e.estimatedModuleSize-r);return t<i?-1:t==i?0:1});for(var o=Math.max(.2*r,i),a=0;a<d.length&&d.length>3;a++){var f=d[a];Math.abs(f.estimatedModuleSize-r)>o&&(d.splice(a,1),a--)}}if(d.length>3){var n=0;d.forEach(function(e){n+=e.estimatedModuleSize});var r=n/d.length;d.sort(function(e,n){if(n.count===e.count){var t=Math.abs(n.estimatedModuleSize-r),i=Math.abs(e.estimatedModuleSize-r);return t<i?1:t==i?0:-1}return n.count-e.count}),d=d.slice(0,3)}return[d[0],d[1],d[2]]}();return E?f(E):null}n.__esModule=!0;var w=2,s=3,l=57,h=8,c=function(){function e(e,n,t,r){this.x=e,this.y=n,this.estimatedModuleSize=t,this.count=null==r?1:r}return e.prototype.aboutEquals=function(e,n,t){if(Math.abs(n-this.y)<=e&&Math.abs(t-this.x)<=e){var r=Math.abs(e-this.estimatedModuleSize);return r<=1||r<=this.estimatedModuleSize}return!1},e.prototype.combineEstimate=function(n,t,r){var i=this.count+1;return new e((this.count*this.x+t)/i,(this.count*this.y+n)/i,(this.count*this.estimatedModuleSize+r)/i,i)},e}();n.locate=u},function(e,n,t){\"use strict\";function r(e,n,t){for(var r=!0,i=0;i<t.length&&r;i+=2){var o=Math.floor(t[i]),a=Math.floor(t[i+1]);if(o<-1||o>e||a<-1||a>n)throw new Error;r=!1,-1==o?(t[i]=0,r=!0):o==e&&(t[i]=e-1,r=!0),-1==a?(t[i+1]=0,r=!0):a==n&&(t[i+1]=n-1,r=!0)}r=!0;for(var i=t.length-2;i>=0&&r;i-=2){var o=Math.floor(t[i]),a=Math.floor(t[i+1]);if(o<-1||o>e||a<-1||a>n)throw new Error;r=!1,-1==o?(t[i]=0,r=!0):o==e&&(t[i]=e-1,r=!0),-1==a?(t[i+1]=0,r=!0):a==n&&(t[i+1]=n-1,r=!0)}return t}function i(e,n,t){if(n<=0)return null;for(var i=y.BitMatrix.createEmpty(n,n),o=new Float32Array(n<<1),a=0;a<n;a++){for(var f=o.length,u=a+.5,w=0;w<f;w+=2)o[w]=.5+(w>>1),o[w+1]=u;o=g.transformPoints(t,o);try{var s=r(e.width,e.height,o)}catch(e){return null}for(var w=0;w<f;w+=2)i.set(w>>1,a,e.get(Math.floor(s[w]),Math.floor(s[w+1])))}return i}function o(e,n,t,r,i){var o,a,f,u,w=i-3.5;return null!=r?(o=r.x,a=r.y,f=u=w-3):(o=n.x-e.x+t.x,a=n.y-e.y+t.y,f=u=w),g.quadrilateralToQuadrilateral(3.5,3.5,w,3.5,f,u,3.5,w,e.x,e.y,n.x,n.y,o,a,t.x,t.y)}function a(e,n,t,r){return Math.sqrt((t-e)*(t-e)+(r-n)*(r-n))}function f(e,n,t,r,i){n=Math.floor(n),t=Math.floor(t);var o=Math.floor(r*e),a=Math.max(0,n-o),f=Math.min(i.width,n+o);if(f-a<3*e)return null;var u=Math.max(0,t-o),w=Math.min(i.height-1,t+o);return v.findAlignment(a,u,f-a,w-u,e,i)}function u(e,n,t,r){var i=Math.round(a(e.x,e.y,n.x,n.y)/r),o=Math.round(a(e.x,e.y,t.x,t.y)/r),f=7+(i+o>>1);switch(3&f){case 0:f++;break;case 2:f--}return f}function w(e){if(e%4!=1)return null;var n=e-17>>2;return n<1||n>40?null:p.getVersionForNumber(n)}function s(e,n,t,r,i){e=Math.floor(e),n=Math.floor(n),t=Math.floor(t),r=Math.floor(r);var o=Math.abs(r-n)>Math.abs(t-e);if(o){var f=e;e=n,n=f,f=t,t=r,r=f}for(var u=Math.abs(t-e),w=Math.abs(r-n),s=-u>>1,l=e<t?1:-1,h=n<r?1:-1,c=0,d=t+l,v=e,g=n;v!=d;v+=l){var p=o?g:v,y=o?v:g;if(1==c===i.get(p,y)){if(2==c)return a(v,g,e,n);c++}if((s+=w)>0){if(g==r)break;g+=h,s-=u}}return 2==c?a(t+l,r,e,n):NaN}function l(e,n,t,r,i){var o=s(e,n,t,r,i),a=1,f=e-(t-e);f<0?(a=e/(e-f),f=0):f>=i.width&&(a=(i.width-1-e)/(f-e),f=i.width-1);var u=n-(r-n)*a;return a=1,u<0?(a=n/(n-u),u=0):u>=i.height&&(a=(i.height-1-n)/(u-n),u=i.height-1),f=e+(f-e)*a,(o+=s(e,n,f,u,i))-1}function h(e,n,t){var r=l(e.x,e.y,n.x,n.y,t),i=l(n.x,n.y,e.x,e.y,t);return m.isNaN(r)?i/7:m.isNaN(i)?r/7:(r+i)/14}function c(e,n,t,r){return(h(e,n,r)+h(e,t,r))/2}function d(e,n){var t=c(n.topLeft,n.topRight,n.bottomLeft,e);if(t<1)return null;var r=u(n.topLeft,n.topRight,n.bottomLeft,t);if(!r)return null;var a=w(r);if(null==a)return null;var s=a.getDimensionForVersion()-7,l=null;if(a.alignmentPatternCenters.length>0)for(var h=n.topRight.x-n.topLeft.x+n.bottomLeft.x,d=n.topRight.y-n.topLeft.y+n.bottomLeft.y,v=1-3/s,g=n.topLeft.x+v*(h-n.topLeft.x),p=n.topLeft.y+v*(d-n.topLeft.y),y=4;y<=16&&!(l=f(t,g,p,y,e));y<<=1);return i(e,r,o(n.topLeft,n.topRight,n.bottomLeft,l,r))}n.__esModule=!0;var v=t(7),g=t(8),p=t(2),y=t(0),m=t(1);n.extract=d},function(e,n,t){\"use strict\";function r(e,n,t,r){if(Math.abs(t-e.y)<=n&&Math.abs(r-e.x)<=n){var i=Math.abs(n-e.estimatedModuleSize);return i<=1||i<=e.estimatedModuleSize}return!1}function i(e,n,t,r){return{x:(e.x+t)/2,y:(e.y+n)/2,estimatedModuleSize:(e.estimatedModuleSize+r)/2}}function o(e,n){for(var t=n/2,r=0;r<3;r++)if(Math.abs(n-e[r])>=t)return!1;return!0}function a(e,n){var t=n-e[2]-e[1]/2;return w.isNaN(t)?null:t}function f(e,n,t,r,i,f){for(var u=f.height,w=[0,0,0],s=e;s>=0&&f.get(n,s)&&w[1]<=t;)w[1]++,s--;if(s<0||w[1]>t)return null;for(;s>=0&&!f.get(n,s)&&w[0]<=t;)w[0]++,s--;if(w[0]>t)return null;for(s=e+1;s<u&&f.get(n,s)&&w[1]<=t;)w[1]++,s++;if(s==u||w[1]>t)return null;for(;s<u&&!f.get(n,s)&&w[2]<=t;)w[2]++,s++;if(w[2]>t)return null;var l=w[0]+w[1]+w[2];return 5*Math.abs(l-r)>=2*r?null:o(w,i)?a(w,s):null}function u(e,n,t,u,w,s){function l(e,n,t,o){var u=e[0]+e[1]+e[2],w=a(e,t);if(null==w)return null;var l=f(n,Math.floor(w),2*e[1],u,o,s);if(null!=l){var c=(e[0]+e[1]+e[2])/3;for(var d in h){var v=h[d];if(r(v,c,l,w))return i(v,l,w,c)}var g={x:w,y:l,estimatedModuleSize:c};h.push(g)}return null}for(var h=[],c=e+t,d=n+(u>>1),v=[0,0,0],g=0;g<u;g++){var p=d+(0==(1&g)?g+1>>1:-(g+1>>1));v[0]=0,v[1]=0,v[2]=0;for(var y=e;y<c&&!s.get(y,p);)y++;for(var m=0;y<c;){if(s.get(y,p))if(1==m)v[m]++;else if(2==m){if(o(v,w)&&null!=(b=l(v,p,y,w)))return b;v[0]=v[2],v[1]=1,v[2]=0,m=1}else v[++m]++;else 1==m&&m++,v[m]++;y++}if(o(v,w)){var b=l(v,p,w,c);if(null!=b)return b}}return 0!=h.length?h[0]:null}n.__esModule=!0;var w=t(1);n.findAlignment=u},function(e,n,t){\"use strict\";function r(e,n,t,r,i,o,a,f){var u=e-t+i-a,w=n-r+o-f;if(0==u&&0==w)return{a11:t-e,a21:i-t,a31:e,a12:r-n,a22:o-r,a32:n,a13:0,a23:0,a33:1};var s=t-i,l=a-i,h=r-o,c=f-o,d=s*c-l*h,v=(u*c-l*w)/d,g=(s*w-u*h)/d;return{a11:t-e+v*t,a21:a-e+g*a,a31:e,a12:r-n+v*r,a22:f-n+g*f,a32:n,a13:v,a23:g,a33:1}}function i(e){return{a11:e.a22*e.a33-e.a23*e.a32,a21:e.a23*e.a31-e.a21*e.a33,a31:e.a21*e.a32-e.a22*e.a31,a12:e.a13*e.a32-e.a12*e.a33,a22:e.a11*e.a33-e.a13*e.a31,a32:e.a12*e.a31-e.a11*e.a32,a13:e.a12*e.a23-e.a13*e.a22,a23:e.a13*e.a21-e.a11*e.a23,a33:e.a11*e.a22-e.a12*e.a21}}function o(e,n){return{a11:e.a11*n.a11+e.a21*n.a12+e.a31*n.a13,a21:e.a11*n.a21+e.a21*n.a22+e.a31*n.a23,a31:e.a11*n.a31+e.a21*n.a32+e.a31*n.a33,a12:e.a12*n.a11+e.a22*n.a12+e.a32*n.a13,a22:e.a12*n.a21+e.a22*n.a22+e.a32*n.a23,a32:e.a12*n.a31+e.a22*n.a32+e.a32*n.a33,a13:e.a13*n.a11+e.a23*n.a12+e.a33*n.a13,a23:e.a13*n.a21+e.a23*n.a22+e.a33*n.a23,a33:e.a13*n.a31+e.a23*n.a32+e.a33*n.a33}}function a(e,n,t,o,a,f,u,w){return i(r(e,n,t,o,a,f,u,w))}function f(e,n){for(var t=n.length,r=e.a11,i=e.a12,o=e.a13,a=e.a21,f=e.a22,u=e.a23,w=e.a31,s=e.a32,l=e.a33,h=0;h<t;h+=2){var c=n[h],d=n[h+1],v=o*c+u*d+l;n[h]=(r*c+a*d+w)/v,n[h+1]=(i*c+f*d+s)/v}return n}function u(e,n,t,i,f,u,w,s,l,h,c,d,v,g,p,y){var m=a(e,n,t,i,f,u,w,s);return o(r(l,h,c,d,v,g,p,y),m)}n.__esModule=!0,n.transformPoints=f,n.quadrilateralToQuadrilateral=u},function(e,n,t){\"use strict\";function r(e){var n=e.getDimensionForVersion(),t=new Uint8Array(n*n),r=new d.BitMatrix(t,n);r.setRegion(0,0,9,9),r.setRegion(n-8,0,8,9),r.setRegion(0,n-8,9,8);for(var i=e.alignmentPatternCenters.length,o=0;o<i;o++)for(var a=e.alignmentPatternCenters[o]-2,f=0;f<i;f++)0==o&&(0==f||f==i-1)||o==i-1&&0==f||r.setRegion(e.alignmentPatternCenters[f]-2,a,5,5);return r.setRegion(6,9,1,n-17),r.setRegion(9,6,n-17,1),e.versionNumber>6&&(r.setRegion(n-11,0,3,6),r.setRegion(0,n-11,6,3)),r}function i(e,n,t){for(var i=M[t.dataMask],o=e.height,a=r(n),f=!0,u=[],w=0,s=0,l=0,h=o-1;h>0;h-=2){6==h&&h--;for(var c=0;c<o;c++)for(var d=f?o-1-c:c,v=0;v<2;v++)a.get(h-v,d)||(l++,s<<=1,e.get(h-v,d)!==i(d,h-v)&&(s|=1),8==l&&(u[w++]=255&s,l=0,s=0));f=!f}return w!=n.totalCodewords?null:u}function o(e){var n=e.height,t=n-17>>2;if(t<=6)return y.getVersionForNumber(t);for(var r=0,i=n-11,o=5;o>=0;o--)for(var a=n-9;a>=i;a--)r=e.copyBit(a,o,r);var f=y.Version.decodeVersionInformation(r);if(null!=f&&f.getDimensionForVersion()==n)return f;r=0;for(var a=5;a>=0;a--)for(var o=n-9;o>=i;o--)r=e.copyBit(a,o,r);return f=y.Version.decodeVersionInformation(r),null!=f&&f.getDimensionForVersion()==n?f:null}function a(e){return{errorCorrectionLevel:x[e>>3&3],dataMask:7&e}}function f(e,n){for(var t=1/0,r=0,i=0;i<b.length;i++){var o=b[i],f=o[0];if(f==e||f==n)return a(o[1]);var u=g.numBitsDiffering(e,f);u<t&&(r=o[1],t=u),e!=n&&(u=g.numBitsDiffering(n,f))<t&&(r=o[1],t=u)}return t<=3?a(r):null}function u(e,n){var t=f(e,n);return t||f(e^m,n^m)}function w(e){for(var n=0,t=0;t<6;t++)n=e.copyBit(t,8,n);n=e.copyBit(7,8,n),n=e.copyBit(8,8,n),n=e.copyBit(8,7,n);for(var r=5;r>=0;r--)n=e.copyBit(8,r,n);for(var i=e.height,o=0,a=i-7,r=i-1;r>=a;r--)o=e.copyBit(8,r,o);for(var t=i-8;t<i;t++)o=e.copyBit(t,8,o);var f=u(n,o);return null!=f?f:null}function s(e,n,t){if(e.length!=n.totalCodewords)throw new Error(\"Invalid number of codewords for version; got \"+e.length+\" expected \"+n.totalCodewords);var r=n.getECBlocksForLevel(t),i=0,o=r.ecBlocks;o.forEach(function(e){i+=e.count});var a=new Array(i),f=0;o.forEach(function(e){for(var n=0;n<e.count;n++){var t=e.dataCodewords,i=r.ecCodewordsPerBlock+t;a[f++]={numDataCodewords:t,codewords:new Array(i)}}});for(var u=a[0].codewords.length,w=a.length-1;w>=0;){if(a[w].codewords.length==u)break;w--}w++;for(var s=u-r.ecCodewordsPerBlock,l=0,h=0;h<s;h++)for(var c=0;c<f;c++)a[c].codewords[h]=e[l++];for(var c=w;c<f;c++)a[c].codewords[s]=e[l++];for(var d=a[0].codewords.length,h=s;h<d;h++)for(var c=0;c<f;c++){var v=c<w?h:h+1;a[c].codewords[v]=e[l++]}return a}function l(e,n){for(var t=new p.ReedSolomonDecoder,r=e.length,i=new Array(r),o=0;o<r;o++)i[o]=255&e[o];var a=e.length-n;if(!t.decode(i,a))return!1;for(var o=0;o<n;o++)e[o]=i[o];return!0}function h(e){var n=o(e);if(!n)return null;var t=w(e);if(!t)return null;var r=t.errorCorrectionLevel,a=i(e,n,t);if(!a)return null;var f=s(a,n,r),u=0;f.forEach(function(e){u+=e.numDataCodewords});for(var h=new Uint8ClampedArray(u),c=0,d=0,g=f;d<g.length;d++){var p=g[d],y=p.codewords,m=p.numDataCodewords;if(!l(y,m))return null;for(var b=0;b<m;b++)h[c++]=y[b]}return v.decodeQRdata(h,n.versionNumber,r.name)}function c(e){if(null==e)return null;var n=h(e);return n||(e.mirror(),h(e))}n.__esModule=!0;var d=t(0),v=t(10),g=t(1),p=t(12),y=t(2),m=21522,b=[[21522,0],[20773,1],[24188,2],[23371,3],[17913,4],[16590,5],[20375,6],[19104,7],[30660,8],[29427,9],[32170,10],[30877,11],[26159,12],[25368,13],[27713,14],[26998,15],[5769,16],[5054,17],[7399,18],[6608,19],[1890,20],[597,21],[3340,22],[2107,23],[13663,24],[12392,25],[16177,26],[14854,27],[9396,28],[8579,29],[11994,30],[11245,31]],M=[function(e,n){return 0==(e+n&1)},function(e,n){return 0==(1&e)},function(e,n){return n%3==0},function(e,n){return(e+n)%3==0},function(e,n){return 0==((e>>1)+n/3&1)},function(e,n){return(e*n&1)+e*n%3==0},function(e,n){return 0==((e*n&1)+e*n%3&1)},function(e,n){return 0==((e+n&1)+e*n%3&1)}],x=[{ordinal:1,bits:0,name:\"M\"},{ordinal:0,bits:1,name:\"L\"},{ordinal:3,bits:2,name:\"H\"},{ordinal:2,bits:3,name:\"Q\"}];n.decode=c},function(e,n,t){\"use strict\";function r(e){var n=[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\" \",\"$\",\"%\",\"*\",\"+\",\"-\",\".\",\"/\",\":\"];if(e>=n.length)throw new Error(\"Could not decode alphanumeric char\");return n[e].charCodeAt(0)}function i(e){switch(e){case 0:return c;case 1:return d;case 2:return v;case 3:return g;case 4:return p;case 5:return b;case 7:return y;case 8:return m;case 9:return M;case 13:return x;default:throw new Error(\"Couldn't decode mode from byte array\")}}function o(e){var n=e.readBits(8);if(0==(128&n))return 127&n;if(128==(192&n)){return(63&n)<<8|e.readBits(8)}if(192==(224&n)){return(31&n)<<16|e.readBits(16)}throw new Error(\"Bad ECI bits starting with byte \"+n)}function a(e,n,t){if(13*t>e.available())return!1;for(var r=new Array(2*t),i=0;t>0;){var o=e.readBits(13),a=Math.floor(o/96)<<8|o%96;a+=a<959?41377:42657,r[i]=a>>8&255,r[i+1]=255&a,i+=2,t--}return n.val=r,!0}function f(e,n,t){for(;t>=3;){if(e.available()<10)return!1;var i=e.readBits(10);if(i>=1e3)return!1;n.val.push(r(Math.floor(i/100))),n.val.push(r(Math.floor(i/10)%10)),n.val.push(r(i%10)),t-=3}if(2==t){if(e.available()<7)return!1;var o=e.readBits(7);if(o>=100)return!1;n.val.push(r(Math.floor(o/10))),n.val.push(r(o%10))}else if(1==t){if(e.available()<4)return!1;var a=e.readBits(4);if(a>=10)return!1;n.val.push(r(a))}return!0}function u(e,n,t,i){for(var o=n.val.length;t>1;){if(e.available()<11)return!1;var a=e.readBits(11);n.val.push(r(Math.floor(a/45))),n.val.push(r(a%45)),t-=2}if(1==t){if(e.available()<6)return!1;n.val.push(r(e.readBits(6)))}if(i)for(var f=o;f<n.val.length;f++)n.val[f]==\"%\".charCodeAt(0)&&(f<n.val.length-1&&n.val[f+1]==\"%\".charCodeAt(0)?n.val=n.val.slice(0,f+1).concat(n.val.slice(f+2)):n.val[f]=29);return!0}function w(e,n,t){if(t<<3>e.available())return!1;for(var r=new Uint32Array(t),i=0;i<t;i++)r[i]=e.readBits(8);return Array.prototype.push.apply(n.val,r),!0}function s(e,n,t){for(var r,s=new l.BitStream(e),h={val:[]},C=!1;r!=c;)if((r=s.available()<4?c:i(s.readBits(4)))!=c)if(r==b||r==M)C=!0;else if(r==g){if(s.available()<16)return null;s.readBits(8),s.readBits(8)}else if(r==y){var z=o(s);if(z<0||z>30)return null}else if(r==x){var E=s.readBits(4),A=s.readBits(r.getCharacterCountBits(n));if(E==B&&!a(s,h,A))return null}else{var S=s.readBits(r.getCharacterCountBits(n));if(r==d){if(!f(s,h,S))return null}else if(r==v){if(!u(s,h,S,C))return null}else if(r==p){if(!w(s,h,S))return null}else if(r!=m)return null}return h.val}n.__esModule=!0;var l=t(11),h=function(){function e(e,n){this.characterCountBitsForVersions=e,this.bits=n}return e.prototype.getCharacterCountBits=function(e){if(null==this.characterCountBitsForVersions)throw new Error(\"Character count doesn't apply to this mode\");var n;return n=e<=9?0:e<=26?1:2,this.characterCountBitsForVersions[n]},e}(),c=new h([0,0,0],0),d=new h([10,12,14],1),v=new h([9,11,13],2),g=new h([0,0,0],3),p=new h([8,16,16],4),y=new h(null,7),m=new h([8,10,12],8),b=new h(null,5),M=new h(null,9),x=new h([8,10,12],13),B=1;n.decodeQRdata=s},function(e,n,t){\"use strict\";n.__esModule=!0;var r=function(){function e(e){this.byteOffset=0,this.bitOffset=0,this.bytes=e}return e.prototype.readBits=function(e){if(e<1||e>32||e>this.available())throw new Error(\"Cannot read \"+e.toString()+\" bits\");var n=0;if(this.bitOffset>0){var t=8-this.bitOffset,r=e<t?e:t,i=t-r,o=255>>8-r<<i;n=(this.bytes[this.byteOffset]&o)>>i,e-=r,this.bitOffset+=r,8==this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(e>0){for(;e>=8;)n=n<<8|255&this.bytes[this.byteOffset],this.byteOffset++,e-=8;if(e>0){var i=8-e,o=255>>i<<i;n=n<<e|(this.bytes[this.byteOffset]&o)>>i,this.bitOffset+=e}}return n},e.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},e}();n.BitStream=r},function(e,n,t){\"use strict\";n.__esModule=!0;var r=function(){function e(){this.field=new o(285,256,0)}return e.prototype.decode=function(e,n){for(var t=new i(this.field,e),r=new Array(n),a=!0,f=0;f<n;f++){var u=t.evaluateAt(this.field.exp(f+this.field.generatorBase));r[r.length-1-f]=u,0!=u&&(a=!1)}if(a)return!0;var w=new i(this.field,r),s=this.runEuclideanAlgorithm(this.field.buildMonomial(n,1),w,n);if(null==s)return!1;var l=s[0],h=this.findErrorLocations(l);if(null==h)return!1;for(var c=s[1],d=this.findErrorMagnitudes(c,h),f=0;f<h.length;f++){var v=e.length-1-this.field.log(h[f]);if(v<0)return!1;e[v]=o.addOrSubtract(e[v],d[f])}return!0},e.prototype.runEuclideanAlgorithm=function(e,n,t){if(e.degree()<n.degree()){var r=e;e=n,n=r}for(var i=e,o=n,a=this.field.zero,f=this.field.one;o.degree()>=t/2;){var u=i,w=a;if(i=o,a=f,i.isZero())return null;o=u;for(var s=this.field.zero,l=i.getCoefficient(i.degree()),h=this.field.inverse(l);o.degree()>=i.degree()&&!o.isZero();){var c=o.degree()-i.degree(),d=this.field.multiply(o.getCoefficient(o.degree()),h);s=s.addOrSubtract(this.field.buildMonomial(c,d)),o=o.addOrSubtract(i.multiplyByMonomial(c,d))}if(f=s.multiplyPoly(a).addOrSubtract(w),o.degree()>=i.degree())return null}var v=f.getCoefficient(0);if(0==v)return null;var g=this.field.inverse(v);return[f.multiply(g),o.multiply(g)]},e.prototype.findErrorLocations=function(e){var n=e.degree();if(1==n)return[e.getCoefficient(1)];for(var t=new Array(n),r=0,i=1;i<this.field.size&&r<n;i++)0==e.evaluateAt(i)&&(t[r]=this.field.inverse(i),r++);return r!=n?null:t},e.prototype.findErrorMagnitudes=function(e,n){for(var t=n.length,r=new Array(t),i=0;i<t;i++){for(var o=this.field.inverse(n[i]),a=1,f=0;f<t;f++)if(i!=f){var u=this.field.multiply(n[f],o),w=0==(1&u)?1|u:-2&u;a=this.field.multiply(a,w)}r[i]=this.field.multiply(e.evaluateAt(o),this.field.inverse(a)),0!=this.field.generatorBase&&(r[i]=this.field.multiply(r[i],o))}return r},e}();n.ReedSolomonDecoder=r;var i=function(){\nfunction e(e,n){if(0==n.length)throw new Error(\"No coefficients.\");this.field=e;var t=n.length;if(t>1&&0==n[0]){for(var r=1;r<t&&0==n[r];)r++;if(r==t)this.coefficients=e.zero.coefficients;else{this.coefficients=new Array(t-r);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=n[r+i]}}else this.coefficients=n}return e.prototype.evaluateAt=function(e){var n=0;if(0==e)return this.getCoefficient(0);var t=this.coefficients.length;if(1==e)return this.coefficients.forEach(function(e){n=o.addOrSubtract(n,e)}),n;n=this.coefficients[0];for(var r=1;r<t;r++)n=o.addOrSubtract(this.field.multiply(e,n),this.coefficients[r]);return n},e.prototype.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},e.prototype.degree=function(){return this.coefficients.length-1},e.prototype.isZero=function(){return 0==this.coefficients[0]},e.prototype.addOrSubtract=function(n){if(this.isZero())return n;if(n.isZero())return this;var t=this.coefficients,r=n.coefficients;if(t.length>r.length){var i=t;t=r,r=i}for(var a=new Array(r.length),f=r.length-t.length,u=0;u<f;u++)a[u]=r[u];for(var u=f;u<r.length;u++)a[u]=o.addOrSubtract(t[u-f],r[u]);return new e(this.field,a)},e.prototype.multiply=function(n){if(0==n)return this.field.zero;if(1==n)return this;for(var t=this.coefficients.length,r=new Array(t),i=0;i<t;i++)r[i]=this.field.multiply(this.coefficients[i],n);return new e(this.field,r)},e.prototype.multiplyPoly=function(n){if(this.isZero()||n.isZero())return this.field.zero;for(var t=this.coefficients,r=t.length,i=n.coefficients,a=i.length,f=new Array(r+a-1),u=0;u<r;u++)for(var w=t[u],s=0;s<a;s++)f[u+s]=o.addOrSubtract(f[u+s],this.field.multiply(w,i[s]));return new e(this.field,f)},e.prototype.multiplyByMonomial=function(n,t){if(n<0)throw new Error(\"Invalid degree less than 0\");if(0==t)return this.field.zero;for(var r=this.coefficients.length,i=new Array(r+n),o=0;o<r;o++)i[o]=this.field.multiply(this.coefficients[o],t);return new e(this.field,i)},e}(),o=function(){function e(e,n,t){this.INITIALIZATION_THRESHOLD=0,this.initialized=!1,this.primitive=e,this.size=n,this.generatorBase=t,n<=this.INITIALIZATION_THRESHOLD&&this.initialize()}return e.prototype.initialize=function(){this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var e=1,n=0;n<this.size;n++)this.expTable[n]=e,(e<<=1)>=this.size&&(e^=this.primitive,e&=this.size-1);for(var n=0;n<this.size-1;n++)this.logTable[this.expTable[n]]=n;this.zero=new i(this,[0]),this.one=new i(this,[1]),this.initialized=!0},e.addOrSubtract=function(e,n){return e^n},e.prototype.checkInit=function(){this.initialized||this.initialize()},e.prototype.multiply=function(e,n){return this.checkInit(),0==e||0==n?0:this.expTable[(this.logTable[e]+this.logTable[n])%(this.size-1)]},e.prototype.exp=function(e){return this.checkInit(),this.expTable[e]},e.prototype.log=function(e){if(this.checkInit(),0==e)throw new Error(\"Can't take log(0)\");return this.logTable[e]},e.prototype.inverse=function(e){if(this.checkInit(),0==e)throw new Error(\"Can't invert 0\");return this.expTable[this.size-this.logTable[e]-1]},e.prototype.buildMonomial=function(e,n){if(this.checkInit(),e<0)throw new Error(\"Invalid monomial degree less than 0\");if(0==n)return this.zero;var t=new Array(e+1);return t[0]=n,new i(this,t)},e}()}])}),self.addEventListener(\"message\",function(e){var n=jsQR.decodeQRFromImage(e.data.data,e.data.width,e.data.height);postMessage(n)});"], {
    type: 'application/javascript'
  });
}

// Props that are allowed to change dynamicly
var propsKeys = ['delay', 'legacyMode', 'facingMode'];

module.exports = (_temp = _class = function (_Component) {
  _inherits(Reader, _Component);

  function Reader(props) {
    _classCallCheck(this, Reader);

    // Bind function to the class
    var _this = _possibleConstructorReturn(this, (Reader.__proto__ || Object.getPrototypeOf(Reader)).call(this, props));

    _this.els = {};
    _this.initiate = _this.initiate.bind(_this);
    _this.initiateLegacyMode = _this.initiateLegacyMode.bind(_this);
    _this.check = _this.check.bind(_this);
    _this.handleVideo = _this.handleVideo.bind(_this);
    _this.handleLoadStart = _this.handleLoadStart.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.clearComponent = _this.clearComponent.bind(_this);
    _this.handleReaderLoad = _this.handleReaderLoad.bind(_this);
    _this.openImageDialog = _this.openImageDialog.bind(_this);
    _this.handleWorkerMessage = _this.handleWorkerMessage.bind(_this);
    _this.setRefFactory = _this.setRefFactory.bind(_this);
    return _this;
  }

  _createClass(Reader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Initiate web worker execute handler according to mode.
      this.worker = new Worker(URL.createObjectURL(workerBlob));
      this.worker.onmessage = this.handleWorkerMessage;

      if (!this.props.legacyMode) {
        this.initiate();
      } else {
        this.initiateLegacyMode();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // React according to change in props
      var changedProps = havePropsChanged(this.props, nextProps, propsKeys);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = changedProps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var prop = _step.value;

          if (prop == 'facingMode') {
            this.clearComponent();
            this.initiate(nextProps);
            break;
          } else if (prop == 'delay') {
            if (this.props.delay == false && !nextProps.legacyMode) {
              this.timeout = setTimeout(this.check, nextProps.delay);
            }
            if (nextProps.delay == false) {
              clearTimeout(this.timeout);
            }
          } else if (prop == 'legacyMode') {
            if (this.props.legacyMode && !nextProps.legacyMode) {
              this.clearComponent();
              this.initiate(nextProps);
            } else {
              this.clearComponent();
              this.componentDidUpdate = this.initiateLegacyMode;
            }
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // Only render when the `propsKeys` have changed.
      var changedProps = havePropsChanged(this.props, nextProps, propsKeys);
      return changedProps.length > 0;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Stop web-worker and clear the component
      if (this.worker) {
        this.worker.terminate();
        this.worker = undefined;
      }
      this.clearComponent();
    }
  }, {
    key: 'clearComponent',
    value: function clearComponent() {
      // Remove all event listeners and variables
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = undefined;
      }
      if (this.stopCamera) {
        this.stopCamera();
      }
      if (this.reader) {
        this.reader.removeEventListener('load', this.handleReaderLoad);
      }
      if (this.els.img) {
        this.els.img.removeEventListener('load', this.check);
      }
    }
  }, {
    key: 'initiate',
    value: function initiate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var onError = props.onError,
          facingMode = props.facingMode,
          resolution = props.resolution;

      // Check browser facingMode constraint support
      // Firefox ignores facingMode or deviceId constraints

      var isFirefox = /firefox/i.test(navigator.userAgent);
      var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
      var supportsFacingMode = supportedConstraints.facingMode;

      var vConstraintsPromise = isFirefox ? Promise.resolve({}) : supportsFacingMode ? Promise.resolve({ facingMode: { exact: facingMode } }) : getDeviceId(facingMode).then(function (deviceId) {
        return { deviceId: deviceId };
      });

      vConstraintsPromise.then(function (vConstraints) {
        return navigator.mediaDevices.getUserMedia({
          video: _extends({}, vConstraints, {
            aspectRatio: supportedConstraints.aspectRatio ? 1 : undefined
          })
        });
      }).then(this.handleVideo).catch(onError);
    }
  }, {
    key: 'handleVideo',
    value: function handleVideo(stream) {
      var preview = this.els.preview;

      // Handle different browser implementations of MediaStreams as src

      if (preview.srcObject !== undefined) {
        preview.srcObject = stream;
      } else if (preview.mozSrcObject !== undefined) {
        preview.mozSrcObject = stream;
      } else if (window.URL.createObjectURL) {
        preview.src = window.URL.createObjectURL(stream);
      } else if (window.webkitURL) {
        preview.src = window.webkitURL.createObjectURL(stream);
      } else {
        preview.src = stream;
      }

      // IOS play in fullscreen
      preview.playsInline = true;

      var streamTrack = stream.getTracks()[0];
      // Assign `stopCamera` so the track can be stopped once component is cleared
      this.stopCamera = streamTrack.stop.bind(streamTrack);

      preview.addEventListener('loadstart', this.handleLoadStart);
    }
  }, {
    key: 'handleLoadStart',
    value: function handleLoadStart() {
      var _props = this.props,
          delay = _props.delay,
          onLoad = _props.onLoad;

      var preview = this.els.preview;
      preview.play();

      if (typeof onLoad == 'function') {
        onLoad();
      }

      if (typeof delay == 'number') {
        this.timeout = setTimeout(this.check, delay);
      }

      // Some browsers call loadstart continuously
      preview.removeEventListener('loadstart', this.handleLoadStart);
    }
  }, {
    key: 'check',
    value: function check() {
      var _props2 = this.props,
          legacyMode = _props2.legacyMode,
          resolution = _props2.resolution,
          delay = _props2.delay;
      var _els = this.els,
          preview = _els.preview,
          canvas = _els.canvas,
          img = _els.img;

      // Get image/video dimensions

      var width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth);
      var height = Math.floor(legacyMode ? img.naturalHeight : preview.videoHeight);

      // Canvas draw offsets
      var hozOffset = 0;
      var vertOffset = 0;

      // Scale image to correct resolution
      if (legacyMode) {
        // Keep image aspect ratio
        var greatestSize = width > height ? width : height;
        var ratio = resolution / greatestSize;

        height = ratio * height;
        width = ratio * width;

        canvas.width = width;
        canvas.height = height;
      } else {
        // Crop image to fit 1:1 aspect ratio
        var smallestSize = width < height ? width : height;
        var _ratio = resolution / smallestSize;

        height = _ratio * height;
        width = _ratio * width;

        vertOffset = (height - resolution) / 2 * -1;
        hozOffset = (width - resolution) / 2 * -1;

        canvas.width = resolution;
        canvas.height = resolution;
      }

      var previewIsPlaying = preview && preview.readyState === preview.HAVE_ENOUGH_DATA;

      if (legacyMode || previewIsPlaying) {
        var ctx = canvas.getContext('2d');

        ctx.drawImage(legacyMode ? img : preview, hozOffset, vertOffset, width, height);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // Send data to web-worker
        this.worker.postMessage(imageData);
      } else {
        // Preview not ready -> check later
        this.timeout = setTimeout(this.check, delay);
      }
    }
  }, {
    key: 'handleWorkerMessage',
    value: function handleWorkerMessage(e) {
      var _props3 = this.props,
          onScan = _props3.onScan,
          legacyMode = _props3.legacyMode,
          delay = _props3.delay;

      var decoded = e.data;

      onScan(decoded || null);

      if (!legacyMode && typeof delay == 'number' && this.worker) {
        this.timeout = setTimeout(this.check, delay);
      }
    }
  }, {
    key: 'initiateLegacyMode',
    value: function initiateLegacyMode() {
      this.reader = new FileReader();
      this.reader.addEventListener('load', this.handleReaderLoad);
      this.els.img.addEventListener('load', this.check, false);

      // Reset componentDidUpdate
      this.componentDidUpdate = undefined;

      if (typeof this.props.onLoad == 'function') {
        this.props.onLoad();
      }
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(e) {
      var selectedImg = e.target.files[0];
      this.reader.readAsDataURL(selectedImg);
    }
  }, {
    key: 'handleReaderLoad',
    value: function handleReaderLoad(e) {
      // Set selected image blob as img source
      this.els.img.src = e.target.result;
    }
  }, {
    key: 'openImageDialog',
    value: function openImageDialog() {
      // Function to be executed by parent in user action context to trigger img file uploader
      this.els.input.click();
    }
  }, {
    key: 'setRefFactory',
    value: function setRefFactory(key) {
      var _this2 = this;

      return function (element) {
        _this2.els[key] = element;
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          style = _props4.style,
          className = _props4.className,
          onImageLoad = _props4.onImageLoad,
          legacyMode = _props4.legacyMode,
          showViewFinder = _props4.showViewFinder,
          facingMode = _props4.facingMode;


      var containerStyle = {
        position: 'relative',
        width: '100%',
        paddingTop: '100%'
      };
      var hiddenStyle = { display: 'none' };
      var previewStyle = {
        top: 0,
        left: 0,
        display: 'block',
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      };
      var videoPreviewStyle = _extends({}, previewStyle, {
        objectFit: 'cover',
        transform: facingMode == 'user' ? 'scaleX(-1)' : undefined
      });
      var imgPreviewStyle = _extends({}, previewStyle, {
        objectFit: 'scale-down'
      });

      var viewFinderStyle = {
        top: 0,
        left: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        border: '50px solid rgba(0, 0, 0, 0.3)',
        boxShadow: 'inset 0 0 0 5px rgba(255, 0, 0, 0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%'
      };

      return React.createElement(
        'section',
        { className: className, style: style },
        React.createElement(
          'section',
          { style: containerStyle },
          !legacyMode && showViewFinder ? React.createElement('div', { style: viewFinderStyle }) : null,
          legacyMode ? React.createElement('input', {
            style: hiddenStyle,
            type: 'file',
            accept: 'image/*',
            ref: this.setRefFactory('input'),
            onChange: this.handleInputChange
          }) : null,
          legacyMode ? React.createElement('img', { style: imgPreviewStyle, ref: this.setRefFactory('img'), onLoad: onImageLoad }) : React.createElement('video', { style: videoPreviewStyle, ref: this.setRefFactory('preview') }),
          React.createElement('canvas', { style: hiddenStyle, ref: this.setRefFactory('canvas') })
        )
      );
    }
  }]);

  return Reader;
}(Component), _class.propTypes = {
  onScan: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onLoad: PropTypes.func,
  onImageLoad: PropTypes.func,
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  facingMode: PropTypes.oneOf(['user', 'environment']),
  legacyMode: PropTypes.bool,
  resolution: PropTypes.number,
  showViewFinder: PropTypes.bool,
  style: PropTypes.any,
  className: PropTypes.string
}, _class.defaultProps = {
  delay: 500,
  resolution: 600,
  facingMode: 'environment',
  showViewFinder: true
}, _temp);