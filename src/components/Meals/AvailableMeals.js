import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      setIsLoading(true);
      let response = await fetch(
        "https://react-6422c-default-rtdb.europe-west1.firebasedatabase.app/food-app.json"
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("something went wrong");
      }

      let data = await response.json();
      let mealsArray = [];

      for (let key in data) {
        mealsArray.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(mealsArray);
      setIsLoading(false);
    };

    fetchRequest().catch((e) => setErrorState(e.message));
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (errorState) {
    return (
      <section className={classes.error}>
        <p>{errorState}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
