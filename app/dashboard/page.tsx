'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

type Entry = {
  id: string
  village: string
  provider: string
  remainingBalance: number
  bankName: string
  customerName: string
  walletBalance: number
  aadhaarNumber: string
  withdrawalAmount: number
  currentDate: string
  currentTime: string
  remainingBalanceCustomer: number
}

export default function Dashboard() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries')
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      } else {
        console.error('Failed to fetch entries')
      }
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const handleFilter = async () => {
    try {
      const response = await fetch(`/api/entries?startDate=${startDate}&endDate=${endDate}`)
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      } else {
        console.error('Failed to fetch filtered entries')
      }
    } catch (error) {
      console.error('Error fetching filtered entries:', error)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch(`/api/export?startDate=${startDate}&endDate=${endDate}`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'entries.xlsx'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Failed to export entries')
      }
    } catch (error) {
      console.error('Error exporting entries:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filter
        </button>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export to Excel
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Village</th>
            <th className="border p-2">Provider</th>
            <th className="border p-2">Remaining Balance</th>
            <th className="border p-2">Bank Name</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Wallet Balance</th>
            <th className="border p-2">Aadhaar Number</th>
            <th className="border p-2">Withdrawal Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Remaining Balance (Customer)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td className="border p-2">{entry.village}</td>
              <td className="border p-2">{entry.provider}</td>
              <td className="border p-2">{entry.remainingBalance}</td>
              <td className="border p-2">{entry.bankName}</td>
              <td className="border p-2">{entry.customerName}</td>
              <td className="border p-2">{entry.walletBalance}</td>
              <td className="border p-2">{entry.aadhaarNumber}</td>
              <td className="border p-2">{entry.withdrawalAmount}</td>
              <td className="border p-2">{format(new Date(entry.currentDate), 'yyyy-MM-dd')}</td>
              <td className="border p-2">{format(new Date(entry.currentTime), 'HH:mm:ss')}</td>
              <td className="border p-2">{entry.remainingBalanceCustomer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

