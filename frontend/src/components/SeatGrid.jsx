const SeatGrid = ({ seats }) => {
  return (
    <div className="grid grid-cols-7 gap-1">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`p-2 text-center rounded text-white ${
            seat.is_reserved ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {seat.id}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
