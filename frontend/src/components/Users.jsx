import { useState } from "react";
import { Button } from "./Button";

export const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "Jhon",
      lastName: "Snow",
      _id: 1,
    },
  ]);

  return (
    <div className="py-6">
      <div className="font-semibold text-lg">Users</div>
      <input
        className="outline w-full outline-slate-200 rounded px-2 py-1 my-2 outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-400"
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
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="bg-slate-200 rounded-full h-10 w-10 flex items-center justify-center text-lg font-medium">
          {user.firstName[0]}
        </div>
        <div>
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="w-35">
        <Button label={"Send Money"}></Button>
      </div>
    </div>
  );
}
