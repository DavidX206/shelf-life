"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ChevronLeftIcon } from 'lucide-react';
import Link from "next/link";
import { ProductValues } from '@/types/types';

export default function ProductDetails({params}: {params: {id: string, category: string}}) {
  const [product, setProduct] = useState<ProductValues | null>(null);
  const [loading, setLoading] = useState(true);
  const search = useSearchParams();
  const id = (params.id).replace(/%20/g, " ")
  const category = (params.category).replace(/%20/g, " ")

  useEffect(() => {
    async function fetchProduct() {
    console.log('just started')
    console.log(id, category)
      if (id && category) {
        try {
          const storeId = 'mL1vypvgas89boUL6ohg';
          const inventoryRef = doc(db, "store", storeId);
          const productRef = doc(inventoryRef, "inventory", category as string);
          const productSnap = await getDoc(productRef);

          if (productSnap.exists()) {
            const singleObject = Object.entries(productSnap.data()).find(([key, obj]) => obj.productName===id) as [string, ProductValues];
            const [key, value] = singleObject;
            setProduct(value);
            console.log("Found document")
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product: ", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchProduct();
  }, [id, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-6">
        <Link href="/product/list">
          <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
        </Link>
        <h2 className="text-xl font-extrabold ml-2">Product Details</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-teal-500">Product Name</h3>
        <p className="text-gray-700">{product.productName}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-teal-500">Category</h3>
        <p className="text-gray-700">{product.productCategory}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-teal-500">Quantity</h3>
        <p className="text-gray-700">{product.quantity}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-teal-500">Size</h3>
        <p className="text-gray-700">{`${product.size.number} ${product.size.unit}`}</p>
      </div>

      {product.expiryDate && <div className="mb-6">
        <h3 className="text-lg font-bold text-teal-500">Expiry Date</h3>
        <p className="text-gray-700">{new Date(product.expiryDate).toLocaleDateString()}</p>
      </div>}

      <div className="flex justify-around mt-8">
        <Link href={`/product/edit/${id}`}>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Edit
          </button>
        </Link>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}