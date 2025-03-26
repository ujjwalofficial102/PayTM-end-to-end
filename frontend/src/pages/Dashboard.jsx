import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [value, setValue] = useState();
  const [userid, setUserid] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setValue(response.data.balance);
        setUserid(response.data.userid);
      });
  }, [value]);
  return (
    <>
      <Appbar userid={userid}></Appbar>
      <div className="m-8">
        <Balance value={value}></Balance>
        <Users></Users>
      </div>
    </>
  );
};
