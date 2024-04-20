import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrder } from '../../controllers/orderApi';

export default function OrderCard({ orderObj }) {
  const deleteThis = () => {
    if (window.confirm(`Are you sure you want to delete order #${orderObj.id}?`)) {
      deleteOrder(orderObj.id);
    }
  };

  return (
    <div>
      <Card className="oCard" style={{ width: '18rem' }}>
        <Card.Title style={{
          fontSize: '18px', marginLeft: '10px', marginTop: '20px', color: '#136979', fontWeight: 'bold',
        }}
        >Order#: {orderObj.id}
        </Card.Title>
        <h4 style={{ fontSize: '14px', marginLeft: '10px' }}>{orderObj.status}</h4>
        <p style={{ fontSize: '14px', marginLeft: '10px' }}>Order Type: {orderObj.orderType}</p>
        <Card.Text style={{ marginLeft: '10px', fontSize: '11px' }}>
          <p>Name: {orderObj.name}</p>
          <p>Phone: {orderObj.phone}</p>
          <p>Email: {orderObj.email}</p>
        </Card.Text>
        <div className="cardBtns" style={{ margin: '0 auto', marginBottom: '10px' }}>
          <Link passHref href={`/order/${orderObj.id}`}>
            <Button
              className="cardBtn"
              variant="danger"
              style={{
                width: '90px', fontSize: '12px', margin: '0 auto', marginRight: '5px',
              }}
            >View
            </Button>
          </Link>
          <Link passHref href={`/order/edit/${orderObj.id}`}>
            <Button
              className="cardBtn"
              variant="primary"
              style={{
                width: '90px', fontSize: '12px', margin: '0 auto', marginRight: '5px',
              }}
            >Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            type="click"
            onClick={deleteThis}
            style={{
              width: '90px', fontSize: '12px', margin: '0 auto',
            }}
          >Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    orderType: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
