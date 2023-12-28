"use strict"
;!globalThis?.module && (Object.assign(globalThis, { module: { exports: {} } }));
"use strict";

// src/Gradule-web.js
var Preset = (() => {
  const presets = {
    kye_meh: ["#7350b3", "#2ebf91"],
    wiretap: ["#8A2387", "#E94057", "#F27121"],
    aquatic: ["#00C9FF", "#92FE9D"],
    martini: ["#FDFC47", "#24FE41"],
    amethyst: ["#9D50BB", "#6E48AA"],
    dance_to_forget: ["#FF4E50", "#F9D423"],
    instagram: ["#833ab4", "#fd1d1d", "#fcb045"],
    pastel: ["#74ebd5", "#74ecd5"],
    retro: [
      "#3f51b1",
      "#5a55ae",
      "#7b5fac",
      "#8f6aae",
      "#a86aa4",
      "#cc6b8e",
      "#f18271",
      "#f3a469",
      "#f7c978"
    ],
    cherryblossoms: ["#FBD3E9", "#BB377D"],
    candy: ["#D3959B", "#BFE6BA"],
    nelson: ["#f2709c", "#ff9472"],
    kyoto: ["#c21500", "#ffc500"],
    wedding_day_blues: ["#40E0D0", "#FF8C00", "#FF0080"]
  };
  class Preset2 {
    static $ = function() {
      let o = {};
      for (let preset in presets) {
        let p = presets[preset];
        o[preset] = new Preset2(p);
      }
      return o;
    }();
    constructor(colorArr) {
      this.colorArr = colorArr.map((color) => this.convertHexToRGB(color));
    }
    static beautify(string, colorArr, bold = false, italic = false) {
      const presetInstance = new Preset2(colorArr);
      return presetInstance.applyColors(string, bold, italic);
    }
    static beautifyE(string, colorArr, bold = false, italic = false) {
      const presetInstance = new Preset2(colorArr);
      return presetInstance.applyColorsEscaped(string, bold, italic);
    }
    convertHexToRGB(hexColor) {
      if (typeof hexColor === "string" && hexColor.startsWith("#")) {
        const color = hexColor.slice(1);
        return {
          r: parseInt(color.slice(0, 2), 16),
          g: parseInt(color.slice(2, 4), 16),
          b: parseInt(color.slice(4, 6), 16)
        };
      }
      return hexColor;
    }
    applyColors(string, bold = false, italic = false) {
      let { colorArr } = this;
      const length = string.length;
      const colorStopsCount = colorArr.length;
      const sectionLength = Math.floor(length / (colorStopsCount - 1));
      let finalStr = "";
      if (bold)
        finalStr += "\x1B[1m";
      if (italic)
        finalStr += "\x1B[3m";
      let index = 0;
      let { r, g, b } = colorArr[0];
      for (let i = 1; i < colorStopsCount; i++) {
        for (let j = 0; j < sectionLength && index < length; j++, index++) {
          finalStr += `\x1B[38;2;${r};${g};${b}m${string[index]}`;
          r += Math.round((colorArr[i].r - colorArr[i - 1].r) / sectionLength);
          g += Math.round((colorArr[i].g - colorArr[i - 1].g) / sectionLength);
          b += Math.round((colorArr[i].b - colorArr[i - 1].b) / sectionLength);
        }
      }
      finalStr += `\x1B[38;2;${r};${g};${b}m${string.substring(index)}`;
      if (italic)
        finalStr += "\x1B[23m";
      finalStr += "\x1B[0m";
      return finalStr;
    }
    applyColorsEscaped(string, bold = false, italic = false) {
      let { colorArr } = this;
      const length = string.length;
      const colorStopsCount = colorArr.length;
      const sectionLength = Math.floor(length / (colorStopsCount - 1));
      let finalStr = "";
      if (bold)
        finalStr += "\\x1B[1m";
      if (italic)
        finalStr += "\\x1B[3m";
      let index = 0;
      let { r, g, b } = colorArr[0];
      for (let i = 1; i < colorStopsCount; i++) {
        for (let j = 0; j < sectionLength && index < length; j++, index++) {
          finalStr += `\\x1B[38;2;${r};${g};${b}m${string[index]}`;
          r += Math.round((colorArr[i].r - colorArr[i - 1].r) / sectionLength);
          g += Math.round((colorArr[i].g - colorArr[i - 1].g) / sectionLength);
          b += Math.round((colorArr[i].b - colorArr[i - 1].b) / sectionLength);
        }
      }
      finalStr += `\\x1B[38;2;${r};${g};${b}m${string.substring(index)}`;
      if (italic)
        finalStr += "\\x1B[23m";
      finalStr += "\\x1B[0m";
      return finalStr;
    }
    print(string, bold = false, italic = false) {
      console.log(Preset2.beautify(string, this.colorArr, bold, italic));
    }
    printE(string, bold = false, italic = false) {
      console.log(Preset2.beautifyE(string, this.colorArr, bold, italic));
    }
    printStyled(string, styles, bold = false, italic = false) {
      console.log("%c" + Preset2.beautify(string, this.colorArr, bold, italic), styles);
    }
    static input(question, colorArr, bold = false, italic = false) {
      return new Promise((resolve) => {
        const beautifiedQuestion = Preset2.beautify(question, colorArr, bold, italic);
        const answer = prompt(beautifiedQuestion);
        resolve(answer);
      });
    }
  }
  return Object.assign(Preset2, presets);
})();
var print = (string, colorArr, bold = false, italic = false) => {
  new Preset(colorArr).print(string, bold, italic);
};
var printE = (string, colorArr, bold = false, italic = false) => {
  new Preset(colorArr).printE(string, bold, italic);
};
var printWithStyles = (string, colorArr, styles, bold = false, italic = false) => {
  new Preset(colorArr).printStyled(string, styles, bold, italic);
};
var input = Preset.input;
var beautify = Preset.beautify;
var _exp_ = { print, printE, printWithStyles, input, beautify, preset: Preset };
if (typeof module !== "undefined") {
  module.exports = _exp_;
} else if (typeof window !== "undefined") {
  window.gradule = _exp_;
}
