import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

// Demo məhsullar (backend işləməsə)
const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Hikvision DS-2CD2143G0-IS',
    description: '4MP IP Kamera, POE dəstəyi, İnfraqırmızı gecə görüşü, H.265+ kodlama',
    price: 250.00,
    category: 'Kamera',
    image_urls: []
  },
  {
    id: '2',
    name: 'Dell OptiPlex 7090',
    description: 'Desktop kompüter, Intel Core i7, 16GB RAM, 512GB SSD',
    price: 1450.00,
    category: 'Kompüterlər',
    image_urls: []
  },
  {
    id: '3',
    name: 'JBL Charge 5',
    description: 'Portativ Bluetooth dinamik, Su keçirməyən, 20 saat batareya',
    price: 180.00,
    category: 'Səs Sistemləri',
    image_urls: []
  },
  {
    id: '4',
    name: 'LG Dual Inverter 12',
    description: 'Kondisioner 12000 BTU, Enerji səmərəli A++ sinif',
    price: 899.00,
    category: 'Kondisionerlər',
    image_urls: []
  },
  {
    id: '5',
    name: 'Samsung 55" QLED 4K',
    description: 'Smart TV, Quantum Dot texnologiyası, HDR10+',
    price: 1699.00,
    category: 'Televizorlar',
    image_urls: []
  },
  {
    id: '6',
    name: 'MacBook Air M2',
    description: 'Noutbuk, Apple M2 çip, 8GB RAM, 256GB SSD',
    price: 2100.00,
    category: 'Noutbuklar',
    image_urls: []
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Məhsul yükləmə xətası:', error);
      // Backend işləməsə demo məhsulları göstər
      setProducts(DEMO_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Başlıq */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bütün Məhsullar</h1>
          <p className="text-gray-600">{products.length} məhsul tapıldı</p>
        </div>

        {/* Məhsul Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              data-testid={`product-card-${product.id}`}
            >
              {/* Şəkil */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                {product.image_urls && product.image_urls.length > 0 ? (
                  <img
                    src={product.image_urls[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="text-gray-400 text-center p-4">Şəkil Yoxdur</div>';
                    }}
                  />
                ) : (
                  <div className="text-gray-400 text-center p-4">Şəkil Yoxdur</div>
                )}
              </div>

              {/* Məzmun */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">{product.price.toFixed(2)} ₼</span>
                  <button 
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                    data-testid={`product-detail-${product.id}`}
                  >
                    Detallar üçün kliklə
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Məhsul tapılmadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;