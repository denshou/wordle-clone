let attempts = 0;
let index = 0;
let timer;

const ans = "TRAIN";

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "실패했습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; margin-bottom:500px; background-color:white; border:1px solid black; width:300px; height: 100px; font-size:20px; position: absolute;top: 12%;left: 50%;transform:translate(-50%,-50%);";
    document.body.appendChild(div);
  };

  const displayYouWin = () => {
    const thisRow = document.querySelector(`.board-row-${attempts}`);
    const div = document.createElement("div");
    div.innerText = "정답입니다!";
    div.style =
      "display:flex; justify-content:center; align-items:center; margin-bottom:500px; background-color:white; border:1px solid black; width:300px; height: 100px; font-size:20px; position: absolute;top: 12%;left: 50%;transform:translate(-50%,-50%);";
    document.body.appendChild(div);

    thisRow.animate(
      [
        { transform: "translateY(0%)" },
        { transform: "translateY(-50%)" },
        { transform: "translateY(0%)" },
      ],
      {
        duration: 500,
        delay: 250,
      }
    );
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const youWin = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayYouWin();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts++;
    index = 0;
  };

  const handleEnterkey = async () => {
    let correctCount = 0;
    // const 응답 = await fetch("/answer");
    // const 정답_객체 = await 응답.json();
    // const ans = 정답_객체.answer;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const userAns = block.innerText;
      const correctAns = ans[i];

      const keyBlock = document.querySelector(
        `.keyboard-block[data-key='${userAns}']`
      );

      if (userAns === correctAns) {
        block.style.background = "#6aaa64";
        correctCount++;
        keyBlock.style.background = "#6aaa64";
        keyBlock.style.color = "white";
        block.style.border = "2px solid #6aaa64";
        block.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0)" },
            { transform: "scaleY(1)" },
          ],
          {
            duration: 200,
          }
        );
      } else if (ans.includes(userAns)) {
        block.style.background = "#c9b458";
        keyBlock.style.background = "#c9b458";
        keyBlock.style.color = "white";
        block.style.border = "2px solid #c9b458";
        block.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0)" },
            { transform: "scaleY(1)" },
          ],
          {
            duration: 200,
          }
        );
      } else {
        block.style.background = "#878a8c";
        keyBlock.style.background = "#878a8c";
        keyBlock.style.color = "white";
        block.style.border = "2px solid #878a8c";
        block.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(0)" },
            { transform: "scaleY(1)" },
          ],
          {
            duration: 200,
          }
        );
      }
      block.style.color = "white";
    }
    if (correctCount === 5) {
      youWin();
    } else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const thisRow = document.querySelector(`.board-row-${attempts}`);

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      thisBlock.style.border = "2px solid #878a8c";
      thisBlock.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.1)" },
          { transform: "scale(1)" },
        ],
        {
          duration: 80,
        }
      );
      index++;
    } else if (index !== 5) {
      const div = document.createElement("div");
      div.innerText = "5글자가 아닙니다.";
      div.style =
        "display:flex; justify-content:center; align-items:center; margin-bottom:500px; background-color:white; border:1px solid black; width:300px; height: 100px; font-size:20px; position: absolute;top: 12%;left: 50%;transform:translate(-50%,-50%); opacity: 0;";
      document.body.appendChild(div);
      div.animate([{ opacity: "1" }, { opacity: "0" }], {
        duration: 700,
      });

      thisRow.animate(
        [
          { transform: "translateX(-2.5%)" },
          { transform: "translateX(2.5%)" },
          { transform: "translateX(-5%)" },
          { transform: "translateX(5%)" },
          { transform: "translateX(2.5%)" },
          { transform: "translateX(0)" },
        ],
        {
          duration: 250,
        }
      );
    }
  };

  const handleClick = (event) => {
    const key = event.target.closest("div").dataset.key;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const thisRow = document.querySelector(`.board-row-${attempts}`);

    if (key === "back" || event.target.nodeName === "IMG") handleBackspace();
    else if (index === 5) {
      if (key === "enter") handleEnterkey();
      else return;
    } else if (key >= "A" && key <= "Z") {
      thisBlock.innerText = key;
      thisBlock.style.border = "2px solid #878a8c";
      thisBlock.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.1)" },
          { transform: "scale(1)" },
        ],
        {
          duration: 80,
        }
      );
      index++;
    } else if (index !== 5) {
      const div = document.createElement("div");
      div.innerText = "5글자가 아닙니다.";
      div.style =
        "display:flex; justify-content:center; align-items:center; margin-bottom:500px; background-color:white; border:1px solid black; width:300px; height: 100px; font-size:20px; position: absolute;top: 12%;left: 50%;transform:translate(-50%,-50%); opacity: 0;";
      document.body.appendChild(div);
      div.animate([{ opacity: "1" }, { opacity: "0" }], {
        duration: 700,
      });

      thisRow.animate(
        [
          { transform: "translateX(-2.5%)" },
          { transform: "translateX(2.5%)" },
          { transform: "translateX(-5%)" },
          { transform: "translateX(5%)" },
          { transform: "translateX(2.5%)" },
          { transform: "translateX(0)" },
        ],
        {
          duration: 250,
        }
      );
    }
  };

  const keyBlock = document.querySelectorAll(
    ".keyboard-block, .keyboard-block__wide"
  );

  for (let i = 0; i < keyBlock.length; i++) {
    keyBlock[i].addEventListener("click", handleClick);
  }

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      preBlock.style.border = "2px solid #d3d6da";
    }

    if (index !== 0) index--;
  };

  const startTimer = () => {
    const start_Time = new Date();

    function setTime() {
      const current_Time = new Date();
      const passed_Time = new Date(current_Time - start_Time);
      const 분 = passed_Time.getMinutes().toString().padStart(2, "0");
      const 초 = passed_Time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#time");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
