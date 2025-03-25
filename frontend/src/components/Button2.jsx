export function Button2({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" w-full text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mb-2"
    >
      {label}
    </button>
  );
}
