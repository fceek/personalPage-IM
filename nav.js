document.addEventListener("DOMContentLoaded",handleDocumentLoad);

let navList;

function handleDocumentLoad() {
  bindControl();
  var timeOut;
  function toTop() {
    if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0) {
      window.scrollBy(0,-50);
      timeOut = setTimeout("toTop()",10);
    } else clearTimeout(timeOut);
  }
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
  navList = document.querySelectorAll(".nav-list a");

  for (var i=0; i<navList.length; i++) {
    navList[i].addEventListener("click",changeCurrent(i),false);
  }
};
