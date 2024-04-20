import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { getOrder } from '../../controllers/orderApi';
import { getItems } from '../../controllers/itemApi';
import ItemCard from '../../components/cards/ItemCard';
import ItemOrderCard from '../../components/cards/ItemOrderCard';

export default function OrderDetails() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onUpdate = () => {
    getOrder(id)?.then(setOrder);
  };

  useEffect(() => {
    getOrder(id)?.then(setOrder);
    getItems()?.then(setItems);
  }, [id, order]);

  return (
    <div style={{ marginTop: '20px', marginLeft: '50px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Order #{order.id}: {order.status}</h1>
      <p>Order Type: {order.orderType}</p>
      <p>Name: {order.name}</p>
      <p>Phone: {order.phone} | Email: {order.email}</p>
      <h4 style={{ marginBottom: '30px', fontWeight: 'bold' }}>Total: ${order.total}</h4>

      {order.status === 'Closed' ? (
        <>
          <p>Date Closed: {order.dateClosed}</p>
          <p>Payment Type: {order.paymentType}</p>
          <h5>Tip: ${order.tip}</h5>
          <h4 style={{ fontWeight: 'bold' }}>Total + Tip: ${order.totalPlusTip}</h4>
        </>
      )
        : null}

      {order.status === 'Open' && (
        <>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{
              margin: '0 auto', width: '100px', fontSize: '12px', border: '1px solid gray', backgroundColor: 'transparent', color: 'white', marginBottom: '5px', marginRight: '10px',
            }}
          >
            Add Items
          </Button>
          <Link passHref href={`/order/close/${id}`}>
            <Button
              type="click"
              variant="danger"
              style={{
                margin: '0 auto', width: '100px', fontSize: '12px', border: '1px solid gray', backgroundColor: 'red', color: 'white', marginBottom: '5px', marginRight: '10px',
              }}
            >Close Order
            </Button>
          </Link>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="modalHead">
              <Modal.Title style={{ marginLeft: '165px' }}>Add An Item</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBod">
              <div className="itemList">
                {items?.map((item) => (
                  <ItemCard key={item.id} itemObj={item} orderId={order.id} onUpdate={onUpdate} />
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#484743' }}>
              <Button variant="danger" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      <h1 style={{ fontSize: '20px', marginTop: '20px' }}>Order Items:</h1>
      <div className="d-flex flex-wrap">
        {order.items?.map((item) => (
          <ItemOrderCard key={item.id} itemObj={item} orderId={order.id} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}
