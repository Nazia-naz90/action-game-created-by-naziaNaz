score = 0;
cross = true;

let audio = new Audio('./assets/images/dinasourse-audio.mp3');
let audiogo = new Audio('./assets/images/dragon-audio.mp3');
setTimeout(()=>{
   audio.play();
},1000)

let audioBg = new Audio('./assets/images/background-game-music.mp3');
setTimeout(()=>{
  audioBg.play();
},2000)



document.onkeydown = function (e) {
  console.log("Key code is:", e.keyCode);
  let dino = document.querySelector(".dino");

/*Key Events: The dino character jumps with the up arrow key (38) 
and moves left (37) or right (39) based on the corresponding arrow keys. */

  if (e.keyCode == 38) {
    dino.classList.add("animateDino");
    setTimeout(() => {
      dino.classList.remove("animateDino");
    }, 700);
  }
  if (e.keyCode == 39) {
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 112 + "px";
  }
  if (e.keyCode == 37) {
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 112 + "px";
  }
};
/*  The setInterval function continuously checks the dino and 
    obstacle positions to detect collisions */

setInterval(() => {
  let dino = document.querySelector(".dino");
  let gameOver = document.querySelector(".gameOver");
  let obstacle = document.querySelector(".obstacle");

  let dx = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );
  let dy = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );

  let ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  let oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  let offsetX = Math.abs(dx - ox);
  let offsetY = Math.abs(dy - oy);
  //console.log(offsetX , offsetY);

 /* If the dino successfully avoids the obstacle, the score increments and 
  the speed of the obstacle increases */

  if (offsetX < 73 && offsetY < 52) {
    // gameOver.style.visibility = "visible";
    gameOver.innerHTML = "Game Over-Reload again";
    gameOver.style.color = "red";
    gameOver.style.backgroundColor = "transparent";
    obstacle.classList.remove("obstacleAni");
    audio.play();
    setTimeout(()=>{
     audiogo.pause();
     audio.pause();
    
    },1000)
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
      console.log("New animation duration", newDur)
    }, 500);
  }
}, 10);

function updateScore(score) {
  let scoreCont = document.querySelector("#scoreCont");
  scoreCont.innerHTML = "Your score: " + score;
}
