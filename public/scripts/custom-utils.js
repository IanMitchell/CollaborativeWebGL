function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


function convertHextoArray(hex) {
  R = hexToR(hex);
  G = hexToG(hex);
  B = hexToB(hex);

  return convertRGBtoArray(R, G, B);
}

function convertRGBtoArray(r, g, b) {
  var dr = Math.round(r / 255 * 1000) / 1000;
  var dg = Math.round(g / 255 * 1000) / 1000;
  var db = Math.round(b / 255 * 1000) / 1000;

  var colors = [
    [dr, dg, db, 1.0],     // Front face
    [dr, dg, db, 1.0],     // Back face
    [dr, dg, db, 1.0],     // Top face
    [dr, dg, db, 1.0],     // Bottom face
    [dr, dg, db, 1.0],     // Right face
    [dr, dg, db, 1.0],     // Left face
  ];

  var unpackedColors = []

  for (var i in colors) {
    var color = colors[i];
    for (var j = 0; j < 4; j++) {
      unpackedColors = unpackedColors.concat(color);
    }
  }

  return unpackedColors;
}
