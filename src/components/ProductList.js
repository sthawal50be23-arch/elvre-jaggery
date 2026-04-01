import React from 'react';
import './ProductList.css';

const products = [
  {
    id: 1,
    name: 'Organic Jaggery Powder',
    description: 'Pure sugarcane jaggery, rich in iron & minerals. Chemical-free and naturally processed.',
    price: 299,
    weight: '500g',
    benefits: '🌿 Boosts immunity & detoxifies body',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  {
    id: 2,
    name: 'Medicinal Jaggery',
    description: 'Herbal infused jaggery with turmeric, ginger & black pepper for immunity boost',
    price: 399,
    weight: '500g',
    benefits: '💪 Ayurvedic properties & respiratory health',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400'
  },
  {
    id: 3,
    name: 'Palm Jaggery Powder',
    description: 'Traditional palm jaggery, rich in potassium and magnesium',
    price: 349,
    weight: '500g',
    benefits: '⚡ Low glycemic index & energy booster',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  {
    id: 4,
    name: 'Jaggery Gift Pack',
    description: 'Assorted jaggery varieties in premium packaging, perfect for gifting',
    price: 599,
    weight: '1kg',
    benefits: '🎁 Includes 4 varieties - Organic, Medicinal, Palm & Syrup',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400'
  },
  {
    id: 5,
    name: 'Pure Sugarcane Jaggery',
    description: 'Traditional style jaggery, rich in antioxidants and essential minerals',
    price: 279,
    weight: '500g',
    benefits: '❤️ Improves digestion & blood purification',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  {
    id: 6,
    name: 'Jaggery Syrup',
    description: 'Ready-to-use liquid jaggery for cooking, baking & beverages',
    price: 249,
    weight: '250ml',
    benefits: '🥤 Convenient & easy to use',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  }
];

function ProductList({ addToCart }) {
  return (
    <div className="products-container">
      <div className="hero-section">
        <h1>Medicinally Pure Jaggery</h1>
        <p>Handcrafted by farmers • No chemicals • No preservatives</p>
        <div className="benefits">
          <span>🌿 Immunity Booster</span>
          <span>💪 Natural Energy</span>
          <span>❤️ Blood Purifier</span>
          <span>🫁 Respiratory Health</span>
        </div>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-badge">{product.weight}</div>
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="benefit">{product.benefits}</p>
            <p className="price">₹{product.price}</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;