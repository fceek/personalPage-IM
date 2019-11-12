document.addEventListener("DOMContentLoaded",handleDocumentLoad);

let navList;

function handleDocumentLoad() {
  bindControl();
};

function changeCurrent(target) {
  return function() {
    for (var i=0; i<navList.length; i++) {
      navList[i].className = "";
    }
    navList[target].className = "current";
  }
};

function bindControl() {
  navList = document.querySelectorAll(".nav-list li");

  for (var i=0; i<navList.length; i++) {
    navList[i].addEventListener("click",changeCurrent(i),false);
  }
};
