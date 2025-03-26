import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg text-center w-100 py-4 px-6 shadow-lg">
        <Heading label={"Sign in"}></Heading>
        <SubHeading
          label={"Enter your credentials to access your account"}
        ></SubHeading>
        <InputBox label={"Email"} placeholder={"Jhon@gmail.com"}></InputBox>
        <InputBox label={"Password"} placeholder={"123456"}></InputBox>
        <Button label={"Sign in"}></Button>
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        ></BottomWarning>
      </div>
    </div>
  );
};
