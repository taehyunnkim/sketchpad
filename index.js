/*
 * Name: Eric Kim
 * Date: April 19, 2020
 * Section: CSE 154 AK
 *
 * This is the JS to manipulate the UI of the homepage with user's interactions.
 * This JS also allows the user to change the brush size and draw pixels
 * on the square 'sketchpad' that is presented in the main homepage.
 */

'use strict';
(function() {
  const CANVAS_SIZE = 400;
  window.addEventListener('load', init);

  /**
   * Sets up the sketchpad/canvas with the default 'medium' brush size.
   */
  function init() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let toolButton = document.getElementById('tool-button');
    let brushButton = document.getElementById('brush-button');
    let selectedBrushAtStart = false;
    let pixelSize;
    canvas.context = context;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    brushButton.addEventListener('click', function() {
      let brushSize = getBrushSize();
      selectedBrushAtStart = true;
      pixelSize = CANVAS_SIZE / brushSize;
      moveToSketchMode();
    });

    canvas.addEventListener('click', function(evt) {
      if (selectedBrushAtStart) {
        let isEraser = checkEraser(toolButton);
        updateCanvas(evt, this, isEraser, pixelSize);
      }
    });

    toolButton.addEventListener('click', changeTool);
  }

  /**
   * Draws or erases a square box/pixel of specified size on
   * the canvas based on the user's mouse click location.
   * @param {Object} evt - The mouse event after the user's click interaction.
   * @param {Object} canvas - The canvas to draw the pixels in.
   * @param {boolean} isEraser - Rather or not the eraser tool is being used.
   * @param {int} pixelSize - The size of the individual pixels.
   */
  function updateCanvas(evt, canvas, isEraser, pixelSize) {
    let pos = getMouseLocation(evt, canvas);
    let nthCol = Math.floor(pos.xCord / pixelSize);
    let nthRow = Math.floor(pos.yCord / pixelSize);
    if (isEraser) {
      canvas.context.clearRect(nthCol * pixelSize, nthRow * pixelSize, pixelSize, pixelSize);
    } else {
      canvas.context.fillRect(nthCol * pixelSize, nthRow * pixelSize, pixelSize, pixelSize);
    }
  }

  /**
   * Calculates and returns the x and y coordinates of the mouse relative to the canvas.
   * @param {Object} evt - The mouse event after the user's click interaction.
   * @param {Object} canvas - The canvas to draw the pixels in.
   * @return {Object} The coordinates of the mouse relative to the canvas.
   */
  function getMouseLocation(evt, canvas) {
    let canvasRect = canvas.getBoundingClientRect();
    return {
      xCord: evt.clientX - canvasRect.left,
      yCord: evt.clientY - canvasRect.top
    };
  }

  /**
   * Changes the tool that the user will use on canvas.
   * @param {Object} evt - The mouse event after the user's click interaction.
   */
  function changeTool(evt) {
    let userAction = document.querySelector('h2');
    let isEraser = checkEraser(evt.target);
    if (isEraser) {
      userAction.innerText = 'Painting';
      evt.target.innerText = 'Eraser';
    } else {
      userAction.innerText = 'Erasing';
      evt.target.innerText = 'Paint';
    }
  }

  /**
   * Checks if the user is using the eraser tool or the paint tool.
   * @param {Object} toolButton - The button for the user to switch their tool.
   * @return {boolean} True if the user is erasing; False if the user is painting.
   */
  function checkEraser(toolButton) {
    return toolButton.innerText !== 'Eraser';
  }

  /**
   * Returns the selected brush size from radio buttons.
   * @return {int} The size of the selected brush from radio buttons.
   */
  function getBrushSize() {
    let radios = document.getElementsByName('brush-size');
    let size;

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        size = radios[i].value;
      }
    }

    return size;
  }

  /**
   * Hides the brush selections section from the document.
   * Reveals user action and tools in the document.
   * Adds a button to the document that, when clicked,
   * hides user action and tools, and reveals
   * the brush selections section again.
   */
  function moveToSketchMode() {
    let sketchpad = document.querySelector('#sketchpad > div');
    let action = document.querySelector('#sketchpad > h2');
    let backButton = document.createElement('button');
    let brushSelections = document.getElementById('brush-section');
    let toolButton = document.getElementById('tool-button');

    backButton.innerHTML = 'Change Brush';
    backButton.classList.add('btn');
    backButton.addEventListener('click', function() {
      brushSelections.classList.remove('hidden');
      this.parentNode.removeChild(this);
      action.classList.add('hidden');
      toolButton.classList.add('hidden');
    });
    sketchpad.appendChild(backButton);
    brushSelections.classList.add('hidden');
    action.classList.remove('hidden');
    toolButton.classList.remove('hidden');
  }
})();