-- CreateTable
CREATE TABLE "conversion_rates" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAssets" TEXT NOT NULL,
    "totalSupply" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "conversion_rates_pkey" PRIMARY KEY ("id")
);
