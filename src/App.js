import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

let fillScreenScore = -1;

export default function App() {
  const [clickedTimes, setTimes] = useState(0);
  const [billions, setBillions] = useState([]);

  const showMoney = (billionsArr, interval) => {
    if (fillScreenScore <= billionsArr.length) {
      fillScreenScore = fillScreenScore + 1;
      setBillions(
        billionsArr.map((billion, idx) => {
          if (fillScreenScore < idx) {
            return { hide: true, icon: faMoneyBillWave };
          } else if (fillScreenScore >= idx) {
            return { hide: false, icon: faMoneyBillWave };
          }
          return billion;
        })
      );
    } else {
      clearInterval(interval);
    }
  };

  const fillScreen = () => {
    const noOfIcons =
      Math.ceil(window.innerWidth / 24) * Math.ceil(window.innerHeight / 20);

    const moneyArr = new Array(noOfIcons).fill({
      hide: true,
      icon: faMoneyBillWave
    });

    setBillions(moneyArr);
    let interval = setInterval(() => showMoney(moneyArr, interval), 1);
  };

  const clickHandler = () => {
    let times = clickedTimes + 1;
    setTimes(times);
    if (times >= 10) {
      fillScreen();
    }
  };

  let children;
  if (clickedTimes >= 10) {
    children = (
      <div
        className="screen"
        style={{
          display: clickedTimes >= 10 ? "block" : "flex"
        }}
      >
        <div className="congrats">
          <h1>
            Congratulations!
            <br />
            You are a billionaire now!
            <FontAwesomeIcon className="smile" icon={faSmile} />
          </h1>
          <a
            className="button-3d"
            href={`https://www.twitter.com/share?text=I am a billionaire now thanks to @karthicktamil17. You can become one too! 😃 (Just kiddin', but you check this project out anyway 😆)&hashtag=100Days100Projects&url=https://gtz80.csb.app/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share with your friends
          </a>
        </div>
        {billions.map((billion, idx) => (
          <FontAwesomeIcon
            key={idx}
            className={billion.hide === true ? "icon hide" : "icon"}
            icon={billion.icon}
          />
        ))}
      </div>
    );
  } else {
    children = (
      <div
        className="screen"
        style={{
          display: clickedTimes >= 10 ? "block" : "flex"
        }}
      >
        <h1>
          <span role="img" aria-label="">
            💲
          </span>{" "}
          Do you want to become a billionaire?
          <span role="img" aria-label="">
            💲
          </span>
        </h1>
        <p>
          Click this{" "}
          <span role="img" aria-label="">
            👇
          </span>{" "}
          button <strong>10</strong> times.
        </p>
        <button className="button-3d" onClick={clickHandler}>
          Click Me
        </button>
        <p>
          Clicked <span className="score">{clickedTimes}</span> times
        </p>
      </div>
    );
  }

  return children;
}
