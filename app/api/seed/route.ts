
import prisma from '@/lib/prisma';
import { PRODUCTS } from '@/lib/mockData';
import { NextResponse } from 'next/server';

export async function GET() {
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
    }

    try {
        // Clear existing data
        await prisma.orderItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();

        // Insert products
        for (const product of PRODUCTS) {
            await prisma.product.create({
                data: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    currency: product.currency,
                    image: product.image,
                    rating: product.rating,
                    reviews: product.reviews,
                    category: product.category,
                    inStock: product.inStock,
                }
            });
        }

        return NextResponse.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Seeding failed', details: String(error) }, { status: 500 });
    }
}
