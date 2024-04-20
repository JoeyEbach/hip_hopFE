import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// get all orders
const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders`, {
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

// create a new order
const newOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// get all closed orders
const closedOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/closed`, {
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

// add item to order
const addItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${orderId}/add/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// remove item from order
const removeItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${orderId}/remove/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// get single order
const getOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// delete order
const deleteOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${orderId}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// update order
const updateOrder = (orderId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${orderId}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// close order
const closeOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/close`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

// order types
const getOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ordertypes`, {
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

// payment types
const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/paymenttypes`, {
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

// search orders
const searchOrders = (searchValue) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/search?value=${searchValue}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 404) {
        resolve([]);
      }
      return response.json();
    })
    .then((data) => {
      if (data && Array.isArray(data)) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getOrders,
  newOrder,
  addItem,
  removeItem,
  closeOrder,
  getOrder,
  getOrderTypes,
  getPaymentTypes,
  deleteOrder,
  updateOrder,
  closedOrders,
  searchOrders,
};
