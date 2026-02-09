let mainContainer = document.querySelector(".mainContainer");

let pointsCounter = 0;
let counterContainer = document.getElementById("heartCounter");
let heartGenerator;

let responseYesButton = document.getElementById("responseYes");
let responseNoButton = document.getElementById("responseNo");

responseYesButton.addEventListener("click", (event) => {
  document.querySelector(".finalMessage.good").style.display = "flex";
  document.querySelector(".message").style.display = "none";
  responseYesButton.style.display = 'none'
  responseNoButton.style.display = 'none'
});

responseNoButton.addEventListener("click", (event) => {
  document.querySelector(".finalMessage.bad").style.display = "flex";
  document.querySelector(".message").style.display = "none";
  responseYesButton.style.display = 'none'
  responseNoButton.style.display = 'none'
});

function generateHeart() {
  const heart = document.createElement("img");
  let lives = 4;
  heart.classList.add("heart");
  heart.src = "./res/pixelheart.png"; // Path to your heart image
  heart.addEventListener("click", clickHeart);
  let vGeneratedRandom = generateRandomNumber();
  let specialNumbers = [21, 24, 25, 26];
  if (specialNumbers.includes(vGeneratedRandom)) {
    heart.setAttribute("hasAction", "true");
    heart.classList.add("specialHeart");
    heart.setAttribute("actualLives", lives);
  }
  return heart;
}

function renderValentinesMessage(interval = 250) {
  const letterElements = Array.from(document.querySelectorAll("[posId]"));

  letterElements.forEach((el) => {
    el.style.display = "none";
    el.style.opacity = "0";
    el.style.transition = "opacity 200ms ease";
  });

  letterElements.forEach((el, i) => {
    setTimeout(() => {
      el.style.display = "inline-block";
      const isSpace = !el.textContent || /^\s+$/.test(el.textContent);
      if (isSpace) {
        el.style.opacity = "0";
        el.textContent = "-";
      }
      requestAnimationFrame(() => {
        if (!isSpace) el.style.opacity = "1";
      });
    }, i * interval);
  });
}

function clickHeart(event) {
  let heartElem = event.target;
  if (heartElem.hasAttribute("hasAction")) {
    let actualLivesCount = Number(heartElem.getAttribute("actualLives"));
    actualLivesCount--;
    heartElem.style.height = `${25 + actualLivesCount * 5}px`;
    heartElem.style.width = `${25 + actualLivesCount * 5}px`;
    heartElem.setAttribute("actualLives", actualLivesCount);
    if (Number(heartElem.getAttribute("actualLives")) === 0) {
      //   console.log("Has sumado puntos");
      pointsCounter++;
      counterContainer.innerText = pointsCounter;
      this.remove();
      if (pointsCounter === 2) {
        // console.log("You just won");
        // clearInterval(heartGenerator);

        document.querySelector(".buttons").style.display = "flex";

        counterContainer.style.display = "none";
        renderValentinesMessage(100);
      }
    }
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (100 + 1));
}

function getRandomWidthPosition() {
  let randomWithPosition = Math.floor(Math.random() * (100 + 1));
  // console.log(randomWithPosition);
  return randomWithPosition;
}

function uuid8() {
  return Math.random().toString(36).slice(2, 10);
}

function generateDynamicHeartAnimations(amountOfAnimations) {
  let animationNames = [];
  let styleSheet = document.createElement("style");
  styleSheet.setAttribute("type", "text/css");
  for (let i = 0; i < amountOfAnimations; i++) {
    let uuid = uuid8();
    let keyframeString = `
        @keyframes spamHeart_${uuid} {
            0% {
                left: calc(${getRandomWidthPosition()}%);
                bottom: 0;
            }
            25% {
                left: calc(${getRandomWidthPosition()}%);
            }
            50% {
                left: calc(${getRandomWidthPosition()}%);
            }
            100% {
                opacity: 0.8;
                left: calc(${getRandomWidthPosition()}%);
                bottom: 100%;
            }
        }
        `;
    styleSheet.innerHTML += keyframeString;
    animationNames.push(`spamHeart_${uuid}`);
  }
  document.getElementById("headElement").appendChild(styleSheet);
  //   console.log(animationNames);
  return animationNames;
}

(() => {
  console.log("At first instance");

  let animationVariationAmount = 50;

  let animationVariations = generateDynamicHeartAnimations(
    animationVariationAmount,
  );

  heartGenerator = setInterval(() => {
    let getRandomVariation = Math.floor(
      Math.random() * (animationVariationAmount + 1),
    );

    const heart = generateHeart();

    heart.style.left = `${getRandomWidthPosition()}%`;
    heart.style.bottom = "-50px";

    heart.style.animation = `${animationVariations[getRandomVariation]} 10s ease-out`;

    mainContainer.appendChild(heart);

    setTimeout(() => {
      if (heart.hasAttribute("hasAction")) {
      }
      heart.remove();
    }, 10000);
  }, 100);
})();
