import React, { useEffect ,useState} from 'react'
import axios from "axios";
import ButtonAppBar from "./Appbar";
import { useSelector } from "react-redux";
import config from "../../config"

function Viewdata() {
    useEffect(() => {
        axios
          .get(`${config}api/check-in/${state1}`)
          .then((response) => {
            if (response.data) {
                setdata(response.data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
        const state1 = useSelector((state) => state.s1reducer.value);
        const [data, setdata] = useState("");
      
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
  )
}

export default Viewdata