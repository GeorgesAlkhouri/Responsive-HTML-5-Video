var Video;
(function (Video) {
    var Responsive;
    (function (Responsive) {
        var Quality = (function () {
            function Quality(priority, width, label) {
                this.priority = priority;
                this.width = width;
                this.label = label;
            }
            Quality.convertToQuality = function (source, knownQualities) {
                var q = Quality.sourceToQuality(source);
                var f = Quality.findQuality(q, knownQualities);
                if (_.isUndefined(f))
                    throw new Error("Source do not map to existing qualities.");
                else
                    return f;
            };
            Quality.findQuality = function (quality, knownQualities) {
                var matchingQuality = _.find(knownQualities, function (q) { return q.label === quality.label; });
                return matchingQuality;
            };
            Quality.sourceToQuality = function (source) {
                var quality = new Quality(0, 0, source);
                return quality;
            };
            return Quality;
        })();
        Responsive.Quality = Quality;
        var QualityObserver = (function () {
            function QualityObserver(videoPlayer, qualities) {
                this.videoPlayer = videoPlayer;
                this.qualities = qualities;
            }
            QualityObserver.prototype.start = function (updateQuality) {
                var _this = this;
                setInterval(function () {
                    ;
                    var width = $("#video").width();
                    var res = _this.check(_this.videoPlayer, width, _this.qualities);
                    console.log("CH: " + res[0] + " RES: " + res[1].label);
                    if (res[0] && res[1].label != _this.videoPlayer.currentResolution()) {
                        updateQuality(res[1].label);
                    }
                }, 5000);
            };
            QualityObserver.prototype.check = function (videoPlayer, playerWidth, qualities) {
                var quality = Quality.convertToQuality(videoPlayer.currentResolution(), qualities);
                var range = 5;
                var buffer = Math.round(videoPlayer.buffered().end(0));
                var bufferRange = buffer - range;
                var duration = Math.round(videoPlayer.duration());
                var currentTime = Math.round(videoPlayer.currentTime());
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
            };
            QualityObserver.prototype.changeQuality = function (current, knownQualities, playerWidth, changeFn) {
                var newQuality = changeFn(current, knownQualities, playerWidth);
                return newQuality;
            };
            QualityObserver.prototype.decrease = function (current, knownQualities, playerWidth) {
                var decPriority = current.priority - 1;
                var decQuality = _.find(knownQualities, function (q) { return q.priority == decPriority; });
                if (_.isUndefined(decQuality)) {
                    return current;
                }
                else {
                    return decQuality;
                }
            };
            QualityObserver.prototype.increase = function (current, knownQualities, playerWidth) {
                var newQuality = _(knownQualities)
                    .chain()
                    .filter(function (q) { return q.width <= playerWidth; })
                    .sortBy(function (q) { return Math.abs(q.width - playerWidth); })
                    .first()
                    .value();
                if (_.isUndefined(newQuality)) {
                    return current;
                }
                else {
                    return newQuality;
                }
            };
            return QualityObserver;
        })();
        Responsive.QualityObserver = QualityObserver;
    })(Responsive = Video.Responsive || (Video.Responsive = {}));
})(Video || (Video = {}));
var Video;
(function (Video) {
    var Responsive;
    (function (Responsive) {
        var CustomVideoPlayer = (function () {
            function CustomVideoPlayer(videoPlayer, videoElementId) {
                this.videoPlayer = videoPlayer;
                this.videoElementId = videoElementId;
            }
            CustomVideoPlayer.prototype.playerWidth = function () {
                return $(this.videoElementId).width();
            };
            CustomVideoPlayer.prototype.playerHeight = function () {
                return $(this.videoElementId).height();
            };
            CustomVideoPlayer.prototype.currentResolution = function () {
                var label = this.videoPlayer.currentResolution()["label"];
                if (label == "Auto") {
                    return "720";
                }
                else {
                    return label;
                }
            };
            CustomVideoPlayer.prototype.buffered = function () {
                return this.videoPlayer.buffered();
            };
            CustomVideoPlayer.prototype.duration = function () {
                return this.videoPlayer.duration();
            };
            CustomVideoPlayer.prototype.currentTime = function () {
                return this.videoPlayer.currentTime();
            };
            return CustomVideoPlayer;
        })();
        Responsive.CustomVideoPlayer = CustomVideoPlayer;
    })(Responsive = Video.Responsive || (Video.Responsive = {}));
})(Video || (Video = {}));
