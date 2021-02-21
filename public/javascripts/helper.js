// reshape the array of habit cue times into
// an object for easier manipulation
const HabitReshaper = (habit) => {
  const cueDayTime = {};
  habit.Mon ? (cueDayTime["Mon"] = habit.MonTime) : "";
  habit.Tue ? (cueDayTime["Tue"] = habit.TueTime) : "";
  habit.Wed ? (cueDayTime["Wed"] = habit.WedTime) : "";
  habit.Thu ? (cueDayTime["Thu"] = habit.ThuTime) : "";
  habit.Fri ? (cueDayTime["Fri"] = habit.FriTime) : "";
  habit.Sat ? (cueDayTime["Sat"] = habit.SatTime) : "";
  habit.Sun ? (cueDayTime["Sun"] = habit.SunTime) : "";
  return cueDayTime;
};

module.exports = HabitReshaper;
