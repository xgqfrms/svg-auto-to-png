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

const svgAutoToPng = (options = {
  filename: `svg-to-png`,
  type: `png`,
  svg: `svg`,
}) => {
  let {
    filename,
    type,
    svg,
  } = options;
  // const svgToPng = (filename = `svg-to-png`, type = `png`, svg = `svg`) => {
  // <canvas id="canvas" width="100" height="100"></canvas>
  // const canvas = document.getElementById(`canvas`);
  const canvas = document.createElement(`canvas`);
  canvas.height = 100;
  canvas.width = 100;
  const ctx = canvas.getContext(`2d`);
  // image
  // let svg = document.querySelector(`svg`);
  if(!(svg instanceof SVGSVGElement)) {
    svg = document.querySelector(`svg`);
  }
  try {
    if(svg instanceof SVGSVGElement) {
      let svgURL = new XMLSerializer().serializeToString(svg);
      const callback = () => {
        setTimeout(() => {
          // 3. svg 转换成 png
          let base64URL = canvas.toDataURL(`image/${type}`);
          // let base64URL = canvas.toDataURL("image/png");
          // 4. 自动下载
          let aTag = document.createElement(`a`);
          aTag.setAttribute(`href`, base64URL);
          // aTag.setAttribute(`href`, canvas.toDataURL("image/png"));
          aTag.download = filename + type;
          aTag.click();
          // setTimeout(() => {
          //   canvas.setAttribute(`class`, "auto-hidden");
          // }, 1000);
        }, 0);
        // }, 1000);
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
  }catch (error) {
    log(`svg can't be find!`, error);
    alert(`svg can't be find!, ${error}`);
  }
}


// const test = (options = {
//   filename: `svg-to-png`,
//   type: `png`,
//   svg: `svg`,
// }) => {
//   let {
//     filename,
//     type,
//     svg,
//   } = options;
//   console.log(`svg`, svg, )
// }
