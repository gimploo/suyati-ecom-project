import { React, useContext,useEffect } from "react";
import UserContext from "../context/UserContext";

const UserInfoDump = ({ value }) => {
  let {user_loaded} = useContext(UserContext);
  useEffect(() => {
  user_loaded();
  },[]);
  return (
    <div class="rounded-lg md:w-2/3 w-full border-4">
      <h2 class="p-10 bg-yellow-300 font-semibold text-4xl md:text-6xl text-blue-800">
        {" "}
        User info{" "}
      </h2>
      <p class="">
        <ul class="font-extralight text-xl md:text-2xl p-8 space-y-4 bg-yellow-200">
          <li>
            {" "}
            <b>User-ID:</b> {value.id}{" "}
          </li>
          <li>
            {" "}
            <b>Location:</b> {!value.Location ? "unknown" : value.Location}{" "}
          </li>
          <li>
            {" "}
            <b>Age: </b> {!value.Age ? "unknown" : value.Age}{" "}
          </li>
        </ul>
      </p>
    </div>
  );
};

const DashboardPage = () => {
  let {user_loaded} = useContext(UserContext);
  useEffect(() => {
  user_loaded();
  },[]);
  const { user } = useContext(UserContext);

  console.log(user);
 
  return ( 
   <>
    {user?<>
      <div class="bg-yellow-500 p-20">
        <h1 class="text-left md:text-8xl text-2xl font-light text-gray-100">
          {" "}
          Welcome User {" "}{user.id}!{" "}
        </h1>
        <hr class="md:mt-10 mt-4 ml-2 md:w-40 w-10 md:mb-10 mb-5" />
        <UserInfoDump value={user} />
      </div>
      </>:null}
   </>

  );
};

export default DashboardPage;
