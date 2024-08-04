"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { db } from '@/utils/firebase';
import { doc, getDocs, collection } from 'firebase/firestore';
import Link from 'next/link';
import { PlusCircleIcon, HomeIcon, BarChartIcon, CogIcon } from 'lucide-react';
import { ProductValues } from '@/types/types';

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductValues[]>()
  const [categories, setCategories] = useState<string[]>()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storeId = 'mL1vypvgas89boUL6ohg'; // Your specific store ID
        const storeRef = doc(db, "store", storeId);
        const inventoryCollectionRef = collection(storeRef, "inventory");
        
        const querySnapshot = await getDocs(inventoryCollectionRef);
        const productsData: ProductValues[]= [];
        const categoriesData: string[] = [];

        querySnapshot.forEach((doc) => {
          Object.keys(doc.data()).map(key => {
            productsData.push(doc.data()[key])
            categoriesData.push("All")
            categoriesData.push(doc.data()[key].productCategory)
            
          })
        });

        setProducts(productsData);
        setCategories(categoriesData.filter((item, index) => categoriesData.indexOf(item) === index));
        console.log(productsData)
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory==='All' ? products :
  products?.filter(product => product.productCategory === selectedCategory);

  const handleAddProduct = () => {
    // Navigate to Add Product page or open modal
    console.log('Add product clicked');
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        
        <div className="flex space-x-4 mb-6 overflow-x-auto overflow-hidden">
          {categories?.map(category => (
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
          {filteredProducts?.map((product, index) => (
            <Link href={`/product/${product.productCategory}/${product.productName}`} key={index} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3">
                {/* <Image 
                  src={product.imageUrl || "/orange.jpg"} 
                  alt={product.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                /> */}
              </div>
              <h3 className="font-semibold text-center mb-1">{product.productName}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.quantity}</p>
          </Link>
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
