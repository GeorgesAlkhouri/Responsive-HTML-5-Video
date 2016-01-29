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
        return this.videoPlayer.currentResolution();
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
exports.CustomVideoPlayer = CustomVideoPlayer;
