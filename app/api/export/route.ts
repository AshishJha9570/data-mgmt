import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]/route'
import ExcelJS from 'exceljs'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  let whereClause = {}

  if (startDate && endDate) {
    whereClause = {
      currentDate: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    }
  }

  try {
    const entries = await prisma.entry.findMany({
      where: whereClause,
      orderBy: {
        currentDate: 'desc',
      },
    })

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Entries')

    worksheet.columns = [
      { header: 'Village', key: 'village', width: 20 },
      { header: 'Provider', key: 'provider', width: 20 },
      { header: 'Remaining Balance', key: 'remainingBalance', width: 20 },
      { header: 'Bank Name', key: 'bankName', width: 20 },
      { header: 'Customer Name', key: 'customerName', width: 20 },
      { header: 'Wallet Balance', key: 'walletBalance', width: 20 },
      { header: 'Aadhaar Number', key: 'aadhaarNumber', width: 20 },
      { header: 'Withdrawal Amount', key: 'withdrawalAmount', width: 20 },
      { header: 'Date', key: 'currentDate', width: 20 },
      { header: 'Time', key: 'currentTime', width: 20 },
      { header: 'Remaining Balance (Customer)', key: 'remainingBalanceCustomer', width: 25 },
    ]

    entries.forEach((entry) => {
      worksheet.addRow({
        ...entry,
        currentDate: new Date(entry.currentDate).toISOString().split('T')[0],
        currentTime: new Date(entry.currentTime).toLocaleTimeString(),
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=entries.xlsx',
      },
    })
  } catch (error) {
    console.error('Error exporting entries:', error)
    return NextResponse.json({ error: 'Failed to export entries' }, { status: 500 })
  }
}

