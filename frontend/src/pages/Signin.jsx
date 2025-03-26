import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg text-center w-100 py-4 px-6 shadow-lg">
        <Heading label={"Sign in"}></Heading>
        <SubHeading
          label={"Enter your credentials to access your account"}
        ></SubHeading>
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"Jhon@gmail.com"}
        ></InputBox>
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          placeholder={"123456"}
        ></InputBox>
        <Button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3001/api/v1/user/signin",
              {
                username,
                password,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
          label={"Sign in"}
        ></Button>
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        ></BottomWarning>
      </div>
    </div>
  );
};
