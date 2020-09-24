"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-09-01
 * @modified
 *
 * @description SVG auto to PNG
 * @difficulty Medium
 * @complexity O(n)
 * @augments
 * @example
 * @link https://www.cnblogs.com/xgqfrms/p/10516810.html
 * @solutions
 *
 * @best_solutions
 *
 */

const log = console.log;

const svgAutoToPng = (filename = `svg-to-png`, svg = `svg`, type = `png`) => {
// const svgAutoToPng = (filename = `svg-to-png`, type = `png`, svg = `svg`) => {
  const canvas = document.createElement(`canvas`);
  canvas.height = 100;
  canvas.width = 100;
  const ctx = canvas.getContext(`2d`);
  // image
  if(!(svg instanceof SVGSVGElement)) {
    svg = document.querySelector(`svg`);
  }
  try {
    if(svg instanceof SVGSVGElement) {
      let svgURL = new XMLSerializer().serializeToString(svg);
      const callback = () => {
        // 3. svg 转换成 png
        let base64URL = canvas.toDataURL(`image/${type}`);
        // 4. 自动下载
        let aTag = document.createElement(`a`);
        aTag.setAttribute(`href`, base64URL);
        aTag.download = filename + type;
        aTag.click();
      };
      let img = new Image();
      img.onload = function(){
        // 2. 绘制 svg 图片
        ctx.drawImage(this, 0, 0);
        callback();
      }
      img.src = `data:image/svg+xml; charset=utf8, ` + encodeURIComponent(svgURL);
    } else {
      throw new Error(`SVG DOM Error!`)
    }
  } catch (error) {
    log(`svg can't be find!`, error);
    alert(`svg can't be find!, ${error}`);
  }
}

// module.exports.svgAutoToPng = svgAutoToPng;
// module.exports = {
//   svgAutoToPng,
// };

// default，覆盖上面的所有 exports (方法复写/重载)
module.exports = svgAutoToPng;


/*

// const svgAutoToPng = require("js-red-package");
const svgAutoToPng = require("./index.min.js");

TypeError: svgAutoToPng is not a function

*/
