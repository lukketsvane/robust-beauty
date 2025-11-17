-- Insert sample articles for Om oss category
INSERT INTO articles (title, slug, content, excerpt, published, category, image_url, created_at, updated_at)
VALUES 
  (
    'Hvem er vi?',
    'hvem-er-vi',
    'Foreningen ROBUST er et kunnskapskollektiv som jobber for å spre kunnskap om postvekst samfunn. Vi kombinerer akademisk forskning med kreativ formidling for å gjøre komplekse ideer tilgjengelige for alle.

    Vårt arbeid er forankret i tre hovedprinsipper: akademisk og teoretisk forankring i degrowth-forskning, økt forestillingsevne om en fremtid vi kan glede oss til, og bruk av kunst og kreativ formidling for å gjøre oss forstått.

    Vi tror at overgangen til et bærekraftig samfunn krever at vi holder flere tanker i hodet samtidig - både kritikk av dagens system og konstruktive visjoner for fremtiden.',
    'Lær mer om hvem vi er og hva vi står for',
    true,
    'om-oss',
    '/penguins.jpeg',
    NOW(),
    NOW()
  ),
  (
    'Våre verdier',
    'vare-verdier',
    'ROBUST bygger på prinsippet om at et bærekraftig samfunn må være bygget på solidaritet, likhet og respekt for planetens grenser.

    Vi arbeider for systemendring, ikke bare symptombehandling. Det betyr at vi ser på de grunnleggende strukturene i samfunnet vårt og spør hvordan vi kan organisere oss på måter som fremmer trivsel for alle, både nå og i fremtiden.

    Gjennom vårt arbeid ønsker vi å vise at et annerledes samfunn ikke bare er nødvendig, men også mulig og ønskelig.',
    'Verdiene som styrer vårt arbeid',
    true,
    'om-oss',
    '/white-shell.jpeg',
    NOW(),
    NOW()
  );

-- Insert sample articles for Prosjekter category
INSERT INTO articles (title, slug, content, excerpt, published, category, image_url, created_at, updated_at)
VALUES 
  (
    'Forskningsprosjekt: Postvekst i norsk kontekst',
    'forskningsprosjekt-postvekst',
    'Vi jobber med et omfattende forskningsprosjekt som ser på hvordan postvekst-ideer kan implementeres i norsk kontekst. Prosjektet kombinerer teoretisk analyse med praktiske case-studier.

    Gjennom intervjuer med aktivister, forskere og beslutningstakere kartlegger vi mulighetene og utfordringene ved å skape et mer bærekraftig samfunn i Norge.

    Prosjektet finansieres av Norges Forskningsråd og pågår over tre år.',
    'Et omfattende forskningsprosjekt om postvekst i Norge',
    true,
    'prosjekter',
    '/nautilus-shell.jpeg',
    NOW(),
    NOW()
  ),
  (
    'Kreative verksteder',
    'kreative-verksteder',
    'Vi arrangerer jevnlige kreative verksteder hvor deltakere kan utforske fremtidsbilder gjennom kunst, skriving og samtale.

    Verkstedene er åpne for alle og krever ingen forkunnskaper. Målet er å skape rom for å tenke kreativt om fremtiden og utvikle nye perspektiver på samfunnsutvikling.

    Se vår kalender for kommende arrangementer.',
    'Utforsk fremtiden gjennom kreativitet',
    true,
    'prosjekter',
    '/pink-shell.jpeg',
    NOW(),
    NOW()
  ),
  (
    'Samarbeid med universiteter',
    'samarbeid-universiteter',
    'ROBUST samarbeider med flere universiteter og høyskoler for å integrere postvekst-perspektiver i undervisning og forskning.

    Vi holder gjesteforelesninger, arrangerer seminarer og bidrar til utviklingen av nye kurs innen bærekraftig samfunnsutvikling.

    Gjennom dette arbeidet når vi ut til fremtidens beslutningstakere og bidrar til å forme den akademiske diskursen.',
    'Bringer postvekst inn i akademia',
    true,
    'prosjekter',
    '/white-shell.jpeg',
    NOW(),
    NOW()
  );

-- Insert sample articles for I media category
INSERT INTO articles (title, slug, content, excerpt, published, category, created_at, updated_at)
VALUES 
  (
    'Intervju i Klassekampen',
    'intervju-klassekampen',
    'Christina Lund ble intervjuet av Klassekampen om postvekst som politisk strategi. I intervjuet diskuterte hun hvordan Norge kan gå foran i overgangen til et mer bærekraftig samfunn.

    "Vi trenger ikke bare grønn vekst, men en fundamental omstilling av hvordan vi organiserer samfunnet," sa Lund i intervjuet.

    Les hele intervjuet i Klassekampen fra 15. mars 2024.',
    'ROBUST-leder i stort intervju om postvekst',
    true,
    'i-media',
    NOW(),
    NOW()
  ),
  (
    'Kronikk i Morgenbladet',
    'kronikk-morgenbladet',
    'Styremedlemmer i ROBUST skrev en felles kronikk i Morgenbladet hvor de argumenterte for at klimakrisen krever en radikal omstilling av økonomien.

    Kronikken fikk stor oppmerksomhet og skapte debatt om fremtidens økonomi.

    Les kronikken i Morgenbladet fra 8. april 2024.',
    'ROBUST argumenterer for økonomisk omstilling',
    true,
    'i-media',
    NOW(),
    NOW()
  );

-- Insert sample contact information
INSERT INTO articles (title, slug, content, published, category, created_at, updated_at)
VALUES 
  (
    'Kontakt oss',
    'kontakt-oss',
    'Vil du komme i kontakt med ROBUST? Vi er alltid interessert i nye samarbeidspartnere, prosjektideer og spørsmål.

    E-post: kontakt@foreningenrobust.no
    
    Følg oss også på LinkedIn for å holde deg oppdatert på vårt arbeid.

    Organisasjonsnummer: 123 456 789',
    true,
    'kontakt',
    NOW(),
    NOW()
  );
