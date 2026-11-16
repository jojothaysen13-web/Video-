-- Fach: LF06 B
-- Thema: Markt und Preisbildung (Markt, Nachfrage, Angebot, Gleichgewichtspreis, Marktformen, Staatseingriffe, Funktionen des Marktpreises)
local Questions = {
    {
        question = "LF06 B: Was versteht man unter einem Markt?",
        options = {"Nur einen Wochenmarkt", "Jeden Ort, an dem Angebot und Nachfrage zusammentreffen", "Ein Gebaeude mit vielen Haendlern", "Einen vom Staat festgelegten Handelsort"},
        correct = 2,
        explanation = "Auch ein Onlineshop, die Boerse oder ein Telefonat im Callcenter ist ein Markt."
    },
    {
        question = "LF06 B: Welche zwei Aufgaben erfuellt der Markt?",
        options = {"Werbung und Vertrieb", "Produktion und Lagerung", "Vermittlung und Preisbildung", "Steuern und Zoelle"},
        correct = 3,
        explanation = "Der Markt bringt Anbieter und Nachfrager zusammen und bewertet die Gueter ueber den Preis."
    },
    {
        question = "LF06 B: Was gilt fuer einen Kaeufermarkt?",
        options = {"Das Angebot ist groesser als die Nachfrage", "Die Nachfrage ist groesser als das Angebot", "Der Staat legt den Preis fest", "Es gibt nur einen Anbieter"},
        correct = 1,
        explanation = "Beim Kaeufermarkt uebersteigt das Angebot die Nachfrage, die Kaeufer haben die Macht."
    },
    {
        question = "LF06 B: Welches Beispiel gehoert zu einem Verkaeufermarkt?",
        options = {"PC", "Pkw", "Buchpreisbindung", "Benzin"},
        correct = 4,
        explanation = "Bei Benzin uebersteigt die Nachfrage das Angebot, die Anbieter haben die Macht."
    },
    {
        question = "LF06 B: Welches Beispiel gehoert zu einem starren Markt?",
        options = {"Luxussportwagen", "Buchpreisbindung", "Wochenmarkt", "Wertpapierboerse"},
        correct = 2,
        explanation = "Beim starren Markt regelt der Staat den Preis mit, zum Beispiel bei der Buchpreisbindung."
    },
    {
        question = "LF06 B: Welcher Markt ist ein Faktormarkt?",
        options = {"Konsumguetermarkt", "Produktionsguetermarkt", "Markt fuer Headsets", "Arbeitsmarkt"},
        correct = 4,
        explanation = "Faktormaerkte sind Immobilienmarkt, Arbeitsmarkt und Kapitalmarkt."
    },
    {
        question = "LF06 B: Die Dialogfix GmbH kauft 100 Headsets fuer ihr Callcenter. Welche Marktart?",
        options = {"Konsumguetermarkt", "Kapitalmarkt", "Immobilienmarkt", "Produktionsguetermarkt"},
        correct = 4,
        explanation = "Das Unternehmen kauft Gueter, um damit selbst Leistungen zu erbringen."
    },
    {
        question = "LF06 B: Was besagt das Gesetz der Nachfrage?",
        options = {"Preis steigt, Nachfrage steigt", "Preis steigt, Nachfrage sinkt", "Die Nachfrage haengt nicht vom Preis ab", "Preis sinkt, Nachfrage sinkt"},
        correct = 2,
        explanation = "Nachfrager wollen mit knappem Geld den groessten Nutzen, also kaufen sie bei hohem Preis weniger."
    },
    {
        question = "LF06 B: Kaffee und Tee sind fuer viele Verbraucher ...",
        options = {"Komplementaergueter", "Produktionsgueter", "Substitutionsgueter", "Produktionsfaktoren"},
        correct = 3,
        explanation = "Sie sind austauschbar, ihre Nachfrage entwickelt sich entgegengesetzt."
    },
    {
        question = "LF06 B: Wechselakkus fuer E-Bikes werden billiger. Was passiert mit der Nachfrage nach E-Bikes?",
        options = {"Sie steigt", "Sie sinkt", "Sie bleibt gleich", "Sie faellt auf null"},
        correct = 1,
        explanation = "E-Bike und Akku sind Komplementaergueter, ihre Nachfrage geht in die gleiche Richtung."
    },
    {
        question = "LF06 B: In einem kuehlen Sommer bricht die Nachfrage nach Badebekleidung ein. Welche Bestimmungsgroesse?",
        options = {"Verfuegbares Einkommen", "Externe Faktoren", "Komplementaergueter", "Persoenliche Vorlieben"},
        correct = 2,
        explanation = "Wetter, Jahreszeit und Politik sind externe Faktoren."
    },
    {
        question = "LF06 B: Was besagt das Gesetz des Angebots?",
        options = {"Preis steigt, Angebot sinkt", "Das Angebot bleibt immer gleich", "Preis sinkt, Angebot steigt", "Preis steigt, Angebot steigt"},
        correct = 4,
        explanation = "Je hoeher der Preis, desto mehr bleibt nach Abzug der Kosten uebrig, also wird mehr angeboten."
    },
    {
        question = "LF06 B: Durch bessere Ablauforganisation sinken die Kosten um 10 Prozent. Welche Bestimmungsgroesse des Angebots?",
        options = {"Wettbewerbssituation", "Unternehmensziel", "Kosten der Produktion", "Externe Faktoren"},
        correct = 3,
        explanation = "Wer guenstiger herstellt, kann auch guenstiger anbieten."
    },
    {
        question = "LF06 B: Ein Anbieter macht Kampfpreise, um 12 Prozent Marktanteil zu erreichen. Welche Bestimmungsgroesse?",
        options = {"Unternehmensziel", "Erzielbarer Marktpreis", "Kosten der Produktion", "Externe Faktoren"},
        correct = 1,
        explanation = "Die Strategie des Unternehmens, hier Wachstum, steuert das Angebot."
    },
    {
        question = "LF06 B: Welche Rolle hast du als Auszubildender auf dem Arbeitsmarkt?",
        options = {"Anbieter", "Nachfrager", "Staat", "Vermittler"},
        correct = 1,
        explanation = "Du bietest deine Arbeitskraft an, der Betrieb fragt sie nach, der Preis ist der Lohn."
    },
    {
        question = "LF06 B: Was ist der Gleichgewichtspreis?",
        options = {"Der hoechste Preis am Markt", "Ein vom Staat festgelegter Preis", "Der Preis, bei dem angebotene und nachgefragte Menge gleich sind", "Der Preis mit dem groessten Gewinn"},
        correct = 3,
        explanation = "Im Schnittpunkt von Angebots- und Nachfragekurve wird der Markt geraeumt."
    },
    {
        question = "LF06 B: Laptops: Bei 1000 Euro werden 200 nachgefragt und 200 angeboten. Was liegt bei 1000 Euro vor?",
        options = {"Angebotsueberhang", "Gleichgewicht", "Nachfrageueberhang", "Starrer Markt"},
        correct = 2,
        explanation = "Angebotene und nachgefragte Menge sind gleich, 1000 Euro ist der Gleichgewichtspreis."
    },
    {
        question = "LF06 B: Kartoffeln kosten 1,50 Euro. Nachgefragt werden 400 kg, angeboten 200 kg. Was liegt vor?",
        options = {"Angebotsueberhang von 200 kg", "Gleichgewicht", "Nachfrageueberhang von 200 kg", "Nachfrageueberhang von 600 kg"},
        correct = 3,
        explanation = "Es fehlen 200 kg, es ist ein Verkaeufermarkt und der Preis steigt Richtung Gleichgewicht."
    },
    {
        question = "LF06 B: Ein Angebotsueberhang bedeutet ...",
        options = {"Verkaeufermarkt", "Starrer Markt", "Monopol", "Kaeufermarkt"},
        correct = 4,
        explanation = "Es wird mehr angeboten als nachgefragt, die Kaeufer sind im Vorteil und der Preis faellt."
    },
    {
        question = "LF06 B: 4 Euro: N 600, A 200. 6 Euro: N 400, A 400. 8 Euro: N 200, A 600. Wo liegt der Gleichgewichtspreis?",
        options = {"4 Euro", "5 Euro", "8 Euro", "6 Euro"},
        correct = 4,
        explanation = "Bei 6 Euro sind angebotene und nachgefragte Menge mit 400 gleich."
    },
    {
        question = "LF06 B: Die Nachfrage steigt, die Kurve verschiebt sich nach rechts. Was passiert?",
        options = {"Preis steigt, Menge steigt", "Preis sinkt, Menge steigt", "Preis steigt, Menge sinkt", "Preis sinkt, Menge sinkt"},
        correct = 1,
        explanation = "Mehr Nachfrage bei gleichem Angebot fuehrt zu hoeherem Preis und hoeherer Menge."
    },
    {
        question = "LF06 B: Nach einem heissen Sommer faellt die Kartoffelernte schlecht aus. Was passiert im Diagramm?",
        options = {"Nachfragekurve nach rechts", "Angebotskurve nach rechts", "Angebotskurve nach links", "Nachfragekurve nach links"},
        correct = 3,
        explanation = "Bei jedem Preis wird weniger angeboten, der Preis steigt und die Menge sinkt."
    },
    {
        question = "LF06 B: Es aendert sich nur der Preis des Gutes selbst. Was passiert im Diagramm?",
        options = {"Die Kurve verschiebt sich nach rechts", "Die Kurve verschiebt sich nach links", "Beide Kurven verschieben sich", "Bewegung auf der Kurve"},
        correct = 4,
        explanation = "Nur eine geaenderte Bestimmungsgroesse verschiebt die ganze Kurve."
    },
    {
        question = "LF06 B: Wenige Mineraloelkonzerne beliefern Millionen Autofahrer. Welche Marktform?",
        options = {"Polypol", "Angebotsoligopol", "Angebotsmonopol", "Nachfrageoligopol"},
        correct = 2,
        explanation = "Wenige Anbieter stehen vielen Nachfragern gegenueber, der Name richtet sich nach der kleineren Seite."
    },
    {
        question = "LF06 B: Viele Landwirte verkaufen Zuckerrueben an drei Zuckerfabriken. Welche Marktform?",
        options = {"Nachfrageoligopol", "Angebotsoligopol", "Polypol", "Angebotsmonopol"},
        correct = 1,
        explanation = "Viele Anbieter stehen wenigen Nachfragern gegenueber."
    },
    {
        question = "LF06 B: Welcher Markt kommt dem vollkommenen Markt am naechsten?",
        options = {"Mobilfunkvertraege", "Leitungswasser", "Wertpapierboerse", "Friseurdienstleistungen"},
        correct = 3,
        explanation = "Die Boerse erfuellt die Voraussetzungen des vollkommenen Markts am besten."
    },
    {
        question = "LF06 B: Eine Kundin bleibt bei ihrem Handyanbieter, weil der Mitarbeiter so freundlich ist. Was fehlt zum vollkommenen Markt?",
        options = {"Polypol", "Homogene Gueter", "Markttransparenz", "Keine Praeferenzen"},
        correct = 4,
        explanation = "Das ist eine persoenliche Praeferenz, Dialogmarketing schafft solche Praeferenzen bewusst."
    },
    {
        question = "LF06 B: Wozu fuehrt ein Hoechstpreis unter dem Gleichgewichtspreis?",
        options = {"Angebotsueberhang", "Nachfrageueberhang", "Marktraeumung", "Sinkende Nachfrage"},
        correct = 2,
        explanation = "Die Ware wird knapp, es drohen Warteschlangen und Schwarzmarkt, zum Beispiel bei der Mietpreisbremse."
    },
    {
        question = "LF06 B: Welche Aussage zum Mindestpreis stimmt?",
        options = {"Er liegt ueber dem Gleichgewicht und schuetzt die Anbieter", "Er liegt unter dem Gleichgewicht und schuetzt die Nachfrager", "Er liegt genau auf dem Gleichgewicht", "Er liegt unter dem Gleichgewicht und schuetzt die Anbieter"},
        correct = 1,
        explanation = "Folge ist ein Angebotsueberhang, Beispiele sind Agrarpreise und der Mindestlohn."
    },
    {
        question = "LF06 B: Welche Funktion des Marktpreises zeigt an, wie knapp ein Gut ist?",
        options = {"Ausgleichsfunktion", "Lenkungsfunktion", "Signalfunktion", "Auslesefunktion"},
        correct = 3,
        explanation = "Ein hoher Preis signalisiert, dass ein Gut knapp und begehrt ist."
    }
}

