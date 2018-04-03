(function(rootObj) {
  var SnakeGame = rootObj.SnakeGame = rootObj.SnakeGame || {};
  
  var Snake = SnakeGame.Snake;
  
  var Board = SnakeGame.Board = function(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.grid = this.newGrid();
    this.snake = this.starterSnake();
    
  };
  
  
  Board.prototype.checkGameOver = function() {
    var headRow = this.snake.segments[0].row;
    var headCol = this.snake.segments[0].col; 
    var dir = this.snake.dir;
    if ((headRow == 0 && dir === 'U') || 
       (headRow == this.numRows - 1 && dir === 'D')) {
      alert("Good game.  You hit a boundary and died.")
      this.newGame();
    } else if (headCol < 0 || headCol > this.numCols - 1) {
      alert("Not bad Snakin'.  But you hit a boundary and died.")
      this.newGame();
    }
  };
   
  Board.prototype.maybeAddApples = function() {
    var that = this;
    if (_.random(1, 15) === 15) {
      _(3).times(function(){ 
        var row = _.random(0, that.numRows - 1);
        var col = _.random(0, that.numCols - 1);
        $appleEl = $("#Row" + row + "-Col" + col);
        $appleEl.addClass("apple");
        that.grid[row][col] = 'apple';
      });
    }
  };
  
  Board.prototype.starterSnake = function() {
    var segs = [];
    var thisBoard = this;
    _.times(4, function(n){
      segs.push(new SnakeGame.Coord(6, 20 + n));
      thisBoard.grid[6][20 + n] = 'snake';
    });
    
    return new Snake("L", segs);
  };
    
  Board.prototype.newGame = function() {
    location.reload();  
  };
  
  Board.prototype.newGrid = function() {
    var gridArray = []
    for (var i = 0; i < this.numRows; i++) {
      gridArray.push([])
    }
    _.each(gridArray, function(el) {
      for (var i = 0; i < this.numCols; i++) {
        el.push(0);
      };
    });
    return gridArray;
  };
  
  Board.prototype.renderBrowser = function() {
    for (var row = 0; row < this.numRows; row++) {
      for (var col = 0; col < this.numCols; col++) {
        $gridEl = $("#Row" + row + "-Col" + col);
        if (this.grid[row][col] === 'snake') {
          $gridEl.addClass("snake-square");
          $gridEl.removeClass("apple");
        } else if (this.grid[row][col] === 'apple') {
          $gridEl.addClass("apple");
        } else {
          $gridEl.removeClass("snake-square");
        }
      }
    }
  };
  
  Board.prototype.moveSnake = function() {
    var segs = this.snake.segments;
    var thisBoard = this;

    this.snake.move(thisBoard);   
  };

})(this);