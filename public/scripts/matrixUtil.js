var mvMatrix;
var mvMatrixStack = [];
var pMatrix;


function mvPushMatrix(m) {
  if (m) {
    mvMatrixStack.push(m.dup());
    mvMatrix = m.dup();
  } else {
    mvMatrixStack.push(mvMatrix.dup());
  }
}

function mvPopMatrix() {
  if (mvMatrixStack.length == 0) {
    throw "Invalid popMatrix!";
  }
  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function loadIdentity() {
  mvMatrix = Matrix.I(4);
}


function multMatrix(m) {
  mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  var m = Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}

function mvRotate(ang, v) {
  var arad = ang * Math.PI / 180.0;
  var m = Matrix.Rotation(arad, $V([v[0], v[1], v[2]])).ensure4x4();
  multMatrix(m);
}

function mvScale(v) {
  multMatrix($M(
    [
    [v[0], 0, 0, 0],
    [0, v[1], 0, 0],
    [0, 0, v[2], 0],
    [0, 0, 0, 1]
    ]
  ));
}

function perspective(fovy, aspect, znear, zfar) {
  pMatrix = makePerspective(fovy, aspect, znear, zfar);
}

function setMatrixUniforms() {
  gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, new Float32Array(pMatrix.flatten()));
  gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, new Float32Array(mvMatrix.flatten()));

  var normalMatrix = mvMatrix.inverse();
  normalMatrix = normalMatrix.transpose();

  var nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
  gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
}
