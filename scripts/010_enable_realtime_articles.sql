-- Enable realtime for the articles table
-- This allows clients to subscribe to INSERT, UPDATE, DELETE events

-- Add the articles table to the realtime publication
alter publication supabase_realtime add table articles;

-- Verify realtime is enabled (this is informational)
-- select schemaname, tablename from pg_publication_tables where pubname = 'supabase_realtime';
