(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define("Az", factory)
    : (global.Az = factory());
})((window || module || {}), function() {
  "use strict";
  /** @namespace Az **/
  if (
    typeof require != "undefined" &&
    typeof exports === "object" &&
    typeof module !== "undefined"
  ) {
    //    var fs = require('fs');
    var all_files = {
      "grammemes.json": require("../dicts_js/grammemes.json"),
      "gramtab-opencorpora-ext.json": require("../dicts_js/gramtab-opencorpora-ext.json"),
      "gramtab-opencorpora-int.json": require("../dicts_js/gramtab-opencorpora-int.json"),
      "meta.json": require("../dicts_js/meta.json"),
      "paradigms.array": require("../dicts_js/paradigms.array"),
      "prediction-suffixes-0.dawg": require("../dicts_js/prediction-suffixes-0.dawg"),
      "prediction-suffixes-1.dawg": require("../dicts_js/prediction-suffixes-1.dawg"),
      "prediction-suffixes-2.dawg": require("../dicts_js/prediction-suffixes-2.dawg"),
      "p_t_given_w.intdawg": require("../dicts_js/p_t_given_w.intdawg"),
      "suffixes.json": require("../dicts_js/suffixes.json"),
      "words.dawg": require("../dicts_js/words.dawg")
    };
  }

  var Az = {
    load: function(url, responseType, callback) {
      Object.keys(all_files).forEach(key => {
        if (url.includes(key)) {
          if (responseType == "json") {
            callback(null, all_files[key]);
            return;
          }
          if (responseType == "arraybuffer") {
            let arraybuffer = undefined;
            if (typeof Buffer != "undefined") {
                let buf = Buffer.from(all_files[key], 'base64');
                arraybuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
	    } else {
		let MYB = require('buffer').Buffer;
		let buf = MYB.from(all_files[key], 'base64');
                arraybuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
            }
            callback(null, arraybuffer);
            return;
          }
        }
      });
      /*
      if (fs) {
        fs.readFile(url, { encoding: responseType == 'json' ? 'utf8' : null }, function (err, data) {
          if (err) {
            callback(err);
            return;
          }

          if (responseType == 'json') {
            callback(null, JSON.parse(data));
          } else
          if (responseType == 'arraybuffer') {
            if (data.buffer) {
              callback(null, data.buffer);
            } else {
              var ab = new ArrayBuffer(data.length);
              var view = new Uint8Array(ab);
              for (var i = 0; i < data.length; ++i) {
                  view[i] = data[i];
              }
              callback(null, ab);
            }
          } else {
            callback(new Error('Unknown responseType'));
          }
        });
        return;
      }
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = responseType;

      xhr.onload = function(e) {
        if (xhr.response) {
          callback && callback(null, xhr.response);
        }
      };

      xhr.send(null);
      */
    },
    extend: function() {
      var result = {};
      for (var i = 0; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          result[key] = arguments[i][key];
        }
      }
      return result;
    }
  };

  return Az;
});
