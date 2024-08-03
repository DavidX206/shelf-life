
"use client"
import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { ChevronDownIcon, Calendar, ChevronLeftIcon } from 'lucide-react';
// import { createClient } from '@supabase/supabase-js';
// import { db } from '@/utils/firebase/client';
// import { doc, addDoc, collection } from 'firebase/firestore';
// import {getAuth} from "firebase/auth"
import Link from "next/link"

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AddProduct() {
  
  const { control, handleSubmit, watch, register, reset } = useForm({
    defaultValues: {
      productName: '',
      productCategory: '',
      quantity: '',
      size: { number: '', unit: '' },
      expiryDate: '',
    },
  });

//   const clientAuth = getAuth();
//   const user = clientAuth.currentUser;

//   const onSubmit = async (data: BudgetValues) => {
//     setLoading(true);
//     try {

//       const budgetRef = await addDoc(collection(doc(db, "User", user!.uid), "budgets"), data);

//       console.log("Document written with ID: ", budgetRef.id);
//       alert('Budget Created Successfully');
//       reset();
//     } catch (error) {
//       console.error('Error adding document: ', error);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center mb-6">
      <Link href="/product/list">
        <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
      </Link>
        <h2 className="text-xl font-extrabold ml-2">Add product</h2>
    </div>
    <form className='flex flex-col mt-4'>
        <div className="mb-6">
          <label className="block text-sm font-bold text-teal-500 mb-1">Product Name</label>
          <div className="relative shadow-sm">
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
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-teal-500 mb-1">Category</label>
          <div className="relative shadow-sm">
            <Controller
              name="productCategory"
              control={control}
              render={({ field }) => (
                  <select
                  {...field}
                  className="w-full py-3.5 px-5 bg-gray-200 text-sm appearance-none">
                      <option>Meat & Poultry</option>
                      {/* Add other categories */}
                  </select>
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
          <button type="submit" className="md:w-full w-1/2 bg-teal-500 text-white py-3 px-4 rounded-2xl text-lg font-semibold">
            Save
          </button>
        </section>
    </form>
    </div>
  );
}

