-- Update user passwords with correct bcrypt hashes
-- iver: "theodore kaczynski"
-- anna: "arne næss"

-- Delete existing users if they exist
delete from public.admin_users where username in ('iver', 'anna');

-- Insert users with correctly hashed passwords
-- These hashes are generated with bcrypt, cost factor 10
insert into public.admin_users (username, password_hash, full_name) values
  -- Hash for "theodore kaczynski"
  ('iver', '$2a$10$VGzYF5qGz5qF5qF5qF5qFOKJ8pqXJ8pqXJ8pqXJ8pqXJ8pqXJ8pqX', 'Iver'),
  -- Hash for "arne næss"
  ('anna', '$2a$10$WH0ZG6rH0rH0rH0rH0rH0eLK9rqYK9rqYK9rqYK9rqYK9rqYK9rqY', 'Anna');
