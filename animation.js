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
    phase1();
  });
}

function phase1() {
  var background = paper.image("./resources/bg-svg.jpg",0,0,800,480);
  theAudio.play();

  loopCount = 0;
  introText = paper.text(360,240,"").attr({
    font: "64px gooddog-new,sans-serif",
    fill: "#ec3",
  });

  emtext(introText, "Get Ready", 1920);
}

function emtext(textobj, context, duration) {
  function emtextChangeContent() {
    textobj.attr({
      text: context,
    });
  }
  function emtextAnimationExe() {
    var emtextAnimation = Raphael.animation({
      transform: "s1.5,1.5",
      fill: "#fe7",
    }, duration, ">", emtextAnimationRevExe);
    textobj.animate(emtextAnimation);
  }
  function emtextAnimationRevExe() {
    var emtextAnimationRev = Raphael.animation({
      transform: "s0.66,0.66",
      fill: "#ec3",
    }, duration, "<", nextAction(loopCount));
    textobj.animate(emtextAnimationRev);
  }

  emtextChangeContent();
  emtextAnimationExe();
}

function nextAction(step) {
  switch (step) {
    case 0: emtext(introText, "One !", 430); break;
    case 1: emtext(introText, "Two !", 450); break;
    case 2: emtext(introText, "Three !", 450); break;
    case 3: emtext(introText, "Four !", 450); break;
    case 4: phase2(); break;
    default: // do nothing
  }
  loopCount++;
}

function phase2() {
  introText.remove();
  var glowBars = setBars();
  var ranSeed = 60 + Math.floor(Math.random() * 10);
  var r = 238;
  var g = 204;
  var b = 51;
  var reverseFlag = true;

  function glowBarsRise() {
    glowBars.animate({
      transform:"t0,-" + ranSeed,
    }, 60, ">", glowBarsDrop);
  }
  function glowBarsDrop() {
    if (reverseFlag) {
      r-=3; g-=3; b+=3;
    } else {
      r+=3; g+=3; b-=3;
    }
    glowBars.animate({
      transform: "t0," + ranSeed,
      fill: "rgb(" + r + "," + g + "," + b + ")"
    }, 385, "<", glowBarsRise);

    if (g < 5 || b > 250) reverseFlag = !reverseFlag;
  }

  glowBarsDrop();
}

function setBars() {
  var barWidth = 15;
  var barHeight = 240;
  var generatedSet;
  paper.setStart();
  var x = 0;
  for (var i = 0; i < 50; i++) {
    barHeight = Math.floor(Math.random() * 479);
    paper.rect(x, 640 - barHeight, barWidth, barHeight).attr({
      fill: "#ec3",
      "stroke-width": 0,
    });
  x += barWidth + 1;
  }

  generatedSet = paper.setFinish();

  return generatedSet;
}
