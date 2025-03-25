import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <>
      <Appbar></Appbar>
      <div className="m-8">
        <Balance value={"10,000"}></Balance>
        <Users></Users>
      </div>
    </>
  );
};
