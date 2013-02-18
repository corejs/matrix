var type = require('type'),

var matrix = module.exports = function (config) {
  return new Matrix(config);
};

var Matrix = function (config) {
  var matrix = this;

  type(config).handle({
    'arr': function () {
      matrix.matrix = cloneMatrix(config);
      matrix.width = config[0].length;
      matrix.height = config.length;
    },
    'default': function () {
      matrix.matrix = [];
      matrix.width = config.width;
      matrix.height = config.height;

      for (var y = 0; y < config.height; y++) (function () {
        var row = [];
        for (var x = 0; x < config.width; x++) {
          row.push(null);
        }
        matrix.matrix.push(row);
      })();
    }
  });
};

Matrix.prototype.raw = function () {
  return cloneMatrix(this.matrix);
};

Matrix.prototype.at = function (x, y, val) {
  if (outOfBounds(this.width, this.height, x, y)) {
    return;
  }
  if (val) {
    this.matrix[y][x] = val;
  }
  return this.matrix[y][x];
};

Matrix.prototype.cut = function (area) {
  var m = [];
  for (var y = area.begin.y; y < area.end.y; y++) {
    m.push(this.matrix.slice(area.begin.x, area.end.x));
  }
  return matrix(m);
}

Matrix.prototype.each = function (handler) {
  this.matrix.forEach(function (row, y) {
    row.forEach(function (cell, x) {
      handler(x, y, cell);
    });
  });
};

var cloneMatrix = function (m) {
  return JSON.parse(JSON.stringify(m));
};

var outOfBounds = function (width, height, x, y) {
  return !(x >= 0 &&
           y >= 0 && 
           x < width && 
           y < height);
};
