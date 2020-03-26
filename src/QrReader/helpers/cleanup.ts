import { log } from './utils';

export type CleanupOptions = {
  debug?: boolean;
};

export const clearPreview = (
  preview: HTMLVideoElement | any,
  { debug }: CleanupOptions
): void => {
  if (preview) {
    log(`[QrReader]: Cleaning all properties from video element`, 'yellow', {
      debug,
    });

    preview.pause();

    preview.mozSrcObject = null;
    preview.srcObject = null;
    preview.src = '';
  }
};

export const clearStreams = (
  streams: MediaStream[],
  { debug }: CleanupOptions
): void => {
  log(`[QrReader]: Removing all tracks from videoStream`, 'yellow', {
    debug,
  });

  const pc: any = new RTCPeerConnection();

  streams.forEach((stream: MediaStream | any) => {
    if (stream.stop) {
      // Legacy way for older browsers
      stream.stop && stream.stop();
      pc.addStream && pc.addStream(stream);
    } else {
      // New way for modern browsers
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = !track.enabled;
        track.stop();

        pc.addTrack(track, stream);
      });
    }
  });
};

export const clearFrames = (
  cancelIds: number[],
  { debug }: CleanupOptions
): void => {
  log(`[QrReader]: Trying to cancel requestAnimationFrame`, 'yellow', {
    debug,
  });

  cancelIds.forEach(window.cancelAnimationFrame);
};
