// const qualities = {"480" : 1, "720" : 2};
const qualityWidths = [0, 360 ,480, 720];
const qualities = [1, 2, 3];
//Native Auflösung hernehmen und vergleichen ob current auflösungen höher ist.

function updateQuality(currentTime, bufferedEnd, duration, currentQuality, playerWidth) {

  const range = 5;
  const quality = qualityToInteger(currentQuality);
  const roundedBufferedEnd = toInteger(bufferedEnd);
  const roundedDuration = toInteger(duration);
  const roundedCurrentTime = toInteger(currentTime);
  const bufferRange = roundedBufferedEnd - range // seconds

  // Is duration smaller or equal range --> no quality update
  if (roundedDuration <= range)
    return [false]

    console.log("1");

  // Is end buffer time equal duration --> video is fully buffered, try to increase quality
  if (roundedBufferedEnd === roundedDuration)
    return [true, integerToQuality(changeQuality(quality, qualities, playerWidth, increaseQuality))];

    // console.log("Time: " + roundedCurrentTime + " Buff: " + roundedBufferedEnd);
  if (roundedCurrentTime > bufferRange)
    return [true, integerToQuality(changeQuality(quality, qualities, playerWidth, decreaseQuality))];
  else if (roundedCurrentTime < bufferRange)
    return [true, integerToQuality(changeQuality(quality, qualities, playerWidth, increaseQuality))];
  else
    return [false];
}

function changeQuality(currentQuality, qualities, playerWidth, changeFn) {
  const newScore = changeFn(currentQuality, qualities, playerWidth);

  return newScore;
}

function decreaseQuality(score, qualities, playerWidth) {

      console.log("2");

  if (score <= 1)
    return 1;
  else
    return score - 1;
}

function increaseQuality(score, qualities,playerWidth) {

      console.log("3: score: " + score);

  if (score >= qualities.length)
    return qualities.length;
  else {

        console.log("4");

    const newScore = score + 1;
    const newWidth = integerToWidth(newScore);

    if (newWidth > playerWidth)
      return score;
    else
      return newScore;
  }
}

// UTIL

function qualityToInteger(quality) {

  switch (quality) {
    case "360":
      return 1;
    case "480":
      return 2;
    case "720":
      return 3;
    default:
      throw "WrongQualityException";
  }
}

function integerToWidth(integer) {
  switch (integer) {
    case 1:
      return 360;
    case 2:
      return 480;
    case 3:
      return 720;
    default:
      throw "WrongQualityException";
  }
}

function integerToQuality(integer) {

  switch (integer) {
    case 1:
      return "360";
    case 2:
      return "480";
    case 3:
      return "720";
    default:
      throw "WrongQualityException";
  }
}

function toInteger(number) {
  return Math.round(number);
};
