// Run this script locally with: node --loader ts-node/esm scripts/generate-password-hashes.ts
import bcrypt from 'bcryptjs';

async function generateHashes() {
  const iverPassword = 'theodore kaczynski';
  const annaPassword = 'arne næss';
  
  const iverHash = await bcrypt.hash(iverPassword, 10);
  const annaHash = await bcrypt.hash(annaPassword, 10);
  
  console.log('Iver hash:', iverHash);
  console.log('Anna hash:', annaHash);
  
  console.log('\nSQL to run:');
  console.log(`delete from public.admin_users where username in ('iver', 'anna');`);
  console.log(`insert into public.admin_users (username, password_hash, full_name) values`);
  console.log(`  ('iver', '${iverHash}', 'Iver'),`);
  console.log(`  ('anna', '${annaHash}', 'Anna');`);
}

generateHashes();
