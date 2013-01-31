var extend = require("extend"),
    job = require("job"),
    done = job.done;

var matrix = module.exports = function (config) {
  return new Matrix(config);
};

var private = {};

var Matrix = function (config) {
  private.self = this;
  private.width = config.width;
  private.height = config.height;

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

Matrix.prototype.raw = function () {
  return JSON.parse(JSON.stringify(private.matrix));
};

Matrix.prototype.at = function (args) {
  return private.matrix[args.y][args.x];
};

Matrix.prototype.cut = function (area) {
  var m = [];
  for (var y = area.begin.y; y < area.end.y; y++) {
    m.push(private.matrix.slice(area.begin.x, area.end.x));
  }
  return matrix(m);
}

Matrix.prototype.forEach = function (handler) {
  private.matrix.forEach(function (row, y) {
    row.forEach(function (cell, x) {
      handler(cell, { x: x, y: y });
    });
  });
};

Matrix.prototype.some = function (handler) {
  return job(function () {
    private.self.forEach(function () {
      if (handler.apply(null, arguments) === true) {
        done(true);
      }
    });
    return false;
  });
};
