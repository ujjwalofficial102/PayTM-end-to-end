export const Balance = ({ value }) => {
  return (
    <div className="flex gap-2 text-lg">
      <div className="font-semibold">Your Balance</div>
      <div className="font-medium">₹{value}</div>
    </div>
  );
};
