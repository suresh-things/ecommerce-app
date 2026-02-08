
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, userId, shippingDetails, totalAmount } = body;

        // Validate items
        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const order = await prisma.$transaction(async (tx: any) => {
            // Create order
            const newOrder = await tx.order.create({
                data: {
                    userId: userId || null,
                    totalAmount: Number(totalAmount),
                    status: 'PENDING',
                    shippingDetails: JSON.stringify(shippingDetails),
                    items: {
                        create: items.map((item: any) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: {
                    items: true
                }
            });

            return newOrder;
        });

        return NextResponse.json({ success: true, orderId: order.id });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
    }
}
