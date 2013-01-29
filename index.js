var extend = require("extend");

var matrix = module.exports = function (config) {
  return new Matrix(config);
};

var private = {
  width: 0,
  height: 0,
  matrix: []
};

var Matrix = function (config) {
  private.width = config.width;
  private.height = config.height;

  /**
   * TODO
   * 
   * *   de momento creo una matriz nueva, pero el resize debe
   *     actualizar la matriz existente
   */
  var m = [];
  for (var y = 0; y < private.height; y++) (function () {
    var row = [];
    for (var x = 0; x < private.width; x++) {
      row.push(extend(config.cell));
    }
    m.push(row);
  })();
  private.matrix = m;
};

Matrix.prototype.at = function (args) {
  return private.matrix[args.y][args.x];
};
