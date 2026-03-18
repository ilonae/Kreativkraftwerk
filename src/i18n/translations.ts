export type Lang = 'de' | 'en';

const translations = {
  en: {
    nav: {
      tabs: {
        projects: 'Projects',
        collectiveNetwork: 'Collective Network',
        approach: 'Approach',
        contact: 'Contact',
        about: 'About',
      },
      futureLocations: 'Other Locations in the Future',
      menu: 'Menu',
      close: 'Close',
    },
    projectDetail: {
      back: '← Projects',
      backFull: '← Back to Projects',
      allProjects: 'All projects by KreativKraftwerk, Berlin',
      project: 'Project',
      concept: 'Project Concept',
      structure: 'Structure',
      firstShown: 'First shown',
      cooperationWith: 'in cooperation with',
      visitors: 'visitors',
      curatedBy: 'Curated by',
      structureBody:
        'The theoretical section provides a thematic framework for the artistic works. Moving from Continuities through Reactions toward action-oriented Actions — including a protest lounge with informational materials.',
      comingSoon: 'Project — Detail view coming soon',
      de: 'DE',
      en: 'EN',
    },
    projects: {
      breadcrumb: 'Projects',
      active: 'Active Projects',
      upcoming: 'Upcoming',
      completed: 'Completed',
      statusLabels: {
        ongoing: 'Ongoing',
        upcoming: 'Upcoming',
        completed: 'Completed',
      },
    },
    about: {
      breadcrumb: 'About',
      heroText:
        'An interdisciplinary arts collective based in Berlin. A room for encounter, exchange, and the unfinished work of living and making together.',
      whoWeAre: 'Who We Are',
      history: 'History',
      futureLocationsTag: 'Andere Orte in Zukunft',
      futureLocationsTitle: 'Other Locations — Coming Soon',
      paragraph1:
        'KreativKraftwerk is an arts collective and community space founded in Berlin in 2023. We bring together artists, designers, architects, technologists, writers, and researchers under a shared commitment to interdisciplinary practice.',
      paragraph2:
        'We understand the collective as a room — not simply a physical space, but a condition of openness, permission, and encounter. The work we produce is shaped by dialogue, collaboration, and a willingness to stay in the unresolved.',
      paragraph3:
        'Currently rooted in Berlin, we are actively building connections across cities and countries. Future locations and partner spaces are in development.',
      paragraph4:
        'Membership in the collective is open and evolving. We welcome practitioners who share our values of community, experimentation, and rigorous interdisciplinary work.',
      values: {
        founded: 'Founded',
        base: 'Base',
        members: 'Members',
        disciplines: 'Disciplines',
        projects: 'Projects',
        futureLocations: 'Future Locations',
      },
    },
    approach: {
      breadcrumb: 'Approach',
      heroTitle: 'Interdisciplinary. Community Based. Room as a Term.',
      heroSubtitleHighlight: 'Community Based.',
      heroSubtitle:
        'KreativKraftwerk is an arts collective that understands practice as a shared condition. We come together across fields, backgrounds, and geographies to produce work that could not exist in isolation.',
      quote: '"A room is not empty when it holds the possibility of encounter."',
      quoteSource: '— KreativKraftwerk Manifesto, Berlin 2023',
    },
    contact: {
      breadcrumb: 'Contact',
      getInTouch: 'Get in Touch',
      location: 'Location',
      generalContact: 'General Contact',
      pressMedia: 'Press & Media',
      studioHours: 'Studio Hours',
      studioHoursLine1: 'Tuesday – Friday, 11:00 – 19:00',
      studioHoursLine2: 'Saturday, 12:00 – 17:00',
      studioHoursClosed: 'Closed Sunday & Monday',
      follow: 'Follow',
      formTitle: 'Contact Form',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      yourName: 'Your name',
      yourEmail: 'your@email.com',
      yourMessage: 'Your message…',
      selectSubject: 'Select a subject',
      send: 'Send Message →',
      sentTag: 'Message Sent',
      sentHeading: 'Thank you for reaching out.',
      sentBody:
        "We've received your message and will be in touch soon. We look forward to the exchange.",
      sendAnother: 'Send Another Message',
      subjectOptions: [
        'General Enquiry',
        'Project Proposal',
        'Membership / Joining the Collective',
        'Press & Media',
        'Collaboration Proposal',
        'Workshop / Event',
        'Other',
      ],
    },
    collectiveNetwork: {
      breadcrumb: 'Collective Network',
      intro:
        'KreativKraftwerk is a Berlin-based interdisciplinary arts collective bringing together practitioners across art, design, architecture, technology, and the humanities. The network operates as a shared space — a room as a term — for collaboration, exchange, and collective experimentation. Currently based in Berlin, with future locations forthcoming.',
      all: 'All',
      contact: 'Contact:',
      terms: ['Interdisciplinary', 'Community Based', 'Room as a Term'],
    },
  },

  de: {
    nav: {
      tabs: {
        projects: 'Projekte',
        collectiveNetwork: 'Kollektives Netzwerk',
        approach: 'Ansatz',
        contact: 'Kontakt',
        about: 'Über uns',
      },
      futureLocations: 'Andere Orte in Zukunft',
      menu: 'Menü',
      close: 'Schließen',
    },
    projectDetail: {
      back: '← Projekte',
      backFull: '← Zurück zu Projekten',
      allProjects: 'Alle Projekte von KreativKraftwerk, Berlin',
      project: 'Projekt',
      concept: 'Projektkonzept',
      structure: 'Aufbau',
      firstShown: 'Erstmals gezeigt',
      cooperationWith: 'in Kooperation mit',
      visitors: 'Besucher*innen',
      curatedBy: 'Kuratiert von',
      structureBody:
        'Der theoretische Teil des Projekts gibt den gezeigten künstlerischen Positionen einen thematischen Rahmen. Angefangen beim Themenblock Kontinuitäten über Reaktionen hin zu lösungsorientierten Aktionen — inkl. einer Protestlounge mit Infomaterialien zur Aufklärung.',
      comingSoon: 'Projekt — Detailansicht demnächst verfügbar',
      de: 'DE',
      en: 'EN',
    },
    projects: {
      breadcrumb: 'Projekte',
      active: 'Aktive Projekte',
      upcoming: 'Demnächst',
      completed: 'Abgeschlossen',
      statusLabels: {
        ongoing: 'Laufend',
        upcoming: 'Demnächst',
        completed: 'Abgeschlossen',
      },
    },
    about: {
      breadcrumb: 'Über uns',
      heroText:
        'Ein interdisziplinäres Kunstkollektiv mit Sitz in Berlin. Ein Raum für Begegnung, Austausch und die unfertige Arbeit des gemeinsamen Lebens und Schaffens.',
      whoWeAre: 'Wer wir sind',
      history: 'Geschichte',
      futureLocationsTag: 'Andere Orte in Zukunft',
      futureLocationsTitle: 'Andere Orte — Demnächst',
      paragraph1:
        'KreativKraftwerk ist ein Kunstkollektiv und Gemeinschaftsraum, gegründet 2023 in Berlin. Wir vereinen Künstler*innen, Designer*innen, Architekt*innen, Technolog*innen, Schriftsteller*innen und Forscher*innen unter einem gemeinsamen Engagement für interdisziplinäre Praxis.',
      paragraph2:
        'Wir verstehen das Kollektiv als einen Raum — nicht nur als physischen Ort, sondern als Zustand der Offenheit, Erlaubnis und Begegnung. Die Arbeit, die wir produzieren, wird geprägt durch Dialog, Zusammenarbeit und die Bereitschaft, im Ungelösten zu verweilen.',
      paragraph3:
        'Derzeit in Berlin verwurzelt, bauen wir aktiv Verbindungen in andere Städte und Länder auf. Zukünftige Standorte und Partnerräume sind in Entwicklung.',
      paragraph4:
        'Die Mitgliedschaft im Kollektiv ist offen und veränderlich. Wir begrüßen Praktiker*innen, die unsere Werte von Gemeinschaft, Experimentierfreude und rigoroser interdisziplinärer Arbeit teilen.',
      values: {
        founded: 'Gegründet',
        base: 'Standort',
        members: 'Mitglieder',
        disciplines: 'Disziplinen',
        projects: 'Projekte',
        futureLocations: 'Zukünftige Orte',
      },
    },
    approach: {
      breadcrumb: 'Ansatz',
      heroTitle: 'Interdisziplinär. Gemeinschaftsbasiert. Raum als Begriff.',
      heroSubtitleHighlight: 'Gemeinschaftsbasiert.',
      heroSubtitle:
        'KreativKraftwerk ist ein Kunstkollektiv, das Praxis als gemeinsamen Zustand versteht. Wir kommen zusammen über Felder, Hintergründe und Geographien hinweg, um Werke zu produzieren, die in Isolation nicht existieren könnten.',
      quote:
        '„Ein Raum ist nicht leer, wenn er die Möglichkeit der Begegnung birgt."',
      quoteSource: '— KreativKraftwerk Manifest, Berlin 2023',
    },
    contact: {
      breadcrumb: 'Kontakt',
      getInTouch: 'In Kontakt treten',
      location: 'Standort',
      generalContact: 'Allgemeiner Kontakt',
      pressMedia: 'Presse & Medien',
      studioHours: 'Studiozeiten',
      studioHoursLine1: 'Dienstag – Freitag, 11:00 – 19:00',
      studioHoursLine2: 'Samstag, 12:00 – 17:00',
      studioHoursClosed: 'Geschlossen So. & Mo.',
      follow: 'Folgen',
      formTitle: 'Kontaktformular',
      name: 'Name',
      email: 'E-Mail',
      subject: 'Betreff',
      message: 'Nachricht',
      yourName: 'Ihr Name',
      yourEmail: 'ihre@email.de',
      yourMessage: 'Ihre Nachricht…',
      selectSubject: 'Betreff auswählen',
      send: 'Nachricht senden →',
      sentTag: 'Nachricht gesendet',
      sentHeading: 'Vielen Dank für Ihre Nachricht.',
      sentBody:
        'Wir haben Ihre Nachricht erhalten und werden uns bald melden. Wir freuen uns auf den Austausch.',
      sendAnother: 'Weitere Nachricht senden',
      subjectOptions: [
        'Allgemeine Anfrage',
        'Projektvorschlag',
        'Mitgliedschaft / Dem Kollektiv beitreten',
        'Presse & Medien',
        'Kooperationsvorschlag',
        'Workshop / Veranstaltung',
        'Sonstiges',
      ],
    },
    collectiveNetwork: {
      breadcrumb: 'Kollektives Netzwerk',
      intro:
        'KreativKraftwerk ist ein in Berlin ansässiges interdisziplinäres Kunstkollektiv, das Praktiker*innen aus Kunst, Design, Architektur, Technologie und Geisteswissenschaften zusammenbringt. Das Netzwerk funktioniert als gemeinsamer Raum — ein Raum als Begriff — für Zusammenarbeit, Austausch und kollektives Experimentieren. Derzeit in Berlin ansässig, mit zukünftigen Standorten in Planung.',
      all: 'Alle',
      contact: 'Kontakt:',
      terms: ['Interdisziplinär', 'Gemeinschaftsbasiert', 'Raum als Begriff'],
    },
  },
};

export default translations;
