document.addEventListener("DOMContentLoaded",handleDocumentLoad);

let navList;

function changeCurrentShell(target) {
  return function() {
    for (var i=0; i<navList.length; i++) {
      navList[i].className = "";
    }
    navList[target].className = "current";
  };
}

function changeCurrent(target) {
  for (var i=0; i<navList.length; i++) {
    navList[i].className = "";
  }
  navList[target].className = "current";
};

function playOrPause() {
  if (entVideo.paused === true) {
    entVideo.play();
    ppButton.firstChild.src = "./resources/pause-button.png";
  }
  else {
    entVideo.pause();
    ppButton.firstChild.src = "./resources/play-button.png";
  }
  setProg();
}

function muteOrUnmute() {
  if (entVideo.muted === true) {
    entVideo.muted = false;
    muteButton.firstChild.src = "./resources/mute.png";
  }
  else {
    entVideo.muted = true;
    muteButton.firstChild.src = "./resources/unmute.png"
  }
}

function rewindVideo() {
  entVideo.currentTime = 0;
}

function setProg() {
  let barratio = entVideo.currentTime / entVideo.duration;
  prog.style.width = barratio * progbar.offsetWidth + "px";
}

function progJump(e) {
  let xpos = e.clientX;
  let startpos = progbar.getBoundingClientRect().left;
  let progratio = (xpos - startpos) / progbar.offsetWidth;
  entVideo.currentTime = entVideo.duration * progratio;
  setProg();
}

function bindControl() {
  navList = document.querySelectorAll(".nav-list a");

  for (var i=0; i<navList.length; i++) {
    navList[i].addEventListener("click",changeCurrentShell(i),false);
  }

  entVideo = document.querySelector("#theVideo");
  ppButton = document.getElementById("play-pause");
  muteButton = document.getElementById("mute-unmute");
  rwButton = document.getElementById("rewind");
  progbar = document.getElementById("prog-bar");
  prog = document.getElementById("prog");

  entVideo.addEventListener("click",playOrPause);
  ppButton.addEventListener("click",playOrPause);
  muteButton.addEventListener("click",muteOrUnmute);
  rwButton.addEventListener("click",rewindVideo);

  progression = setInterval(setProg,300);
  progbar.addEventListener("click", progJump);

  setProg();
};

function setHighlight() {
  let anchorTag = location.hash;
  switch (anchorTag) {
    case "#anchor_main": changeCurrent(0); break;
    case "#anchor_video": changeCurrent(1); break;
    case "#anchor_hobbies": changeCurrent(2); break;
    case "#anchor_cw": changeCurrent(3); break;
    case "#anchor_animation": changeCurrent(4); break;
    default: changeCurrent(0);
  }
}

function handleDocumentLoad() {
  bindControl();
  setHighlight();
};
