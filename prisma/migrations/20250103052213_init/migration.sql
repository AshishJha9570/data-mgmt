-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "remainingBalance" DOUBLE PRECISION NOT NULL,
    "bankName" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "walletBalance" DOUBLE PRECISION NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "withdrawalAmount" DOUBLE PRECISION NOT NULL,
    "currentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remainingBalanceCustomer" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
