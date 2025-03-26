import { useSearchParams } from "react-router-dom";
import { Button2 } from "../components/Button2";
import { Heading2 } from "../components/Heading2";
import { InputBox2 } from "../components/InputBox2";
import { useState } from "react";
import axios from "axios";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg text-center w-100 py-4 px-6 shadow-lg">
        <Heading2 label={"Send Money"}></Heading2>

        <div className="flex gap-4 font-semibold text-xl items-center">
          <div className="bg-green-500 text-white h-10 w-10 rounded-full flex justify-center items-center">
            {name[0].toUpperCase()}
          </div>
          <div>{name}</div>
        </div>

        <InputBox2
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          label={"Amount (in Rs)"}
          placeholder={"Enter Amount"}
        ></InputBox2>
        <Button2
          onClick={() => {
            axios.post(
              "http://localhost:3001/api/v1/account/transfer",
              {
                to: id,
                amount,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
          }}
          label={"Initiate Transfer"}
        ></Button2>
      </div>
    </div>
  );
};
