'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  village: string
  provider: string
  remainingBalance: number
  bankName: string
  customerName: string
  walletBalance: number
  aadhaarNumber: string
  withdrawalAmount: number
  remainingBalanceCustomer: number
}

export default function DataEntry() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/data-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        // Handle error
        console.error('Data entry failed')
      }
    } catch (error) {
      console.error('Error submitting data:', error)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Entry</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="village" className="block text-sm font-medium text-gray-700">Village</label>
          <input
            id="village"
            {...register('village', { required: 'Village is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village.message}</p>}
        </div>

        <div>
          <label htmlFor="provider" className="block text-sm font-medium text-gray-700">Provider</label>
          <input
            id="provider"
            {...register('provider', { required: 'Provider is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.provider && <p className="text-red-500 text-xs mt-1">{errors.provider.message}</p>}
        </div>

        <div>
          <label htmlFor="remainingBalance" className="block text-sm font-medium text-gray-700">Remaining Balance</label>
          <input
            id="remainingBalance"
            type="number"
            step="0.01"
            {...register('remainingBalance', { required: 'Remaining Balance is required', min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.remainingBalance && <p className="text-red-500 text-xs mt-1">{errors.remainingBalance.message}</p>}
        </div>

        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
          <input
            id="bankName"
            {...register('bankName', { required: 'Bank Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName.message}</p>}
        </div>

        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            id="customerName"
            {...register('customerName', { required: 'Customer Name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
        </div>

        <div>
          <label htmlFor="walletBalance" className="block text-sm font-medium text-gray-700">Wallet Balance</label>
          <input
            id="walletBalance"
            type="number"
            step="0.01"
            {...register('walletBalance', { required: 'Wallet Balance is required', min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.walletBalance && <p className="text-red-500 text-xs mt-1">{errors.walletBalance.message}</p>}
        </div>

        <div>
          <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
          <input
            id="aadhaarNumber"
            {...register('aadhaarNumber', { 
              required: 'Aadhaar Number is required', 
              pattern: {
                value: /^\d{12}$/,
                message: 'Aadhaar Number must be 12 digits'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.aadhaarNumber && <p className="text-red-500 text-xs mt-1">{errors.aadhaarNumber.message}</p>}
        </div>

        <div>
          <label htmlFor="withdrawalAmount" className="block text-sm font-medium text-gray-700">Withdrawal Amount</label>
          <input
            id="withdrawalAmount"
            type="number"
            step="0.01"
            {...register('withdrawalAmount', { required: 'Withdrawal Amount is required', min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.withdrawalAmount && <p className="text-red-500 text-xs mt-1">{errors.withdrawalAmount.message}</p>}
        </div>

        <div>
          <label htmlFor="remainingBalanceCustomer" className="block text-sm font-medium text-gray-700">Remaining Balance in Customer Account</label>
          <input
            id="remainingBalanceCustomer"
            type="number"
            step="0.01"
            {...register('remainingBalanceCustomer', { required: 'Remaining Balance in Customer Account is required', min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.remainingBalanceCustomer && <p className="text-red-500 text-xs mt-1">{errors.remainingBalanceCustomer.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

