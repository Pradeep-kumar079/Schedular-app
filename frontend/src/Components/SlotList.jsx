import React from "react";

const SlotList = ({ slots }) => {
  return (
    <div>
      <h3>Your Slots</h3>

      {slots.map((s, i) => (
        <div key={i}>
          {s.day} | {s.startTime} - {s.endTime}
        </div>
      ))}
    </div>
  );
};

export default SlotList;