import axios from 'axios';

export const fetchVendors = async () => {
  const response = await fetch('https://localhost:7059/api/Vendor');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteVendor = async (vendorId) => {
  console.log(vendorId);
  const response = await axios.delete(
    `https://localhost:7059/api/Vendor/${vendorId}`
  );
  console.log(response);
  return response.data;
};

export const postVendor = async (vendorData) => {
  const response = await axios.post(
    'https://localhost:7059/api/Vendor',
    vendorData
  );
  return response.data;
};


export const updateVendor = async ({ vendorId, updatedVendor }) => {
  const response = await axios.put(
    `https://localhost:7059/api/Vendor/${vendorId}`,
    updatedVendor
  );
  return response.data;
};