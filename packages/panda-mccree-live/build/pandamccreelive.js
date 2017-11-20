"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function _inherits(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.PandaMccreeLive=void 0;var _createClass=function(){function e(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(r,t,o){return t&&e(r.prototype,t),o&&e(r,o),r}}(),_mccreeCore=require("mccree-core"),_mccreeCore2=_interopRequireDefault(_mccreeCore),_mccreeLoaderFetch=require("mccree-loader-fetch"),_mccreeLoaderFetch2=_interopRequireDefault(_mccreeLoaderFetch),_mccreeLoaderMozXhr=require("mccree-loader-moz-xhr"),_mccreeLoaderMozXhr2=_interopRequireDefault(_mccreeLoaderMozXhr),_mccreeLoaderTencentp2p=require("mccree-loader-tencentp2p"),_mccreeLoaderTencentp2p2=_interopRequireDefault(_mccreeLoaderTencentp2p),_index=require("../../mccree-plugin-mse/build/index.js"),_index2=_interopRequireDefault(_index),_mccreeHelperBrowser=require("mccree-helper-browser"),_mccreeHelperBrowser2=_interopRequireDefault(_mccreeHelperBrowser),_mccreeDemuxerFlv=require("mccree-demuxer-flv"),_mccreeDemuxerFlv2=_interopRequireDefault(_mccreeDemuxerFlv),_index3=require("../../mccree-remuxer-mp4live/build/index.js"),_index4=_interopRequireDefault(_index3),PandaMccreeLive=exports.PandaMccreeLive=function(e){function r(e,t){_classCallCheck(this,r);var o=_mccreeHelperBrowser2.default.uaMatch(navigator.userAgent),i=null;i=o.mozilla?new _mccreeLoaderMozXhr2.default:new _mccreeLoaderFetch2.default;var n=new _mccreeDemuxerFlv2.default,a=new _index4.default;t=t||{},t.autoReload||(t.autoReload=6e3),t.loaderBufferLimit=t.loaderBufferLimit||5e7;var c=null;e.logger&&(c=e.logger);var l=_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,{logger:c,loader:i,demux:n,remux:a},t));return l.logger.debug("PandaMccreeLive","mccree","正在启动播放装置。"),l.initStatistic(),l.version="1.1.38",l.mseController=new _index2.default,l.mseController.init(l),l.on=l.observer.on,l}return _inherits(r,e),_createClass(r,[{key:"isSupport",value:function(){return!0}},{key:"checkState",value:function(){this.reloading||this.mseController.checkState()}},{key:"clearBuffer",value:function(){this.mseController.clearBuffer()}},{key:"load",value:function(e){this.logger.log(this.TAG,"loadurl "+e),this.originUrl=e,this.loader.load(e)}},{key:"play",value:function(){this.mediaElement.play()}},{key:"destroy",value:function(){var e=this,r=this;this.logger.debug(r.TAG,"destroy","正在销毁播放装置。"),this.off();var t=new Promise(function(t,o){clearInterval(r.statisticTimmer),r.statisticTimmer=null,r.unload().then(function(o){return e.mediaSource&&e.asourceBuffer&&e.vsourceBuffer?(r.mseController.destroy(),r.detachMedia(),e.media=null,r.cdnip=null,r.loader=null,r.remux=null,r.demux=null,r.logger.debug(r.TAG,"unload","正在播放装置完全解除。"),void t("destroyed")):void t("already destroyed")}).catch(function(e){t("destroyed")})});return t}},{key:"pause",value:function(){this.mseController.pause()}},{key:"reload",value:function(){var e=this,r=(this.originUrl,this);return new Promise(function(t,o){r.reloading=!0,r.loader.unload().then(function(o){r.observer.trigger("error",e.events.errorTypes.NETWORK_ERROR,{}),r.observer.off("FRAME_DROPPED"),r.media.tracks={},r.remuxBuffer={audio:[],video:[]},r.loaderBuffer.clear(),r.demux.reset(),r.remux.destroy(),r.mseController.destroy(),t()}).catch(function(e){r.reloading=!1,t()})})}},{key:"getMediaElement",value:function(){return this.mseController.mediaElement}},{key:"initStatistic",value:function(){this.loadbytes=0,this.droppedFrames=0,this.decodedFrames=0;var e=this;this.observer.on(this.events.events.FRAG_LOADED,function(r){e.loadbytes+=r}),this.observer.on("MEDIA_SEGMENT_REMUXED",function(r){r&&(e.decodedFrames+=r)}),this.observer.on("FRAME_DROPPED",function(r){r&&(e.droppedFrames+=r)}),this.statisticTimmer=setInterval(this._onStatistic.bind(this),1e3)}},{key:"_onStatistic",value:function(){try{this.statisticTimmer&&(this.observer.trigger("statistics_info",{droppedFrames:this.droppedFrames,decodedFrames:this.decodedFrames+this.droppedFrames,speed:Math.floor(this.loadbytes/1e3)}),this.loadbytes=0)}catch(e){}}},{key:"attachMediaElement",value:function(e){e&&this.mseController.attachMediaElement(e)}},{key:"recordStartTime",value:function(){this.startTime||(this.startTime=(new Date).getTime())}},{key:"detachMediaElement",value:function(){this.mseController.detachMediaElement()}}]),r}(_mccreeCore2.default);exports.default=PandaMccreeLive;