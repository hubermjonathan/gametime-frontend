import React, {useState} from 'react';

import { Jumbotron , Container } from 'react-bootstrap';



import Header from '../Header/Header';

import StoreContext from './context';
import ItemGrid from './ItemGrid';

import './Store.scss';

const Store = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

const Content = () => {
    const [cart, setCart] = useState([]);

    const addCart = (item) => {
        const temp = cart;
        temp.push(item);
        setCart(item);
    };

    const removeCart = (item) => {
        const temp = cart;
        const index = temp.indexOf(item);
        if (index > -1) {
          temp.splice(index, 1);
          setCart(temp);
        }
    };

    return (
      <div>
        <StoreContext.Provider
          value={{
                cart,
                addCart,
                removeCart,
                setCart
            }}
        >
          <Jumbotron fluid>
            <Container>
              <h1>Welcome to the team store</h1>
            </Container>
          </Jumbotron>
          <ItemGrid />
          <div className="break" />
        </StoreContext.Provider>
      </div>
    );
};

export default Store;
