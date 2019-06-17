const fs = require("fs");
const path = require("path");

const prefix = "dicts/";
const out_prefix = "dicts_js/";

const all_files = {
  "grammemes.json": "json",
  "gramtab-opencorpora-ext.json": "json",
  "gramtab-opencorpora-int.json": "json",
  "meta.json": "json",
  "paradigms.array": "arraybuffer",
  "prediction-suffixes-0.dawg": "arraybuffer",
  "prediction-suffixes-1.dawg": "arraybuffer",
  "prediction-suffixes-2.dawg": "arraybuffer",
  "p_t_given_w.intdawg": "arraybuffer",
  "suffixes.json": "json",
  "words.dawg": "arraybuffer"
};

var res = {};

Object.keys(all_files).forEach(filename => {
  let in_filename = prefix + filename;
  let out_filename = out_prefix + filename;
  let filetype = all_files[filename];
  switch (filetype) {
    case "json": {
      let str = fs.readFileSync(in_filename, (encoding = "utf8"));
      fs.writeFileSync(out_filename + ".js", `module.exports = ${str}`);
    }
    break;
    case "arraybuffer": {
      let data = fs.readFileSync(in_filename, null);
      var ab = new ArrayBuffer(data.length);
      var view = new Uint8Array(ab);
      for (var i = 0; i < data.length; ++i) {
        view[i] = data[i];
      }

      var str = Buffer.from(view).toString("base64");
      fs.writeFileSync(out_filename + ".js", `module.exports = "${str}"`);
    }
  }
  console.log(filetype);
});
