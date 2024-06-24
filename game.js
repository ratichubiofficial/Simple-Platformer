//By Ratichubi <3

document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Game constants
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const PLAYER_SIZE = 50;
    const PLAYER_SPEED = 5;
    const JUMP_FORCE = 12;
    const GRAVITY = 0.8;

    let player = {
        x: 50,
        y: HEIGHT - 50 - PLAYER_SIZE,
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        dx: 0,
        dy: 0,
        jumping: false
    };

    let platforms = [
        { x: 0, y: HEIGHT - 30, width: WIDTH, height: 30 }
        // Add more platforms as needed
    ];

    function drawPlayer() {
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawPlatforms() {
        ctx.fillStyle = "green";
        platforms.forEach(platform => {
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        });
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function update() {
        clearCanvas();

        // Apply gravity to the player
        if (!player.jumping && player.y < HEIGHT - PLAYER_SIZE) {
            player.dy += GRAVITY;
        }

        // Update player position
        player.x += player.dx;
        player.y += player.dy;

        // Collision detection with platforms
        platforms.forEach(platform => {
            if (
                player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y < platform.y + platform.height &&
                player.y + player.height > platform.y
            ) {
                // Player is colliding with a platform
                player.dy = 0;
                player.jumping = false;
                player.y = platform.y - player.height;
            }
        });

        // Draw everything
        drawPlatforms();
        drawPlayer();

        requestAnimationFrame(update);
    }

    // Event listeners for player movement
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            player.dx = -PLAYER_SPEED;
        } else if (event.key === "ArrowRight") {
            player.dx = PLAYER_SPEED;
        } else if (event.key === " ") { // spacebar for jump
            if (!player.jumping && player.y >= HEIGHT - PLAYER_SIZE) {
                player.dy = -JUMP_FORCE;
                player.jumping = true;
            }
        }
    });

    document.addEventListener("keyup", function(event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            player.dx = 0;
        }
    });

    // Start the game loop
    update();
});
