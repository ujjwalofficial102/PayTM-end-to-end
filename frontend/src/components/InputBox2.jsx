export function InputBox2({ label, placeholder }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type="number"
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
      ></input>
    </div>
  );
}
