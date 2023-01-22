import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

type SummaryProps = Array<{
  id: string;
  amount: number;
  completed: number;
  date: string;
}>

export function Home(): JSX.Element {
  const { navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps>([]);
  
  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await api.get("summary");
      setSummary(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View className="flex-1 bg-background px-8 pt-16">
          <Header />

          <View className="flex-row mt-6 mb-2">
            {weekDays.map((weekDay, i) => (
              <Text 
                key={`${weekDay}-${i}`} 
                className="text-zinc-400 text-xl font-bold text-center m-1"
                style={{width: DAY_SIZE, height: DAY_SIZE}}
              >
                {weekDay}
              </Text>
            ))}
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}
          >
            <View className="flex-row flex-wrap">
              {datesFromYearStart.map((date, i) => {
                const dayWithHabits = summary.find((day) => dayjs(date).isSame(day.date, "day"));

                return (
                  <HabitDay 
                    key={date.toString()} 
                    onPress={() => navigate("habit", {date: date.toISOString()})} 
                    amount={dayWithHabits?.amount}
                    completed={dayWithHabits?.completed}
                    date={date}
                  />
                );
              })}

              {amountOfDaysToFill > 0 && Array.from({
                length: amountOfDaysToFill
                }).map((_, i) => (
                  <View 
                    key={`amount-to-fill-${i}`}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                    style={{width: DAY_SIZE, height: DAY_SIZE}} 
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  )
}