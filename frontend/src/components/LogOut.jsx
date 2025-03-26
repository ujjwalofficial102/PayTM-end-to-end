import { useNavigate } from "react-router-dom";

export function LogOut({ label }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/signin");
      }}
      type="button"
      className="cursor-pointer w-full text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2"
    >
      {label}
    </button>
  );
}
