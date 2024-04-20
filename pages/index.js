/* eslint-disable @next/next/no-img-element */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column "
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '100px',
      }}
    >
      <img
        src="https://i.ibb.co/pyDZKBg/hhpw2.png"
        alt="hhpw2"
        style={{ width: '300px', height: '300px', margin: '0 auto' }}
      />
      <h2>Welcome {user.fbUser.displayName}! </h2>
      <div style={{ display: 'flex' }}>
        <Link passHref href="/orders">
          <Button
            type="click"
            className="homeClick"
            style={{
              width: '150px', border: 'solid 1.5px #d1a166', backgroundColor: '#BF290F', fontSize: '12px',
            }}
          >View Orders
          </Button>
        </Link>
        <Link passHref href="/order/new">
          <Button
            type="click"
            className="homeClick"
            style={{
              width: '150px', border: 'solid 1.5px #d1a166', backgroundColor: '#BF290F', fontSize: '12px',
            }}
          >Create Order
          </Button>
        </Link>
        <Link passHref href="/revenue">
          <Button
            type="click"
            className="homeClick"
            style={{
              width: '150px', border: 'solid 1.5px #d1a166', backgroundColor: '#BF290F', fontSize: '12px',
            }}
          >View Revenue
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
