"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircleIcon, HomeIcon, BarChartIcon, CogIcon } from 'lucide-react';

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('Produce');
  const [products, setProducts] = useState([
    { name: 'Orange', quantity: '1 kg', expiryDate: 'Expires in 5 days', category: 'Produce' },
    { name: 'Banana', quantity: '1 kg', expiryDate: 'Expires in 3 days', category: 'Produce' },
    { name: 'Chicken', quantity: '500 gr', expiryDate: 'Expires in 2 days', category: 'Meat & Poultry' },
    { name: 'Cheese', quantity: '200 gr', expiryDate: 'Expires in 10 days', category: 'Dairy' },
  ]);

  const categories = ['Produce', 'Meat & Poultry', 'Dairy', 'Condiments'];

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  const handleAddProduct = () => {
    // Navigate to Add Product page or open modal
    console.log('Add product clicked');
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">myfridge</h1>
        
        <div className="flex space-x-4 mb-6 overflow-x-auto overflow-hidden">
          {categories.map(category => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-gray-600'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
              {/* Product content */}
            </div>
          ))}
        </div>
      </div>

      <Link className="fixed bottom-4 right-4" href={'/product/add'}>
        <button 
          className="bg-teal-500 text-white p-3 rounded-full shadow-lg"
          onClick={handleAddProduct}
        >
          <PlusCircleIcon className="h-8 w-8" />
        </button>
      </Link>

      <nav className="bg-white border-t border-gray-200 px-4 py-3">
        {/* Navigation content */}
      </nav>
    </div>
  );
}
