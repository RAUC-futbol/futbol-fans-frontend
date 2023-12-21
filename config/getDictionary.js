import SERVER from '../src/App';
import axios from 'axios';

// Variable to store the dictionary data
let dictionaryData = null;

export default async function getDictionary() {
  // If data is already fetched, return it
  if (dictionaryData !== null) {
    return dictionaryData;
  }

  // Fetch data if not already fetched
  try {
    const response = await axios.get(`${SERVER}/dictionary`);
    dictionaryData = response.data;
    return dictionaryData;
  } catch (error) {
    console.error('Error fetching dictionary data:', error.message);
    throw error;
  }
}

