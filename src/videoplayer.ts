
namespace Video.Responsive {

  export interface IVideoPlayer {

  playerWidth(): number;
  playerHeight(): number;

  currentResolution(): any;

  buffered(): TimeRanges;
  duration(): number;
  currentTime(): number;
}

export class CustomVideoPlayer implements IVideoPlayer {

  constructor(private videoPlayer: VideoJSPlayer, private videoElementId: string) {

  }

  playerWidth(): number {

    return $(this.videoElementId).width();
  }
  playerHeight(): number {

    return $(this.videoElementId).height();
  }

  currentResolution(): any {

    return (<any>this.videoPlayer).currentResolution()["label"];
  }

  buffered(): TimeRanges {

    return this.videoPlayer.buffered();
  }
  duration(): number {

    return this.videoPlayer.duration();
  }
  currentTime(): number {

    return this.videoPlayer.currentTime();
  }
}
}
