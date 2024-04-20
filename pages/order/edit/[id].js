import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getOrder } from '../../../controllers/orderApi';
import CreateOrder from '../../../components/forms/CreateOrder';

export default function UpdateOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  return <CreateOrder orderObj={order} />;
}
