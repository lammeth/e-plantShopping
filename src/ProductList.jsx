import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://sargentsgardens.com/wp-content/uploads/2024/12/Photo-Dec-17-2024-10-00-28-AM-scaled.jpg",
          description: "Purifies Indoor Air Naturally.",
          cost: "$26",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/960px-Single_lavender_flower02.jpg",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Gardenia",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Gardeniaflower.jpg/960px-Gardeniaflower.jpg",
          description: "Produces strong, pleasant scents.",
          cost: "$30",
        },
        {
          name: "Rosemary",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/960px-Rosemary_in_bloom.JPG",
          description: "An aromatic herb that also works indoors.",
          cost: "$15",
        },
      ],
    },
    {
      category: "Medicinal Plant",
      plants: [
        {
          name: "Aloe vera",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png",
          description:
            "Used to make topical medications for skin conditions, burns, wounds, frostbite.",
          cost: "$20",
        },
        {
          name: "Foxglove",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/7/74/Digitalis_purpurea2.jpg",
          description:
            "The plant was used on heart conditions long before the glycoside was identified.",
          cost: "$18",
        },
        {
          name: "Thyme",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flowering_thyme.JPG/1280px-Flowering_thyme.JPG",
          description:
            "Contains the monoterpene thymol, an antiseptic and antifungal.",
          cost: "$23",
        },
      ],
    },
  ];

  const isInCart = (plantName) =>
    cartItems.some(item => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowPlants(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
    setShowPlants(true);
  };

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="tag">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="Logo"
          />

          <div
            className="tag_home_link"
            onClick={(e) => {
              e.preventDefault();
              onHomeClick();
            }}
            role="button"
            tabIndex={0}
          >
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </div>

        <div className="luxury">
          <ul className="ul">
            <li>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handlePlantsClick(e);
                }}
              >
                Plants
              </a>
            </li>

            <li className="cart">
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleCartClick(e);
                }}
              >
                🛒
                {totalCartQuantity > 0 && (
                  <span className="cart_quantity_count">
                    {totalCartQuantity}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-grid">
          {plantsArray.map(category => (
            <div key={category.category}>
              <h2 className="plant_heading">{category.category}</h2>

              <div className="plants-category">
                {category.plants.map(plant => (
                  <div className="plant-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>

                    <button
                      className={`product-button ${
                        isInCart(plant.name) ? 'added-to-cart' : ''
                      }`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name)
                        ? 'Added to Cart'
                        : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
