import { Button2 } from "../components/Button2";
import { Heading2 } from "../components/Heading2";
import { InputBox2 } from "../components/InputBox2";

export const SendMoney = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg text-center w-100 py-4 px-6 shadow-lg">
        <Heading2 label={"Send Money"}></Heading2>

        <div className="flex gap-4 font-semibold text-xl items-center">
          <div className="bg-green-500 text-white h-10 w-10 rounded-full flex justify-center items-center">
            A
          </div>
          <div>Friend's Name</div>
        </div>

        <InputBox2
          label={"Amount (in Rs)"}
          placeholder={"Enter Amount"}
        ></InputBox2>
        <Button2 label={"Initiate Transfer"}></Button2>
      </div>
    </div>
  );
};
