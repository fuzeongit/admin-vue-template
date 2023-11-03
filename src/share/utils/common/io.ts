export enum ImageType {
  JPG = 'jpg',
  PNG = 'png',
  JPEG = 'jpeg'
}

export class ImageOffset {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public width: number,
    public height: number
  ) {}
}

/**
 * canvas转文件
 * @param dataUrl
 * @param filename
 */
export const dataURLtoFile = (dataUrl: string, filename = 'file'): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const suffix = mime.split('/')[1];
  const str = Buffer.from(arr[1], 'base64').toString('binary');
  let n = str.length;
  const u8arr = new Uint8Array(n);

  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = str.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime });
};

/**
 * canvas转blob对象
 * @param canvas
 */
export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(blobObj => resolve(blobObj));
    } catch (e) {
      reject(e);
    }
  });
};
/**
 * 获取图片宽高
 * @param url
 */
export const getOffset = (url: string): Promise<ImageOffset> => {
  const image = new Image();
  image.src = url;
  return new Promise((resolve, reject) => {
    try {
      image.onload = () => {
        resolve(new ImageOffset(image.width, image.height));
      };
    } catch (e) {
      reject(e);
    }
  });
};
/**
 * 缩放canvas
 * @param sourceCanvas
 * @param option
 */
export const getRoundedCanvas = (
  sourceCanvas: HTMLCanvasElement,
  option: {
    width?: number;
    height?: number;
  }
) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  const targetWidth = option.width ?? sourceCanvas.width;
  const targetHeight = option.height ?? sourceCanvas.height;
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, targetWidth, targetHeight);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.fill();
  return canvas;
};
/**
 * 是否图片
 * @param file
 * @param suffixList
 */
export const isImage = (file: File, suffixList = [ImageType.JPG, ImageType.PNG, ImageType.JPEG]) => {
  if (!(file instanceof File)) {
    throw new TypeError('Not File');
  }
  if (!file.type.includes('image/')) {
    return false;
  }
  if (suffixList.length) {
    const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (!suffixList.includes(fileSuffix as ImageType)) {
      return false;
    }
  }
  return true;
};
