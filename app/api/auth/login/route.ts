import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!validateCredentials(username, password)) {
      return NextResponse.json(
        { error: 'Ugyldig brukernavn eller passord' },
        { status: 401 }
      );
    }

    // Set secure session cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'En feil oppstod' },
      { status: 500 }
    );
  }
}
