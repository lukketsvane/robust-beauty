-- Drop existing data from old scripts
DELETE FROM content_sections WHERE page_name IN ('om-oss', 'prosjekter');
DELETE FROM projects;

-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  cv_text TEXT,
  personal_text TEXT,
  featured_image_url TEXT,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES admin_users(id),
  last_modified_by UUID REFERENCES admin_users(id)
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Policies for team_members
CREATE POLICY "team_members_select_published" ON public.team_members
  FOR SELECT USING (published = true);

CREATE POLICY "team_members_insert_authenticated" ON public.team_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "team_members_update_authenticated" ON public.team_members
  FOR UPDATE USING (true);

CREATE POLICY "team_members_delete_authenticated" ON public.team_members
  FOR DELETE USING (true);

-- Insert Om oss content sections (bokmål)
INSERT INTO public.content_sections (page_name, section_key, title, content, order_index) VALUES
('om-oss', 'intro', 'Om oss', 'Foreningen Robust jobber for at økonomien skal tjene samfunn og natur, og ikke motsatt. Vi mener at en sunn økonomi fungerer uten å bryte ned og utarme naturen, og at det overordnede, globale målet er å fordele ressurser likt slik at alle mennesker har tilgang til et godt liv. For å oppnå dette, arbeider foreningen med aktiviteter og prosjekter som bygger på mangfoldige perspektiver og praksiser: Mangfold er en nødvendighet for et robust økonomisk system.

Vi jobber tverrfaglig og henter kunnskap fra ulike økonomiske teorier, fra historie, psykologi, filosofi og designtenkning. Vi står for et pluralistisk perspektiv, altså at det ikke finnes én sannhet eller ett svar. Vi tror heller at mangfoldige meninger og perspektiver styrker vår felles forståelse av verden, de utfordringene vi står overfor, og at det er den mest rettferdige måten å finne løsninger på.', 1),

('om-oss', 'structural-change', 'Strukturell endring', 'I Robust mener vi at det er det strukturelle i samfunnet som må endres, og ikke bare symptomene på den økologiske og sosiale krisen vi står i. Vi streber etter å finne løsninger på disse utfordringene basert på en helhetlig og systeminorientert forståelse av samfunnet. Dette innebærer langsiktige visjoner, radikal forestilling om hvilke alternativer som er mulige, og samarbeid med eksterne aktører for å iverksette tiltak eller gjennomføre prosjekter.

Robust består av fem styremedlemmer med bakgrunn innen økonomi, strategisk design, kunst, matematikk og miljøstudier. Foreningen sanker styrke og resiliens i medlemmenes ulike bakgrunner. Videre er flere av medlemmene koblet opp til ulike nettverk som International Degrowth Network, Rethinking Economics Norge, Postgrowth Nordics Network og Vekstfri Norge.

Vi komposterer konvensjonelle, utdaterte metoder om til mer omsorgsfulle og livskraftige tilnærminger. Robust er radikale, ikke i den politiske forstand, men i ordets betydning. Å være radikal betyr at man "går til roten av" (problemet). Med dette følger det også at vi ser etter de transformative løsningene. Fordi som radikale, vet vi at "inkrementalisme" leder til kortsiktige, falske løsninger som opprettholder "status quo" heller enn å transformere.', 2),

('om-oss', 'values', 'Vårt verdikompass', 'Vi navigerer arbeidet vårt etter fire kjerneverdier og tre retningsvisere.

**Kjerneverdier:**

**1. NYSGJERRIGHET**
Vi utforsker modig nye tanker og praksisformer. Nysgjerrighet driver oss til å stille spørsmål ved det etablerte og søke kunnskap på tvers av fagfelt.

**2. PLURALISME & MANGFOLD**
Vi besitter ikke én sannhet. Mangfoldige stemmer, perspektiver og erfaringer gjør oss sterkere og mer robuste i arbeidet for systemendring.

**3. SYMBIOSE & REGENERATIVITET**
Vi henter inspirasjon fra naturens symbiotiske prosesser. Som mycelium i skogen kobler vi sammen ulike aktører og nærer relasjonene mellom dem. Naturen har en iboende verdi, og vi jobber for regenerative praksiser som bygger opp i stedet for å bryte ned.

**4. SAMSKAPING**
Kreativitet er sterkest som en kollektiv prosess. Vi samarbeider internt og inkluderer eksterne aktører i utformingen av fremtiden. Desto flere mennesker som samskaper, desto flere vil få sine bekymringer adressert.

**Tre retningsvisere:**

Vi bruker disse tre prinsippene til å styre arbeidet vårt:

1. **Å forankre arbeidet akademisk og teoretisk i degrowth-bevegelsen**
Vi bygger på solid forskning og teori, og søker å være en bro mellom akademia og praktisk endringsarbeid.

2. **Å jobbe for økt forestillingsevne om en fremtid vi kan glede oss til**
Vi tror at utopisk tenkning er et nødvendig verktøy for omstilling. Innen vi kan se for oss alternative samfunn, kan vi ikke bygge dem.

3. **Å bruke kunst og kreativ formidling til å gjøre oss forstått**
Gjennom kunstneriske uttrykk, design og kreative prosesser gjør vi komplekse økonomiske og økologiske sammenhenger tilgjengelige for mange.', 3),

('om-oss', 'systems-thinking', 'Systemtenkning som metode', 'Menneskesamfunnet er et komplekst og levende system, akkurat som naturen og økonomien også er. Det siste århundret har vi dog studert og oppført oss som om økonomien er noe ''u-levende'', noe dødt og statisk. Vi tror mer på innovasjon i teknologisk utvikling, enn endringer i holdning- og handlingsmønstre. Vi velger inkrementelle løsninger - som subsidier og skatter - foran virkningsfulle systemendringer.

Den "lineære" måten å tenke og forstå verden på, henger sammen med hvordan den reduksjonistiske tilnærmingen til forskning lenge har hatt fotfeste. Det vitner om at til tross for at det snakkes mye om systemer, så har vi lite forståelse for hvordan systemer oppfører seg.

Robust henter inspirasjon fra systemtenkere som Donella Meadows. Av Meadows lærer vi om systemanalysens "leverage points" - ulike steder å gripe inn i et komplekst system for å påvirke selve systemet. "Overfladiske" punkter er inngrep som forventes å oppnå mindre endringer i systemets resultater (skatter og subsidier), mens "dype" akupunkturpunkter er inngrep som vil ha større transformasjonsvirkning. Eksempler på sistnevnte er å endre dominerende tankesett og paradigmer, og endre systemets mål.

Med systemtenkning lærer vi å sette opp mentale modeller.', 4),

('om-oss', 'participation', 'Deltakelse som metode for endring', 'Vi fokuserer på deltakelse som metode for endring. Vi tror at folk må skaffe seg kunnskap og erfaring med de endringene som skjer - for etter endringen har skjedd, skal vi leve med den. Solidaritet vokser av seg selv gjennom deltakelse, ansvar og erfaring.

Styrken vår er å holde det mindre spisset. Vi er mycelium: alliansebygging og nettverksbygging.

Vi tilrettelegger for og fasiliterer rom hvor ulike aktører kan møtes, utforske og lære sammen. Dette kan være gjennom workshops, studiesirkler, folkepanel eller andre deltakerstyrte prosesser.', 5),

('om-oss', 'ecological-economics', 'Økologisk økonomi og nedvekst', 'Norsk økonomi må omstilles, klimagassutslipp må kuttes, samtidig som næringsgrunnlaget må vris fra petroleumsindustri og fossilavhengig virksomhet. I tillegg må vi sørge for at ressursene fordeles rettferdig.

Robust tar utgangspunkt i aktuelle og relevante perspektiver på bærekraftig omstilling, som smultringøkonomi (Doughnut Economics) og nedvekst (degrowth). Begge disse konseptene søker å bygge et økonomisk system som prioriterer velvære for alle mennesker på globalt nivå, samtidig som det beskytter planetens naturlige økosystemer. Det finnes mange muligheter som ligger i nedvekst-strategier for sosial, økologisk og økonomisk omveltning.

Hvor smultringøkonomien gir en visuell forståelse av de planetære og sosiale grensene, har nedvekst-litteraturen et bredt spekter av forslag til tiltak som samfunn kan implementere for å respektere disse grensene. Robust er en av få norske stemmer med god kjennskap til nedvekst-litteraturen, som er et komplekst konsept og krever en helhetlig og systematisk tankegang og tilnærming. Spesielt for aktører som lever godt av det nåværende systemet, være seg politikere, representanter i privat næringsliv eller samfunnet forøvrig.

Robust jobber med å gjøre informasjon om nedvekst og løsninger for et mer bærekraftig samfunn tilgjengelig for alle. For de som skulle være i tvil: perspektivene som nedvekst fremmer er vitenskapelig forankret.', 6),

('om-oss', 'pluriverse', 'Pluriverset', 'Robust jobber med en tverrfaglig tilnærming. Dette betyr at vi lener oss på og tar inn over oss kunnskap fra mange ulike disipliner og tradisjoner. Vi tror på pluriverset - at det finnes mange ulike måter å forstå og være i verden på.', 7);

-- Insert team members
INSERT INTO public.team_members (name, role, cv_text, personal_text, order_index) VALUES
('Anna Nordahl Carlsen', 'Miljøøkonom og grasrotøkonom', 
'Anna Nordahl Carlsen er miljøøkonom fra NHH på papiret, grasrotøkonom i praksis. Som tidligere leder for Rethinking Economics Norge ble hun nysgjerrig på hva som egentlig skjer "under overflaten" i de dominerende økonomiske fortellingene. Nå bor hun i Maputo, hvor hun søker en dypere relasjon til de mosambikanske mangrovene, samtidig som hun fordyper seg i nedvekst og politisk økologi som digital student ved det Autonome Universitetet i Barcelona.', 
NULL, 1),

('Thomas Røkås', 'Master i internasjonale miljøstudier',
'Thomas Røkås holder en mastergrad i Internasjonale Miljøstudier ved Norges Miljø- og Biovitenskapelige Universitet (NMBU), hvor han skrev masteroppgave om Smultringøkonomi - en modell som på en visuelt tilgjengelig måte beskriver hvilken økonomisk aktivitet jorden tåler, når den skaper økologisk overskridelse og når den skaper sosialt underskudd.

Han sitter i styret til Rethinking Economics Norge og i Klima- og miljøutvalget i Fellesrådet for Afrika. Han er også assosiert med NMBUs Bærekraftsarena "Planetens tålegrenser", har vært med å starte et akademisk nettverk for post-vekst i Norden, og var med å arrangere Smultringfestivalen 2023.',
NULL, 2),

('Christina Lund', 'Koordinator for WEALL Norge',
'Christina Lund er koordinator for WEALL Norge (Wellbeing Economics Alliance) på vegne av Robust. Hun har jobbet med å etablere norsk hub i samarbeid med organisasjoner som NTNU Welfare, Stedsskapning, og FREMSAM Nettverk for helsefremmende samfunn.',
NULL, 3),

('Sigrid Løvlie', 'Systemorientert og strategisk designer',
'Sigrid Løvlie er utdannet i systemorientert og strategisk design ved Arkitektur- og Designhøgskolen i Oslo. Hun leverte masteroppgaven "Drømmer om en ny normal" hvor hun brukte diskursiv designmetodikk til å utvikle en endringskatalog for omstilling og nedvekst i klesbransjen.

Til daglig jobber hun i gjøretanken Travers, hvor målet for ethvert prosjekt er å forme en fremtid vi kan glede oss til. Sommeren 2025 var hun kreativ leder for NØKO. I Robust er hun grafisk designer og prosjektleder og synes det er kjempegøy med klar kommunikasjon og kule konsepter som når inn hos målgruppen.',
'I livet er Sigrid håpefull for fremtiden, men kan også kjenne meningsløshet over hvordan verden utvikler seg. Hun holder motet oppe ved å flytte fokus bort fra individet og over på systemet. Selv om systemet består av individer, er det ikke individet som skal endre systemet alene.', 4),

('Eline Mannino', 'Fasilitator',
'Eline Mannino har ansvar for fasilitering av studiesirkler og grounding-ritualer.',
NULL, 5);

-- Insert projects
INSERT INTO public.projects (title, slug, description, content, status, order_index) VALUES
('Sagene Bærekraftsverksted', 'sagene-barekraftsverksted',
'En helg hvor vi utforsker bærekraftige fremtider og utopier sammen. Gjennom læring, deling og eksperimentering med positive fremtidsvisjoner øker vi troen på dem og konkretiserer hvilke pådriv som kan igangsette bærekraftig endring.',
'Sagene Bærekraftsverksted er et prosjekt hvor vi utforsker bærekraftige fremtider og utopier sammen. Gjennom en helg skal vi lære, dele og eksperimentere med positive fremtidsvisjoner. Slik kan vi øke troen på dem og konkretisere hvilke pådrivere som kan igangsette bærekraftig endring.

Sagene Bærekraftsverksted er et samarbeid mellom foreningen Robust og Torggata Blad.

**Hva skjedde på verkstedet?**

**FREDAG - WHAT IS (hva er)**
Vi startet med felles middag, bakgrunn for initiativet, og en intro-runde hvor alle deltakerne presenterte seg. Sigrid Løvlie holdt innlegg om avmaktsfølelse og hvordan vi kan håndtere den. Etter pause hadde vi presentasjon om hva bærekraft er (sosialt, økologisk og økonomisk) ved Arild Vatn og Thomas Røkås, med fokus på smultringmodellen. Kvelden ble avsluttet med sosialisering.

**LØRDAG - WHAT IF (hva om)**
Vi serverte enkel lunsj, før Sigrid Løvlie introduserte workshopmetodikken What is - What if - How, med eksempler. Deretter gikk vi i gang med workshop og gruppearbeid hvor vi sammen øvde oss på å se alternative løsninger for fremtiden. Etter middag (pizza!) fortsatte vi gruppearbeidet, før vi avsluttet med oppsummering og deling. Kvelden endte med fest.

**SØNDAG - HOW (hvordan)**
Etter lunsj hadde vi ulike verksteder for konkretisering av arbeidet. Vi diskuterte veien videre for Sagene Bærekraftsverksted, før vi avsluttet helgen.

**Dato og sted:**
Vol 1.0: 10-12. januar 2025, Sagene Kunstsmie, Oslo

**Erfaringer:**
Noen kjente tilhørighet til prosjektet, andre ikke - derfor variert engasjement. Det ble forplantet en liten kjerne engasjerte. For mye tid til visjonering og fantasi? På den andre siden: Skal vi se resultater med en gang? Fantasi er en muskel vi må trene! Det var noen interne utfordringer i gruppen.

**Støttet av:**
Oslo kommune med Grønne midler fra Bydel Sagene

**Samarbeidspartnere:**
Torggata Blad, Arild Vatn (professor emeritus, NMBU), Sagene Kunstsmie',
'completed', 1),

('NØKO - Nordisk Økologisk Økonomikonferanse', 'noko',
'Nordisk samlingssted for økologisk økonomi og post-vekst, juni 2024.',
'I juni 2024 arrangerte vi NØKO - en nordisk konferanse om økologisk økonomi. Masse mennesker kom!

**Erfaringer:**
Snailed it! Forberingspotensial: Struktur, mengde speakers, lokasjon. Litt for standard konferanseformat. Med flere roller kunne vi ha sikret bedre arbeidsøkter. Lekse: Huske å bruke sneglene til det som trengs. Tipp topp grafisk profil - som kan gjenbrukes.

**Rolle:**
Robust var hovedarrangør. Sigrid Løvlie utviklet visuell identitet med snegl som symbol.',
'completed', 2),

('Degrowth-konferansen Oslo 2025', 'degrowth-oslo-2025',
'Støttefunksjoner og sosiale arrangementer rundt den internasjonale degrowth-konferansen i Oslo.',
'Robust bidrog til at omtrent 40 mennesker fikk soveplass under konferansen. Vi bidrog også til at konferansen tilbød barnepass og bidrog til sosialt program. En gruppe fra Sagene Bærekraftsverkstedet jobbet også med dette.

**Cabaret:**
Stor suksess! (Se eget prosjekt)

**Slowspace:**
Behov ikke så stort som antatt. Campus på Blindern helt annerledes enn i Pontevedra. Skuffet over konferansens mangel på å anerkjenne.',
'completed', 3),

('Degrowth Cabaret 2025', 'degrowth-cabaret-2025',
'Verdens første degrowth-kabaré - et kunstnerisk og performativt show som del av ISEE-Degrowth Conference i Oslo.',
'Som del av den kommende Degrowth-konferansen i Oslo (24-27. juni 2025) sendte Robust ut open call til artister, performere, historiefortellere og kreative entusiaster fra hele verden. Alle talenter var velkomne - fra profesjonelle til amatører, fra dansekunstnere til økonomer med sans for humor.

**Hva er en degrowth-kabaré?**
Det er for oss å finne ut...

I mellomtiden ser vi for oss Degrowth Cabaret som et dynamisk og utforskende show skapt av profesjonelle og ikke-profesjonelle artister, designet for å engasjere et bredt publikum og inspirere til et skifte mot et nytt sosio-økonomisk paradigme. Gjennom performativ kunst utforsker showet temaer som paradigmeskifte, nok-het (sufficiency), systemkritikk, fellesskap og kollektiv fantasi, og vever sammen fortellinger som ser for seg en mer økologisk og rettferdig fremtid.

**Metodikk:**
Alle som ble valgt ut ble del av en kollaborativ arbeidsgruppe. I dette teamet delte vi tilbakemeldinger seg imellom og vevde sammen de individuelle fremsyningene til et sammenhengende show.

**Sted:**
Blitz, Oslo (26. juni 2025)

**Status:**
Open call gikk ut i februar 2025 med frist 15. mars. Første gruppemøte 5. april 2025.

**Samarbeidspartnere:**
ISEE-Degrowth Conference Oslo 2025',
'completed', 4),

('Utopiverksted og Rethinking Relations på Innerøya', 'inneroya-verksteder',
'Utopiverksted og workshop om relasjoner på Innerøya-festivalen, august 2024.',
'Vi arrangerte utopiverksted og workshop om å "rethinking relations" på Innerøya-festivalen.

**Erfaringer:**
Folk er gira på å snakke om relasjoner! Viktig å tenke på tidsramme og deltakere (ref utopiverksted).',
'completed', 5),

('Rooting Relationships: Exploring a Deep Economy', 'rooting-relationships',
'Workshop om dypøkologi og økonomi på Degrowth-konferansen i Pontevedra, 2024.',
'Workshop som undersøker forholdet mellom dypøkologi (Arne Næss), økologi og økonomi. Hvordan skal vi leve på planeten i lys av forskningen vår og forståelsen vår av naturen?

**Konsept:**
Den norske filosofen Arne Næss mente at mens økologi studerer data om fugler (størrelse, diett, hekkevaner), så gir det ikke veiledning for hvordan vi skal inkorporere denne kunnskapen i hverdagslivet vårt. Vi trenger en tilnærming som går utover vitenskapen.

For Næss leder spørsmål som "Hva er forholdet mitt til rødstrupen?" til å utforske et dypere og mer komplekst spørsmål: "Hvordan skal vi leve på planeten i lys av forskning og vår forståelse av naturen?". Dette er kjernen i det Næss kalte dypøkologi.

I dag blir vår følelse av tilhørighet og genuin livserfaring svekket av den vestlig-formede kapitalistiske økonomien. Moderne livsstil distanserer oss fra oss selv, hverandre og naturen. Kanskje har for mye fokus på materiale fått oss til å glemme at økonomien er bygget på forholdet vårt til hverandre og resten av den levende verden?

Hvis vi skal bevege oss bort fra en "forbruks- og kriseøkonomi" til en økonomi hvor mennesker og natur trives, må vi omformulere forståelsen vår av oss selv og relasjonene våre innen økonomien. Vi må gjenoppdage sammenhengen mellom økonomi og økologi. Kanskje kan en dypere økonomi vokse frem herfra?

**Inspirasjon:**
Arne Næss, Rachel Carson, urfolksperspektiver, pluriverset

**Status:**
Gjennomført på Degrowth-konferansen i Pontevedra, juni 2024

**Fasilitert av:**
Anna Nordahl Carlsen, Marie Storli',
'completed', 6),

('Food for Degrowth Thoughts', 'food-for-thoughts',
'Månedlige møter over god mat for kunnskapsdeling og alliansebygging rundt degrowth.',
'"Food for thoughts" er et møtebasert prosjekt som har som mål å skape et trygt rom for kollektiv læring og deling av ideer. Vi møtes over et godt måltid, laget av medlemmer av fellesskapet.

Én gang i måneden leier vi rom på Anarres bokkafé, som er en lokal anarkistisk bokhandel og kafé. Det er drevet av aktivister, og er et godt sted for fellesskapsbygging. Det har kjøkken, så vi kan lage middag sammen. Ideen er at folk kan komme direkte etter jobb, spise sammen og dele tanker og ideer. Hver middag har et tema - noen ganger lesering, åpent rom for å dele ideer, filmvisning eller en mer organisert workshop med bevisste input og output.

Vi ønsker virkelig å gjøre "degrowth in practice", så vi tar sikte på å kjøpe så lokalt som mulig, fra småskala gårder i Oslo-regionen. Økologisk dyrkede grønnsaker.

**Tentativt program:**
- September: Intime relasjoner
- Oktober: Introduksjon til degrowth for aktivister
- November: Filmvisning med kritisk diskusjon
- Januar: Rett til byen / Boligpolitikk og degrowth
- Februar: Pluriverset
- Mars: Feminisme / Degrowth og marxisme
- April: Aktivisme og Degrowth! Plakatworkshop

Denne serien av arrangementer er i seg selv "grassroot marketing" for Degrowth-konferansen som kommer til Oslo i juni 2025. Ved å vise hvordan degrowth kobler til alle deler av livet, har vi som mål å øke kunnskapen om og interessen for degrowth i lokale fellesskap.',
'ongoing', 7),

('SDG #8 Event', 'sdg-8-event',
'Fagseminar om bærekraftsmål #8 med fokus på anstendig arbeid uten økonomisk vekst.',
'Bærekraftsmål nr. 8 handler om å skape "anstendig arbeid og økonomisk vekst". Tidligere har perioder med økonomisk vekst vanligvis betydd at folk har hatt gode jobber og lite arbeidsledighet. Men trenger vi økonomisk vekst for å sikre gode jobber?

Økonomisk vekst er også knyttet til undergraving av både økologisk og sosial bærekraft. Noen mener at vi kan skape gode jobber og inntekter på nye måter som ikke er avhengige av vekst.

**Program:**
- Introduksjon: Økonomisk vekst og bærekraftsmålene (Prof. emeritus Arild Vatn, NMBU)
- The case for Universal Basic Income (Leah Barrett Werner, Concordia University)
- The case for Job Guarantee (Lukas Lehner, University of Oxford)
- The case for Universal Basic Services (Anna Coote, New Economics Foundation)
- Diskusjon med spørsmål og svar

**Dato:**
7. februar 2024

**Språk:**
Engelsk, fasilitert av Thomas Røkås',
'completed', 8);
