import { clientCredentials } from "../utils/client";

const endpoint = clientCredentials.databaseURL;

//get all items
const getItems = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      resolve(Object.values(data));
    } else {
      resolve([]);
    }
  })
  .catch(reject);
});

//get single item
const getItem = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items/{itemId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => resolve(data))
  .catch(reject);
});

export {
  getItems,
  getItem,
}
