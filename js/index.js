const ans = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
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
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; margin-bottom:500px; background-color:white; border:1px solid black; width:300px; height: 100px; font-size:20px; position: absolute;top: 50%;left: 50%;transform:translate(-50%,-50%);";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts++;
    index = 0;
    console.log(attempts);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterkey = () => {
    let correctCount = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const userAns = block.innerText;
      const correctAns = ans[i];
      if (userAns === correctAns) {
        block.style.background = "#6aaa64";
        correctCount++;
      } else if (ans.includes(userAns)) block.style.background = "#c9b458";
      else block.style.background = "#787c7e";
      block.style.color = "white";
    }
    if (correctCount === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
