//
// home-rolled quick&easy calendar building function
//

// return number array of 35 element (7 day x 5 weeks)
// first row: last days of prior month, start of current
// 2nd to 4th days of current month, also organized in rows of 7 days
// 5th row: last days of current month and first days of the following
const build5RollingWeeks = (year, month) => {
  // Get day of the week for 1st & make Monday the 1st day of the week
  const day1 = (new Date(year, month, 1).getDay() + 6) % 7;
  console.log(day1);
  const priorMonth = month === 0 ? 11 : month - 1;
  const priorMonthYear = month === 0 ? year - 1 : year;
  const priorMonthEnd = 32 - new Date(priorMonthYear, priorMonth, 32).getDate();
  const monthEnd = 32 - new Date(year, month, 32).getDate();
  const days = [];
  for (let i = 0; i < 35; i++) {
    if (i < day1) {
      days.push(priorMonthEnd - day1 + 1 + i);
      continue;
    }
    if (i > monthEnd + day1 - 1) {
      days.push(i - (monthEnd + day1) + 1);
      continue;
    }
    days.push(i - day1 + 1);
  }
  return days;
};

// months number to months name
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//
// from an array of 35 days (5 weeks), build the html table which will
// used to render the calendar
// the calendar has a class .calendar-container
// the calendar has an id #calendar
// each days has a common class: tab_el
// each day has an unique id: tab-0 ... tab-34
//
const buildCalendar = (year, month) => {
  const days = build5RollingWeeks(year, month);
  const rolling5weeks = days.reduce((cum, el, ndx) => {
    return `${cum} 
            ${ndx % 7 === 0 ? "<tr>" : ""}
            <td class="tab-el" id="tab-${ndx}">${("0" + el).slice(-2)}</td>
            ${ndx % 7 === 6 ? "</tr>\n" : ""}`;
  }, "");
  const calendar = `
    <div class="calendar-container" id="calendar">
          <div class="row">
                <div class="span12">
                <table class="table-condensed table-bordered table-striped">
                        <thead>
                          <tr>
                            <th colspan="7">
                              <a>${months[month]} ${year}</a>
                            </th>
                          </tr>
                          <tr>
                            <th>Mo</th>
                            <th>Tu</th>
                            <th>We</th>
                            <th>Th</th>
                            <th>Fr</th>
                            <th>Sa</th>
                            <th>Su</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${rolling5weeks}
                        </tbody>
                    </table>
                </div>
          </div>
    </div>
    `;
  console.log(calendar);
  return calendar;
};

const decorate = (day, month, color) => {
  el = Window.getElementById("tab-21").style.color = "red";
  console.log("decorating");
  return el;
};

CalendarUtil = { buildCalendar, decorate };

module.exports = CalendarUtil;
