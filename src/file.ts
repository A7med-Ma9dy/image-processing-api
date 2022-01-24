import { promises as fs } from "fs";
import path from "path";
import imageProcess from "./processing";

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

export default class control {
  // Default paths
  static imagesFullPath = path.resolve(__dirname, "../images/full");
  static imagesThumbPath = path.resolve(__dirname, "../images/thumb");

  //image paths
  static async getImagePath(params: ImageQuery): Promise<null | string> {
    if (!params.filename) {
      return null;
    }
    const filePath: string =
      params.width && params.height
        ? path.resolve(
            control.imagesThumbPath,
            `${params.filename}-${params.width}x${params.height}.jpg`
          )
        : path.resolve(control.imagesFullPath, `${params.filename}.jpg`);
    try {
      await fs.access(filePath); //check if file exists
      return filePath;
    } catch {
      return null;
    }
  }
  //image availability check
  static async isImageAvailable(filename = ""): Promise<boolean> {
    if (!filename) {
      return false;
    }

    return (await control.getAvailableImageNames()).includes(filename);
  }
  //Get  Images available
  static async getAvailableImageNames(): Promise<string[]> {
    try {
      return (await fs.readdir(control.imagesFullPath)).map(
        (filename: string): string => filename.split(".")[0]
      );
    } catch {
      return [];
    }
  }

  //check if there was a thumb created for image
  static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
    if (!params.filename || !params.width || !params.height) {
      return false;
    }
    const filePath: string = path.resolve(
      control.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(control.imagesThumbPath);
    } catch {
      fs.mkdir(control.imagesThumbPath);
    }
  }
  //create a thumb file
  static async createThumb(params: ImageQuery): Promise<null | string> {
    if (!params.filename || !params.width || !params.height) {
      return null;
    }

    const filePathFull: string = path.resolve(
      control.imagesFullPath,
      `${params.filename}.jpg`
    );
    const filePathThumb: string = path.resolve(
      control.imagesThumbPath,
      `${params.filename}-${params.width}x${params.height}.jpg`
    );

    console.log(`Creating thumb ${filePathThumb}`);

    // Resize & store as thumb
    return await imageProcess({
      source: filePathFull,
      target: filePathThumb,
      width: parseInt(params.width),
      height: parseInt(params.height),
    });
  }
}
