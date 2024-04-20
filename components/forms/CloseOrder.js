import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { closeOrder, getOrder, getPaymentTypes } from '../../controllers/orderApi';

const initialState = {
  tip: null,
  paymentTypeId: -1,
};

export default function CloseOrder({ orderId, onUpdate }) {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const [currentTotal, setCurrentTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    setFormInput((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, orderId: parseFloat(orderId) };
    closeOrder(payload).then(onUpdate);
  };

  useEffect(() => {
    getPaymentTypes().then(setPaymentTypes);
    setFormInput(initialState);
    getOrder(orderId)?.then((order) => setCurrentTotal(order.total));
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            type="number"
            placeholder="Enter Tip Amount"
            name="tip"
            value={formInput.tip}
            onChange={handleChange}
            style={{
              margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
            }}
            required
          />
        </Form.Group>
        <Form.Select
          aria-label="orderType"
          name="paymentTypeId"
          value={formInput.paymentTypeId}
          onChange={handleChange}
          style={{
            margin: '0 auto', width: '300px', backgroundColor: '#B7C5C8', opacity: '70%', border: '1px solid #292929', color: 'black', marginTop: '50px',
          }}
          required
        >
          <option>Select the order type</option>
          {paymentTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.type}</option>
          ))}
        </Form.Select>
        <p className="orderTotal">Your order total is: ${(currentTotal + formInput.tip).toFixed(2)}</p>
        <div className="createBtn">
          <Button variant="danger" type="submit" style={{ margin: '0 auto', width: '300px' }}>Close Order</Button>
        </div>
      </Form>
    </div>
  );
}

CloseOrder.propTypes = {
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
