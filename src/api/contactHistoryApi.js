import api from "./axios";

export const getContactHistoryByContactId = async (contactId) => {
  const response = await api.get(`/activities?contactId=${contactId}`);

  return response.data;
};
