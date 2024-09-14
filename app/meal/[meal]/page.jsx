import ShowMeal from "@/components/ShowMeal";
import { MEAL_URL } from "@/lib/urls";

export default function Page({ params }) {
  return <ShowMeal URL={MEAL_URL(params)} />;
}
