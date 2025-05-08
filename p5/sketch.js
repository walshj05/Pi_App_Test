
let backgroundColor

function setup() {
  createCanvas(2000, 1200, WEBGL);
  backgroundColor = color(250, 180, 200)
  angleMode(DEGREES);
  strokeWeight(3);
  stroke(backgroundColor);
  fill(0, 0, 0)
  describe(
    'Users can click on the screen and drag to adjust their perspective in 3D space. The space contains a sphere of dark purple cubes on a light pink background.'
  );
  frameRate(30)
}

function draw() {
  background(backgroundColor);


  // Call every frame to adjust camera based on mouse/touch
  orbitControl();

  drawShapesWithYAngle(0)
  drawShapesWithYAngle(180)
  drawShapesWithYAngle(90)
  drawShapesWithYAngle(270)
  let x = 400 * cos(frameCount * 0.6);

  // Orbit the camera around the box.
  camera(x, 200, 500);
}

function drawShapesWithYAngle(yAngle) {
  // Rotate rings in a half circle to create a sphere of cubes
  for (let zAngle = 0; zAngle < 180; zAngle += 30) {
    // Rotate cubes in a full circle to create a ring of cubes
    for (let xAngle = 0; xAngle < 360; xAngle += 30) {
      push();

      // Rotate from center of sphere
      rotateZ(zAngle);
      rotateX(xAngle);
      rotateY(yAngle)

      // Then translate down 400 units
      translate(0, 400, 0);

      sphere()
      pop();
    }
  }
}