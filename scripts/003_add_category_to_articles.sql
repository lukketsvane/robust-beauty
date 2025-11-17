-- Add category column to articles table to organize content by section
alter table public.articles add column if not exists category text;

-- Create index on category for faster filtering
create index if not exists articles_category_idx on public.articles(category);

-- Add constraint to ensure category is one of the valid sections
alter table public.articles add constraint articles_category_check 
  check (category in ('om-oss', 'prosjekter', 'i-media', 'kontakt', null));
