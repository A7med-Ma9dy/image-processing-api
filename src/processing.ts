import sharp from "sharp";

// query segments
interface sharpResizeParams {
  source: string;
  target: string;
  width: number;
  height: number;
}
const imageProcess = async (
  params: sharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat("jpeg")
      .toFile(params.target);
    return null;
  } catch {
    return "Image NOT Processed.";
  }
};

export default imageProcess;
