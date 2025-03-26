import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg text-center w-100 py-4 px-6 shadow-lg">
        <Heading label={"Sign up"}></Heading>
        <SubHeading
          label={"Enter your information to create an account"}
        ></SubHeading>
        <InputBox
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          label={"First Name"}
          placeholder={"Jhon"}
        ></InputBox>
        <InputBox
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          label={"Last Name"}
          placeholder={"Snow"}
        ></InputBox>
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"jhon@gmail.com"}
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
              "http://localhost:3001/api/v1/user/signup",
              {
                firstName,
                lastName,
                username,
                password,
              }
            );
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          }}
          label={"Sign up"}
        ></Button>
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        ></BottomWarning>
      </div>
    </div>
  );
};
