export const clearPreview = (preview: HTMLVideoElement | any): void => {
  if (preview) {
    preview.pause();

    preview.mozSrcObject = null;
    preview.srcObject = null;
    preview.src = '';
  }
};

export const clearStreams = (streams: MediaStream[]): void => {
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

export const clearFrames = (cancelIds: number[]): void => {
  cancelIds.forEach(window.cancelAnimationFrame);
};
