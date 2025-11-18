-- Create content_sections table for storing editable page content
CREATE TABLE IF NOT EXISTS public.content_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT NOT NULL, -- 'om-oss', 'prosjekter', etc
  section_key TEXT NOT NULL, -- unique identifier for the section
  title TEXT,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES admin_users(id),
  last_modified_by UUID REFERENCES admin_users(id),
  UNIQUE(page_name, section_key)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'books', 'films', 'networks', 'tools', 'concepts'
  title TEXT NOT NULL,
  description TEXT,
  author TEXT,
  year TEXT,
  link TEXT,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES admin_users(id),
  last_modified_by UUID REFERENCES admin_users(id)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  featured_image_url TEXT,
  status TEXT DEFAULT 'ongoing', -- 'ongoing', 'completed', 'planned'
  start_date DATE,
  end_date DATE,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES admin_users(id),
  last_modified_by UUID REFERENCES admin_users(id)
);

-- Enable RLS
ALTER TABLE public.content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policies for content_sections
CREATE POLICY "content_sections_select_published" ON public.content_sections
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "content_sections_insert_authenticated" ON public.content_sections
  FOR INSERT WITH CHECK (true);

CREATE POLICY "content_sections_update_authenticated" ON public.content_sections
  FOR UPDATE USING (true);

CREATE POLICY "content_sections_delete_authenticated" ON public.content_sections
  FOR DELETE USING (true);

-- Policies for resources
CREATE POLICY "resources_select_published" ON public.resources
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "resources_insert_authenticated" ON public.resources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "resources_update_authenticated" ON public.resources
  FOR UPDATE USING (true);

CREATE POLICY "resources_delete_authenticated" ON public.resources
  FOR DELETE USING (true);

-- Policies for projects
CREATE POLICY "projects_select_published" ON public.projects
  FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "projects_insert_authenticated" ON public.projects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "projects_update_authenticated" ON public.projects
  FOR UPDATE USING (true);

CREATE POLICY "projects_delete_authenticated" ON public.projects
  FOR DELETE USING (true);

