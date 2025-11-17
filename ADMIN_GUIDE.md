# ROBUST CMS Admin Guide

## Oversikt

Dette er en fullstendig CMS-løsning for ROBUST-nettsiden med autentisering, artikkel-administrasjon og bilde-opplasting.

## Funksjoner

### 1. Admin Autentisering
- **Login side**: `/admin/login`
- Sikret med Supabase autentisering
- Beskyttet med middleware for alle `/admin` ruter

### 2. Artikkel-administrasjon

#### Dashboard (`/admin`)
- Oversikt over alle artikler
- Filtrer artikler etter kategori (Om oss, Prosjekter, I media, Kontakt)
- Status badges (Publisert/Utkast)
- Handlinger: Rediger, Forhåndsvis, Slett

#### Ny artikkel (`/admin/articles/new`)
- **Tittel**: Automatisk generering av slug fra tittel
- **Slug**: URL-vennlig versjon av tittelen (kan redigeres manuelt)
- **Kategori**: Velg mellom Om oss, Prosjekter, I media, eller Kontakt
- **Sammendrag**: Kort beskrivelse som vises i artikkelister
- **Fremhevet bilde**: Last opp bilde via Vercel Blob
- **Innhold**: Full artikkel-tekst (støtter HTML)
- **Publiser**: Toggle for å publisere eller beholde som utkast

#### Rediger artikkel (`/admin/articles/[id]/edit`)
- Samme funksjonalitet som ny artikkel
- Pre-populert med eksisterende data

### 3. Bilde-opplasting
- Integrert med Vercel Blob storage
- Drag-and-drop eller klikk for å velge
- Automatisk opplasting og URL-generering
- Støtter jpg, jpeg, png, gif, webp (maks 5MB)

### 4. Offentlige sider

#### Hovedside (`/`)
- Responsiv split-screen design
- Mobile-first med hamburger-meny
- "Les mer" knapper som linker til kategorisider
- Smooth scroll navigation

#### Kategorisider
- **Om oss** (`/om-oss`): Vis alle artikler i Om oss kategorien
- **Prosjekter** (`/prosjekter`): Vis alle prosjekter
- **I media** (`/i-media`): Vis medieoppslag
- **Kontakt** (`/kontakt`): Kontaktinformasjon

#### Artikkel-visning (`/artikkel/[slug]`)
- Full artikkelvisning
- Fremhevet bilde
- Formatert innhold
- Tilbake-knapp til hovedsiden
- Publiseringsdato

### 5. PWA Støtte
- **Manifest**: Konfigurert for installasjon som app
- **Icons**: Favicon, Apple touch icon, og app icons (192x192, 512x512)
- **Standalone mode**: Åpner uten adresselinje på iOS når lagret til hjemmeskjerm

## Database Schema

### Articles Table
\`\`\`sql
- id (uuid, primary key)
- title (text, required)
- slug (text, unique, required)
- content (text, nullable)
- excerpt (text, nullable)
- featured_image_url (text, nullable)
- category (text, nullable) - 'om-oss', 'prosjekter', 'i-media', 'kontakt'
- author_id (uuid, foreign key to auth.users)
- published (boolean, default false)
- created_at (timestamp)
- updated_at (timestamp)
\`\`\`

### Row Level Security (RLS)
- Alle kan se publiserte artikler
- Kun autentiserte brukere kan se/redigere/slette egne artikler
- Admin-brukere har full tilgang

## Kom i gang

### 1. Første gang oppsett
1. Gå til `/admin/login`
2. Registrer en admin-bruker via Supabase
3. Logg inn med din admin-konto

### 2. Kjør database migrations
Migrations kjøres automatisk fra `scripts/` mappen:
- `001_create_articles_table.sql` - Opprett artikler tabell
- `002_create_site_settings_table.sql` - Opprett innstillinger tabell
- `003_add_category_to_articles.sql` - Legg til kategori-kolonne

### 3. Opprett første artikkel
1. Gå til `/admin`
2. Klikk "Ny artikkel"
3. Fyll ut skjemaet
4. Last opp et fremhevet bilde
5. Velg kategori
6. Publiser artikkelen

### 4. Organiser innhold etter kategorier
- **Om oss**: Artikler om organisasjonen, historie, mål
- **Prosjekter**: Pågående og fullførte prosjekter
- **I media**: Medieoppslag, presseomtaler, nyhetssaker
- **Kontakt**: Ikke brukt for artikler (statisk side)

## Design System

### Farger
- **Primær rød**: `#e3160b`
- **Sekundær rosa**: `#ffc2c2`
- **Tekst**: Sort på rosa bakgrunn, hvit på rød bakgrunn

### Typografi
- **Font**: JetBrains Mono (monospace)
- **Størrelser**: 
  - Mobile headings: 18-24px
  - Desktop headings: 28-32px
  - Body text: 16-20px

### Layout
- Mobile-first responsive design
- Split-screen på desktop (50/50 eller 400px sidebar)
- Full-width stacking på mobile

## Tips og best practices

### Artikkel-oppretting
1. **Tittler**: Korte, beskrivende tittler (max 60 tegn)
2. **Slug**: Automatisk generert, men kan tilpasses for bedre SEO
3. **Sammendrag**: 1-2 setninger (max 160 tegn for SEO)
4. **Bilder**: Bruk høykvalitets bilder, anbefalt 1200x630px for fremhevet bilde
5. **Kategorier**: Velg riktig kategori for bedre organisering

### SEO
- Slug brukes i URL: `/artikkel/din-artikkel-tittel`
- Sammendrag vises i søkeresultater
- Fremhevet bilde vises når delt på sosiale medier

### Innholdsstruktur
\`\`\`
Hovedside (/)
├── Om oss (/om-oss)
│   ├── Artikkel 1 (/artikkel/slug-1)
│   ├── Artikkel 2 (/artikkel/slug-2)
│   └── ...
├── Prosjekter (/prosjekter)
│   ├── Prosjekt 1 (/artikkel/prosjekt-slug-1)
│   └── ...
├── I media (/i-media)
│   ├── Medieoppslag 1 (/artikkel/media-slug-1)
│   └── ...
└── Kontakt (/kontakt)
\`\`\`

## Miljøvariabler

Følgende miljøvariabler er allerede konfigurert:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BLOB_READ_WRITE_TOKEN`

## Support

For problemer eller spørsmål:
1. Sjekk Supabase logs for database-feil
2. Sjekk Vercel logs for deployment-problemer
3. Verifiser at miljøvariabler er satt korrekt
