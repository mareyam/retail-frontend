import axios from 'axios';

export const fetchCustomers = async () => {
  const response = await fetch('https://localhost:7059/api/Customer');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteCustomer = async (customerId) => {
  console.log(customerId);
  const response = await axios.delete(
    `https://localhost:7059/api/Customer/${customerId}`
  );
  console.log(response);
  return response.data;
};

export const postCustomer = async (CustomerData) => {
  const response = await axios.post(
    'https://localhost:7059/api/Customer',
    CustomerData
  );
  return response.data;
};

export const updateCustomer = async ({ customerId, updatedCustomer }) => {
  const response = await axios.put(
    `https://localhost:7059/api/Customer/${customerId}`,
    updatedCustomer
  );
  return response.data;
};
