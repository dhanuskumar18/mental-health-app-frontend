import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonAppBar from "./Appbar";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import config from "../../config"

function Checkin() {
  const state1 = useSelector((state) => state.s1reducer.value);
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [feelings, setFeelings] = useState("");
  const [error, setError] = useState(null);
  const [submit, setsubmit] = useState(false);
  const [already, setalready] = useState(false);
  const [data, setdata] = useState("");
  useEffect(() => {
    axios
      .get(`${config}api/check-in/${state1}`)
      .then((response) => {
        if (response.data) {
          if (response.data.message != "No check-in found for today.") {
            setalready(true);
            setdata(response.data);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config}api/check-in`,
        {
          state1,
          mood,
          stress,
          feelings,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setsubmit(true);
    } catch (error) {
      setError(error.message);
    }
  };
  // console.log(data);
  // console.log(already);

  if (already) {
    return (
      <>
        <ButtonAppBar />
        <div className="flex justify-center items-center h-screen checkinbg p-2">
          
          <div className="bg-teal-50 p-4 rounded shadow-md w-4/5 md:w-3/5">
            <h1 className="italic text-center text-[1.4rem] md:text-[2.5rem] text-purple-800 m-2">You have already submitted the check-in</h1>
            <ul>
              <li className="italic text-[1.4rem] md:text-[2.5rem] text-blue-700 m-2">Mood:{data.mood}</li>
              <li className="italic text-[1.4rem] md:text-[2.5rem] text-blue-700 m-2">Stress:{data.stress}</li>
              <li className="italic text-[1.4rem] md:text-[2.5rem] text-blue-700 m-2">Feelings:{data.feelings}</li>
            </ul>
            <h1 className="text-center text-red-600 text-xl m-3">
              Come next day to re check-in!
            </h1>
          </div>
        </div>
      </>
    );
  }
  if (submit) {
    return (
      <>
        <ButtonAppBar />

        <div className="flex flex-col justify-center items-center h-screen checkinbg p-2">
          <h1 className="italic text-center text-[1.8rem] md:text-[2.5rem] text-blue-900 m-2">
            Check-in Submitted successfully
          </h1>
            <Link to={"/viewdata"} className="italic text-center text-[1.8rem] md:text-[2.5rem] text-red-700">Click here to see your check in detail!</Link>
        </div>
      </>
    );
  }
  return (
    <>
      <ButtonAppBar />

      <div className="flex justify-center items-center h-screen checkinbg">
        <form
          onSubmit={handleSubmit}
          className="bg-teal-50 p-4 rounded shadow-md w-4/5 md:w-3/5"
        >
          <h2 className="text-lg text-center italic font-bold mb-4  text-blue-800">
            Daily Check-in
          </h2>
          <div className="mb-4">
            <label className="block text-blue-600 text-sm font-bold mb-2">
              Mood Rating (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(event) => setMood(event.target.value)}
              className="w-full"
            />
            <p className="text-gray-700 text-sm">
              <b>{mood}</b>/10
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-blue-600 text-sm font-bold mb-2">
              Current Stress Level (1-10)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={stress}
              onChange={(event) => setStress(event.target.value)}
              className="w-full"
            />
            <p className="text-gray-700 text-sm">
              <b>{stress}</b>/10
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-blue-600 text-sm font-bold mb-2">
              How are you feeling today?
            </label>
            <textarea
              value={feelings}
              onChange={(event) => setFeelings(event.target.value)}
              rows="7"
              required
              className="shadow appearance-none border def rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Checkin;
