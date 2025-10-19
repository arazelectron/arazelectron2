import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Məhsulları yüklə
      const productsResponse = await axios.get(`${API}/products`);
      setProducts(productsResponse.data);
      
      // Xüsusi məhsulları filter et
      const featured = productsResponse.data.filter(p => p.is_featured);
      setFeaturedProducts(featured);
      
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50" data-testid="home-header">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                data-testid="nav-home"
              >
                Ana Səhifə
              </button>
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                data-testid="nav-products"
              >
                Məhsullar
              </button>
              <button 
                onClick={() => scrollToSection('categories')} 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                data-testid="nav-categories"
              >
                Kateqoriyalar
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
                data-testid="nav-contact"
              >
                Əlaqə
              </button>
            </nav>
            
            <Link 
              to="/admin" 
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              data-testid="admin-link"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20" data-testid="hero-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Araz Elektron-a Xoş Gəlmisiniz</h2>
            <p className="text-xl mb-8 text-orange-100">
              Keyfiyyətli elektron məhsullar və peşəkar xidmət. 
              Kameralar, Kompüterlər, Kondisionerlər və daha çoxu!
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-lg"
                data-testid="hero-cta-products"
              >
                Məhsullara Bax
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors shadow-lg"
                data-testid="hero-cta-contact"
              >
                Bizimlə Əlaqə
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white" data-testid="featured-section">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">⭐ Xüsusi Məhsullar</h2>
              <p className="text-gray-600 text-lg">Ən populyar və yüksək keyfiyyətli məhsullarımız</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.slice(0, 6).map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-200"
                  data-testid={`featured-product-${product.id}`}
                >
                  <div className="relative">
                    <img
                      src={product.image_urls && product.image_urls.length > 0 ? product.image_urls[0] : 'https://via.placeholder.com/400x300?text=Məhsul'}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Məhsul';
                      }}
                    />
                    <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Xüsusi
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-orange-600">{product.price.toFixed(2)} ₼</span>
                      <button 
                        onClick={() => scrollToSection('contact')}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                        data-testid={`order-featured-${product.id}`}
                      >
                        Sifariş Et
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-gray-100" data-testid="categories-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">📦 Məhsul Kateqoriyaları</h2>
            <p className="text-gray-600 text-lg">Geniş məhsul çeşidi ilə xidmətinizdəyik</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const icons = ['📷', '💻', '🔊', '❄️', '💻', '🖥️', '🔌'];
              const icon = icons[index % icons.length];
              
              return (
                <div 
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    scrollToSection('products');
                  }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-500"
                  data-testid={`category-${category}`}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">{icon}</div>
                    <h3 className="text-lg font-bold text-gray-900">{category}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="products" className="py-16 bg-white" data-testid="all-products-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🛍️ Bütün Məhsullar</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                data-testid="filter-all"
              >
                Hamısı ({products.length})
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  data-testid={`filter-${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFilteredProducts().map(product => (
              <div 
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
                data-testid={`product-${product.id}`}
              >
                <img
                  src={product.image_urls && product.image_urls.length > 0 ? product.image_urls[0] : 'https://via.placeholder.com/300x200?text=Məhsul'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Məhsul';
                  }}
                />
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{product.price.toFixed(2)} ₼</span>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                      data-testid={`order-product-${product.id}`}
                    >
                      Sifariş
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getFilteredProducts().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Bu kateqoriyada məhsul tapılmadı</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white" data-testid="contact-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">📞 Bizimlə Əlaqə</h2>
            <p className="text-gray-400 text-lg">Suallarınız üçün bizimlə əlaqə saxlayın</p>
          </div>
          
          {contactInfo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* WhatsApp */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-green-400">📱 WhatsApp</h3>
                <div className="space-y-3">
                  {contactInfo.contact_groups?.whatsapp?.map((contact, index) => (
                    <a
                      key={index}
                      href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                      data-testid={`whatsapp-${index}`}
                    >
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm">{contact.phone}</div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Ustalar */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">🔧 Ustalar</h3>
                <div className="space-y-3">
                  {contactInfo.contact_groups?.ustalar?.map((contact, index) => (
                    <a
                      key={index}
                      href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                      className="block bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                      data-testid={`usta-${index}`}
                    >
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm">{contact.phone}</div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Satış */}
              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">💼 Satış</h3>
                <div className="space-y-3">
                  {contactInfo.contact_groups?.satis?.map((contact, index) => (
                    <a
                      key={index}
                      href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                      className="block bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                      data-testid={`satis-${index}`}
                    >
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm">{contact.phone}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Address & Info */}
          {contactInfo && (
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <div className="bg-gray-800 p-8 rounded-xl">
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
      <footer className="bg-black text-white py-8" data-testid="footer">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_azdili-danis/artifacts/rs4w4vbq_AE.png" 
              alt="Araz Elektron Logo"
              className="h-10 w-10 object-contain"
            />
            <h3 className="text-2xl font-bold text-orange-500">Araz Elektron</h3>
          </div>
          <p className="text-gray-400 mb-4">Keyfiyyətli elektron avadanlıqlar və peşəkar xidmət</p>
          <p className="text-gray-500 text-sm">© 2024 Araz Elektron. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;