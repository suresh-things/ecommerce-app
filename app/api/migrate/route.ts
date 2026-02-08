import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Run raw SQL to create tables
        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "User" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "email" TEXT NOT NULL UNIQUE,
                "name" TEXT,
                "password" TEXT NOT NULL,
                "role" TEXT NOT NULL DEFAULT 'USER',
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP(3) NOT NULL
            );
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "Product" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "name" TEXT NOT NULL,
                "description" TEXT NOT NULL,
                "price" DOUBLE PRECISION NOT NULL,
                "currency" TEXT NOT NULL DEFAULT 'USD',
                "image" TEXT NOT NULL,
                "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
                "reviews" INTEGER NOT NULL DEFAULT 0,
                "category" TEXT NOT NULL,
                "inStock" BOOLEAN NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP(3) NOT NULL
            );
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "Order" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "userId" TEXT,
                "totalAmount" DOUBLE PRECISION NOT NULL,
                "status" TEXT NOT NULL DEFAULT 'PENDING',
                "shippingDetails" TEXT NOT NULL,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP(3) NOT NULL,
                CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
            );
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "OrderItem" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "orderId" TEXT NOT NULL,
                "productId" TEXT NOT NULL,
                "quantity" INTEGER NOT NULL,
                "price" DOUBLE PRECISION NOT NULL,
                CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
                CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE
            );
        `);

        // Create indexes
        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
        `);

        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");
        `);

        await prisma.$executeRawUnsafe(`
            CREATE INDEX IF NOT EXISTS "OrderItem_productId_idx" ON "OrderItem"("productId");
        `);

        return NextResponse.json({
            message: 'Database tables created successfully! Now visit /api/seed to populate with data.'
        });
    } catch (error: any) {
        console.error('Migration error:', error);
        return NextResponse.json({
            error: 'Migration failed',
            details: error.message
        }, { status: 500 });
    }
}
