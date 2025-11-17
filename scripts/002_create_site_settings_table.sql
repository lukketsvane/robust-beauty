-- Create site_settings table for editable site content
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.site_settings enable row level security;

-- Allow anyone to read settings
create policy "site_settings_select_all"
  on public.site_settings for select
  using (true);

-- Allow authenticated users to update settings
create policy "site_settings_update_authenticated"
  on public.site_settings for update
  using (auth.role() = 'authenticated');

-- Allow authenticated users to insert settings
create policy "site_settings_insert_authenticated"
  on public.site_settings for insert
  with check (auth.role() = 'authenticated');

-- Create updated_at trigger
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row
  execute function public.handle_updated_at();

-- Insert default settings
insert into public.site_settings (key, value) values
  ('hero_title', '"Foreningen ROBUST"'::jsonb),
  ('hero_subtitle', '"En kunnskapskollektiv om degrowth og post-kapitalistiske fremtider"'::jsonb),
  ('about_text', '"ROBUST er en forening som jobber med å utforske alternative økonomiske modeller og bærekraftige samfunnsstrukturer."'::jsonb)
on conflict (key) do nothing;
