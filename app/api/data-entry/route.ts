import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const {
    village,
    provider,
    remainingBalance,
    bankName,
    customerName,
    walletBalance,
    aadhaarNumber,
    withdrawalAmount,
    remainingBalanceCustomer
  } = body

  try {
    const entry = await prisma.entry.create({
      data: {
        village,
        provider,
        remainingBalance,
        bankName,
        customerName,
        walletBalance,
        aadhaarNumber,
        withdrawalAmount,
        remainingBalanceCustomer
      }
    })

    return NextResponse.json({ message: 'Data entry successful', entry }, { status: 201 })
  } catch (error) {
    console.error('Error creating entry:', error)
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
  }
}

