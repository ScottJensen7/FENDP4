/* App.js has Enemy and Player and handles objects for position, speed, collision,
 * input, and updates. 
 * Name: Scott Jensen
 * Updated: 3/19/16 
 */
// Enemies our player must avoid

var Character = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
}

var Enemy = function(x, y, sprite, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = speed;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Enemy.prototype = Object.create(Character.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

/*
 * I started the enemy out of view to the left and they go to the right out of
 * view, then they start all over again on the left side.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
    if (this.checkEnemyCollision(this)) {
        reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player that user moves around.
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(name, sprite, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.name = name;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.pocket = null;
};

// Update the player's position
Player.prototype.update = function(dt) {};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // The player picks up all the gems and places them on the grass,
    // then they jump in the lake and the game is over.
    // When the game is finished, the gold star shows up on it.
    if (this.checkPlayerCollisionWithWater() && allGemsOnGrass()) {
        ctx.drawImage(Resources.get("images/goldstar.png"), 50, 60);
        isGameWon = true;
    }
};

// User pushes the arrow keys and this function handles those keys for the
// player.
Player.prototype.handleInput = function(key) {
    // User pushes up and won't go off the screen. //
    if (key == 'up' && this.y >= 20) {
        // move player up
        this.y = this.y - 82;
    }
    // User pushes down and won't go off the screen. //
    else if (key == 'down' && this.y <= 400) {
        // move player down
        this.y = this.y + 82;
    }
    // User moves to the left square in the screen and will not go outside of
    // it. //
    else if (key == 'left' && this.x >= 97) {
        // move player left
        this.x = this.x - 97;
    }
    // User moves to the right square in the screen and will not go outside of
    // it. //
    else if (key == 'right' && this.x <= 303) {
        // move player right
        this.x = this.x + 97;
    }
    if (isGameWon) {
        reset();
    }
};

// Check the given enemy position to see if it is close to the player.
// If it is close enough to the player, then return true.
Enemy.prototype.checkEnemyCollision = function() {
    var collided = false;
    if (this.x >= player.x - 40 && this.x <= player.x + 40 && this.y >= player.y - 40 && this.y <= player.y + 40) {
        collided = true;
    }
    return collided;
};

// Check the player position to see if it crossed the lake.
Player.prototype.checkPlayerCollisionWithWater = function() {
    var collided = false;
    if (this.y < 10) {
        collided = true;
    }
    return collided;
};

// I found the random math formula function to change the speeds from 200 to
// 300,
// then I changed the constructor so the each enemy would be random.
var randomSpeed = function() {
    return Math.floor((Math.random() * 300) + 200);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = null;
player = null;

// This resets the position of the enemies and a player.
var sprite = "images/enemy-bug.png";
function reset() {
    allEnemies = [new Enemy(0, 67, sprite, randomSpeed()),
        new Enemy(0, 150, sprite, randomSpeed()),
        new Enemy(0, 73 + 160, sprite, randomSpeed())
    ];
    player = new Player("Scott", 'images/char-boy.png', 200, 410);
    extraCreditReset();
    isGameWon = false;
}

reset();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});