-- Checkpoints: Reihenfolge = Reihenfolge der Fragen (Checkpoint 1 = Frage 1 usw.)
-- Route: Innenstadt Los Santos -> Sueden/Hafen -> Flughafen -> Strand -> Westen/Hills -> Vinewood -> Osten -> Blaine County -> Paleto Bay -> Finale auf dem Mount Chiliad
-- Hinweis: Werte sind Naeherungen. Liegt ein Marker in der Luft oder im Boden, z-Wert im Spiel per Trainer pruefen und anpassen.
local Checkpoints = {
    {x = 215.0, y = -810.0, z = 30.7},      -- 1  Legion Square
    {x = 425.1, y = -979.5, z = 30.7},      -- 2  Mission Row Police Station
    {x = 357.4, y = -593.1, z = 28.8},      -- 3  Pillbox Hill Medical Center
    {x = -66.3, y = -802.4, z = 44.2},      -- 4  Maze Bank Tower (Eingang)
    {x = -14.3, y = -1441.0, z = 31.1},     -- 5  Forum Drive (Franklins Tante)
    {x = 105.0, y = -1940.0, z = 20.8},     -- 6  Grove Street
    {x = -255.0, y = -2026.0, z = 30.1},    -- 7  Maze Bank Arena
    {x = 140.0, y = -3100.0, z = 5.9},      -- 8  Hafen (Elysian Island)
    {x = -1037.5, y = -2737.8, z = 20.1},   -- 9  Flughafen LSIA
    {x = -1204.0, y = -1561.0, z = 4.6},    -- 10 Vespucci Beach
    {x = -1850.0, y = -1231.0, z = 13.0},   -- 11 Del Perro Pier
    {x = -1083.0, y = -245.0, z = 37.8},    -- 12 Lifeinvader
    {x = -365.4, y = -131.8, z = 37.9},     -- 13 LS Customs Burton
    {x = -1366.0, y = 56.7, z = 54.1},      -- 14 Los Santos Golf Club
    {x = -813.6, y = 179.5, z = 72.2},      -- 15 Michaels Haus (Rockford Hills)
    {x = -2243.8, y = 264.9, z = 174.6},    -- 16 Kortz Center
    {x = -438.8, y = 1076.0, z = 352.4},    -- 17 Galileo Observatorium
    {x = 7.9, y = 548.1, z = 175.5},        -- 18 Franklins Haus (Vinewood Hills)
    {x = 229.3, y = 214.8, z = 105.5},      -- 19 Pacific Standard Bank
    {x = 711.4, y = 1198.1, z = 348.5},     -- 20 Vinewood Schild
    {x = 924.0, y = 46.0, z = 81.1},        -- 21 Diamond Casino
    {x = 1080.0, y = -690.0, z = 57.6},     -- 22 Mirror Park
    {x = 1747.0, y = 3273.7, z = 41.1},     -- 23 Sandy Shores Flugplatz
    {x = 1839.6, y = 3672.9, z = 34.3},     -- 24 Sandy Shores Medical Center
    {x = 1853.2, y = 3686.6, z = 34.3},     -- 25 Sandy Shores Sheriff
    {x = 1985.5, y = 3812.2, z = 32.2},     -- 26 Trevors Wohnwagen
    {x = 1698.0, y = 4924.0, z = 42.1},     -- 27 Grapeseed
    {x = -448.0, y = 6008.0, z = 31.7},     -- 28 Paleto Bay Sheriff
    {x = -275.5, y = 6635.8, z = 7.4},      -- 29 Paleto Bay Kueste
    {x = 501.8, y = 5604.5, z = 797.9}      -- 30 Mount Chiliad Gipfel (Finale)
}
