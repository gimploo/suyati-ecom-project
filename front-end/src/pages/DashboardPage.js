import { React, useContext  } from "react";
import UserContext from "../context/UserContext";

const UserInfoDump = ({ value }) => {

  return (
    <div class="rounded-lg md:w-2/3 w-full border-4">
      <h2 class="p-10 bg-yellow-300 font-semibold text-4xl md:text-6xl text-blue-800">
        About
      </h2>
      <p class="">
        <ul class="font-extralight text-xl md:text-2xl p-8 space-y-4 bg-yellow-200">
          <li class='justify-between flex'>
            <span class='font-semibold mr-28'>ID </span> <span class='text-left flex-1'>{value.id}</span>
          </li>
          <li class='justify-between flex'>
            <span class='font-semibold mr-10'>Location </span> <span class='text-left flex-1'>{!value.Location ? "unknown" : value.Location}</span>
          </li>
          <li class='justify-between flex'>
            <span class='font-semibold mr-24'>Age </span> <span class='text-left flex-1'>{!value.Age ? "unknown" : value.Age}</span>
          </li>
        </ul>
      </p>
    </div>
  );
};

const DashboardPage = () => {
  
  const { user } = useContext(UserContext)

  return ( 
   <>
    <div class="bg-gray-700 p-20">
      <UserInfoDump value={user} />
    </div>
   </>
  )
}

export default DashboardPage
