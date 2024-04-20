import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getOrder } from '../../../controllers/orderApi';
import CloseOrder from '../../../components/forms/CloseOrder';

export default function Close() {
  const [order, setOrder] = useState({});
  const [closed, setClosed] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const onUpdate = () => setClosed(true);
  const onClick = () => router.push('/orders');

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [id, onUpdate]);

  return (
    <div>
      {closed === false && (
        <>
          <CloseOrder orderId={order.id} onUpdate={onUpdate} />
        </>
      )}
      {closed === true && (
        <>
          <h1>Thank you for your payment of ${order.totalPlusTip}</h1>
          <h2>Order #{order.id} has been successfully closed</h2>
          <Button type="click" variant="danger" onClick={onClick}>Return To Orders</Button>
        </>
      )}
    </div>
  );
}
