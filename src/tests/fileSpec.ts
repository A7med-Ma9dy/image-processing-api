import control from "./../file";
import { promises as fs } from "fs";
import path from "path";

describe("Test image processing via sharp", (): void => {
  it("invalid width value", async (): Promise<void> => {
    const error: null | string = await control.createThumb({
      filename: "foo",
      width: "-100",
      height: "500",
    });
    expect(error).not.toBeNull();
  });

  it("filename does not exist", async (): Promise<void> => {
    const error: null | string = await control.createThumb({
      filename: "foo",
      width: "100",
      height: "500",
    });
    expect(error).not.toBeNull();
  });

  it("succeeds to write resized thumb file", async (): Promise<void> => {
    await control.createThumb({ filename: "fjord", width: "99", height: "99" });

    const resizedImagePath: string = path.resolve(
      control.imagesThumbPath,
      `fjord-99x99.jpg`
    );
    let errorFile: null | string = "";

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = "File was not created";
    }

    expect(errorFile).toBeNull();
  });
});
