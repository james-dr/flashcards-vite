import api from "./client";

export const getCardById = async (id) => {
  const res = await api.get(`/cards/${id}`);
  return res.data;
};

export const getAllCards = async () => {
  const res = await api.get(`/cards`);
  return res.data;
};

export const createCard = async () => {
  const res = await api.post(`/cards`);
  return res.data;
};

export const updateCard = async (id) => {
  const res = await api.patch(`/cards/${id}`);
  return res.data;
};

export const deleteCard = async (id) => {
  const res = api.delete(`/cards/${id}`);
  return res.data;
};
