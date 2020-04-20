'use strict';

(function() {
  // any module-globals (limit the use of these when possible)
  window.addEventListener('load', init);
  
  function init() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let toolButton = document.getElementById('tool-button');
    let brushButton = document.getElementById('brush-button');
    let brushSize = 10;
    let boxDimension;

    canvas.context = context;

    brushButton.addEventListener('click', function() {
      brushSize = setBrush();
    });

    canvas.addEventListener('click', function (e) {
      boxDimension = getBoxDimension(this, brushSize);
      let isEraser = checkEraser(toolButton);
      drawPixel(e, this, isEraser, boxDimension);
    });

    toolButton.addEventListener('click', changeTool);
  }

  function drawPixel(e, canvas, isEraser, box) {
    let pos = getMouseLocation(e, canvas);
    let nthCol = Math.floor(pos.x/box.width);
    let nthRow = Math.floor(pos.y/box.height);
    isEraser ? canvas.context.clearRect(nthCol * box.width, nthRow * box.height, box.width, box.height)
             : canvas.context.fillRect(nthCol * box.width, nthRow * box.height, box.width, box.height);
  }

  function getMouseLocation(e, canvas) {
    let canvasRect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top

    }
  }

  function getBoxDimension(canvas, size) {
    return {
      width: canvas.width / size,
      height: canvas.height / size
    }
  }

  function changeTool(e) {
    let userAction = document.querySelector('h2');
    let isEraser = checkEraser(e.target);
    if (isEraser) {
      userAction.innerText = 'Painting';
      e.target.innerText = 'Eraser';
    } else {
      userAction.innerText = 'Erasing';
      e.target.innerText = 'Paint';
    }
  }

  function checkEraser(tool) {
    return tool.innerText !== 'Eraser';
  }

  function setBrush() {
    let radios = document.getElementsByName('brush-size');
    let size;
    let sketchpad = document.querySelector('#sketchpad > div');
    let backButton = document.createElement('button');
    let brushSelections = document.getElementById('brush-section');

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        size = radios[i].value;
        break;
      }
    }

    backButton.innerHTML = 'Change Brush';
    backButton.classList.add('btn');
    backButton.addEventListener('click', function() {
      brushSelections.classList.remove('hidden');
      this.parentNode.removeChild(this);
    })
    
    sketchpad.appendChild(backButton);
    brushSelections.classList.add('hidden');

    return size; 
  }
})();