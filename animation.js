function svgReady() {
  var startButton = paper.path("M440,190L440,290L530,240Z").attr({
    fill: "#fe9",
  });
  var startText = paper.text(340,240,"START").attr({
    font: "48px azo-sans-uber,sans-serif",
    fill: "#fe9",
  });

  var startSet = paper.set();
  startSet.push(
    startButton,
    startText
  );

  startSet.click(function() {
    startSet.remove();
    svgPlay();
  });
}

function svgPlay() {
  var background = paper.image("./resources/bg-svg.jpg",0,0,800,480);
  var context = new AudioContext();
  var audioSrc = context.createMediaElementSource(theAudio);
  var analyser = context.createAnalyser();
  audioSrc.connect(analyser);
  analyser.fftSize = 256;

  var bufferLength = analyser.frequencyBinCount;
  var audioInfo = new Uint8Array(bufferLength);

  var barWidth = (800 / bufferLength); //tbc
  var barHeight;
  var x = 0;
  function nextFrame() {
    requestAnimationFrame(nextFrame);
    x = 0;
    analyser.getByteFrequencyData(audioInfo);
    background = paper.image("./resources/bg-svg.jpg",0,0,800,480);

    for (var i = 0; i < bufferLength; i++) {
      barHeight = audioInfo[i];
      paper.rect(x, 800 - barHeight, barWidth, barHeight).attr({
        fill: "#ec3",
      });

      x += barWidth + 1;
    }
  }
  theAudio.play();
  nextFrame();
}

// ctx - paper
// src - audioSrc
// audioInfo - dataArray
// nextFrame - renderFrame
/*

    var barWidth = (WIDTH / bufferLength) * 2.5;

    function renderFrame() {
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        var r = barHeight + (25 * (i/bufferLength));
        var g = 250 * (i/bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};
*/
