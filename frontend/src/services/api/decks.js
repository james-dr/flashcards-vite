import api from "./client";

export const getDeckById = (id) => {
  api.get(`/decks/${id}`);
};

export const getAllDecks = () => {
  api.get(`/decks`);
};

export const createDeck = () => {
  api.post(`/decks`);
};

export const updateDeck = (id) => {
  api.patch(`/decks/${id}`);
};

export const deleteDeck = (id) => {
  api.delete(`/decks/${id}`);
};
