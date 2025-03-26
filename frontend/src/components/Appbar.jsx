import axios from "axios";
import { useEffect, useState } from "react";

export const Appbar = ({ userid }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    if (!userid) return;
    axios
      .get("http://localhost:3001/api/v1/user/self?id=" + userid)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      });
  }, [userid]);
  return (
    <div className="shadow-md h-14 flex justify-between items-center p-4">
      <div className="font-medium text-lg">PayTM App</div>
      <div className="flex items-center gap-2">
        <div>
          Hello, {firstName} {lastName}
        </div>
        <div className="bg-slate-200 rounded-full h-12 w-12 flex justify-center items-center text-xl font-medium">
          {firstName ? firstName[0].toUpperCase() : ""}
        </div>
      </div>
    </div>
  );
};
