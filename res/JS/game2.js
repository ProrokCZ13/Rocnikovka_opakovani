const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight


let gravity = 0.5;
let onLand = 1;
let key = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

const jumpSound = new Audio();
jumpSound.src = "../media/Sound/audioJump.mp3"
jumpSound.volume = 0.3

const music = new Audio();
music.src = "../media/sound/Irish Celtic Music.mp3"
music.volume = 0.1

const eDeath = new Audio();
eDeath.src = "../media/sound/goombaSquash.mp3"
eDeath.volume = 0.3

music.play()


//hráč obraz
const playerImg = new Image();
playerImg.src = "../media/img/BreadR.png"

//nepřítel obraz
const enemyImg = new Image();
enemyImg.src = "../media/img/JamR.png"

//hráč obraz
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 500
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 50
        this.height = 50
    }

    draw() {
        ctx.drawImage(playerImg,
            this.position.x,
            this.position.y,
            this.height,
            this.width)
    }

    update() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.draw()

        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity

    }
}
//nepřátele
class Enemy {
    constructor({x,y}) {
        this.position = {
            x,
            y
        }
        this.velocity ={
            x: 1,
            y: 0
        }
        this.width = 50
        this.height = 50


    }

    draw() {
        ctx.fillStyle= 'red'
        ctx.fillRect(this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height +
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}



//platfroma
class Platform {
    constructor({x, y, h, w, block}) {
        this.position = {
            x,
            y
        }
        this.velocity = {
            x: 0
        }
        this.width = w
        this.height = h
        this.block = block
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
    update (){
        this.draw()
        this.position.x += this.velocity.x
    }
}



const player = new Player()
const enemies = [
    new Enemy({x:7500 ,y: 400}),
    new Enemy({x:500 ,y: 400}),
    new Enemy({x:7500 ,y: 400}),
    new Enemy({x:7500 ,y: 400}),
    new Enemy({x:9500 ,y: 400}),
]
//generace platforem
const platforms = [new Platform({x: 0, y: 700, h: 500, w: 400}),
    new Platform({x: 500, y: 700, h: 500, w: 400}),
    new Platform({x: 850, y: 650, h: 100, w: 450}),
    new Platform({x: 880, y: 600, h: 100, w: 300}),
    new Platform({x: 950, y: 550, h: 100, w: 300}),
    new Platform({x: 1000, y: 500, h: 100, w: 250}),
    new Platform({x: 1050, y: 450, h: 1000, w: 250}),
    new Platform({x: 900, y: 700, h: 500, w: 400}),
    new Platform({x: 1350, y: 350, h: 20, w: 90}),
    new Platform({x: 1550, y: 400, h: 20, w: 90}),
    new Platform({x: 1725, y: 500, h: 20, w: 90}),
    new Platform({x: 1950, y: 600, h: 20, w: 90}),
    new Platform({x: 2000, y: 700, h: 500, w: 400}),
    new Platform({x: 2500, y: 620, h: 20, w: 100}),
    new Platform({x: 2700, y: 510, h: 20, w: 100}),
    new Platform({x: 2900, y: 430, h: 20, w: 100}),
    new Platform({x: 3150, y: 410, h: 20, w: 270}),
    new Platform({x: 3500, y: 700, h: 500, w: 400}),
    new Platform({x: 4000, y: 700, h: 20, w: 50}),
    new Platform({x: 4055, y: 700, h: 20, w: 50}),
    new Platform({x: 4110, y: 700, h: 20, w: 50}),
    new Platform({x: 4165, y: 700, h: 20, w: 50}),
    new Platform({x: 4220, y: 700, h: 20, w: 50}),
    new Platform({x: 4275, y: 700, h: 20, w: 50}),
    new Platform({x: 4530, y: 700, h: 20, w: 50}),
    new Platform({x: 4585, y: 700, h: 20, w: 50}),
    new Platform({x: 4640, y: 700, h: 20, w: 50}),
    new Platform({x: 4695, y: 700, h: 20, w: 50}),
    new Platform({x: 4750, y: 700, h: 20, w: 50}),
    new Platform({x: 4805, y: 700, h: 20, w: 50}),
    new Platform({x: 5000, y: 700, h: 500, w: 700}),
    new Platform({x: 5500, y: 650, h: 500, w: 150}),
    new Platform({x: 5600, y: 600, h: 500, w: 150}),
    new Platform({x: 5700, y: 550, h: 500, w: 150}),
    new Platform({x: 6000, y: 700, h: 500, w: 700}),
    new Platform({x: 6000, y: 650, h: 500, w: 250}),
    new Platform({x: 6000, y: 600, h: 500, w: 200}),
    new Platform({x: 6000, y: 550, h: 500, w: 150}),
    new Platform({x: 7000, y: 700, h: 500, w: 400}),
    new Platform({x: 7300, y: 450, h: 800, w: 100}),
    new Platform({x: 7500, y: 450, h: 20, w: 50}),
    new Platform({x: 7555, y: 450, h: 20, w: 50}),
    new Platform({x: 7610, y: 450, h: 20, w: 50}),
    new Platform({x: 7665, y: 450, h: 20, w: 50}),
    new Platform({x: 7720, y: 450, h: 20, w: 50}),
    new Platform({x: 7775, y: 450, h: 20, w: 50}),
    new Platform({x: 7830, y: 450, h: 20, w: 50}),
    new Platform({x: 7885, y: 450, h: 20, w: 50}),
    new Platform({x: 8000, y: 700, h: 500, w: 400}),
    new Platform({x: 8000, y: 450, h: 800, w: 100}),
    new Platform({x: 8500, y: 550, h: 20, w: 50}),
    new Platform({x: 8600, y: 600, h: 20, w: 50}),
    new Platform({x: 8700, y: 350, h: 20, w: 50}),
    new Platform({x: 9000, y: 600, h: 500, w: 400}),
    new Platform({x: 9500, y: 700, h: 20, w: 400}),
    new Platform({x: 10000, y: 600, h: 500, w: 400}),
]




let scrollOfset = 0

function AbovePlatform({object, platform}){
    return(
        object.position.y + object.height  <= platform.position.y
        && object.position.y + object.height + object.velocity.y >= platform.position.y
        && object.position.x + object.width >= platform.position.x
        && object.position.x <= platform.position.x + platform.width)
}

function BottomPlatform({object, platform}){
    return(
        object.position.y <= platform.position.y + platform.height &&
        object.position.y - object.velocity.y >=
        platform.position.y + platform.height &&
        object.position.x + object.width >= platform.position.x &&
        object.position.x <= platform.position.x + platform.width
    )
}

function SidePlatform({object, platform}){
    return(object.position.x + object.width + object.velocity.x - platform.velocity.x >= platform.position.x
        && object.position.x + object.velocity.x <= platform.position.x + platform.width
        && object.position.y <= platform.position.y + platform.height
        && object.position.y + object.height >= platform.position.y

    )
}


function CollisionTop({object1, object2}){
    return(
        object1.position.y + object1.height  <= object2.position.y
        && object1.position.y + object1.height + object1.velocity.y >= object2.position.y
        && object1.position.x + object1.width >= object2.position.x
        && object1.position.x <= object2.position.x + object2.width)
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemies.forEach((enemy, index) => {
        enemy.update()

        if (CollisionTop({
            object1: player,
            object2: enemy
        })){
            player.velocity.y -= 30
            enemies.splice(index, 1)
            eDeath.play()


        }else if (
            player.position.x + player.width >= enemy.position.x
            && player.position.y +player.height >= enemy.position.y
            && player.position.x + player.width <= enemy.position.x + enemy.width
        ){location.reload()}
    })


    platforms.forEach((platform) => {
        platform.update()
        platform.velocity.x = 0
    })





    //pohyb && sidescroll
    if (key.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (key.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else player.velocity.x = 0

    //kolize s platformou osa y
    platforms.forEach(platform => {
        if (AbovePlatform({
            object:player,
            platform
        })
        ) {
            player.velocity.y = 0
            onLand = 1;
        }

        enemies.forEach((enemy) => {
            if (AbovePlatform({
                object:enemy,
                platform
            })
            ) {
                enemy.velocity.y = 0
                onLand = 1;
            }
        })

        if (
            platform.block &&
            BottomPlatform({
                object: player,
                platform
            })
        ) {
            player.velocity.y = -player.velocity.y
        }


        if (
            platform.block &&
            SidePlatform({
                object: player,
                platform
            })
        ) {
            player.velocity.x = 0
        }



        //smrt
        if (player.position.y > canvas.height){
            location.reload()
        }
        //konec
        if (scrollOfset === 10000){
            console.log("congratulation")
        }

        //sidescroll
        if (key.right.pressed) {
            scrollOfset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            enemies.forEach(enemy => {
                enemy.position.x -= 5
            })
        } else if (key.left.pressed) {
            scrollOfset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            enemies.forEach(enemy => {
                enemy.position.x += 5
            })

        }

    })}
animate()
//pohyb
window.addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        //W
        case 87:
            if (onLand === 1){
                player.velocity.y -= 20
                onLand = 0;
                jumpSound.play()
            }
            break

        //A
        case 65 || 37:
            key.left.pressed = true

            break
        //S
        case 83 || 40:

            break
        //D
        case 68 || 39:
            key.right.pressed = true
            break

    }


})

window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        //W
        case 87:
            player.velocity.y += 7

            break

        //A
        case 65 || 37:
            key.left.pressed = false
            break

        //D
        case 68 || 39:

            key.right.pressed = false
            break

    }
})
