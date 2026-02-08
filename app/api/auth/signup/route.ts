
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // In a real app, hash password here
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password, // Storing plain text for this demo
            },
        });

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
    }
}
