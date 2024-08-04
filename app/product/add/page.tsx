
"use client"
import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { ChevronDownIcon, Calendar, ChevronLeftIcon, Upload } from 'lucide-react';
import { db } from '../../../utils/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import {getAuth} from "firebase/auth"
import Link from "next/link"
import Image from 'next/image';
import { ProductValues } from '@/types/types';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AddProduct() {
    const [loading, setLoading] = useState(false)
  
  const { control, handleSubmit, watch, register, reset } = useForm({
    defaultValues: {
      productName: '',
      productCategory: '',
      quantity: '',
      size: { number: '', unit: '' },
      expiryDate: '',
    },
  });

  const clientAuth = getAuth();
  const user = clientAuth.currentUser;

  const onSubmit = async (data: ProductValues) => {
    setLoading(true);
    console.log("category: ", data.productCategory)
    try {
      const storeId = 'mL1vypvgas89boUL6ohg';
      const inventoryRef = doc(db, "store", storeId);
      const meatPoultryRef = doc(inventoryRef, "inventory", data.productCategory);
      const budgetRef = await setDoc(meatPoultryRef, {[data.productName]: data}, {merge: true});

    //   console.log("Document written with ID: ", budgetRef.id);
      alert('Product Added Successfully');
      reset();
    } catch (error) {
      alert('product not added');
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center mb-6">
      <Link href="/product/list">
        <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
      </Link>
        <h2 className="text-xl font-extrabold ml-2">Add product</h2>
    </div>
    <form className='flex flex-col mt-4' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block text-sm font-bold text-teal-500 mb-1">Product Name</label>
          <section className='flex w-full justify-between md:justify-center'>
            <div className="grid gap-2">
                <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover bg-gray-200"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                />
                <div className="grid grid-cols-3 gap-2">
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                    </button>
                </div>
            </div>

            <div className="relative shadow-sm w-2/3 md:w-[50%] md:ml-4 self-center">
                <Controller
                    name="productName"
                    control={control}
                    render={({ field }) => (
                        <input
                        {...field}
                        type="text"
                        placeholder="Chicken Breast"
                        className="w-full py-3.5 px-5 text-sm bg-gray-200"
                        />
                    )}
                />
            </div>
          </section>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-teal-500 mb-1">Category</label>
          <div className="relative shadow-sm">
            <Controller
              name="productCategory"
              control={control}
              render={({ field }) => (
                <input
                {...field}
                type="text"
                placeholder="Meat"
                className="w-full py-3.5 px-5 text-sm bg-gray-200"
                />
              )}
              />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-teal-500 mb-1">Quantity</label>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
                <input
                {...field}
                type='number'
                className="w-full rounded-md py-3.5 px-5 bg-gray-200 text-sm appearance-none"
                />
            )}
            />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-teal-500 mb-1">Size</label>
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative rounded-md shadow-sm">
              <Controller
              name="size.number"
              control={control}
              render={({ field }) => (
                  <input
                  {...field}
                  type='number'
                  placeholder='1'
                  className="w-full rounded-md py-3.5 px-5 bg-gray-200 text-sm appearance-none"
                  />
              )}
              />
            </div>
            <div className="flex-1 relative rounded-md shadow-sm">
            <Controller
            name="size.unit"
            control={control}
            render={({ field }) => (
              <select 
              {...field}
              className="w-full rounded-md py-3.5 px-5 bg-gray-200 text-sm appearance-none">
                <option>kg</option>
                </select>
            )}
            />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-teal-500 mb-1">Set expiry date</label>
          <div className="relative rounded-md shadow-sm">
            <Controller
              name="expiryDate"
              control={control}
              render={({ field }) => (
                  <input
                  {...field}
                  type='date'
                  className="w-full rounded-md py-3.5 px-5 bg-gray-200 text-sm appearance-none"
                  />
              )}
              />
            {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div> */}
          </div>
        </div>
        
        <section className='flex justify-center'>
          <button type="submit" className="md:w-full w-1/2 bg-teal-500 text-white py-3 px-4 rounded-2xl text-lg font-semibold" aria-disabled={loading}>
            {loading ? 'Loading' : 'Save'}
          </button>
        </section>
    </form>
    </div>
  );
}

