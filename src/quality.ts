
namespace Video.Responsive {

  export class Quality {
    constructor(public priority: number, public width: number, public label: string) { }

    // Find Quality with label

    static convertToQuality(source: any, knownQualities: Quality[]): Quality {

      const q: Quality = Quality.sourceToQuality(source);
      const f: Quality = Quality.findQuality(q, knownQualities);

      if (_.isUndefined(f))
        throw new Error("Source do not map to existing qualities.");
      else
        return f;
    }

    static findQuality(quality: Quality, knownQualities: Quality[]): Quality {
      const matchingQuality = _.find<Quality>(knownQualities, (q) => { return q.label === quality.label });
      return matchingQuality;
    }

    static sourceToQuality(source: any): Quality {
      const quality: Quality = new Quality(0, 0, source);
      return quality;
    }
  }

  export class QualityObserver {

    constructor(private videoPlayer: IVideoPlayer, private qualities: Quality[]) {

    }

    start(updateQuality: (label: string) => void): any {

      setInterval(() => {
        ;

        const width: number = $("#video").width(); //TODO: Remove
        const res: [boolean, Quality] = this.check(this.videoPlayer, width, this.qualities);

        console.log("CH: " + res[0] + " RES: " + res[1].label);

        if (res[0] && res[1].label != this.videoPlayer.currentResolution()) {
          updateQuality(res[1].label);
        }

      }, 5000);
    }

    private check(videoPlayer: IVideoPlayer, playerWidth: number, qualities: Quality[]): [boolean, Quality] {

      const quality: Quality = Quality.convertToQuality(videoPlayer.currentResolution(), qualities);

      const range = 5;
      const buffer = Math.round(videoPlayer.buffered().end(0));
      const bufferRange = buffer - range // in seconds

      const duration = Math.round(videoPlayer.duration());
      const currentTime = Math.round(videoPlayer.currentTime());

      if (duration <= range) {
        return [false, null];
      }

      if (buffer == duration) {
        return [true, this.changeQuality(quality, qualities, playerWidth, this.increase)];
      }

      if (currentTime > bufferRange)
        return [true, this.changeQuality(quality, qualities, playerWidth, this.decrease)];
      else if (currentTime < bufferRange)
        return [true, this.changeQuality(quality, qualities, playerWidth, this.increase)];
      else
        return [false, null];
    }

    private changeQuality(current: Quality, knownQualities: Quality[], playerWidth: number,
      changeFn: (c: Quality, k: Quality[], w: number) => Quality): Quality {
      const newQuality = changeFn(current, knownQualities, playerWidth);

      return newQuality;
    }

    private decrease(current: Quality, knownQualities: Quality[], playerWidth: number): Quality {

      const decPriority: number = current.priority - 1;

      const decQuality: Quality = _.find<Quality>(knownQualities, (q) => { return q.priority == decPriority });

      if (_.isUndefined(decQuality)) {
        return current;
      } else {
        return decQuality;
      }
    }

    private increase(current: Quality, knownQualities: Quality[], playerWidth: number): Quality {

      const newQuality: Quality = _(knownQualities)
        .chain()
        .filter((q) => { return q.width <= playerWidth; })
        .sortBy((q) => { return Math.abs(q.width - playerWidth); })
        .first()
        .value();

      if (_.isUndefined(newQuality)) {
        return current;
      } else {
        return newQuality;
      }
    }
  }

}
