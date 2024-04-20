import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getOrders, searchOrders } from '../controllers/orderApi';
import OrderCard from '../components/cards/OrderCard';

const initialState = {
  search: '',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchOrders(formInput.search).then((results) => setOrders(results));
  };

  const getAllOrders = () => {
    getOrders()?.then(setOrders);
  };

  useEffect(() => {
    if (formInput.search.trim() === '') {
      getAllOrders();
    }
  }, [orders]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search">
          <Form.Control
            type="text"
            placeholder="Search Orders"
            className="search"
            onChange={handleChange}
            name="search"
            value={formInput.search}
            style={{
              margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
            }}
          />
        </Form.Group>
        <div className="searchBtn">
          <Button
            type="submit"
            variant="danger"
            style={{
              margin: '0 auto', width: '100px', fontSize: '12px', border: '1px solid gray', backgroundColor: 'transparent', color: 'gray',
            }}
          >Search
          </Button>
        </div>
      </Form>

      <div className="orderCards d-flex flex-wrap">
        {orders && orders.map((order) => (
          <OrderCard key={order.id} orderObj={order} className="oCard" style={{ marginBottom: '15px' }} />
        ))}
      </div>
    </div>
  );
}
