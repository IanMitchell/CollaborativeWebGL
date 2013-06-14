function Shape() {
  this.name;
  this.hexColor;

  this.vertexPositionBuffer = null;
  this.vertexColorBuffer = null;
  this.vertexIndexBuffer = null;
  this.vertexNormalBuffer = null;

  this.scale = [1.0, 1.0, 1.0];
  this.rotation = 0;
  this.rotationAxis = [0.0, 0.0, 1.0];

  this.translation = [0, 0, 0];

  this.hasIndexBuffer = false;
  this.visible = true;

  this.createShape = function(obj) {
    if (obj.name == "Cube") {
      this.createCube();
    }
    if (obj.name == "Pyramid") {
      this.createPyramid();
    }

    this.visible = obj.visible;
    this.hexColor = obj.hexColor;
    this.changeColor(this.hexColor);
    this.scale = obj.scale;
    this.rotation = obj.rotation;
    this.rotationAxis = obj.rotationAxis;
    this.translation = obj.translation;
  };

  this.setVisible = function(v) {
    this.visible = v;
  }

  this.changeScale = function(s) {
    this.scale = s;
  }

  this.changeRotation = function(r) {
    this.rotation = r;
  }

  this.changeRotationAxis = function(a) {
    this.rotationAxis = a;
  }

  this.changeTranslation = function(t) {
    this.translation = t;
  }

  this.changeColor = function(c) {
    if (this.name == "Cube") {
      this.setCubeColor(c);
    }
    if (this.name == "Pyramid") {
      this.setPyramidColor(c);
    }
  }


  this.draw = function() {
    if (this.visible) {
      mvPushMatrix();

        mvTranslate(this.translation);
        mvRotate(this.rotation, this.rotationAxis);
        mvScale(this.scale);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);


        if (this.hasIndexBuffer) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
          setMatrixUniforms();
          gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        else {
          setMatrixUniforms();
          gl.drawArrays(gl.TRIANGLES, 0, this.vertexPositionBuffer.numItems);
        }



      mvPopMatrix();
    }
  }




  //
  // Create Shapes
  //


  this.createCube = function() {
    this.name = "Cube";

    this.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    vertices = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.vertexPositionBuffer.itemSize = 3;
    this.vertexPositionBuffer.numItems = 24;


    this.setCubeColor();


    this.vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
    var cubeVertexIndices = [
      0, 1, 2,      0, 2, 3,    // Front face
      4, 5, 6,      4, 6, 7,    // Back face
      8, 9, 10,     8, 10, 11,  // Top face
      12, 13, 14,   12, 14, 15, // Bottom face
      16, 17, 18,   16, 18, 19, // Right face
      20, 21, 22,   20, 22, 23  // Left face
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    this.vertexIndexBuffer.itemSize = 1;
    this.vertexIndexBuffer.numItems = 36;


    this.hasIndexBuffer = true;


    this.vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);

    var vertexNormals = [
      // Front
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Back
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,

      // Top
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,

      // Bottom
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,

      // Right
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,

      // Left
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  }

  this.createPyramid = function() {
    this.name = "Pyramid";

    this.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var vertices = [
        // Front face
        -1, -1,  1,
         1, -1,  1,
         0,  1,  0,
        // Right face
         0,  1,  0,
         1, -1,  1,
         0, -1, -1,
        // Left face
        -1, -1,  1,
         0,  1,  0,
         0, -1, -1,
        // Bottom face
        -1, -1,  1,
         1, -1,  1,
         0, -1, -1
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.vertexPositionBuffer.itemSize = 3;
    this.vertexPositionBuffer.numItems = 12;


    this.setPyramidColor();


    this.vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);

    var vertexNormals = [
      // Front
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,

      // Right
       1.0,  0.0, -1.0,
       1.0,  0.0, -1.0,
       1.0,  0.0, -1.0,

      // Left
       1.0,  0.0,  -1.0,
       1.0,  0.0,  -1.0,
       1.0,  0.0,  -1.0,

      // Bottom
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
  }

  //
  // Colors
  //

  this.setPyramidColor = function(color) {
    if (color == null ) {
      color = "#000000";
    }

    this.hexColor = color;
    var colors = convertHextoArray(color);

    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    this.vertexColorBuffer.itemSize = 4;
    this.vertexColorBuffer.numItems = 12;
  }

  this.setCubeColor = function(color) {
    if (color == null ) {
      color = "#000000";
    }

    this.hexColor = color;
    var colors = convertHextoArray(color);

    this.vertexColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    this.vertexColorBuffer.itemSize = 4;
    this.vertexColorBuffer.numItems = 24;
  }
}
