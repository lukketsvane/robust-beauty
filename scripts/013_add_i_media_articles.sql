-- Add external_url column to articles table for linking to external media
ALTER TABLE articles ADD COLUMN IF NOT EXISTS external_url text;

-- Insert i-media articles
-- These are opinion pieces and articles written by ROBUST members in Norwegian media

-- 1. Det er dyrt å undervurdere klimakrisens kostnader
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  category,
  published,
  external_url,
  created_at,
  updated_at
) VALUES (
  'Det er dyrt å undervurdere klimakrisens kostnader',
  'det-er-dyrt-a-undervurdere-klimakrisens-kostnader',
  'Innlegg om hvordan klima- og naturkrisen kan halvere den globale økonomien innen 2070, og hvorfor dagens økonomiske modeller grovt undervurderer klimarisikoen.',
  E'**Medium:** Dagens Næringsliv\n**Dato:** 3. mars 2024\n**Forfatter:** Anna Nordahl Carlsen, siviløkonom, styreleder i Foreningen Robust\n\nInnlegg om hvordan klima- og naturkrisen kan halvere den globale økonomien innen 2070, og hvorfor dagens økonomiske modeller grovt undervurderer klimarisikoen. Carlsen argumenterer for at økonomifaget og finanssektoren må ta inn over seg nye scenarier og vippepunkter i klimasystemet.',
  'i-media',
  true,
  'https://www.dn.no/innlegg/klimakrise/okonomiske-modeller/forsikring/det-er-dyrt-a-undervurdere-klimakrisens-kostnader/2-1-1604890',
  '2024-03-03'::timestamptz,
  '2024-03-03'::timestamptz
);

-- 2. Klimatrusselen er ille nok. Ignoranse forsterker den
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  category,
  published,
  external_url,
  created_at,
  updated_at
) VALUES (
  'Klimatrusselen er ille nok. Ignoranse forsterker den',
  'klimatrusselen-er-ille-nok-ignoranse-forsterker-den',
  'Svarinnlegg til DN-kronikk om klimatrusselen. Forfatterne kritiserer økonomers og kommentatorers bagatellisering av klimarisiko og viser til ny forskning.',
  E'**Medium:** Dagens Næringsliv\n**Dato:** 21. mars 2024\n**Forfattere:** Anna Nordahl Carlsen (Foreningen Robust) og Thomas Røkås (Rethinking Economics Norge)\n\nSvarinnlegg til DN-kronikk om klimatrusselen. Forfatterne kritiserer økonomers og kommentatorers bagatellisering av klimarisiko og viser til ny forskning som peker mot store økonomiske tap dersom dagens politikk fortsetter.',
  'i-media',
  true,
  'https://www.dn.no/innlegg/klimatrusselen-er-ille-nok-ignoranse-forsterker-den/2-1-1616263',
  '2024-03-21'::timestamptz,
  '2024-03-21'::timestamptz
);

-- 3. Hva ville Olof Palme gjort?
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  category,
  published,
  external_url,
  created_at,
  updated_at
) VALUES (
  'Hva ville Olof Palme gjort?',
  'hva-ville-olof-palme-gjort',
  'Debattinnlegg som kobler Olof Palmes internasjonale solidaritet til dagens situasjon i Palestina.',
  E'**Medium:** Dagsavisen\n**Dato:** 11. februar 2024\n**Forfatter:** Anna Nordahl Carlsen, siviløkonom og daglig leder i Foreningen ROBUST\n\nDebattinnlegg som kobler Olof Palmes internasjonale solidaritet til dagens situasjon i Palestina. Carlsen argumenterer for at politisk lederskap må tørre å utfordre økonomiske og geopolitiske maktstrukturer når grunnleggende menneskerettigheter trues.',
  'i-media',
  true,
  'https://www.dagsavisen.no/debatt/hva-ville-olof-palme-gjort/4771084',
  '2024-02-11'::timestamptz,
  '2024-02-11'::timestamptz
);

-- 4. Spør folket om råd, Eriksen
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  category,
  published,
  external_url,
  created_at,
  updated_at
) VALUES (
  'Spør folket om råd, Eriksen',
  'spor-folket-om-rad-eriksen',
  'Innlegg om naturtap, lokaldemokrati og folkelig medvirkning. Forfatterne foreslår nye former for borgerinvolvering i natur- og klimapolitikken.',
  E'**Medium:** Dagsavisen\n**Dato:** 20. februar 2024\n**Forfattere:** Bl.a. Anna Nordahl Carlsen, siviløkonom og daglig leder i Foreningen ROBUST\n\nInnlegg om naturtap, lokaldemokrati og folkelig medvirkning. Forfatterne foreslår nye former for borgerinvolvering i natur- og klimapolitikken, slik at beslutninger om arealinngrep og vern forankres bedre demokratisk.',
  'i-media',
  true,
  'https://www.dagsavisen.no/debatt/spor-folket-om-rad-eriksen/6322751',
  '2024-02-20'::timestamptz,
  '2024-02-20'::timestamptz
);

-- 5. Tør norske økonomer tenke nytt?
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  category,
  published,
  external_url,
  created_at,
  updated_at
) VALUES (
  'Tør norske økonomer tenke nytt?',
  'tor-norske-okonomer-tenke-nytt',
  'Kronikk som utfordrer norske økonomers faglige komfortsone. Forfatterne etterlyser nytenkning i økonomifaget for å møte klima- og ulikhetskrisene.',
  E'**Medium:** Dagens Næringsliv\n**Dato:** 16. juni 2024\n**Forfattere:** Anna Nordahl Carlsen og Christina Lund, begge med bakgrunn fra Rethinking Economics\n\nKronikk som utfordrer norske økonomers faglige komfortsone. Forfatterne etterlyser nytenkning i økonomifaget for å møte klima- og ulikhetskrisene, og peker på behovet for alternative modeller og tverrfaglighet.',
  'i-media',
  true,
  'https://www.dn.no/innlegg/okonomi/okonomiske-modeller/innovasjon/tor-norske-okonomer-tenke-nytt/2-1-1655865',
  '2024-06-16'::timestamptz,
  '2024-06-16'::timestamptz
);

-- 6. Økonomenes taushet om Gaza er påfallende
INSERT INTO articles (
  title,
  slug,
  excerpt,
  content,
  category,
  published,
  external_url,
  created_at,
  updated_at
) VALUES (
  'Økonomenes taushet om Gaza er påfallende',
  'okonomenes-taushet-om-gaza-er-pafallende',
  'Innlegg som kritiserer at økonomer er tause om krigen i Gaza og de økonomiske strukturene som muliggjør folkerettsbrudd.',
  E'**Medium:** Dagens Næringsliv\n**Dato:** 14. juli 2024\n**Forfattere:** Christina Lund og Anna Nordahl Carlsen\n\nInnlegg som kritiserer at økonomer er tause om krigen i Gaza og de økonomiske strukturene som muliggjør folkerettsbrudd. Teksten knytter økonomifaget til spørsmål om makt, ansvar og solidaritet.',
  'i-media',
  true,
  'https://www.dn.no/innlegg/gaza/midtosten/okonomi/okonomenes-taushet-om-gaza-er-pafallende/2-1-1845725',
  '2024-07-14'::timestamptz,
  '2024-07-14'::timestamptz
);
