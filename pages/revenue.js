import React, { useEffect, useState } from 'react';
import { closedOrders } from '../controllers/orderApi';

export default function Revenue() {
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    closedOrders().then((order) => {
      let sum = 0;
      order.forEach((o) => {
        sum += o.orderTotal;
      });
      setTotal(sum);
    });
  };

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <div
      className="text-center d-flex flex-column"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '100px',
      }}
    >
      <h1>Total Revenue</h1>
      <h2>${total.toFixed(2)}</h2>
    </div>
  );
}
