import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('API error:', err));
  }, []);

  const handleColorChange = (index, color) => {
    setSelectedColors(prev => ({ ...prev, [index]: color }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="#f5c28b" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" color="#f5c28b" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} color="#f5c28b" />);
    }

    return stars;
  };

  const colorOptions = [
    { name: 'Yellow Gold', value: 'yellow', hex: '#E6CA97' },
    { name: 'White Gold', value: 'white', hex: '#D9D9D9' },
    { name: 'Rose Gold', value: 'rose', hex: '#E1A4A9' }
  ];

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1280px',
      margin: '0 auto',
      backgroundColor: '#1a1a1a',
      color: '#fff'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Product List</h1>

      <Swiper
        modules={[Navigation, Scrollbar]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        style={{ paddingBottom: '40px' }}
      >
        {products.map((product, index) => {
          const selectedColor = selectedColors[index] || 'yellow';
          const selectedColorName = colorOptions.find(c => c.value === selectedColor)?.name || '';

          return (
            <SwiperSlide key={index}>
  <div
    style={{
      backgroundColor: '#2a2a2a',
      borderRadius: '16px',
      padding: '1rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      height: '100%',
      minHeight: '430px',
    }}
  >
    <img
      src={product.images[selectedColor]}
      alt={product.name}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'contain',
        borderRadius: '10px',
        marginBottom: '1rem',
        background: '#fff'
      }}
    />
    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{product.name}</h3>
    <p style={{ color: '#f8c291', fontWeight: 600, marginBottom: '0.3rem' }}>
      ${product.price} USD
    </p>

    {/* Renk Seçenekleri */}
    <div style={{ display: 'flex', gap: '12px', marginBottom: '0.5rem' }}>
      {colorOptions.map(color => (
        <button
          key={color.value}
          onClick={() => handleColorChange(index, color.value)}
          title={color.name}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: color.hex,
            border: selectedColor === color.value
              ? '2px solid #fff'
              : '1px solid #999',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>

    {/* Seçili Renk İsmi */}
    <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '0.8rem' }}>
      {colorOptions.find(c => c.value === selectedColor)?.name + ' Gold'}
    </div>

    {/* Popülarite */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <div style={{ display: 'flex', gap: '2px' }}>{renderStars(product.popularity)}</div>
      <span style={{ fontSize: '0.85rem', color: '#ccc' }}>{product.popularity}/5</span>
    </div>
  </div>
</SwiperSlide>

          );
        })}
      </Swiper>
    </div>
  );
}

export default App;
