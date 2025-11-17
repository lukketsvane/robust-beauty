-- Create articles table for CMS content
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  featured_image_url text,
  author_id uuid references auth.users(id) on delete cascade,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.articles enable row level security;

-- Allow anyone to view published articles
create policy "articles_select_published"
  on public.articles for select
  using (published = true);

-- Allow authenticated users to view all articles (for admin)
create policy "articles_select_authenticated"
  on public.articles for select
  using (auth.role() = 'authenticated');

-- Allow authenticated users to insert articles
create policy "articles_insert_authenticated"
  on public.articles for insert
  with check (auth.role() = 'authenticated' and auth.uid() = author_id);

-- Allow authenticated users to update their own articles
create policy "articles_update_own"
  on public.articles for update
  using (auth.role() = 'authenticated' and auth.uid() = author_id);

-- Allow authenticated users to delete their own articles
create policy "articles_delete_own"
  on public.articles for delete
  using (auth.role() = 'authenticated' and auth.uid() = author_id);

-- Create index on slug for faster lookups
create index if not exists articles_slug_idx on public.articles(slug);

-- Create index on published for faster filtering
create index if not exists articles_published_idx on public.articles(published);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger articles_updated_at
  before update on public.articles
  for each row
  execute function public.handle_updated_at();
