import { MdOutlineAccessTimeFilled } from "react-icons/md";

export const TimeRemaining = ({ days }: { days: number }) => {
  const RemainingTime = (days: number): string => {
    const weeks = Math.floor(days / 7);
    if (weeks === 0) return `${days} ${days > 1 ? "days" : "day"} left`;
    return `${weeks} ${weeks > 1 ? "weeks" : "week"} left`;
  };

  const TimeGroup = (days: number): string => {
    if (days >= 7) return "time-weeks";
    if (days >= 2) return "time-days";
    return "time-day";
  };

  return (
    <div className={`time-remaining ${TimeGroup(days)}`}>
      <MdOutlineAccessTimeFilled className="time-icon" />
      <div className="time-text">{RemainingTime(days)}</div>
    </div>
  );
};
