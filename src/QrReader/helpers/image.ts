export type GetImageDataParams = {
  /**
   * The resolution of the video (or image in legacyMode). Larger resolution will increase the accuracy but it will also slow down the processing time.
   */
  resolution: number;
  /**
   * The video from where to capture the image to use with the canvas
   */
  preview: HTMLVideoElement;
  /**
   * The canvas where the QR image is rendered to get ImageData
   */
  canvas: HTMLCanvasElement;
};

export const getImageData = async ({
  resolution,
  preview,
  canvas,
}: GetImageDataParams): Promise<ImageData | null> =>
  new Promise((resolve) => {
    if (!preview || !canvas) {
      resolve(null);
    }

    // Get image/video dimensions
    let width = Math.floor(preview.videoWidth);
    let height = Math.floor(preview.videoHeight);

    // Canvas draw offsets
    let hozOffset = 0;
    let vertOffset = 0;

    // Crop image to fit 1:1 aspect ratio
    const smallestSize = width < height ? width : height;
    const ratio = resolution / smallestSize;

    height = ratio * height;
    width = ratio * width;

    vertOffset = ((height - resolution) / 2) * -1;
    hozOffset = ((width - resolution) / 2) * -1;

    canvas.width = resolution;
    canvas.height = resolution;

    if (preview.readyState === preview.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d', { alpha: false });

      ctx.imageSmoothingEnabled = false; // gives less blurry images

      ctx.drawImage(preview, hozOffset, vertOffset, width, height);

      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

      resolve(image);
    } else {
      resolve(null);
    }
  });
