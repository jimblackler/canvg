import { DOMParser } from 'xmldom'
import {
  Canvg,
  presets
} from 'canvg'

const preset = presets.offscreen({
  DOMParser
})

async function toPng(data) {
  const {
    width,
    height,
    svg
  } = data
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')
  const v = await Canvg.from(ctx, svg, preset)

  /**
   * Resize SVG to fit in given size.
   * @param width
   * @param height
   * @param preserveAspectRatio
   */
  v.resize(width, height, 'xMidYMid meet')

  // Render only first frame, ignoring animations and mouse.
  await v.render()

  const blob = await canvas.convertToBlob()
  const pngUrl = URL.createObjectURL(blob)

  return pngUrl
}

toPng({
  width: 600,
  height: 600,
  svg: './example.svg'
}).then((pngUrl) => {
  const img = document.querySelector('img')

  img.src = pngUrl
})
