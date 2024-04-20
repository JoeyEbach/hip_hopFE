import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { removeItem } from '../../controllers/orderApi';

export default function ItemOrderCard({ itemObj, orderId, onUpdate }) {
  const remove = () => {
    removeItem(orderId, itemObj.id).then(() => onUpdate);
  };

  return (
    <div>
      <Card className="oCard" style={{ width: '18rem', marginRight: '10px' }}>
        <Card.Title style={{
          fontSize: '16px', fontWeight: 'bold', marginLeft: '10px', marginTop: '10px',
        }}
        >{itemObj.orderItem}
        </Card.Title>
        <h4 style={{ fontSize: '14px', marginLeft: '10px' }}>${itemObj.itemPrice}</h4>
        <Button
          onClick={remove}
          variant="primary"
          style={{
            margin: '0 auto', width: '100px', fontSize: '12px', border: '1px solid gray', backgroundColor: 'transparent', color: 'red', marginBottom: '5px',
          }}
        >Remove
        </Button>
      </Card>
    </div>
  );
}

ItemOrderCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    orderItem: PropTypes.string,
    itemPrice: PropTypes.number,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
