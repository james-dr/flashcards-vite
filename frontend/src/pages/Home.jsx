import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getAllCards } from "../services/api/cards";

function Home() {
  const queryClient = useQueryClient();

  const cardsQuery = useQuery({ queryKey: ["cards"], queryFn: getAllCards });
  const cards = cardsQuery;
  console.log(cards);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to Your App</h1>
      <p className="mt-4 text-gray-600">Your full-stack React app is ready!</p>
      <h2>These are the cards:</h2>
      {cards.data?.map((card) => (
        <p key={card.id}>
          {card.front} {card.back}
        </p>
      ))}
    </div>
  );
}

export default Home;
