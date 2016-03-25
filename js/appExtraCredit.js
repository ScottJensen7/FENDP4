/* AppExtraCredit.js has collectible items, player selection, and a star.
 * Name: Scott Jensen
 * Date: 3/19/16
 */
// Collectible for our player to pick up
var Collectible = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our collectible ones, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/gem-orange2.png';
    this.x = x;
    this.y = y;
};

// Update the collectible's position, required method for game
// Also check the collisions with the player and put the gem on the grass
// When the player collides with the gem, the picture file is changed. Once I
// get a gem in the water, I cannot move left and right on the screen. If the
// player picks the gem, one gem at a time. Only one of the players picks up
// the gem, but the bugs don't pick it up.
Collectible.prototype.update = function(dt) {

    if (player.pocket === null && checkCollectibleCollision(this)) {
        this.sprite = "images/shrunken-gem-orange.png";
        player.pocket = this;
    }
    if (this == player.pocket) {
        this.x = player.x;
        this.y = player.y;
        if (this.checkPlayerOnGrass()) {
            this.sprite = "images/gem-orange2.png";
            player.pocket = null;
        }
    }
};

// Check and see if the player puts a gem on the grass
Collectible.prototype.checkPlayerOnGrass = function() {
    var collided = false;
    if (this.y > 300) {
        collided = true;
    }
    return collided;
};

// Check the given enemy position to see if it is close to the player.
// If it is close enough to the player, then return true.
var checkCollectibleCollision = function(collectible) {
    var collided = false;
    if (collectible.x >= player.x - 40 && collectible.x <= player.x + 40 && collectible.y >= player.y - 40 && collectible.y <= player.y + 40) {
        collided = true;
    }
    return collided;
};

// The function checks to see all the gems are on the grass.
function allGemsOnGrass() {
    var gemOnGrass = true;
    allCollectibles.forEach(function(collectible) {
        if (collectible.y < 300) {
            gemOnGrass = false;
        }
    });
    return gemOnGrass;
}

// Draw the Gem on the screen, required method for game
Collectible.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function extraCreditReset() {
    allCollectibles = [new Collectible(0, 5), new Collectible(200, 5),
        new Collectible(400, 5)
    ];
}

// Choosing the player from those three choices is exactly a basic idea
jQuery(document).ready(function($) {
    $("img").click(function() {
        player.sprite = $(this).attr("src");
    });
});