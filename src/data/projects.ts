import { Project } from './types';

export const projects: Project[] = [
  {
    id: '1',
    title: "Spit on H*tler's Grave",
    subtitle: 'inside threating history — outside totalarity — besides democracy',
    dates: '19. – 24. September 2024',
    venue: 'Stadtwerkstatt Friedrichshain-Kreuzberg',
    city: 'Berlin',
    current: false,
    featured: true,
    gradient: 'from-red-900 via-zinc-900 to-black',
    imageUrl: '/images/exhibitions/spitlers-grave.jpg',

    // ── Rich detail ────────────────────────────────────────────────────
    partner: 'Zusammenstelle',
    visitors: '900+',
    duration: '5 Tage / 5 Days',
    conceptDE: `Das interdisziplinäre Ausstellungskonzept „Spit on H*tler's Grave" vom Kunstkollektiv KreativKraftwerk bringt internationale Künstler*innen und Kunstwerke zusammen, die sich kritisch mit Erinnerungskultur, Widerstand und der Kontinuität rechter Ideologien im 20. und 21. Jahrhundert auseinandersetzen. Kuratiert wird das Projekt von einem Team aus Kunst, Architektur sowie Politik- und Kulturwissenschaften.`,
    conceptEN: `The interdisciplinary exhibition concept "Spit on H*tler's Grave" by KreativKraftwerk brings together international artists and artworks that critically engage with memory culture, resistance, and the continuity of right-wing ideologies across the 20th and 21st centuries. The project is curated by a team from art, architecture, political science, and cultural studies.`,
    triggerDE: `Losgelöst durch den ansteigenden Rechtsruck vor der Bundestagswahl 2025, war Ausgangspunkt für die Ausstellung die Frage, ob Hitler ein Grab besitzt und wie man im metaphorischen Sinne seine wieder aufkommende nationalsozialistische Idee begraben kann.`,
    triggerEN: `Triggered by the rising shift to the right ahead of the 2025 federal election, the starting point for the exhibition was the question of whether Hitler has a grave — and how, in a metaphorical sense, one might bury his re-emerging National Socialist ideology.`,
    framework: [
      {
        term: 'Inside',
        de: 'der Gefühlslage des Individuums',
        en: 'the emotional state of the individual',
      },
      {
        term: 'Outside',
        de: 'im Rechtsdruck von Politik und der Gesellschaft',
        en: 'the political pressure of society and the state',
      },
      {
        term: 'Besides',
        de: 'ein Gefühl der Ohnmächtigkeit',
        en: 'a feeling of powerlessness',
      },
    ],
    insideOutsideBody: {
      de: [
        'Inside der Gefühlslage des Individuums, Outside im Rechtsdruck von Politik und der Gesellschaft ergibt sich Besides ein Gefühl der Ohnmächtigkeit.',
        'Inside eines Bezirks, der nicht zum Stadtbild des Bundeskanzlers passt, Outside in der Stadt des ehemaligen Zentrums der nationalsozialistischen Vergangenheit, ergibt sich Besides eine neue Form des Rassismus und Diskriminierung.',
        'Inside eines Landes mit totalitären Narben, Outside einer Welt, in der es derzeit mehr Autokratien als Demokratien gibt, ergibt sich Besides eine Sympathie zur neuen Rechten.',
      ],
      en: [
        'Inside the emotional state of the individual, Outside the political pressure of society and the state, there emerges Besides a feeling of powerlessness.',
        "Inside a district that does not fit the Chancellor's image of the city, Outside in the city that was once the centre of the National Socialist past, there emerges Besides a new form of racism and discrimination.",
        'Inside a country with totalitarian scars, Outside a world in which there are currently more autocracies than democracies, there emerges Besides a sympathy towards the new right.',
      ],
    },
    sections: [
      {
        name: 'Kontinuitäten',
        nameEN: 'Continuities',
        description: 'Künstlerische Arbeiten, die die Verbindung von totalitärer Geschichte zu heute beleuchten und reflektieren.',
        descriptionEN: 'Artworks that illuminate and reflect the connection between totalitarian history and the present.',
        artists: [
          'Isaac Waldvogel',
          'Johannes Weilandt',
          'Jodie Luk',
          'Lucas Gervilla',
        ],
      },
      {
        name: 'Reaktionen',
        nameEN: 'Reactions',
        description: 'Künstlerische Arbeiten, die die emotionale Welt zum Anstieg von Totalität thematisieren.',
        descriptionEN: 'Artworks that engage with the emotional landscape of rising authoritarianism.',
        artists: [
          'Elena Rabinka',
          'Monika Mausolf',
          'Andrea Berke & Nana Rozhina',
          'Lua Elmila, Maerie C. Fricke & Delphine Oellers',
          'Kasper Jakobsen & Marlene Schomberg',
          'Violante Romani & Johanna E. Wekemann',
        ],
      },
      {
        name: 'Aktionen',
        nameEN: 'Actions',
        description: 'Künstlerische Arbeiten, die Aktionen und Lösungen gegen den ansteigenden Rechtsruck thematisieren oder diese reflektieren.',
        descriptionEN: 'Artworks that propose or reflect on responses and actions against the rising far-right.',
        artists: [
          'Leni Schleyer & Diana Brittinger',
          'Ilona Eisenbraun',
          'Sophie Linde',
          'Philipp Pink',
          'ACCICE — Access to Justice',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Material Dialogues',
    subtitle: 'Group Show',
    dates: 'Feb 10 – Apr 12, 2026',
    venue: 'Kunsthaus Mitte',
    city: 'Berlin',
    current: true,
    gradient: 'from-stone-800 via-amber-900 to-stone-700',
  },
  {
    id: '4',
    title: 'Bodies in Space',
    subtitle: 'Performance & Video',
    dates: 'Dec 1, 2025 – Feb 14, 2026',
    venue: 'HAU Hebbel am Ufer',
    city: 'Berlin',
    current: false,
    gradient: 'from-neutral-800 via-neutral-600 to-zinc-500',
  },
  {
    id: '6',
    title: 'Peripheral Voices',
    subtitle: 'Mixed Media',
    dates: 'Oct 3 – Dec 7, 2025',
    venue: 'Berlinische Galerie',
    city: 'Berlin',
    current: false,
    gradient: 'from-zinc-700 via-stone-600 to-amber-800',
  }
];
