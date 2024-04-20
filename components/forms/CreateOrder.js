import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getOrderTypes, newOrder, updateOrder } from '../../controllers/orderApi';

const initialState = {
  name: '',
  email: '',
  phone: '',
  orderTypeId: -1,
};

function CreateOrder({ orderObj }) {
  const [types, setTypes] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateOrder(orderObj.id, formInput).then(() => router.push(`/order/${orderObj.id}`));
    } else {
      newOrder(formInput).then((order) => router.push(`/order/${order.id}`));
    }
  };

  useEffect(() => {
    if (orderObj.id) {
      setFormInput(orderObj);
    } else {
      setFormInput(initialState);
    }
    getOrderTypes()?.then(setTypes);
  }, [orderObj]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            style={{
              margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Control
            type="phone"
            placeholder="Enter Phone Number"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
            style={{
              margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            style={{
              margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
            }}
            required
          />
        </Form.Group>
        <Form.Select
          aria-label="orderType"
          name="orderTypeId"
          value={formInput.orderTypeId}
          onChange={handleChange}
          style={{
            margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
          }}
          required
        >
          <option>Select the order type</option>
          {types.map((type) => (
            <option value={type.id}>{type.type}</option>
          ))}
        </Form.Select>
        <div className="createBtn">
          <Button style={{ margin: '0 auto', width: '300px' }} variant="danger" type="submit">{orderObj.id ? 'Update' : 'Create'}</Button>
        </div>
      </Form>
    </div>
  );
}

CreateOrder.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    orderTypeId: PropTypes.number,
  }),
};

CreateOrder.defaultProps = {
  orderObj: initialState,
};

export default CreateOrder;
