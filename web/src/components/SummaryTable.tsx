import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

//const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

const summaryDates = generateDatesFromYearBeginning();

const minimunSummaryDatesSize = 18 * 7; // 18 semanas
const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable(): JSX.Element {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api
      .get("summary")
      .then((response) => setSummary(response.data));
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => (
          <div key={`${weekDay}-${i}`}className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center">
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        { summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          })

          return (
            <HabitDay
              key={date.toString()} 
              amount={dayInSummary?.amount} 
              completed={dayInSummary?.completed}
              date={date}
            />
          );
        })}

        {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, idx) => (
          <div key={`amount-to-fill-${idx}`} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>
        ))}
      </div>
    </div>
  )
}