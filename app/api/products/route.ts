
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    try {
        const products = await prisma.product.findMany({
            where: category ? {
                category: {
                    equals: category,
                }
            } : undefined,
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return NextResponse.json({
            error: 'Failed to fetch products',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
