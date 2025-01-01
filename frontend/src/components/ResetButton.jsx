
const ResetButton = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Reset Booking
    </button>
  );
};

export default ResetButton;
