import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Məhsulları yüklə
      const productsResponse = await axios.get(`${API}/products`);
      setProducts(productsResponse.data || []);
      
      // Kateqoriyaları yüklə
      const categoriesResponse = await axios.get(`${API}/categories`);
      setCategories(categoriesResponse.data.categories || []);
      
      // Əlaqə məlumatlarını yüklə
      const contactResponse = await axios.get(`${API}/contact-info`);
      setContactInfo(contactResponse.data);
      
    } catch (error) {
      console.error('Məlumat yükləmə xətası:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_azdili-danis/artifacts/rs4w4vbq_AE.png" 
                alt="Araz Elektron Logo"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-orange-600">Araz Elektron</h1>
                <p className="text-sm text-gray-600">Keyfiyyətli elektron avadanlıqlar</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sol tərəf - Kataloq */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📦 Kataloq</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hamısı ({products.length})
                </button>
                
                {categories.map(category => {
                  const count = products.filter(p => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Sağ tərəf - Məhsullar */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'all' ? 'Bütün Məhsullar' : selectedCategory}
              </h2>
              <p className="text-gray-600">{getFilteredProducts().length} məhsul tapıldı</p>
            </div>

            {/* Məhsul Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredProducts().map(product => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Şəkil */}
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
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
                    <div className="mb-2">
                      <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">{product.price.toFixed(2)} ₼</span>
                      <button 
                        onClick={() => {
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                      >
                        Sifariş Et
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {getFilteredProducts().length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 text-lg">Bu kateqoriyada məhsul tapılmadı</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Əlaqə Hissəsi - Aşağıda */}
      <section id="contact" className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">📞 Bizimlə Əlaqə</h2>
            <p className="text-gray-400">Suallarınız üçün bizimlə əlaqə saxlayın</p>
          </div>
          
          {contactInfo && (
            <div>
              {/* Əlaqə Qrupları */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* WhatsApp */}
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-green-400">📱 WhatsApp</h3>
                  <div className="space-y-3">
                    {contactInfo.contact_groups?.whatsapp?.map((contact, index) => (
                      <a
                        key={index}
                        href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm">{contact.phone}</div>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Ustalar */}
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">🔧 Ustalar</h3>
                  <div className="space-y-3">
                    {contactInfo.contact_groups?.ustalar?.map((contact, index) => (
                      <a
                        key={index}
                        href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                        className="block bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm">{contact.phone}</div>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Satış */}
                <div className="bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-orange-400">💼 Satış</h3>
                  <div className="space-y-3">
                    {contactInfo.contact_groups?.satis?.map((contact, index) => (
                      <a
                        key={index}
                        href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                        className="block bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm">{contact.phone}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ünvan və Digər Məlumatlar */}
              <div className="bg-gray-800 p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-4">📍 Ünvan</h3>
                <p className="text-gray-300 mb-2">{contactInfo.address_line1}</p>
                <p className="text-gray-300 mb-2">{contactInfo.address_line2}</p>
                <p className="text-gray-300 mb-4">{contactInfo.address_line3}</p>
                <p className="text-gray-400 mb-2">🕒 {contactInfo.work_hours}</p>
                <p className="text-gray-400 italic">{contactInfo.company_description}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_azdili-danis/artifacts/rs4w4vbq_AE.png" 
              alt="Araz Elektron Logo"
              className="h-10 w-10 object-contain"
            />
            <h3 className="text-xl font-bold text-orange-500">Araz Elektron</h3>
          </div>
          <p className="text-gray-400 mb-2">Keyfiyyətli elektron avadanlıqlar və peşəkar xidmət</p>
          <p className="text-gray-500 text-sm">© 2024 Araz Elektron. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;