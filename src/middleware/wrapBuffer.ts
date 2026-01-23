import type { Readable } from "node:stream";
import streamifier from "streamifier";

export function wrapBuffer(param: Buffer): Readable {
  return streamifier.createReadStream(param);
}
