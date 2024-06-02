//write code for basic api 

import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json({ message: 'Hello, world!' });
}