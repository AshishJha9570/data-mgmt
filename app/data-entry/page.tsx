'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  village: string
  provider: string
  remainingBalance: string
  bankName: string
  customerName: string
  walletBalance: string
  aadhaarNumber: string
  withdrawalAmount: string
  remainingBalanceCustomer: string
}

export default function DataEntry() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      village: 'Navkarhi', // Default value for village
      provider: 'Spice',   // Default value for provider
      remainingBalance: '',
      bankName: '',
      customerName: '',
      walletBalance: '',
      aadhaarNumber: '',
      withdrawalAmount: '',
      remainingBalanceCustomer: '',
    }
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/data-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          remainingBalance: parseFloat(data.remainingBalance),
          walletBalance: parseFloat(data.walletBalance),
          withdrawalAmount: parseFloat(data.withdrawalAmount),
          remainingBalanceCustomer: parseFloat(data.remainingBalanceCustomer)
        }),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        console.error('Data entry failed:', errorData.error)
      }
    } catch (error) {
      console.error('Error submitting data:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Data Entry</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'Village', id: 'village', required: true },
          { label: 'Provider', id: 'provider', required: true },
          { label: 'Remaining Balance', id: 'remainingBalance', type: 'number', required: true },
          { label: 'Bank Name', id: 'bankName', required: true },
          { label: 'Customer Name', id: 'customerName', required: true },
          { label: 'Wallet Balance', id: 'walletBalance', type: 'number', required: true },
          { label: 'Aadhaar Number', id: 'aadhaarNumber', required: true, pattern: /^\d{12}$/, patternMessage: 'Aadhaar Number must be 12 digits' },
          { label: 'Withdrawal Amount', id: 'withdrawalAmount', type: 'number', required: true },
          { label: 'Remaining Balance in Customer Account', id: 'remainingBalanceCustomer', type: 'number', required: true },
        ].map(({ label, id, type = 'text', required, pattern, patternMessage }) => (
          <div key={id} className="flex flex-col">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              id={id}
              type={type}
              {...register(id, {
                required: required ? `${label} is required` : false,
                pattern: pattern ? { value: pattern, message: patternMessage } : undefined,
                min: type === 'number' ? 0 : undefined
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2 transition duration-200 ease-in-out"
            />
            {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-1 md:col-span-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in -out disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}