import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="text-sm py-1 flex justify-center gap-1">
      <div>{label}</div>
      <Link className="text-blue-800 font-medium underline" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
