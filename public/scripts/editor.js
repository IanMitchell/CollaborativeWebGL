function shapeId() {
  return parseFloat($("#shape_id option:selected").val());
}


function updateEditor(id) {
  if ($("#option-" + id).length == 0) {
    $("#shape_id").append("<option value='" + id + "' id='option-" + id +"'>" + shapes[id].name + " " + id + "</option>");
  }

  if (id == $("#shape_id option:selected").val()) {
    updateEditorFields();
  }
}

function updateEditorFields() {
  $("#color")[0].value = shapes[shapeId()].hexColor;

  $("#translate_x")[0].value = shapes[shapeId()].translation[0];
  $("#translate_y")[0].value = shapes[shapeId()].translation[1];
  $("#translate_z")[0].value = shapes[shapeId()].translation[2];

  $("#scale_x")[0].value = shapes[shapeId()].scale[0];
  $("#scale_y")[0].value = shapes[shapeId()].scale[1];
  $("#scale_z")[0].value = shapes[shapeId()].scale[2];

  $("#rotation_x")[0].value = shapes[shapeId()].rotationAxis[0];
  $("#rotation_y")[0].value = shapes[shapeId()].rotationAxis[1];
  $("#rotation_z")[0].value = shapes[shapeId()].rotationAxis[2];

  $("#rotation_deg")[0].value = shapes[shapeId()].rotation;
}



function updateTranslation() {
  var x = parseFloat($("#translate_x")[0].value);
  var y = parseFloat($("#translate_y")[0].value);
  var z = parseFloat($("#translate_z")[0].value);

  shapes[shapeId()].changeTranslation([x, y, z]);
  socket.emit('shapeUpdated', { id: shapeId(), shape: shapes[shapeId()] });
}

function updateScale() {
  var x = parseFloat($("#scale_x")[0].value);
  var y = parseFloat($("#scale_y")[0].value);
  var z = parseFloat($("#scale_z")[0].value);

  shapes[shapeId()].changeScale([x, y, z]);
  socket.emit('shapeUpdated', { id: shapeId(), shape: shapes[shapeId()] });
}

function updateRotationAxis() {
  var x = parseFloat($("#rotation_x")[0].value);
  var y = parseFloat($("#rotation_y")[0].value);
  var z = parseFloat($("#rotation_z")[0].value);

  shapes[shapeId()].changeRotationAxis([x, y, z]);
  socket.emit('shapeUpdated', { id: shapeId(), shape: shapes[shapeId()] });
}






// Handle Connection
socket.on('createShapes', function (data) {
  console.log("Creating shapes...");
  for (var i = 0; i < data.shapes.length; i++) {
    shapes[i] = new Shape();
    shapes[i].createShape(data.shapes[i]);
    updateEditor(shapes.length - 1);
  }
});


// Handle Updates
socket.on('updateShape', function (data) {
  console.log(data);
  shapes[data.id] = new Shape();
  shapes[data.id].createShape(data.shape);

  updateEditor(data.id);
});






// Handle Shape Changes
$(document).ready(function () {

  //
  // Change Selection
  //

  $("#shape_id").change(function() {
    updateEditorFields();
  });


  //
  // Add Shapes
  //

  $("#add_cube").click(function() {
    shapes[shapes.length] = new Shape();
    shapes[shapes.length - 1].createCube();

    socket.emit('shapeUpdated', { id: shapes.length - 1, shape: shapes[shapes.length - 1] });

    $("#shape_id").append("<option value='" + (shapes.length - 1) + "' id='option-" + (shapes.length - 1) +"' selected>" + shapes[shapes.length - 1].name + " " + (shapes.length - 1) + "</option>");
    updateEditorFields();

    return false;
  });

  $("#add_pyramid").click(function() {
    shapes[shapes.length] = new Shape();
    shapes[shapes.length - 1].createPyramid();

    socket.emit('shapeUpdated', { id: shapes.length - 1, shape: shapes[shapes.length - 1] });

    $("#shape_id").append("<option value='" + (shapes.length - 1) + "' id='option-" + (shapes.length - 1) +"' selected>" + shapes[shapes.length - 1].name + " " + (shapes.length - 1) + "</option>");
    updateEditorFields();

    return false;
  });

  $("#remove_shape").click(function() {
    shapes[shapeId()].setVisible(!shapes[shapeId()].visible);
    socket.emit('shapeUpdated', { id: shapeId(), shape: shapes[shapeId()] });
    return false;
  });


  //
  // Color
  //

  $("#color").change(function() {
    shapes[shapeId()].changeColor($("#color")[0].value);
    socket.emit('shapeUpdated', { id: shapeId(), shape: shapes[shapeId()] });
  });



  //
  // Translation
  //

  $("#translate_x").change(function() {
    updateTranslation();
  });

  $("#translate_y").change(function() {
    updateTranslation();
  });

  $("#translate_z").change(function() {
    updateTranslation();
  });



  //
  // Scale
  //

  $("#scale_x").change(function() {
    updateScale();
  });

  $("#scale_y").change(function() {
    updateScale();
  });

  $("#scale_z").change(function() {
    updateScale();
  });



  //
  // Rotation
  //

  $("#rotation_deg").change(function() {
    var deg = parseFloat($("#rotation_deg")[0].value);

    shapes[shapeId()].changeRotation(deg);
    socket.emit('shapeUpdated', { id: shapeId(), shape: shapes[shapeId()] });
  });


  $("#rotation_x").change(function() {
    updateRotationAxis();
  });

  $("#rotation_y").change(function() {
    updateRotationAxis();
  });

  $("#rotation_z").change(function() {
    updateRotationAxis();
  });

});
