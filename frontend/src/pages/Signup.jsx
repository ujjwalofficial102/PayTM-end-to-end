import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg text-center w-100 py-4 px-6 shadow-lg">
        <Heading label={"Sign up"}></Heading>
        <SubHeading
          label={"Enter your information to create an account"}
        ></SubHeading>
        <InputBox label={"First Name"} placeholder={"Jhon"}></InputBox>
        <InputBox label={"Last Name"} placeholder={"Snow"}></InputBox>
        <InputBox label={"Email"} placeholder={"jhon@gmail.com"}></InputBox>
        <InputBox label={"Password"} placeholder={"123456"}></InputBox>
        <Button label={"Sign up"}></Button>
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        ></BottomWarning>
      </div>
    </div>
  );
};
