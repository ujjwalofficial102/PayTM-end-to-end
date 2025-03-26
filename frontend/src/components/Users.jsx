import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="py-6">
      <div className="font-semibold text-lg">Users</div>
      <input
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="outline w-full outline-slate-200 rounded px-2 py-1 my-2 focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-400"
        type="text"
        placeholder="Search users..."
      />
      <div>
        {users.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};
function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="bg-slate-200 rounded-full h-10 w-10 flex items-center justify-center text-lg font-medium">
          {user.firstName[0].toUpperCase()}
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="w-35">
        <Button
          onClick={() => {
            navigate(
              `/send?id=${user._id}&name=${user.firstName} ${user.lastName}`
            );
          }}
          label={"Send Money"}
        ></Button>
      </div>
    </div>
  );
}
