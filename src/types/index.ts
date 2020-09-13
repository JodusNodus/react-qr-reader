import { BrowserQRCodeReader, Result } from '@zxing/library';

export type QrReaderProps = {
  /**
   * The camera to use, especify 'user' for front camera or 'environment' for back camera.
   */
  facingMode: VideoFacingModeEnum;
  /**
   * ClassName for the container element.
   */
  className?: string;
  /**
   * Called when an error occurs.
   */
  onResult?: OnResultFunction;
  /**
   * Styling for the container element. Warning The preview will always keep its 1:1 aspect ratio.
   */
  style?: any;
  /**
   * Property that represents the view finder component
   */
  ViewFinder?: (props: any) => React.ReactElement<any, any> | null;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
};

export type CodeReaderError =
  | 'FormatException'
  | 'NotFoundException'
  | 'ChecksumException'
  | 'NoDeviceFoundException'
  | 'NoMediaDevicesSupportException';

export type UseQrReaderHook = (props: UseQrReaderHookProps) => void;
export type OnResultFunction = (
  /**
   * The QR values extracted by Zxing
   */
  result?: Result,
  /**
   * The name of the exceptions thrown while reading the QR
   */
  error?: CodeReaderError,
  /**
   * The instance of the QR browser reader
   */
  codeReader?: BrowserQRCodeReader
) => void;

export type UseQrReaderHookProps = {
  /**
   * The camera to use, especify 'user' for front camera or 'environment' for back camera.
   */
  facingMode?: VideoFacingModeEnum;
  /**
   * Callback for retrieving the result
   */
  onResult?: OnResultFunction;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
};
