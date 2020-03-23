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
  if (streams && streams.length > 0) {
    log(`[QrReader]: Removing all tracks from videoStream`, 'yellow', {
      debug,
    });

    const pc: any = new RTCPeerConnection();

    streams.forEach((stream: MediaStream | any) => {
      // Legacy way for older browsers
      if ('stop' in stream) {
        stream.stop();

        if ('addStream' in pc) {
          pc.addStream(stream);
        }
        // New way for modern browsers
      } else {
        stream.getTracks().forEach((track: MediaStreamTrack) => {
          track.enabled = !track.enabled;
          track.stop();

          pc.addTrack(track, stream);
        });
      }
    });
  }
};

export const clearFrames = (
  cancelIds: number[],
  { debug }: CleanupOptions
): void => {
  log(`[QrReader]: Trying to cancel requestAnimationFrame`, 'yellow', {
    debug,
  });

  if (cancelIds && cancelIds.length > 0) {
    log(`[QrReader]: Killing all previous requestAnimationFrame`, 'yellow', {
      debug,
    });

    cancelIds.forEach((cancelId) => window.cancelAnimationFrame(cancelId));
  }
};