-- Insert Om oss content sections
INSERT INTO public.content_sections (page_name, section_key, title, content, order_index) VALUES
('om-oss', 'intro', NULL, 'Foreningen Robust jobbar for at økonomien skal tene samfunn og natur, og ikkje motsett. Vi meiner at ein sunn økonomi fungerer utan å bryte ned og utarme naturen, og at det overordna, globale målet er å fordele ressursar likt slik at alle menneske har tilgang til eit godt liv. For å oppnå dette, arbeider foreningen med aktivitetar og prosjekt som byggjer på mangfaldige perspektiv og praksisar: Mangfald er ein nødvendigheit for eit robust økonomisk system.

Vi jobbar tverrfagleg og hentar kunnskap frå ulike økonomiske teoriar, frå historie, psykologi, filosofi og designtenking. Vi står for eit pluralistisk perspektiv, altså at det ikkje finst éin sannheit eller eit svar. Vi trur heller at mangfaldige meiningar og perspektiv styrkjer vår felles forståing av verda, dei utfordringane vi står overfor, og at det er den mest rettferdige måten å finne løysingar på.', 1),

('om-oss', 'structural-change', 'Strukturell endring', 'I Robust meiner vi at det er det strukturelle i samfunnet som må endrast, og ikkje berre symptoma på den økologiske og sosiale krisa vi står i. Vi strevar etter å finne løysingar på desse utfordringane basert på ei heilskapleg og systemorientert forståing av samfunnet. Dette inneber langsiktige visjonar, radikal forestilling om kva alternativ som er moglege, og samarbeid med eksterne aktørar for å iverksetje tiltak eller gjennomføre prosjekt.

Robust består av fem styremedlemmer med bakgrunn innan økonomi, strategisk design, kunst, matematikk og miljøstudiar. Foreningen sankar styrke og resiliens i medlemmenes ulike bakgrunnar. Vidare er fleire av medlemmene knytte opp til ulike nettverk som International Degrowth Network, Rethinking Economics Norge, Postgrowth Nordics Network og Vekstfri Norge.

Vi komposterer konvensjonelle, utdaterte metodar om til meir omsorgsfulle og livskraftige tilnærmingar. Robust er radikale, ikkje i den politiske forstand, men i ordets tyding. Å vere radikal tyder at ein "går til rota av" (problemet). Med dette følgjer det også at vi ser etter dei transformative løysingane. Fordi som radikale, veit vi at "inkrementalisme" leier til kortsiktige, falske løysingar som opprettheld "status quo" heller enn å transformere.', 2);

-- Insert resources from the provided data
INSERT INTO public.resources (category, title, author, year, order_index) VALUES
-- Books
('books', 'Doughnut Economics', 'Kate Raworth', '2017', 1),
('books', 'Ministry for the Future', 'Kim Stanley Robinson', '2020', 2),
('books', 'Mitt klimaregnskap', 'Anja Bakke Riise', NULL, 3),
('books', 'Bærekraftig økonomi', 'Arild Vatn', NULL, 4),
('books', 'Degrowth & Strategy', 'Mayfly Books', '2022', 5),
('books', 'The Future is Degrowth', NULL, NULL, 6),

-- Films
('films', 'Mirakelet i Wörgl', NULL, NULL, 1),
('films', 'After Work', 'NRK', NULL, 2),
('films', 'Blokka', 'NRK', NULL, 3),
('films', 'Closing the Loop', NULL, NULL, 4),

-- Networks
('networks', 'Rethinking Economics Norge', NULL, NULL, 1),
('networks', 'WEALL Norge (Wellbeing Economics Alliance)', NULL, NULL, 2),
('networks', 'Postgrowth Nordics Network', NULL, NULL, 3),
('networks', 'Vekstfri Norge', NULL, NULL, 4),
('networks', 'International Degrowth Network', NULL, NULL, 5),
('networks', 'Smultringnettverket', NULL, NULL, 6),
('networks', 'Torggata Blad', NULL, NULL, 7),

-- Tools
('tools', 'What is / What if / How', 'metodikk for utopiverkstader', NULL, 1),
('tools', 'Three Horizons', 'rammeverk for systemendring', NULL, 2),
('tools', 'Leverage Points', 'Donella Meadows', NULL, 3),
('tools', 'Deep listening', 'djup lytting i samtale', NULL, 4),
('tools', 'Open Space', 'fasilitering av sjølvorganiserte samlingar', NULL, 5),

-- Concepts
('concepts', 'Smultringøkonomi (Doughnut Economics)', NULL, NULL, 1),
('concepts', 'Nedvekst (Degrowth)', NULL, NULL, 2),
('concepts', 'Økososialisme', NULL, NULL, 3),
('concepts', 'Djupøkologi', NULL, NULL, 4),
('concepts', 'Pluriverset', NULL, NULL, 5),
('concepts', 'Delinking', NULL, NULL, 6),
('concepts', 'Grøn jobbgaranti', NULL, NULL, 7),
('concepts', 'Universell grunninntekt', NULL, NULL, 8),
('concepts', 'Universelle basistenester', NULL, NULL, 9);

-- Insert sample projects
INSERT INTO public.projects (title, slug, description, content, status, published) VALUES
('Postvekst i norsk kontekst', 'postvekst-norsk-kontekst', 
'Et forskningsprosjekt om å tilpasse postvekst-teorier til norske forhold',
'Dette prosjektet utforsker hvordan postvekst-strategier kan implementeres i Norge, med fokus på vårt spesielle økonomiske utgangspunkt som petroleumsnasjon.', 
'ongoing', true),

('Utopiverkstad', 'utopiverkstad', 
'Kreative workshops hvor vi utforsker ønskelige fremtidsscenarier',
'Gjennom What is / What if / How-metodikk fasiliterer vi workshops hvor deltakere kan forestille seg og planlegge alternative fremtider.',
'ongoing', true),

('Smultringøkonomi i praksis', 'smultring-praksis',
'Hvordan kan norske kommuner og bedrifter implementere smultringøkonomiske prinsipper',
'Vi jobber med konkrete case studies og verktøy for å hjelpe organisasjoner med å operere innenfor planetære grenser.',
'planned', true);
