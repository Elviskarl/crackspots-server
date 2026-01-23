import sharp from "sharp";

export function wrapBuffer(param: Buffer) {
  return sharp(param)
    .rotate()
    .resize({ width: 540, height: 720, fit: "inside" })
    .jpeg({ quality: 80, mozjpeg: true });
}
