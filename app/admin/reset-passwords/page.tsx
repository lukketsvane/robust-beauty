'use server';

import { createClient } from '@/lib/supabase/server';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export default async function ResetPasswordsPage() {
  const supabase = await createClient();
  
  // Generate correct password hashes
  const iverHash = await bcrypt.hash('theodore kaczynski', 10);
  const annaHash = await bcrypt.hash('arne næss', 10);
  
  // Delete existing users
  await supabase
    .from('admin_users')
    .delete()
    .in('username', ['iver', 'anna']);
  
  // Insert users with correct hashes
  const { error } = await supabase
    .from('admin_users')
    .insert([
      { username: 'iver', password_hash: iverHash, full_name: 'Iver' },
      { username: 'anna', password_hash: annaHash, full_name: 'Anna' }
    ]);
  
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }
  
  redirect('/admin/login?reset=success');
}
