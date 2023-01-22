import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays: string[] = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabitForm(): JSX.Element {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!title.trim() || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays
    });

    alert("Habito criado com sucesso!")
    setTitle("");
    setWeekDays([]);
  };

  const handleToggleWeekDay = (weekDay: number) => {
    if (weekDays.includes(weekDay)) {
      const newWeekDays = weekDays.filter((weekDayIdx) => weekDay !== weekDayIdx);
      setWeekDays(newWeekDays);
    } else {
      setWeekDays((prevState) => [...prevState, weekDay]);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex: Exercicios, dormir bem, etc..."
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        autoFocus
        className="p-4 roudend-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
      />

      <label htmlFor=""  className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, idx) => (
          <Checkbox.Root 
            key={weekDay} 
            className="flex items-center gap-3 group"
            onCheckedChange={() => handleToggleWeekDay(idx)}
            checked={weekDays.includes(idx)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-400">
              <Checkbox.Indicator>
                <Check size={20} className="text-white"/>
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">
              {weekDay}
            </span>
          </Checkbox.Root>
        ))}
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold"/>
        Confirmar
      </button>
    </form>
  )
}