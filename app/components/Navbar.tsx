'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Data Entry App
        </Link>
        <div className="space-x-4">
          {session ? (
            <>
              <Link href="/dashboard" className="text-white hover:text-blue-200">
                Dashboard
              </Link>
              <Link href="/data-entry" className="text-white hover:text-blue-200">
                Data Entry
              </Link>
              <button
                onClick={() => signOut()}
                className="text-white hover:text-blue-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-blue-200">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:text-blue-200">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

