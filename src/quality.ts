namespace Video.Responsive {

  // const Qualities = [1, 2, 3];

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
      const quality: Quality = new Quality(0, 0, source["label"]);
      return quality;
    }
  }

  export class QualityObserver {

    constructor(private videoPlayer: VideoJSPlayer, private qualities: Quality[]) {

    }

    start(updateQuality: (label: string) => void): any {

      setInterval(() => {
        ;

        const width: number = $("#video").width(); //TODO: Remove
        const res: [boolean, Quality] = this.check(this.videoPlayer, width, this.qualities);

        if (res[0] && res[1].label != (<any>this.videoPlayer).currentResolution()["label"]) {
          updateQuality(res[1].label);
        }

      }, 5000);
    }

    private check(videoPlayer: VideoJSPlayer, playerWidth: number, qualities: Quality[]): [boolean, Quality] {

      const quality: Quality = Quality.convertToQuality((<any>videoPlayer).currentResolution(), qualities);

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

      const incPriority: number = current.priority + 1;

      const incQuality: Quality = _.find<Quality>(knownQualities, (q) => { return q.priority == incPriority });

      if (_.isUndefined(incQuality)) {
        return current;
      }

      if (incQuality.width > playerWidth) {
        return current;
      } else {
        return incQuality;
      }
    }
  }

}
