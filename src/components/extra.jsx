import { IoStatsChart } from "react-icons/io5";
import {  useRef } from "react";

import "./ScoredBoard.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBowlerName } from "../redux/slices/playerSlice";










const ScoreBoard = () => {
  // Selectors and Dispatchers
  const formData = useSelector((state) => state.form.formData);
  const currentInning = useSelector((state) => state.form.currentInning);
  const players = useSelector((state) => state.player.players);
  const bowler = useSelector((state) => state.player.bowler);
  const dispatch = useDispatch();

  // Extra working and logic
  const [bowlerName, setBowlerName] = useState(bowler);
  const [currentOver, setCurrentOver] = useState([]);
  const [numberSection, setNumberSection] = useState([]);
  const [controlSection, setControlSection] = useState({
    wide: false,
    noball: false,
    byes: false,
    legByes: false,
    wicket: false,
    ok: false,
  });

  const inputWidth = `${Math.max(70, bowlerName.length * 6)}px`; // Adjust input width based on content

  const handleBowlerNameChange = (e) => {
    const updatedBowlerName = e.target.value; // Get the updated bowler name
    setBowlerName(updatedBowlerName); // Update the bowler name in the state
    dispatch(updateBowlerName(updatedBowlerName)); // Dispatch the updated bowler name
  };

  const bowlBall = (ballData) => {
    setCurrentOver((prevBall) => [...prevBall, ...ballData]); // Append current ball data to the currentOver state
  };

  let firstInningTeam;
  let secondInningTeam;

  if (formData.Toss === "Host" && formData.BatOrBowl === "Bat") {
    firstInningTeam = formData.Host;
    secondInningTeam = formData.Visitor;
  }
  if (formData.Toss === "Host" && formData.BatOrBowl === "Bowl") {
    firstInningTeam = formData.Visitor;
    secondInningTeam = formData.Host;
  }
  const navigate = useNavigate();

  // Functions:
  function changeHandler(event) {
    setControlSection((prevData) => {
      const { name, type, checked } = event.target;
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : event.value,
      };
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const actions = Object.entries(controlSection)
      .filter(([key, value]) => value === true)
      .map(([key]) => {
        switch (key) {
          case "wide":
            return "WD";
          case "noball":
            return "NB";
          case "wicket":
            return "W";
          default:
            return "";
        }
      }).filter(Boolean);

    if (actions.length > 0) {
      bowlBall(actions); // Pass the actions array directly to bowlBall
      // Reset controlSection after submitting
      setControlSection((prevData) =>
        Object.fromEntries(Object.keys(prevData).map((key) => [key, false]))
      );
    }
  };

  const numberSubmitHandler = (value) => {
    setNumberSection((prevData) => [...prevData, value]);
  };

  return (
    <div className="w-full min-h-full relative">
      <header className="flex justify-between items-center text-white bg-green-500 px-4 sm:px-24 py-2">
        <div className="text-white gap-6 sm:gap-32 flex items-center text-large extraSmall sm:text-2xl md:text-3xl relative h-full font-semibold">
          <p
            className="cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoMdArrowBack />
          </p>
          <p className="capitalize">
            {formData.Host} <span className="lowercase">v/s</span>{" "}
            {formData.Visitor}
          </p>
        </div>
        <div className="cursor-pointer">
          <IoStatsChart />
        </div>
      </header>

      <div className="bg-slate-100 w-full max-h-full text-sm sm:text-base">
        <section className="w-full max-h-full">
          <div className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 mt-1 sm:mt-2 mx-2 flex justify-between pr-6 bg-white gap-2">
            <div className="flex flex-col">
              <p className="capitalize">
                {firstInningTeam},{" "}
                {currentInning === 1 ? (
                  <span>
                    1<sup>st</sup> <span>innings</span>
                  </span>
                ) : (
                  <span>
                    2<sup>nd</sup>
                    <span>innings</span>
                  </span>
                )}
              </p>
              <div className="flex gap-4">
                <div className="flex text-2xl sm:text-3xl font-semibold">
                  <p>22 </p>
                  <p>- </p>
                  <p>2</p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-slate-300 text-lg sm:text-xl font-semibold">
                    (3.5)
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p>CRR</p>
              <p></p>
            </div>
          </div>
        </section>

        <section className="w-full max-h-full">
          <div className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 mt-1 sm:mt-2 mx-2 bg-white text-xs sm:text-sm md:text-base">
            <div className="tablex">
              <div className="thx">Batsman</div>
              <div className="thx">R</div>
              <div className="thx">B</div>
              <div className="thx">4s</div>
              <div className="thx">6s</div>
              <div className="thx">SR</div>

              <div>{players[0]}</div>
              <div>5</div>
              <div>3</div>
              <div>0</div>
              <div>0</div>
              <div>2.17</div>

              <div>{players[1]}</div>
              <div>8</div>
              <div>6</div>
              <div>1</div>
              <div>0</div>
              <div>5.7</div>

              <div className="thx">Bowler</div>
              <div className="thx">O</div>
              <div className="thx">M</div>
              <div className="thx">R</div>
              <div className="thx">W</div>
              <div className="thx">ER</div>

              <input
                type="text"
                className="w-auto outline-none border-none bg-transparent"
                style={{ width: inputWidth }}
                value={bowlerName}
                onChange={handleBowlerNameChange}
              />
              <div>1.4</div>
              <div>0</div>
              <div>4</div>
              <div>1</div>
              <div>2.18</div>
            </div>
          </div>
        </section>

        <div className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 mt-1 sm:mt-2 mx-2 flex flex-wrap pr-6 bg-white gap-2 sm:gap-10">
          <p>This Over: </p>
          {[...currentOver, ...numberSection].map((ball, index) => (
            <p key={index}>{ball}</p>
          ))}
        </div>

        <div className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 mt-1 sm:mt-2 mx-2 flex pr-6 bg-white gap-2">
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="flex gap-4 sm:gap-10 flex-wrap">
              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  name="wide"
                  id="wide"
                  checked={controlSection.wide === true}
                  onChange={changeHandler}
                />
                <label htmlFor="wide">Wide</label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  name="noball"
                  id="noball"
                  checked={controlSection.noball === true}
                  onChange={changeHandler}
                />
                <label htmlFor="noball" className="whitespace-nowrap">
                  No Ball
                </label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <input
                  type="checkbox"
                  name="wicket"
                  id="wicket"
                  checked={controlSection.wicket === true}
                  onChange={changeHandler}
                />
                <label htmlFor="wicket">Wicket</label>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <input
                type="submit"
                className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
                value="Submit"
              />
            </div>
          </form>
        </div>

        <div className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 mt-1 sm:mt-2 mx-2 flex flex-wrap pr-6 bg-white gap-2 sm:gap-10">
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("0")}
            >
              0
            </button>
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("1")}
            >
              1
            </button>
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("2")}
            >
              2
            </button>
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("3")}
            >
              3
            </button>
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("4")}
            >
              4
            </button>
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("5")}
            >
              5
            </button>
            <button
              className="border rounded-lg px-2 py-1 extraSmallPadding sm:py-2 cursor-pointer bg-green-500 text-white w-auto"
              onClick={() => numberSubmitHandler("6")}
            >
              6
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
