import { LogOut } from "./LogOut";

export const Balance = ({ value }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 text-lg">
        <div className="font-semibold">Your Balance</div>
        <div className="font-medium">₹{value}</div>
      </div>
      <div className="max-2-80">
        <LogOut label={"Log out"}></LogOut>
      </div>
    </div>
  );
};
