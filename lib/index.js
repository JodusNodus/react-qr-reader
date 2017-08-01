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
var havePropsChanged = require('./havePropsChanged'

// Require adapter to support older browser implementations
);require('webrtc-adapter'

// Inline worker.js as a string value of workerBlob.
);var workerBlob = new Blob(["!function(e,n){\"object\"==typeof exports&&\"object\"==typeof module?module.exports=n():\"function\"==typeof define&&define.amd?define([],n):\"object\"==typeof exports?exports.jsQR=n():e.jsQR=n()}(this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var i=t[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var t={};return n.m=e,n.c=t,n.p=\"\",n(0)}([function(e,n,t){\"use strict\";function r(e){return i(l.decode(e))}function i(e){var n=\"\";if(null!=e&&void 0!=e)for(var t=0;t<e.length;t++)n+=String.fromCharCode(e[t]);return n}function a(e,n){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e[r]?1:0;return new h.BitMatrix(t,n)}function o(e,n,t){return i(f(e,n,t))}function f(e,n,t){var r=c(e,n,t),i=w.locate(r);if(!i)return null;var a=s.extract(r,i);return a?l.decode(a):null}var u=t(1),w=t(3),s=t(4),l=t(9),h=t(2),c=u.binarize;n.binarizeImage=c;var v=w.locate;n.locateQRInBinaryImage=v;var d=s.extract;n.extractQRFromBinaryImage=d,n.decodeQR=r,n.createBitMatrix=a,n.decodeQRFromImage=o,n.decodeQRFromImageAsByteArray=f},function(e,n,t){\"use strict\";function r(e,n,t,r,i){for(var a=new Array(t),o=0;o<t;o++)a[o]=new Uint8ClampedArray(n);for(var w=0;w<t;w++){var l=w<<f,h=i-u;l>h&&(l=h);for(var c=0;c<n;c++){var v=c<<f,d=r-u;v>d&&(v=d);for(var g=0,p=255,y=0,m=0,b=l*r+v;m<u;m++,b+=r){for(var M=0;M<u;M++){var B=255&e[b+M];g+=B,B<p&&(p=B),B>y&&(y=B)}if(y-p>s)for(m++,b+=r;m<u;m++,b+=r)for(var M=0;M<u;M++)g+=255&e[b+M]}var x=g>>2*f;if(y-p<=s&&(x=p>>1,w>0&&c>0)){var C=a[w-1][c]+2*a[w][c-1]+a[w-1][c-1]>>2;p<C&&(x=C)}a[w][c]=x}}return a}function i(e,n,t,r,i,a){function w(e,n,t){return e<n?n:e>t?t:e}for(var s=o.BitMatrix.createEmpty(r,i),l=0;l<t;l++){var h=l<<f,c=i-u;h>c&&(h=c);for(var v=0;v<n;v++){var d=v<<f,g=r-u;d>g&&(d=g);for(var p=w(v,2,n-3),y=w(l,2,t-3),m=0,b=-2;b<=2;b++){var M=a[y+b];m+=M[p-2],m+=M[p-1],m+=M[p],m+=M[p+1],m+=M[p+2]}var B=m/25;!function(e,n,t,r,i){for(var a=t*i+n,o=0;o<u;o++,a+=i)for(var f=0;f<u;f++){var w=255&e[a+f];s.set(n+f,t+o,w<=r)}}(e,d,h,B,r)}}return s}function a(e,n,t){if(e.length!==n*t*4)throw new Error(\"Binarizer data.length != width * height * 4\");for(var a=new Uint8ClampedArray(n*t),o=0;o<n;o++)for(var u=0;u<t;u++){var s=4*(u*n+o),l=e[s],h=e[s+1],c=e[s+2],v=.2126*l+.7152*h+.0722*c;a[u*n+o]=v}var d=n>>f;0!=(n&w)&&d++;var g=t>>f;return 0!=(t&w)&&g++,i(a,d,g,n,t,r(a,d,g,n,t))}var o=t(2),f=3,u=1<<f,w=u-1,s=24;n.binarize=a},function(e,n){\"use strict\";var t=function(){function e(e,n){this.width=n,this.height=e.length/n,this.data=e}return e.createEmpty=function(n,t){return new e(new Uint8Array(n*t),n)},e.prototype.get=function(e,n){return!!this.data[n*this.width+e]},e.prototype.set=function(e,n,t){this.data[n*this.width+e]=t?1:0},e.prototype.copyBit=function(e,n,t){return this.get(e,n)?t<<1|1:t<<1},e.prototype.setRegion=function(e,n,t,r){for(var i=e+t,a=n+r,o=n;o<a;o++)for(var f=e;f<i;f++)this.set(f,o,!0)},e.prototype.mirror=function(){for(var e=0;e<this.width;e++)for(var n=e+1;n<this.height;n++)this.get(e,n)!=this.get(n,e)&&(this.set(e,n,!this.get(e,n)),this.set(n,e,!this.get(n,e)))},e}();n.BitMatrix=t},function(e,n){\"use strict\";function t(e){for(var n=0,t=0;t<5;t++){var r=e[t];if(0===r)return!1;n+=r}if(n<7)return!1;var i=(n<<l)/7,a=i/2;return Math.abs(i-(e[0]<<l))<a&&Math.abs(i-(e[1]<<l))<a&&Math.abs(3*i-(e[2]<<l))<3*a&&Math.abs(i-(e[3]<<l))<a&&Math.abs(i-(e[4]<<l))<a}function r(e,n){var t=n-e[4]-e[3]-e[2]/2;return t!==t?null:t}function i(e,n){var t=e.x-n.x,r=e.y-n.y;return Math.sqrt(t*t+r*r)}function a(e,n,t){var r=n.x,i=n.y;return(t.x-r)*(e.y-i)-(t.y-i)*(e.x-r)}function o(e){var n,t,r,o=i(e[0],e[1]),f=i(e[1],e[2]),u=i(e[0],e[2]);if(f>=o&&f>=u?(t=e[0],n=e[1],r=e[2]):u>=f&&u>=o?(t=e[1],n=e[0],r=e[2]):(t=e[2],n=e[0],r=e[1]),a(n,t,r)<0){var w=n;n=r,r=w}return{bottomLeft:{x:n.x,y:n.y},topLeft:{x:t.x,y:t.y},topRight:{x:r.x,y:r.y}}}function f(e){function n(n,t){return n=Math.floor(n),t=Math.floor(t),e.get(n,t)}function i(r,i,a,o){for(var f=e.height,u=e.width,w=[0,0,0,0,0],s=0;r-s>=0&&n(i-s,r-s);)w[2]++,s++;if(r-s<0||i-s<0)return!1;for(;r-s>=0&&i-s>=0&&!n(i-s,r-s)&&w[1]<=a;)w[1]++,s++;if(r-s<0||i-s<0||w[1]>a)return!1;for(;r-s>=0&&i-s>=0&&n(i-s,r-s)&&w[0]<=a;)w[0]++,s++;if(w[0]>a)return!1;for(s=1;r+s<f&&i+s<u&&n(i+s,r+s);)w[2]++,s++;if(r+s>=f||i+s>=u)return!1;for(;r+s<f&&i+s<u&&!n(i+s,r+s)&&w[3]<a;)w[3]++,s++;if(r+s>=f||i+s>=u||w[3]>=a)return!1;for(;r+s<f&&i+s<u&&n(i+s,r+s)&&w[4]<a;)w[4]++,s++;if(w[4]>=a)return!1;var l=w[0]+w[1]+w[2]+w[3]+w[4];return Math.abs(l-o)<2*o&&t(w)}function a(i,a,o,f){for(var u=e.height,w=[0,0,0,0,0],s=i;s>=0&&n(a,s);)w[2]++,s--;if(s<0)return null;for(;s>=0&&!n(a,s)&&w[1]<=o;)w[1]++,s--;if(s<0||w[1]>o)return null;for(;s>=0&&n(a,s)&&w[0]<=o;)w[0]++,s--;if(w[0]>o)return null;for(s=i+1;s<u&&n(a,s);)w[2]++,s++;if(s==u)return null;for(;s<u&&!n(a,s)&&w[3]<o;)w[3]++,s++;if(s==u||w[3]>=o)return null;for(;s<u&&n(a,s)&&w[4]<o;)w[4]++,s++;if(w[4]>=o)return null;var l=w[0]+w[1]+w[2]+w[3]+w[4];return 5*Math.abs(l-f)>=2*f?null:t(w)?r(w,s):null}function f(){var e=0,n=0,t=v.length;if(v.forEach(function(t){t.count>=u&&(e++,n+=t.estimatedModuleSize)}),e<3)return!1;for(var r=n/t,i=0,a=0;a<t;a++){var o=v[a];i+=Math.abs(o.estimatedModuleSize-r)}return i<=.05*n}function l(i,a,o,f){for(var u=e.width,w=[0,0,0,0,0],s=i;s>=0&&n(s,a);)w[2]++,s--;if(s<0)return null;for(;s>=0&&!n(s,a)&&w[1]<=o;)w[1]++,s--;if(s<0||w[1]>o)return null;for(;s>=0&&n(s,a)&&w[0]<=o;)w[0]++,s--;if(w[0]>o)return null;for(s=i+1;s<u&&n(s,a);)w[2]++,s++;if(s==u)return null;for(;s<u&&!n(s,a)&&w[3]<o;)w[3]++,s++;if(s==u||w[3]>=o)return null;for(;s<u&&n(s,a)&&w[4]<o;)w[4]++,s++;if(w[4]>=o)return null;var l=w[0]+w[1]+w[2]+w[3]+w[4];return 5*Math.abs(l-f)>=f?null:t(w)?r(w,s):null}function c(e,n,t,o){var f=e[0]+e[1]+e[2]+e[3]+e[4],u=r(e,t);if(null==u)return!1;var w=a(n,Math.floor(u),e[2],f);if(null!=w&&null!=(u=l(Math.floor(u),Math.floor(w),e[2],f))&&(!o||i(Math.floor(w),Math.floor(u),e[2],f))){for(var s=f/7,c=!1,d=0;d<v.length;d++){var g=v[d];if(g.aboutEquals(s,w,u)){v.splice(d,1,g.combineEstimate(w,u,s)),c=!0;break}}if(!c){var p=new h(u,w,s);v.push(p)}return!0}return!1}var v=[],d=!1,g=e.height,p=e.width,y=Math.floor(3*g/(4*s));y<w&&(y=w);for(var m=!1,b=[0,0,0,0,0],M=y-1;M<g&&!m;M+=y){b=[0,0,0,0,0];for(var B=0,x=0;x<p;x++)if(n(x,M))1==(1&B)&&B++,b[B]++;else if(0==(1&B))if(4===B)if(t(b)){var C=c(b,M,x,!1);if(!C){b=[b[2],b[3],b[4],1,0],B=3;continue}if(y=2,d)m=f();else{var z=function(){if(v.length<=1)return 0;var e=null;return v.forEach(function(n){if(n.count>=u){if(null!=e)return d=!0,Math.floor(Math.abs(e.x-n.x)-Math.abs(e.y-n.y))/2;e=n}}),0}();z>b[2]&&(M+=z-b[2]-y,x=p-1)}b=[0,0,0,0,0],B=0}else b=[b[2],b[3],b[4],1,0],B=3;else b[++B]++;else b[B]++;if(t(b)){var C=c(b,M,p,!1);C&&(y=b[0],d&&(m=f()))}}var E=function(){var e=v.length;if(e<3)return null;if(e>3){var n=0,t=0;v.forEach(function(e){var r=e.estimatedModuleSize;n+=r,t+=r*r});var r=n/e,i=Math.sqrt(t/e-r*r);v.sort(function(e,n){var t=Math.abs(n.estimatedModuleSize-r),i=Math.abs(e.estimatedModuleSize-r);return t<i?-1:t==i?0:1});for(var a=Math.max(.2*r,i),o=0;o<v.length&&v.length>3;o++){var f=v[o];Math.abs(f.estimatedModuleSize-r)>a&&(v.splice(o,1),o--)}}if(v.length>3){var n=0;v.forEach(function(e){n+=e.estimatedModuleSize});var r=n/v.length;v.sort(function(e,n){if(n.count===e.count){var t=Math.abs(n.estimatedModuleSize-r),i=Math.abs(e.estimatedModuleSize-r);return t<i?1:t==i?0:-1}return n.count-e.count}),v=v.slice(0,3)}return[v[0],v[1],v[2]]}();return E?o(E):null}var u=2,w=3,s=57,l=8,h=function(){function e(e,n,t,r){this.x=e,this.y=n,this.estimatedModuleSize=t,this.count=null==r?1:r}return e.prototype.aboutEquals=function(e,n,t){if(Math.abs(n-this.y)<=e&&Math.abs(t-this.x)<=e){var r=Math.abs(e-this.estimatedModuleSize);return r<=1||r<=this.estimatedModuleSize}return!1},e.prototype.combineEstimate=function(n,t,r){var i=this.count+1;return new e((this.count*this.x+t)/i,(this.count*this.y+n)/i,(this.count*this.estimatedModuleSize+r)/i,i)},e}();n.locate=f},function(e,n,t){\"use strict\";function r(e,n,t){for(var r=!0,i=0;i<t.length&&r;i+=2){var a=Math.floor(t[i]),o=Math.floor(t[i+1]);if(a<-1||a>e||o<-1||o>n)throw new Error;r=!1,-1==a?(t[i]=0,r=!0):a==e&&(t[i]=e-1,r=!0),-1==o?(t[i+1]=0,r=!0):o==n&&(t[i+1]=n-1,r=!0)}r=!0;for(var i=t.length-2;i>=0&&r;i-=2){var a=Math.floor(t[i]),o=Math.floor(t[i+1]);if(a<-1||a>e||o<-1||o>n)throw new Error;r=!1,-1==a?(t[i]=0,r=!0):a==e&&(t[i]=e-1,r=!0),-1==o?(t[i+1]=0,r=!0):o==n&&(t[i+1]=n-1,r=!0)}return t}function i(e,n,t){if(n<=0)return null;for(var i=y.BitMatrix.createEmpty(n,n),a=new Float32Array(n<<1),o=0;o<n;o++){for(var f=a.length,u=o+.5,w=0;w<f;w+=2)a[w]=.5+(w>>1),a[w+1]=u;a=g.transformPoints(t,a);try{var s=r(e.width,e.height,a)}catch(e){return null}for(var w=0;w<f;w+=2)i.set(w>>1,o,e.get(Math.floor(s[w]),Math.floor(s[w+1])))}return i}function a(e,n,t,r,i){var a,o,f,u,w=i-3.5;return null!=r?(a=r.x,o=r.y,f=u=w-3):(a=n.x-e.x+t.x,o=n.y-e.y+t.y,f=u=w),g.quadrilateralToQuadrilateral(3.5,3.5,w,3.5,f,u,3.5,w,e.x,e.y,n.x,n.y,a,o,t.x,t.y)}function o(e,n,t,r){return Math.sqrt((t-e)*(t-e)+(r-n)*(r-n))}function f(e,n,t,r,i){n=Math.floor(n),t=Math.floor(t);var a=Math.floor(r*e),o=Math.max(0,n-a),f=Math.min(i.width,n+a);if(f-o<3*e)return null;var u=Math.max(0,t-a),w=Math.min(i.height-1,t+a);return d.findAlignment(o,u,f-o,w-u,e,i)}function u(e,n,t,r){var i=Math.round(o(e.x,e.y,n.x,n.y)/r),a=Math.round(o(e.x,e.y,t.x,t.y)/r),f=7+(i+a>>1);switch(3&f){case 0:f++;break;case 2:f--}return f}function w(e){if(e%4!=1)return null;var n=e-17>>2;return n<1||n>40?null:p.getVersionForNumber(n)}function s(e,n,t,r,i){e=Math.floor(e),n=Math.floor(n),t=Math.floor(t),r=Math.floor(r);var a=Math.abs(r-n)>Math.abs(t-e);if(a){var f=e;e=n,n=f,f=t,t=r,r=f}for(var u=Math.abs(t-e),w=Math.abs(r-n),s=-u>>1,l=e<t?1:-1,h=n<r?1:-1,c=0,v=t+l,d=e,g=n;d!=v;d+=l){var p=a?g:d,y=a?d:g;if(1==c===i.get(p,y)){if(2==c)return o(d,g,e,n);c++}if((s+=w)>0){if(g==r)break;g+=h,s-=u}}return 2==c?o(t+l,r,e,n):NaN}function l(e,n,t,r,i){var a=s(e,n,t,r,i),o=1,f=e-(t-e);f<0?(o=e/(e-f),f=0):f>=i.width&&(o=(i.width-1-e)/(f-e),f=i.width-1);var u=n-(r-n)*o;return o=1,u<0?(o=n/(n-u),u=0):u>=i.height&&(o=(i.height-1-n)/(u-n),u=i.height-1),f=e+(f-e)*o,(a+=s(e,n,f,u,i))-1}function h(e,n,t){var r=l(e.x,e.y,n.x,n.y,t),i=l(n.x,n.y,e.x,e.y,t);return m.isNaN(r)?i/7:m.isNaN(i)?r/7:(r+i)/14}function c(e,n,t,r){return(h(e,n,r)+h(e,t,r))/2}function v(e,n){var t=c(n.topLeft,n.topRight,n.bottomLeft,e);if(t<1)return null;var r=u(n.topLeft,n.topRight,n.bottomLeft,t);if(!r)return null;var o=w(r);if(null==o)return null;var s=o.getDimensionForVersion()-7,l=null;if(o.alignmentPatternCenters.length>0)for(var h=n.topRight.x-n.topLeft.x+n.bottomLeft.x,v=n.topRight.y-n.topLeft.y+n.bottomLeft.y,d=1-3/s,g=n.topLeft.x+d*(h-n.topLeft.x),p=n.topLeft.y+d*(v-n.topLeft.y),y=4;y<=16&&!(l=f(t,g,p,y,e));y<<=1);return i(e,r,a(n.topLeft,n.topRight,n.bottomLeft,l,r))}var d=t(5),g=t(7),p=t(8),y=t(2),m=t(6);n.extract=v},function(e,n,t){\"use strict\";function r(e,n,t,r){if(Math.abs(t-e.y)<=n&&Math.abs(r-e.x)<=n){var i=Math.abs(n-e.estimatedModuleSize);return i<=1||i<=e.estimatedModuleSize}return!1}function i(e,n,t,r){return{x:(e.x+t)/2,y:(e.y+n)/2,estimatedModuleSize:(e.estimatedModuleSize+r)/2}}function a(e,n){for(var t=n/2,r=0;r<3;r++)if(Math.abs(n-e[r])>=t)return!1;return!0}function o(e,n){var t=n-e[2]-e[1]/2;return w.isNaN(t)?null:t}function f(e,n,t,r,i,f){for(var u=f.height,w=[0,0,0],s=e;s>=0&&f.get(n,s)&&w[1]<=t;)w[1]++,s--;if(s<0||w[1]>t)return null;for(;s>=0&&!f.get(n,s)&&w[0]<=t;)w[0]++,s--;if(w[0]>t)return null;for(s=e+1;s<u&&f.get(n,s)&&w[1]<=t;)w[1]++,s++;if(s==u||w[1]>t)return null;for(;s<u&&!f.get(n,s)&&w[2]<=t;)w[2]++,s++;if(w[2]>t)return null;var l=w[0]+w[1]+w[2];return 5*Math.abs(l-r)>=2*r?null:a(w,i)?o(w,s):null}function u(e,n,t,u,w,s){function l(e,n,t,a){var u=e[0]+e[1]+e[2],w=o(e,t);if(null==w)return null;var l=f(n,Math.floor(w),2*e[1],u,a,s);if(null!=l){var c=(e[0]+e[1]+e[2])/3;for(var v in h){var d=h[v];if(r(d,c,l,w))return i(d,l,w,c)}var g={x:w,y:l,estimatedModuleSize:c};h.push(g)}return null}for(var h=[],c=e+t,v=n+(u>>1),d=[0,0,0],g=0;g<u;g++){var p=v+(0==(1&g)?g+1>>1:-(g+1>>1));d[0]=0,d[1]=0,d[2]=0;for(var y=e;y<c&&!s.get(y,p);)y++;for(var m=0;y<c;){if(s.get(y,p))if(1==m)d[m]++;else if(2==m){if(a(d,w)&&null!=(b=l(d,p,y,w)))return b;d[0]=d[2],d[1]=1,d[2]=0,m=1}else d[++m]++;else 1==m&&m++,d[m]++;y++}if(a(d,w)){var b=l(d,p,w,c);if(null!=b)return b}}return 0!=h.length?h[0]:null}var w=t(6);n.findAlignment=u},function(e,n){\"use strict\";function t(e,n){return e^=n,i[15&e]+i[e>>4&15]+i[e>>8&15]+i[e>>12&15]+i[e>>16&15]+i[e>>20&15]+i[e>>24&15]+i[e>>28&15]}function r(e){return\"[object Number]\"===Object.prototype.toString.call(e)&&e!==+e}var i=[0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4];n.numBitsDiffering=t,n.isNaN=r},function(e,n){\"use strict\";function t(e,n,t,r,i,a,o,f){var u=e-t+i-o,w=n-r+a-f;if(0==u&&0==w)return{a11:t-e,a21:i-t,a31:e,a12:r-n,a22:a-r,a32:n,a13:0,a23:0,a33:1};var s=t-i,l=o-i,h=r-a,c=f-a,v=s*c-l*h,d=(u*c-l*w)/v,g=(s*w-u*h)/v;return{a11:t-e+d*t,a21:o-e+g*o,a31:e,a12:r-n+d*r,a22:f-n+g*f,a32:n,a13:d,a23:g,a33:1}}function r(e){return{a11:e.a22*e.a33-e.a23*e.a32,a21:e.a23*e.a31-e.a21*e.a33,a31:e.a21*e.a32-e.a22*e.a31,a12:e.a13*e.a32-e.a12*e.a33,a22:e.a11*e.a33-e.a13*e.a31,a32:e.a12*e.a31-e.a11*e.a32,a13:e.a12*e.a23-e.a13*e.a22,a23:e.a13*e.a21-e.a11*e.a23,a33:e.a11*e.a22-e.a12*e.a21}}function i(e,n){return{a11:e.a11*n.a11+e.a21*n.a12+e.a31*n.a13,a21:e.a11*n.a21+e.a21*n.a22+e.a31*n.a23,a31:e.a11*n.a31+e.a21*n.a32+e.a31*n.a33,a12:e.a12*n.a11+e.a22*n.a12+e.a32*n.a13,a22:e.a12*n.a21+e.a22*n.a22+e.a32*n.a23,a32:e.a12*n.a31+e.a22*n.a32+e.a32*n.a33,a13:e.a13*n.a11+e.a23*n.a12+e.a33*n.a13,a23:e.a13*n.a21+e.a23*n.a22+e.a33*n.a23,a33:e.a13*n.a31+e.a23*n.a32+e.a33*n.a33}}function a(e,n,i,a,o,f,u,w){return r(t(e,n,i,a,o,f,u,w))}function o(e,n){for(var t=n.length,r=e.a11,i=e.a12,a=e.a13,o=e.a21,f=e.a22,u=e.a23,w=e.a31,s=e.a32,l=e.a33,h=0;h<t;h+=2){var c=n[h],v=n[h+1],d=a*c+u*v+l;n[h]=(r*c+o*v+w)/d,n[h+1]=(i*c+f*v+s)/d}return n}function f(e,n,r,o,f,u,w,s,l,h,c,v,d,g,p,y){var m=a(e,n,r,o,f,u,w,s);return i(t(l,h,c,v,d,g,p,y),m)}n.transformPoints=o,n.quadrilateralToQuadrilateral=f},function(e,n,t){\"use strict\";function r(e){if(e<1||e>40)throw new Error(\"Invalid version number \"+e);return w[e-1]}var i=t(6),a=[31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017],o=function(){function e(e,n){this.count=e,this.dataCodewords=n}return e}(),f=function(){function e(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];this.ecCodewordsPerBlock=e,this.ecBlocks=n}return e.prototype.getNumBlocks=function(){return this.ecBlocks.reduce(function(e,n){return e+n.count},0)},e.prototype.getTotalECCodewords=function(){return this.ecCodewordsPerBlock*this.getNumBlocks()},e}(),u=function(){function e(e,n){for(var t=[],r=2;r<arguments.length;r++)t[r-2]=arguments[r];this.versionNumber=e,this.alignmentPatternCenters=n,this.ecBlocks=t;var i=0,a=this.ecBlocks[0].ecCodewordsPerBlock;this.ecBlocks[0].ecBlocks.forEach(function(e){i+=e.count*(e.dataCodewords+a)}),this.totalCodewords=i}return e.prototype.getDimensionForVersion=function(){return 17+4*this.versionNumber},e.prototype.getECBlocksForLevel=function(e){return this.ecBlocks[e.ordinal]},e.decodeVersionInformation=function(e){for(var n=1/0,t=0,o=0;o<a.length;o++){var f=a[o];if(f==e)return r(o+7);var u=i.numBitsDiffering(e,f);u<n&&(t=o+7,n=u)}return n<=3?r(t):null},e}();n.Version=u;var w=[new u(1,[],new f(7,new o(1,19)),new f(10,new o(1,16)),new f(13,new o(1,13)),new f(17,new o(1,9))),new u(2,[6,18],new f(10,new o(1,34)),new f(16,new o(1,28)),new f(22,new o(1,22)),new f(28,new o(1,16))),new u(3,[6,22],new f(15,new o(1,55)),new f(26,new o(1,44)),new f(18,new o(2,17)),new f(22,new o(2,13))),new u(4,[6,26],new f(20,new o(1,80)),new f(18,new o(2,32)),new f(26,new o(2,24)),new f(16,new o(4,9))),new u(5,[6,30],new f(26,new o(1,108)),new f(24,new o(2,43)),new f(18,new o(2,15),new o(2,16)),new f(22,new o(2,11),new o(2,12))),new u(6,[6,34],new f(18,new o(2,68)),new f(16,new o(4,27)),new f(24,new o(4,19)),new f(28,new o(4,15))),new u(7,[6,22,38],new f(20,new o(2,78)),new f(18,new o(4,31)),new f(18,new o(2,14),new o(4,15)),new f(26,new o(4,13),new o(1,14))),new u(8,[6,24,42],new f(24,new o(2,97)),new f(22,new o(2,38),new o(2,39)),new f(22,new o(4,18),new o(2,19)),new f(26,new o(4,14),new o(2,15))),new u(9,[6,26,46],new f(30,new o(2,116)),new f(22,new o(3,36),new o(2,37)),new f(20,new o(4,16),new o(4,17)),new f(24,new o(4,12),new o(4,13))),new u(10,[6,28,50],new f(18,new o(2,68),new o(2,69)),new f(26,new o(4,43),new o(1,44)),new f(24,new o(6,19),new o(2,20)),new f(28,new o(6,15),new o(2,16))),new u(11,[6,30,54],new f(20,new o(4,81)),new f(30,new o(1,50),new o(4,51)),new f(28,new o(4,22),new o(4,23)),new f(24,new o(3,12),new o(8,13))),new u(12,[6,32,58],new f(24,new o(2,92),new o(2,93)),new f(22,new o(6,36),new o(2,37)),new f(26,new o(4,20),new o(6,21)),new f(28,new o(7,14),new o(4,15))),new u(13,[6,34,62],new f(26,new o(4,107)),new f(22,new o(8,37),new o(1,38)),new f(24,new o(8,20),new o(4,21)),new f(22,new o(12,11),new o(4,12))),new u(14,[6,26,46,66],new f(30,new o(3,115),new o(1,116)),new f(24,new o(4,40),new o(5,41)),new f(20,new o(11,16),new o(5,17)),new f(24,new o(11,12),new o(5,13))),new u(15,[6,26,48,70],new f(22,new o(5,87),new o(1,88)),new f(24,new o(5,41),new o(5,42)),new f(30,new o(5,24),new o(7,25)),new f(24,new o(11,12),new o(7,13))),new u(16,[6,26,50,74],new f(24,new o(5,98),new o(1,99)),new f(28,new o(7,45),new o(3,46)),new f(24,new o(15,19),new o(2,20)),new f(30,new o(3,15),new o(13,16))),new u(17,[6,30,54,78],new f(28,new o(1,107),new o(5,108)),new f(28,new o(10,46),new o(1,47)),new f(28,new o(1,22),new o(15,23)),new f(28,new o(2,14),new o(17,15))),new u(18,[6,30,56,82],new f(30,new o(5,120),new o(1,121)),new f(26,new o(9,43),new o(4,44)),new f(28,new o(17,22),new o(1,23)),new f(28,new o(2,14),new o(19,15))),new u(19,[6,30,58,86],new f(28,new o(3,113),new o(4,114)),new f(26,new o(3,44),new o(11,45)),new f(26,new o(17,21),new o(4,22)),new f(26,new o(9,13),new o(16,14))),new u(20,[6,34,62,90],new f(28,new o(3,107),new o(5,108)),new f(26,new o(3,41),new o(13,42)),new f(30,new o(15,24),new o(5,25)),new f(28,new o(15,15),new o(10,16))),new u(21,[6,28,50,72,94],new f(28,new o(4,116),new o(4,117)),new f(26,new o(17,42)),new f(28,new o(17,22),new o(6,23)),new f(30,new o(19,16),new o(6,17))),new u(22,[6,26,50,74,98],new f(28,new o(2,111),new o(7,112)),new f(28,new o(17,46)),new f(30,new o(7,24),new o(16,25)),new f(24,new o(34,13))),new u(23,[6,30,54,74,102],new f(30,new o(4,121),new o(5,122)),new f(28,new o(4,47),new o(14,48)),new f(30,new o(11,24),new o(14,25)),new f(30,new o(16,15),new o(14,16))),new u(24,[6,28,54,80,106],new f(30,new o(6,117),new o(4,118)),new f(28,new o(6,45),new o(14,46)),new f(30,new o(11,24),new o(16,25)),new f(30,new o(30,16),new o(2,17))),new u(25,[6,32,58,84,110],new f(26,new o(8,106),new o(4,107)),new f(28,new o(8,47),new o(13,48)),new f(30,new o(7,24),new o(22,25)),new f(30,new o(22,15),new o(13,16))),new u(26,[6,30,58,86,114],new f(28,new o(10,114),new o(2,115)),new f(28,new o(19,46),new o(4,47)),new f(28,new o(28,22),new o(6,23)),new f(30,new o(33,16),new o(4,17))),new u(27,[6,34,62,90,118],new f(30,new o(8,122),new o(4,123)),new f(28,new o(22,45),new o(3,46)),new f(30,new o(8,23),new o(26,24)),new f(30,new o(12,15),new o(28,16))),new u(28,[6,26,50,74,98,122],new f(30,new o(3,117),new o(10,118)),new f(28,new o(3,45),new o(23,46)),new f(30,new o(4,24),new o(31,25)),new f(30,new o(11,15),new o(31,16))),new u(29,[6,30,54,78,102,126],new f(30,new o(7,116),new o(7,117)),new f(28,new o(21,45),new o(7,46)),new f(30,new o(1,23),new o(37,24)),new f(30,new o(19,15),new o(26,16))),new u(30,[6,26,52,78,104,130],new f(30,new o(5,115),new o(10,116)),new f(28,new o(19,47),new o(10,48)),new f(30,new o(15,24),new o(25,25)),new f(30,new o(23,15),new o(25,16))),new u(31,[6,30,56,82,108,134],new f(30,new o(13,115),new o(3,116)),new f(28,new o(2,46),new o(29,47)),new f(30,new o(42,24),new o(1,25)),new f(30,new o(23,15),new o(28,16))),new u(32,[6,34,60,86,112,138],new f(30,new o(17,115)),new f(28,new o(10,46),new o(23,47)),new f(30,new o(10,24),new o(35,25)),new f(30,new o(19,15),new o(35,16))),new u(33,[6,30,58,86,114,142],new f(30,new o(17,115),new o(1,116)),new f(28,new o(14,46),new o(21,47)),new f(30,new o(29,24),new o(19,25)),new f(30,new o(11,15),new o(46,16))),new u(34,[6,34,62,90,118,146],new f(30,new o(13,115),new o(6,116)),new f(28,new o(14,46),new o(23,47)),new f(30,new o(44,24),new o(7,25)),new f(30,new o(59,16),new o(1,17))),new u(35,[6,30,54,78,102,126,150],new f(30,new o(12,121),new o(7,122)),new f(28,new o(12,47),new o(26,48)),new f(30,new o(39,24),new o(14,25)),new f(30,new o(22,15),new o(41,16))),new u(36,[6,24,50,76,102,128,154],new f(30,new o(6,121),new o(14,122)),new f(28,new o(6,47),new o(34,48)),new f(30,new o(46,24),new o(10,25)),new f(30,new o(2,15),new o(64,16))),new u(37,[6,28,54,80,106,132,158],new f(30,new o(17,122),new o(4,123)),new f(28,new o(29,46),new o(14,47)),new f(30,new o(49,24),new o(10,25)),new f(30,new o(24,15),new o(46,16))),new u(38,[6,32,58,84,110,136,162],new f(30,new o(4,122),new o(18,123)),new f(28,new o(13,46),new o(32,47)),new f(30,new o(48,24),new o(14,25)),new f(30,new o(42,15),new o(32,16))),new u(39,[6,26,54,82,110,138,166],new f(30,new o(20,117),new o(4,118)),new f(28,new o(40,47),new o(7,48)),new f(30,new o(43,24),new o(22,25)),new f(30,new o(10,15),new o(67,16))),new u(40,[6,30,58,86,114,142,170],new f(30,new o(19,118),new o(6,119)),new f(28,new o(18,47),new o(31,48)),new f(30,new o(34,24),new o(34,25)),new f(30,new o(20,15),new o(61,16)))];n.getVersionForNumber=r},function(e,n,t){\"use strict\";function r(e){var n=e.getDimensionForVersion(),t=new Uint8Array(n*n),r=new v.BitMatrix(t,n);r.setRegion(0,0,9,9),r.setRegion(n-8,0,8,9),r.setRegion(0,n-8,9,8);for(var i=e.alignmentPatternCenters.length,a=0;a<i;a++)for(var o=e.alignmentPatternCenters[a]-2,f=0;f<i;f++)0==a&&(0==f||f==i-1)||a==i-1&&0==f||r.setRegion(e.alignmentPatternCenters[f]-2,o,5,5);return r.setRegion(6,9,1,n-17),r.setRegion(9,6,n-17,1),e.versionNumber>6&&(r.setRegion(n-11,0,3,6),r.setRegion(0,n-11,6,3)),r}function i(e,n,t){for(var i=M[t.dataMask],a=e.height,o=r(n),f=!0,u=[],w=0,s=0,l=0,h=a-1;h>0;h-=2){6==h&&h--;for(var c=0;c<a;c++)for(var v=f?a-1-c:c,d=0;d<2;d++)o.get(h-d,v)||(l++,s<<=1,e.get(h-d,v)!==i(v,h-d)&&(s|=1),8==l&&(u[w++]=255&s,l=0,s=0));f=!f}return w!=n.totalCodewords?null:u}function a(e){var n=e.height,t=n-17>>2;if(t<=6)return y.getVersionForNumber(t);for(var r=0,i=n-11,a=5;a>=0;a--)for(var o=n-9;o>=i;o--)r=e.copyBit(o,a,r);var f=y.Version.decodeVersionInformation(r);if(null!=f&&f.getDimensionForVersion()==n)return f;r=0;for(var o=5;o>=0;o--)for(var a=n-9;a>=i;a--)r=e.copyBit(o,a,r);return f=y.Version.decodeVersionInformation(r),null!=f&&f.getDimensionForVersion()==n?f:null}function o(e){return{errorCorrectionLevel:B[e>>3&3],dataMask:7&e}}function f(e,n){for(var t=1/0,r=0,i=0;i<b.length;i++){var a=b[i],f=a[0];if(f==e||f==n)return o(a[1]);var u=g.numBitsDiffering(e,f);u<t&&(r=a[1],t=u),e!=n&&(u=g.numBitsDiffering(n,f))<t&&(r=a[1],t=u)}return t<=3?o(r):null}function u(e,n){var t=f(e,n);return t||f(e^m,n^m)}function w(e){for(var n=0,t=0;t<6;t++)n=e.copyBit(t,8,n);n=e.copyBit(7,8,n),n=e.copyBit(8,8,n),n=e.copyBit(8,7,n);for(var r=5;r>=0;r--)n=e.copyBit(8,r,n);for(var i=e.height,a=0,o=i-7,r=i-1;r>=o;r--)a=e.copyBit(8,r,a);for(var t=i-8;t<i;t++)a=e.copyBit(t,8,a);var f=u(n,a);return null!=f?f:null}function s(e,n,t){if(e.length!=n.totalCodewords)throw new Error(\"Invalid number of codewords for version; got \"+e.length+\" expected \"+n.totalCodewords);var r=n.getECBlocksForLevel(t),i=0,a=r.ecBlocks;a.forEach(function(e){i+=e.count});var o=new Array(i),f=0;a.forEach(function(e){for(var n=0;n<e.count;n++){var t=e.dataCodewords,i=r.ecCodewordsPerBlock+t;o[f++]={numDataCodewords:t,codewords:new Array(i)}}});for(var u=o[0].codewords.length,w=o.length-1;w>=0;){if(o[w].codewords.length==u)break;w--}w++;for(var s=u-r.ecCodewordsPerBlock,l=0,h=0;h<s;h++)for(var c=0;c<f;c++)o[c].codewords[h]=e[l++];for(var c=w;c<f;c++)o[c].codewords[s]=e[l++];for(var v=o[0].codewords.length,h=s;h<v;h++)for(var c=0;c<f;c++){var d=c<w?h:h+1;o[c].codewords[d]=e[l++]}return o}function l(e,n){for(var t=new p.ReedSolomonDecoder,r=e.length,i=new Array(r),a=0;a<r;a++)i[a]=255&e[a];var o=e.length-n;if(!t.decode(i,o))return!1;for(var a=0;a<n;a++)e[a]=i[a];return!0}function h(e){var n=a(e);if(!n)return null;var t=w(e);if(!t)return null;var r=t.errorCorrectionLevel,o=i(e,n,t);if(!o)return null;var f=s(o,n,r),u=0;f.forEach(function(e){u+=e.numDataCodewords});for(var h=new Uint8ClampedArray(u),c=0,v=0,g=f;v<g.length;v++){var p=g[v],y=p.codewords,m=p.numDataCodewords;if(!l(y,m))return null;for(var b=0;b<m;b++)h[c++]=y[b]}return d.decodeQRdata(h,n.versionNumber,r.name)}function c(e){if(null==e)return null;var n=h(e);return n||(e.mirror(),h(e))}var v=t(2),d=t(10),g=t(6),p=t(12),y=t(8),m=21522,b=[[21522,0],[20773,1],[24188,2],[23371,3],[17913,4],[16590,5],[20375,6],[19104,7],[30660,8],[29427,9],[32170,10],[30877,11],[26159,12],[25368,13],[27713,14],[26998,15],[5769,16],[5054,17],[7399,18],[6608,19],[1890,20],[597,21],[3340,22],[2107,23],[13663,24],[12392,25],[16177,26],[14854,27],[9396,28],[8579,29],[11994,30],[11245,31]],M=[function(e,n){return 0==(e+n&1)},function(e,n){return 0==(1&e)},function(e,n){return n%3==0},function(e,n){return(e+n)%3==0},function(e,n){return 0==((e>>1)+n/3&1)},function(e,n){return(e*n&1)+e*n%3==0},function(e,n){return 0==((e*n&1)+e*n%3&1)},function(e,n){return 0==((e+n&1)+e*n%3&1)}],B=[{ordinal:1,bits:0,name:\"M\"},{ordinal:0,bits:1,name:\"L\"},{ordinal:3,bits:2,name:\"H\"},{ordinal:2,bits:3,name:\"Q\"}];n.decode=c},function(e,n,t){\"use strict\";function r(e){var n=[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\",\"H\",\"I\",\"J\",\"K\",\"L\",\"M\",\"N\",\"O\",\"P\",\"Q\",\"R\",\"S\",\"T\",\"U\",\"V\",\"W\",\"X\",\"Y\",\"Z\",\" \",\"$\",\"%\",\"*\",\"+\",\"-\",\".\",\"/\",\":\"];if(e>=n.length)throw new Error(\"Could not decode alphanumeric char\");return n[e].charCodeAt(0)}function i(e){switch(e){case 0:return c;case 1:return v;case 2:return d;case 3:return g;case 4:return p;case 5:return b;case 7:return y;case 8:return m;case 9:return M;case 13:return B;default:throw new Error(\"Couldn't decode mode from byte array\")}}function a(e){var n=e.readBits(8);if(0==(128&n))return 127&n;if(128==(192&n)){return(63&n)<<8|e.readBits(8)}if(192==(224&n)){return(31&n)<<16|e.readBits(16)}throw new Error(\"Bad ECI bits starting with byte \"+n)}function o(e,n,t){if(13*t>e.available())return!1;for(var r=new Array(2*t),i=0;t>0;){var a=e.readBits(13),o=Math.floor(a/96)<<8|a%96;o+=o<959?41377:42657,r[i]=o>>8&255,r[i+1]=255&o,i+=2,t--}return n.val=r,!0}function f(e,n,t){for(;t>=3;){if(e.available()<10)return!1;var i=e.readBits(10);if(i>=1e3)return!1;n.val.push(r(Math.floor(i/100))),n.val.push(r(Math.floor(i/10)%10)),n.val.push(r(i%10)),t-=3}if(2==t){if(e.available()<7)return!1;var a=e.readBits(7);if(a>=100)return!1;n.val.push(r(Math.floor(a/10))),n.val.push(r(a%10))}else if(1==t){if(e.available()<4)return!1;var o=e.readBits(4);if(o>=10)return!1;n.val.push(r(o))}return!0}function u(e,n,t,i){for(var a=n.val.length;t>1;){if(e.available()<11)return!1;var o=e.readBits(11);n.val.push(r(Math.floor(o/45))),n.val.push(r(o%45)),t-=2}if(1==t){if(e.available()<6)return!1;n.val.push(r(e.readBits(6)))}if(i)for(var f=a;f<n.val.length;f++)n.val[f]==\"%\".charCodeAt(0)&&(f<n.val.length-1&&n.val[f+1]==\"%\".charCodeAt(0)?n.val=n.val.slice(0,f+1).concat(n.val.slice(f+2)):n.val[f]=29);return!0}function w(e,n,t){if(t<<3>e.available())return!1;for(var r=new Uint32Array(t),i=0;i<t;i++)r[i]=e.readBits(8);return Array.prototype.push.apply(n.val,r),!0}function s(e,n,t){for(var r,s=new l.BitStream(e),h={val:[]},C=!1;r!=c;)if((r=s.available()<4?c:i(s.readBits(4)))!=c)if(r==b||r==M)C=!0;else if(r==g){if(s.available()<16)return null;s.readBits(8),s.readBits(8)}else if(r==y){var z=a(s);if(z<0||z>30)return null}else if(r==B){var E=s.readBits(4),A=s.readBits(r.getCharacterCountBits(n));if(E==x&&!o(s,h,A))return null}else{var S=s.readBits(r.getCharacterCountBits(n));if(r==v){if(!f(s,h,S))return null}else if(r==d){if(!u(s,h,S,C))return null}else if(r==p){if(!w(s,h,S))return null}else if(r!=m)return null}return h.val}var l=t(11),h=function(){function e(e,n){this.characterCountBitsForVersions=e,this.bits=n}return e.prototype.getCharacterCountBits=function(e){if(null==this.characterCountBitsForVersions)throw new Error(\"Character count doesn't apply to this mode\");var n;return n=e<=9?0:e<=26?1:2,this.characterCountBitsForVersions[n]},e}(),c=new h([0,0,0],0),v=new h([10,12,14],1),d=new h([9,11,13],2),g=new h([0,0,0],3),p=new h([8,16,16],4),y=new h(null,7),m=new h([8,10,12],8),b=new h(null,5),M=new h(null,9),B=new h([8,10,12],13),x=1;n.decodeQRdata=s},function(e,n){\"use strict\";var t=function(){function e(e){this.byteOffset=0,this.bitOffset=0,this.bytes=e}return e.prototype.readBits=function(e){if(e<1||e>32||e>this.available())throw new Error(\"Cannot read \"+e.toString()+\" bits\");var n=0;if(this.bitOffset>0){var t=8-this.bitOffset,r=e<t?e:t,i=t-r,a=255>>8-r<<i;n=(this.bytes[this.byteOffset]&a)>>i,e-=r,this.bitOffset+=r,8==this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(e>0){for(;e>=8;)n=n<<8|255&this.bytes[this.byteOffset],this.byteOffset++,e-=8;if(e>0){var i=8-e,a=255>>i<<i;n=n<<e|(this.bytes[this.byteOffset]&a)>>i,this.bitOffset+=e}}return n},e.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},e}();n.BitStream=t},function(e,n){\"use strict\";var t=function(){function e(){this.field=new i(285,256,0)}return e.prototype.decode=function(e,n){for(var t=new r(this.field,e),a=new Array(n),o=!0,f=0;f<n;f++){var u=t.evaluateAt(this.field.exp(f+this.field.generatorBase));a[a.length-1-f]=u,0!=u&&(o=!1)}if(o)return!0;var w=new r(this.field,a),s=this.runEuclideanAlgorithm(this.field.buildMonomial(n,1),w,n);if(null==s)return!1;var l=s[0],h=this.findErrorLocations(l);if(null==h)return!1;for(var c=s[1],v=this.findErrorMagnitudes(c,h),f=0;f<h.length;f++){var d=e.length-1-this.field.log(h[f]);if(d<0)return!1;e[d]=i.addOrSubtract(e[d],v[f])}return!0},e.prototype.runEuclideanAlgorithm=function(e,n,t){if(e.degree()<n.degree()){var r=e;e=n,n=r}for(var i=e,a=n,o=this.field.zero,f=this.field.one;a.degree()>=t/2;){var u=i,w=o;if(i=a,o=f,i.isZero())return null;a=u;for(var s=this.field.zero,l=i.getCoefficient(i.degree()),h=this.field.inverse(l);a.degree()>=i.degree()&&!a.isZero();){var c=a.degree()-i.degree(),v=this.field.multiply(a.getCoefficient(a.degree()),h);s=s.addOrSubtract(this.field.buildMonomial(c,v)),a=a.addOrSubtract(i.multiplyByMonomial(c,v))}if(f=s.multiplyPoly(o).addOrSubtract(w),a.degree()>=i.degree())return null}var d=f.getCoefficient(0);if(0==d)return null;var g=this.field.inverse(d);return[f.multiply(g),a.multiply(g)]},e.prototype.findErrorLocations=function(e){var n=e.degree();if(1==n)return[e.getCoefficient(1)];for(var t=new Array(n),r=0,i=1;i<this.field.size&&r<n;i++)0==e.evaluateAt(i)&&(t[r]=this.field.inverse(i),r++);return r!=n?null:t},e.prototype.findErrorMagnitudes=function(e,n){for(var t=n.length,r=new Array(t),i=0;i<t;i++){for(var a=this.field.inverse(n[i]),o=1,f=0;f<t;f++)if(i!=f){var u=this.field.multiply(n[f],a),w=0==(1&u)?1|u:-2&u;o=this.field.multiply(o,w)}r[i]=this.field.multiply(e.evaluateAt(a),this.field.inverse(o)),0!=this.field.generatorBase&&(r[i]=this.field.multiply(r[i],a))}return r},e}();n.ReedSolomonDecoder=t;var r=function(){function e(e,n){if(0==n.length)throw new Error(\"No coefficients.\");this.field=e;var t=n.length;if(t>1&&0==n[0]){for(var r=1;r<t&&0==n[r];)r++;if(r==t)this.coefficients=e.zero.coefficients;else{this.coefficients=new Array(t-r);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=n[r+i]}\n}else this.coefficients=n}return e.prototype.evaluateAt=function(e){var n=0;if(0==e)return this.getCoefficient(0);var t=this.coefficients.length;if(1==e)return this.coefficients.forEach(function(e){n=i.addOrSubtract(n,e)}),n;n=this.coefficients[0];for(var r=1;r<t;r++)n=i.addOrSubtract(this.field.multiply(e,n),this.coefficients[r]);return n},e.prototype.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},e.prototype.degree=function(){return this.coefficients.length-1},e.prototype.isZero=function(){return 0==this.coefficients[0]},e.prototype.addOrSubtract=function(n){if(this.isZero())return n;if(n.isZero())return this;var t=this.coefficients,r=n.coefficients;if(t.length>r.length){var a=t;t=r,r=a}for(var o=new Array(r.length),f=r.length-t.length,u=0;u<f;u++)o[u]=r[u];for(var u=f;u<r.length;u++)o[u]=i.addOrSubtract(t[u-f],r[u]);return new e(this.field,o)},e.prototype.multiply=function(n){if(0==n)return this.field.zero;if(1==n)return this;for(var t=this.coefficients.length,r=new Array(t),i=0;i<t;i++)r[i]=this.field.multiply(this.coefficients[i],n);return new e(this.field,r)},e.prototype.multiplyPoly=function(n){if(this.isZero()||n.isZero())return this.field.zero;for(var t=this.coefficients,r=t.length,a=n.coefficients,o=a.length,f=new Array(r+o-1),u=0;u<r;u++)for(var w=t[u],s=0;s<o;s++)f[u+s]=i.addOrSubtract(f[u+s],this.field.multiply(w,a[s]));return new e(this.field,f)},e.prototype.multiplyByMonomial=function(n,t){if(n<0)throw new Error(\"Invalid degree less than 0\");if(0==t)return this.field.zero;for(var r=this.coefficients.length,i=new Array(r+n),a=0;a<r;a++)i[a]=this.field.multiply(this.coefficients[a],t);return new e(this.field,i)},e}(),i=function(){function e(e,n,t){this.INITIALIZATION_THRESHOLD=0,this.initialized=!1,this.primitive=e,this.size=n,this.generatorBase=t,n<=this.INITIALIZATION_THRESHOLD&&this.initialize()}return e.prototype.initialize=function(){this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var e=1,n=0;n<this.size;n++)this.expTable[n]=e,(e<<=1)>=this.size&&(e^=this.primitive,e&=this.size-1);for(var n=0;n<this.size-1;n++)this.logTable[this.expTable[n]]=n;this.zero=new r(this,[0]),this.one=new r(this,[1]),this.initialized=!0},e.addOrSubtract=function(e,n){return e^n},e.prototype.checkInit=function(){this.initialized||this.initialize()},e.prototype.multiply=function(e,n){return this.checkInit(),0==e||0==n?0:this.expTable[(this.logTable[e]+this.logTable[n])%(this.size-1)]},e.prototype.exp=function(e){return this.checkInit(),this.expTable[e]},e.prototype.log=function(e){if(this.checkInit(),0==e)throw new Error(\"Can't take log(0)\");return this.logTable[e]},e.prototype.inverse=function(e){if(this.checkInit(),0==e)throw new Error(\"Can't invert 0\");return this.expTable[this.size-this.logTable[e]-1]},e.prototype.buildMonomial=function(e,n){if(this.checkInit(),e<0)throw new Error(\"Invalid monomial degree less than 0\");if(0==n)return this.zero;var t=new Array(e+1);return t[0]=n,new r(this,t)},e}()}])}),self.addEventListener(\"message\",function(e){var n=jsQR.decodeQRFromImage(e.data.data,e.data.width,e.data.height);postMessage(n)});"], {
  type: 'application/javascript'
});

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
          chooseDeviceId = props.chooseDeviceId;


      getDeviceId(facingMode, chooseDeviceId).then(function (deviceId) {
        return navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: deviceId,
            width: { min: 360, ideal: 1280, max: 1920 },
            height: { min: 240, ideal: 720, max: 1080 }
          }
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
          maxImageSize = _props2.maxImageSize,
          delay = _props2.delay;
      var _els = this.els,
          preview = _els.preview,
          canvas = _els.canvas,
          img = _els.img;

      // Get image/video dimensions

      var width = Math.floor(legacyMode ? img.naturalWidth : preview.videoWidth);
      var height = Math.floor(legacyMode ? img.naturalHeight : preview.videoHeight);

      if (legacyMode) {
        // Downscale image to `maxImageSize`
        var greatestSize = width > height ? width : height;
        if (greatestSize > maxImageSize) {
          var ratio = maxImageSize / greatestSize;
          height = ratio * height;
          width = ratio * width;
        }
      }

      canvas.width = width;
      canvas.height = height;

      var previewIsPlaying = preview && preview.readyState === preview.HAVE_ENOUGH_DATA;

      if (legacyMode || previewIsPlaying) {
        var ctx = canvas.getContext('2d');
        ctx.drawImage(legacyMode ? img : preview, 0, 0, width, height);

        var imageData = ctx.getImageData(0, 0, width, height
        // Send data to web-worker
        );this.worker.postMessage(imageData);
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
      this.els.img.addEventListener('load', this.check, false

      // Reset componentDidUpdate
      );this.componentDidUpdate = undefined;

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
          legacyMode = _props4.legacyMode;


      var hiddenStyle = { display: 'none' };
      var previewStyle = _extends({
        display: 'block',
        objectFit: 'contain'
      }, style);

      return React.createElement(
        'section',
        { className: className },
        legacyMode ? React.createElement(
          'div',
          null,
          React.createElement('input', {
            style: hiddenStyle,
            type: 'file',
            accept: 'image/*',
            ref: this.setRefFactory('input'),
            onChange: this.handleInputChange
          }),
          React.createElement('img', { style: previewStyle, ref: this.setRefFactory('img'), onLoad: onImageLoad })
        ) : React.createElement('video', { style: previewStyle, ref: this.setRefFactory('preview') }),
        React.createElement('canvas', { style: hiddenStyle, ref: this.setRefFactory('canvas') })
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
  facingMode: PropTypes.oneOf(['rear', 'front']),
  legacyMode: PropTypes.bool,
  maxImageSize: PropTypes.number,
  style: PropTypes.any,
  className: PropTypes.string,
  chooseDeviceId: PropTypes.func
}, _class.defaultProps = {
  delay: 500,
  maxImageSize: 1000,
  facingMode: 'rear'
}, _temp);