/*
 * Name: Eric Kim
 * Date: April 19, 2020
 * Section: CSE 154 AK
 *
 * This is the JS to manipulate the UI for of the homepage with user's interactions.
 * This JS also allows the user to change the brush size and draw pixels 
 * on the square 'sketchpad' in the main homepage.
 */

'use strict';
(function() {
  window.addEventListener('load', init);
  
  /**
   * Sets up the sketchpad/canvas with the default 'medium' brush size.
   */
  function init() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let toolButton = document.getElementById('tool-button');
    let brushButton = document.getElementById('brush-button');
    let brushSize = 10;
    let pixelSize = canvas.width/brushSize;
    canvas.context = context;

    brushButton.addEventListener('click', function() {
      pixelSize = canvas.width/setBrush();
    });

    canvas.addEventListener('click', function (e) {
      let isEraser = checkEraser(toolButton);
      drawPixel(e, this, isEraser, pixelSize);
    });

    toolButton.addEventListener('click', changeTool);
  }

  /**
   * Draws a square box of specificed size on the canvas based on the user's mouse location.
   * @param {Object} e - A mouse event after the user's click interaction.
   * @param {Object} canvas - The canvas to draw the pixels in.
   * @param {boolean} isEraser - Rather or not the eraser tool is being used.
   * @param {int} pixelSize - The size of the individual pixels.
   */
  function drawPixel(e, canvas, isEraser, pixelSize) {
    let pos = getMouseLocation(e, canvas);
    let nthCol = Math.floor(pos.x/pixelSize);
    let nthRow = Math.floor(pos.y/pixelSize);
    isEraser ? canvas.context.clearRect(nthCol*pixelSize, nthRow*pixelSize, pixelSize, pixelSize)
             : canvas.context.fillRect(nthCol*pixelSize, nthRow*pixelSize, pixelSize, pixelSize);
  }

  /**
   * Calculates and returns the x and y coordinates of the mouse relative to the canvas.
   * @param {Object} e - A mouse event after the user's click interaction.
   * @param {Object} canvas - The canvas to draw the pixels in.
   * @return {Object} The coordinates of the mouse relative to the canvas.
   */
  function getMouseLocation(e, canvas) {
    let canvasRect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top

    }
  }

  /**
   * Changes the tool that the user will use on canvas. 
   * @param {Object} e - A mouse event after the user's click interaction.
   */
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

  /**
   * Checks if the user is using the eraser tool or the paint tool.
   * @param {Object} toolButton - A button for the user to switch their tool.
   * @return {boolean} True if the user is erasing; False if the user is painting.
   */
  function checkEraser(toolButton) {
    return toolButton.innerText !== 'Eraser';
  }

  /**
   * Returns the selected brush size from radio buttons and adds a new button
   * in the document to change the brush size. 
   * @return {int} The size of the selected brush.
   */
  function setBrush() {
    let radios = document.getElementsByName('brush-size');
    let sketchpad = document.querySelector('#sketchpad > div');
    let backButton = document.createElement('button');
    let brushSelections = document.getElementById('brush-section');
    let size;

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