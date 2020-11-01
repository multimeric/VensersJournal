module.exports = {
    getSetInformation: function(set) {
        if (set == undefined) {
            return setInfo;
        }
        return setInfo[set];
    }
}

const setInfo = {
    "LEA": {
        "setcode": "LEA",
        "fullname": "Limited Edition Alpha",
        "releaseDate": "1993-08-05",
        "previousSet": null,
        "nextSet": "LEB"
    },
    "LEB": {
        "setcode": "LEB",
        "fullname": "Limited Edition Beta",
        "releaseDate": "1993-10-01",
        "previousSet": "LEA",
        "nextSet": "2ED"
    },
    "2ED": {
        "setcode": "2ED",
        "fullname": "Unlimited Edition",
        "releaseDate": "1993-12-01",
        "previousSet": "LEB",
        "nextSet": "ARN"
    },
    "ARN": {
        "setcode": "ARN",
        "fullname": "Arabian Nights",
        "releaseDate": "1993-12-01",
        "previousSet": "2ED",
        "nextSet": "3ED"
    },
    "ATQ": {
        "setcode": "ATQ",
        "fullname": "Antiquities",
        "releaseDate": "1994-03-01",
        "previousSet": "ARN",
        "nextSet": "3ED"

    },
    "3ED": {
        "setcode": "3ED",
        "fullname": "Revised Edition",
        "releaseDate": "1994-04-01",
        "previousSet": "ATQ",
        "nextSet": "LEG"
    },
    "LEG": {
        "setcode": "3ED",
        "fullname": "Legends",
        "releaseDate": "1994-06-01",
        "previousSet": "3ED",
        "nextSet": "DRK"
    },
    "DRK": {
        "setcode": "DRK",
        "fullname": "The Dark",
        "releaseDate": "1994-08-01",
        "previousSet": "LEG",
        "nextSet": "FEM"
    },
    "FEM": {
        "setcode": "FEM",
        "fullname": "Fallen Empires",
        "releaseDate": "1994-11-01",
        "previousSet": "DRK",
        "nextSet": "4ED"
    },
    "4ED": {
        "setcode": "4ED",
        "fullname": "Fourth Edition",
        "releaseDate": "1995-05-01",
        "previousSet": "FEM",
        "nextSet": "ICE"
    },
    "ICE": {
        "setcode": "ICE",
        "fullname": "Ice Age",
        "releaseDate": "1995-06-01",
        "previousSet": "4ED",
        "nextSet": "CHR"
    },
    "CHR": {
        "setcode": "CHR",
        "fullname": "Chronicles",
        "releaseDate": "1995-07-01",
        "previousSet": "ICE",
        "nextSet": "HML"
    },
    "HML": {
        "setcode": "HML",
        "fullname": "Homelands",
        "releaseDate": "1995-10-01",
        "previousSet": "CHR",
        "nextSet": "ALL"
    },
    "ALL": {
        "setcode": "ALL",
        "fullname": "Alliances",
        "releaseDate": "1996-06-01",
        "previousSet": "HML",
        "nextSet": "MIR"
    },
    "MIR": {
        "setcode": "MIR",
        "fullname": "Mirage",
        "releaseDate": "1996-10-01",
        "previousSet": "ALL",
        "nextSet": "VIS"
    },
    "VIS": {
        "setcode": "VIS",
        "fullname": "Alliances",
        "releaseDate": "1997-02-01",
        "previousSet": "MIR",
        "nextSet": "5ED"
    },
    "5ED": {
        "setcode": "5ED",
        "fullname": "Fifth Edition",
        "releaseDate": "1997-03-01",
        "previousSet": "VIS",
        "nextSet": "WTH"
    },
    "WTH": {
        "setcode": "WTH",
        "fullname": "Weatherlight",
        "releaseDate": "1997-06-01",
        "previousSet": "5ED",
        "nextSet": "TMP"
    },
    "TMP": {
        "setcode": "TMP",
        "fullname": "Tempest",
        "releaseDate": "1997-10-01",
        "previousSet": "WTH",
        "nextSet": "STH"
    },
    "STH": {
        "setcode": "STH",
        "fullname": "Stronghold",
        "releaseDate": "1998-02-01",
        "previousSet": "TMP",
        "nextSet": "EXO"
    },
    "EXO": {
        "setcode": "EXO",
        "fullname": "Exodus",
        "releaseDate": "1998-06-01",
        "previousSet": "STH",
        "nextSet": "USG"
    },
    "USG": {
        "setcode": "USG",
        "fullname": "Urza's Saga",
        "releaseDate": "1998-10-01",
        "previousSet": "EXO",
        "nextSet": "ATH"
    },
    "ATH": {
        "setcode": "ATH",
        "fullname": "Anthologies",
        "releaseDate": "1998-11-01",
        "previousSet": "USG",
        "nextSet": "ULG"
    },
    "ULG": {
        "setcode": "ULG",
        "fullname": "Urza's Legacy",
        "releaseDate": "1999-02-01",
        "previousSet": "ATH",
        "nextSet": "6ED"
    },
    "6ED": {
        "setcode": "6ED",
        "fullname": "Sixth Edition",
        "releaseDate": "1999-04-01",
        "previousSet": "ULG",
        "nextSet": "UDS"
    },
    "UDS": {
        "setcode": "UDS",
        "fullname": "Urza's Destiny",
        "releaseDate": "1999-06-01",
        "previousSet": "6ED",
        "nextSet": "MMQ"
    },
    "MMQ": {
        "setcode": "MMQ",
        "fullname": "Mercadian Masques",
        "releaseDate": "1999-09-01",
        "previousSet": "UDS",
        "nextSet": "BRB"
    },
    "BRB": {
        "setcode": "BRB",
        "fullname": "Battle Royale",
        "releaseDate": "1999-11-01",
        "previousSet": "MMQ",
        "nextSet": "NEM"
    },
    "NEM": {
        "setcode": "NEM",
        "fullname": "Nemesis",
        "releaseDate": "2000-02-01",
        "previousSet": "BRB",
        "nextSet": "PCY"
    },
    "PCY": {
        "setcode": "PCY",
        "fullname": "Prophecy",
        "releaseDate": "2000-06-01",
        "previousSet": "NEM",
        "nextSet": "INV"
    },
    "INV": {
        "setcode": "INV",
        "fullname": "Invasion",
        "releaseDate": "1999-06-01",
        "previousSet": "PCY",
        "nextSet": "PLS"
    },
    "PLS": {
        "setcode": "PLS",
        "fullname": "Planeshift",
        "releaseDate": "2001-01-01",
        "previousSet": "INV",
        "nextSet": "7ED"
    },
    "7ED": {
        "setcode": "7ED",
        "fullname": "Seventh Edition",
        "releaseDate": "2001-04-01",
        "previousSet": "PLS",
        "nextSet": "APC"
    },
    "APC": {
        "setcode": "APC",
        "fullname": "Apocalypse",
        "releaseDate": "2001-05-01",
        "previousSet": "7ED",
        "nextSet": "ODY"
    },
    "ODY": {
        "setcode": "ODY",
        "fullname": "Odyssey",
        "releaseDate": "2001-10-01",
        "previousSet": "APC",
        "nextSet": "TOR"
    },
    "TOR": {
        "setcode": "TOR",
        "fullname": "Torment",
        "releaseDate": "2002-02-01",
        "previousSet": "ODY",
        "nextSet": "JUD"
    },
    "JUD": {
        "setcode": "JUD",
        "fullname": "Judgment",
        "releaseDate": "2002-05-01",
        "previousSet": "TOR",
        "nextSet": "ONS"
    },
    "ONS": {
        "setcode": "ONS",
        "fullname": "Onslaught",
        "releaseDate": "2002-10-01",
        "previousSet": "JUD",
        "nextSet": "LGN"
    },
    "LGN": {
        "setcode": "LGN",
        "fullname": "Legions",
        "releaseDate": "2003-01-01",
        "previousSet": "ONS",
        "nextSet": "SCG"
    },
    "SCG": {
        "setcode": "SCG", 
        "fullname": "Scourge",
        "releaseDate": "2003-05-01",
        "previousSet": "LGN",
        "nextSet": "8ED"
    },
    "8ED": {
        "setcode": "8ED",
        "fullname": "Eight Edition",
        "releaseDate": "2003-07-01",
        "previousSet": "SCG",
        "nextSet": "MRD"
    },
    "MRD": {
        "setcode": "MRD",
        "fullname": "Mirrodin",
        "releaseDate": "2003-10-01",
        "previousSet": "8ED",
        "nextSet": "DST"
    },
    "DST": {
        "setcode": "DST",
        "fullname": "Darksteel",
        "releaseDate": "2004-02-01",
        "previousSet": "MRD",
        "nextSet": "5DN"
    },
    "5DN": {
        "setcode": "5DN",
        "fullname": "Fifth Dawn",
        "releaseDate": "2004-06-01",
        "previousSet": "DST",
        "nextSet": "CHK"
    },
    "CHK": {
        "setcode": "CHK",
        "fullname": "Champions of Kamigawa",
        "releaseDate": "2004-10-01",
        "previousSet": "5DN",
        "nextSet": "BOK"
    },
    "BOK": {
        "setcode": "BOK",
        "fullname": "Betrayers of Kamigawa",
        "releaseDate": "2005-02-01",
        "previousSet": "CHK",
        "nextSet": "SOK"
    },
    "SOK": {
        "setcode": "SOK",
        "fullname": "Saviors of Kamigawa",
        "releaseDate": "2005-06-01",
        "previousSet": "BOK",
        "nextSet": "9ED"
    },
    "9ED": {
        "setcode": "9ED",
        "fullname": "Ninth Edition",
        "releaseDate": "2005-07-01",
        "previousSet": "SOK",
        "nextSet": "RAV"
    },
    "RAV": {
        "setcode": "RAV",
        "fullname": "Ravnica: City of Guilds",
        "releaseDate": "2005-10-01",
        "previousSet": "9ED",
        "nextSet": "GPT"
    },
    "GPT": {
        "setcode": "GPT",
        "fullname": "Guildpact",
        "releaseDate": "2006-02-01",
        "previousSet": "RAV",
        "nextSet": "DIS"
    },
    "DIS": {
        "setcode": "DIS",
        "fullname": "Dissension",
        "releaseDate": "2006-05-01",
        "previousSet": "GPT",
        "nextSet": "CSP"
    },
    "CSP": {
        "setcode": "CSP",
        "fullname": "Coldsnap",
        "releaseDate": "2006-07-01",
        "previousSet": "DIS",
        "nextSet": "TSP"
    },
    "TSP": {
        "setcode": "TSP",
        "fullname": "Time Spiral",
        "releaseDate": "2006-10-01",
        "previousSet": "CSP",
        "nextSet": "PLC"
    },
    "PLC": {
        "setcode": "PLC",
        "fullname": "Planar Chaos",
        "releaseDate": "2007-02-01",
        "previousSet": "TSP",
        "nextSet": "FUT"
    },
    "FUT": {
        "setcode": "FUT",
        "fullname": "Future Sight",
        "releaseDate": "2007-05-01",
        "previousSet": "PLC",
        "nextSet": "10E"
    },
    "10E": {
        "setcode": "10E",
        "fullname": "Tenth Edition",
        "releaseDate": "2007-07-01",
        "previousSet": "FUT",
        "nextSet": "LRW"
    },
    "LRW": {
        "setcode": "LRW",
        "fullname": "Lorwyn",
        "releaseDate": "2007-10-01",
        "previousSet": "10E",
        "nextSet": "ODY"
    },
    "EVG": {
        "setcode": "EVG",
        "fullname": "Duel Decks: Elves vs Goblins",
        "releaseDate": "2007-11-01",
        "previousSet": "LRW",
        "nextSet": "MOR"
    },
    "MOR": {
        "setcode": "MOR",
        "fullname": "MOrningtide",
        "releaseDate": "2008-02-01",
        "previousSet": "EVG",
        "nextSet": "SHM"
    },
    "SHM": {
        "setcode": "SHM",
        "fullname": "Shadowmoor",
        "releaseDate": "2008-05-01",
        "previousSet": "MOR",
        "nextSet": "EVE"
    },
    "EVE": {
        "setcode": "EVE",
        "fullname": "Eventide",
        "releaseDate": "2008-06-01",
        "previousSet": "SHM",
        "nextSet": "ALA"
    },
    "ALA": {
        "setcode": "ALA",
        "fullname": "Shards of Alara",
        "releaseDate": "2008-09-01",
        "previousSet": "EVE",
        "nextSet": "DD2"
    },
    "DD2": {
        "setcode": "DD2",
        "fullname": "Duel Decks: Jace vs Chandra",
        "releaseDate": "2008-11-01",
        "previousSet": "ALA",
        "nextSet": "CON"
    },
    "CON": {
        "setcode": "CON",
        "fullname": "Conflux",
        "releaseDate": "2009-02-01",
        "previousSet": "DD2",
        "nextSet": "DDC"
    },
    "DDC": {
        "setcode": "DDC",
        "fullname": "Duel Decks: Divine vs Demonic",
        "releaseDate": "2009-04-01",
        "previousSet": "CON",
        "nextSet": "ARB"
    },
    "ARB": {
        "setcode": "ARB",
        "fullname": "Alara Reborn",
        "releaseDate": "2009-04-01",
        "previousSet": "DDC",
        "nextSet": "M10"
    },
    "M10": {
        "setcode": "M10",
        "fullname": "Magic 2010",
        "releaseDate": "2009-07-01",
        "previousSet": "ARB",
        "nextSet": "HOP"
    },
    "HOP": {
        "setcode": "HOP",
        "fullname": "Planechase",
        "releaseDate": "2009-09-01",
        "previousSet": "M10",
        "nextSet": "ZEN"
    },
    "ZEN": {
        "setcode": "ZEN",
        "fullname": "Zendikar",
        "releaseDate": "2009-10-01",
        "previousSet": "HOP",
        "nextSet": "DDD"
    },
    "DDD": {
        "setcode": "DDD",
        "fullname": "Duel Decks: Garruk vs Liliana",
        "releaseDate": "2009-10-01",
        "previousSet": "ZEN",
        "nextSet": "WWK"
    },
    "WWK": {
        "setcode": "WWK",
        "fullname": "Worldwake",
        "releaseDate": "2010-02-01",
        "previousSet": "DDD",
        "nextSet": "DDE"
    },
    "DDE": {
        "setcode": "DDE",
        "fullname": "Duel Decks: Phyrexia vs The Coalition",
        "releaseDate": "2010-03-01",
        "previousSet": "WWK",
        "nextSet": "ROE"
    },
    "ROE": {
        "setcode": "ROE",
        "fullname": "Rise of the Eldrazi",
        "releaseDate": "2010-04-01",
        "previousSet": "DDE",
        "nextSet": "ARC"
    },
    "ARC": {
        "setcode": "ARC",
        "fullname": "Archenemy",
        "releaseDate": "2010-06-01",
        "previousSet": "ROE",
        "nextSet": "M11"
    },
    "M11": {
        "setcode": "M11",
        "fullname": "Magic 2011",
        "releaseDate": "2010-07-01",
        "previousSet": "ARC",
        "nextSet": "DDF"
    },
    "DDF": {
        "setcode": "DDF",
        "fullname": "Duel Decks: Elspeth vs Tezzeret",
        "releaseDate": "2010-09-01",
        "previousSet": "M11",
        "nextSet": "SOM"
    },
    "SOM": {
        "setcode": "SOM",
        "fullname": "Scras of Mirrodin",
        "releaseDate": "2010-10-01",
        "previousSet": "DDF",
        "nextSet": "MBS"
    },
    "MBS": {
        "setcode": "MBS",
        "fullname": "Mirrodin Besieged",
        "releaseDate": "2011-02-01",
        "previousSet": "SOM",
        "nextSet": "DDG"
    },
    "DDG": {
        "setcode": "DDG",
        "fullname": "Duel Decks: Knights vs Dragons",
        "releaseDate": "2011-04-01",
        "previousSet": "MBS",
        "nextSet": "NPH"
    },
    "NPH": {
        "setcode": "NPH",
        "fullname": "New Phyrexian",
        "releaseDate": "2011-05-01",
        "previousSet": "DDG",
        "nextSet": "CMD"
    },
    "CMD": {
        "setcode": "CMD",
        "fullname": "Commander",
        "releaseDate": "2011-06-01",
        "previousSet": "NPH",
        "nextSet": "M12"
    },
    "M12": {
        "setcode": "M12",
        "fullname": "Magic 2012",
        "releaseDate": "2011-07-01",
        "previousSet": "CMD",
        "nextSet": "DDH"
    },
    "DDH": {
        "setcode": "DDH",
        "fullname": "Duel Decks: Ajani vs Nicol Bolas",
        "releaseDate": "2011-09-01",
        "previousSet": "M12",
        "nextSet": "ISD"
    },
    "ISD": {
        "setcode": "ISD",
        "fullname": "Innistrad",
        "releaseDate": "2011-09-01",
        "previousSet": "DDH",
        "nextSet": "DKA"
    },
    "DKA": {
        "setcode": "DKA",
        "fullname": "Dark Ascension",
        "releaseDate": "2012-02-01",
        "previousSet": "ISD",
        "nextSet": "DDI"
    },
    "DDI": {
        "setcode": "DDI",
        "fullname": "Duel Decks: Venser vs Koth",
        "releaseDate": "2012-02-01",
        "previousSet": "DKA",
        "nextSet": "AVR"
    },
    "AVR": {
        "setcode": "AVR",
        "fullname": "Avacyn Restored",
        "releaseDate": "2012-05-01",
        "previousSet": "DDI",
        "nextSet": "PC2"
    },
    "PC2": {
        "setcode": "PC2",
        "fullname": "Planechase 2012",
        "releaseDate": "2012-05-01",
        "previousSet": "AVR",
        "nextSet": "M13"
    },
    "M13": {
        "setcode": "M13",
        "fullname": "Magic 2013",
        "releaseDate": "2012-07-01",
        "previousSet": "PC2",
        "nextSet": "DDJ"
    },
    "DDJ": {
        "setcode": "DDJ",
        "fullname": "Duel Decks: Izzet vs Golgari",
        "releaseDate": "2012-09-01",
        "previousSet": "M13",
        "nextSet": "RTR"
    },
    "RTR": {
        "setcode": "RTR",
        "fullname": "Return to Ravnica",
        "releaseDate": "2012-10-01",
        "previousSet": "DDJ",
        "nextSet": "TD2"
    },
    "GTC": {
        "setcode": "GTC",
        "fullname": "Gatecrash",
        "releaseDate": "2013-02-01",
        "previousSet": "RTR",
        "nextSet": "DDK"
    },
    "DDK": {
        "setcode": "DDK",
        "fullname": "Duel Decks: Sorin vs Tibalt",
        "releaseDate": "2013-03-01",
        "previousSet": "GTC",
        "nextSet": "DGM"
    },
    "DGM": {
        "setcode": "DGM",
        "fullname": "Dragon's Maze",
        "releaseDate": "2013-05-01",
        "previousSet": "DDK",
        "nextSet": "M14"
    },
    "M14": {
        "setcode": "M14",
        "fullname": "Magic 2014",
        "releaseDate": "2013-07-01",
        "previousSet": "DGM",
        "nextSet": "DDL"
    },
    "DDL": {
        "setcode": "DDL",
        "fullname": "Dual Decks: Heroes vs Monster",
        "releaseDate": "2013-09-01",
        "previousSet": "M14",
        "nextSet": "THS"
    },
    "THS": {
        "setcode": "THS",
        "fullname": "Theros",
        "releaseDate": "2013-09-01",
        "previousSet": "DDL",
        "nextSet": "C13"
    },
    "C13": {
        "setcode": "C13",
        "fullname": "Commander 2013",
        "releaseDate": "2013-11-01",
        "previousSet": "THS",
        "nextSet": "BNG"
    },
    "BNG": {
        "setcode": "BNG",
        "fullname": "Born of the Gods",
        "releaseDate": "2014-02-01",
        "previousSet": "C13",
        "nextSet": "DDM"
    },
    "DDM": {
        "setcode": "DDM",
        "fullname": "Duel Decks: Jace vs Vraska",
        "releaseDate": "2014-03-01",
        "previousSet": "BNG",
        "nextSet": "JOU"
    },
    "JOU": {
        "setcode": "JOU",
        "fullname": "Journey into Nyx",
        "releaseDate": "2014-05-01",
        "previousSet": "DDM",
        "nextSet": "CNS"
    },
    "CNS": {
        "setcode": "CNS",
        "fullname": "Conspiracy",
        "releaseDate": "2014-06-01",
        "previousSet": "JOU",
        "nextSet": "M15"
    },
    "M15": {
        "setcode": "M15",
        "fullname": "Magic 2015",
        "releaseDate": "2014-07-01",
        "previousSet": "CNS",
        "nextSet": "DDN"
    },
    "DDN": {
        "setcode": "DDN",
        "fullname": "Duel Decks: Speed vs Cunning",
        "releaseDate": "2014-10-01",
        "previousSet": "M15",
        "nextSet": "KTK"
    },
    "KTK": {
        "setcode": "KTK",
        "fullname": "Khans of Tarkir",
        "releaseDate": "2014-10-01",
        "previousSet": "DDN",
        "nextSet": "C14"
    },
    "C14": {
        "setcode": "C14",
        "fullname": "Commander 2014",
        "releaseDate": "2014-11-01",
        "previousSet": "KTK",
        "nextSet": "FRF"
    },
    "FRF": {
        "setcode": "FRF",
        "fullname": "Fate Reforged",
        "releaseDate": "2015-01-01",
        "previousSet": "C14",
        "nextSet": "DDO"
    },
    "DDO": {
        "setcode": "DDO",
        "fullname": "Duel Decks: Elspeth vs Kiora",
        "releaseDate": "2015-02-01",
        "previousSet": "FRF",
        "nextSet": "DTK"
    },
    "DTK": {
        "setcode": "DTK",
        "fullname": "Dragons of Tarkir",
        "releaseDate": "2015-03-01",
        "previousSet": "DDO",
        "nextSet": "MM2"
    },
    "MM2": {
        "setcode": "MM2",
        "fullname": "Modern Masters 2015",
        "releaseDate": "2015-05-01",
        "previousSet": "DTK",
        "nextSet": "ORI"
    },
    "ORI": {
        "setcode": "ORI",
        "fullname": "Magic Origins",
        "releaseDate": "2015-07-01",
        "previousSet": "MM2",
        "nextSet": "DDP"
    },
    "DDP": {
        "setcode": "DDP",
        "fullname": "Duel Decks: Zendikar vs Eldrazi",
        "releaseDate": "2015-08-01",
        "previousSet": "ORI",
        "nextSet": "BFZ"
    },
    "BFZ": {
        "setcode": "BFZ",
        "fullname": "Battle for Zendikar",
        "releaseDate": "2015-10-01",
        "previousSet": "DDP",
        "nextSet": "C15"
    },
    "C15": {
        "setcode": "C15",
        "fullname": "Commander 2015",
        "releaseDate": "2015-11-01",
        "previousSet": "BFZ",
        "nextSet": "OGW"
    },
    "OGW": {
        "setcode": "OGW",
        "fullname": "Oath of the Gatewatch",
        "releaseDate": "2016-01-01",
        "previousSet": "C15",
        "nextSet": "DDQ"
    },
    "DDQ": {
        "setcode": "DDQ",
        "fullname": "Duel Decks: Blessed vs Cursed",
        "releaseDate": "2016-02-01",
        "previousSet": "OGW",
        "nextSet": "SOI"
    },
    "SOI": {
        "setcode": "SOI",
        "fullname": "Shadows over Innistrad",
        "releaseDate": "2016-04-01",
        "previousSet": "DDQ",
        "nextSet": "EMN"
    },
    "EMN": {
        "setcode": "EMN",
        "fullname": "Eldritch Moon",
        "releaseDate": "2016-07-01",
        "previousSet": "SOI",
        "nextSet": "CN2"
    },
    "CN2": {
        "setcode": "CN2",
        "fullname": "Conspiracy: Take the Crown",
        "releaseDate": "2016-08-01",
        "previousSet": "EMN",
        "nextSet": "DDR"
    },
    "DDR": {
        "setcode": "DDR",
        "fullname": "Duel Decks: Nissa vs Ob Nixilis",
        "releaseDate": "2016-09-01",
        "previousSet": "CN2",
        "nextSet": "KLD"
    },
    "KLD": {
        "setcode": "KLD",
        "fullname": "Kaladesh",
        "releaseDate": "2016-09-01",
        "previousSet": "DDR",
        "nextSet": "C16"
    },
    "C16": {
        "setcode": "C16",
        "fullname": "Commander 2016",
        "releaseDate": "2016-11-01",
        "previousSet": "KLD",
        "nextSet": "AER"
    },
    "AER": {
        "setcode": "AER",
        "fullname": "Aether Revolt",
        "releaseDate": "2017-01-01",
        "previousSet": "C16",
        "nextSet": "MM3"
    },
    "MM3": {
        "setcode": "MM3",
        "fullname": "Modern Masters 2017",
        "releaseDate": "2017-03-01",
        "previousSet": "AER",
        "nextSet": "DDS"
    },
    "DDS": {
        "setcode": "DDS",
        "fullname": "Duel Decks: Mind vs Might",
        "releaseDate": "2017-03-01",
        "previousSet": "MM3",
        "nextSet": "AKH"
    },
    "AKH": {
        "setcode": "AKH",
        "fullname": "Amonkhet",
        "releaseDate": "2017-04-01",
        "previousSet": "DDS",
        "nextSet": "HOU"
    },
    "HOU": {
        "setcode": "HOU",
        "fullname": "Hour of Devastation",
        "releaseDate": "2017-07-01",
        "previousSet": "AKH",
        "nextSet": "C17"
    },
    "C17": {
        "setcode": "C17",
        "fullname": "Commander 2017",
        "releaseDate": "2017-08-01",
        "previousSet": "HOU",
        "nextSet": "XLN"
    },
    "XLN": {
        "setcode": "XLN",
        "fullname": "Ixalan",
        "releaseDate": "2017-09-01",
        "previousSet": "C17",
        "nextSet": "DDT"
    },
    "DDT": {
        "setcode": "DDT",
        "fullname": "Duel Decks: Merfolk vs Goblins",
        "releaseDate": "2017-11-01",
        "previousSet": "XLN",
        "nextSet": "RIX"
    },
    "RIX": {
        "setcode": "RIX",
        "fullname": "Rivals of Ixalan",
        "releaseDate": "2018-01-01",
        "previousSet": "DDT",
        "nextSet": "DDU"
    },
    "DDU": {
        "setcode": "DDU",
        "fullname": "Duel Decks: Elves vs Inventors",
        "releaseDate": "2018-04-01",
        "previousSet": "RIX",
        "nextSet": "DOM"
    },
    "DOM": {
        "setcode": "DOM",
        "fullname": "Dominaria",
        "releaseDate": "2018-04-01",
        "previousSet": "DDU",
        "nextSet": "BBD"
    },
    "BBD": {
        "setcode": "BBD",
        "fullname": "Battlebond",
        "releaseDate": "2018-06-01",
        "previousSet": "DOM",
        "nextSet": "M19"
    },
    "M19": {
        "setcode": "M19",
        "fullname": "Core Set 2019",
        "releaseDate": "2018-07-01",
        "previousSet": "BBD",
        "nextSet": "C18"
    },
    "C18": {
        "setcode": "C18",
        "fullname": "Commander 2018",
        "releaseDate": "2018-08-01",
        "previousSet": "M19",
        "nextSet": "GRN"
    },
    "GRN": {
        "setcode": "GRN",
        "fullname": "Guilds of Ravnica",
        "releaseDate": "2018-10-01",
        "previousSet": "C18",
        "nextSet": "RNA"
    },
    "RNA": {
        "setcode": "RNA",
        "fullname": "Ravnica Allegiance",
        "releaseDate": "2019-01-01",
        "previousSet": "GRN",
        "nextSet": "WAR"
    },
    "WAR": {
        "setcode": "WAR",
        "fullname": "War of the Spark",
        "releaseDate": "2019-05-01",
        "previousSet": "RNA",
        "nextSet": "MH1"
    },
    "MH1": {
        "setcode": "MH1",
        "fullname": "Modern Horizons",
        "releaseDate": "2019-06-01",
        "previousSet": "WAR",
        "nextSet": "M20"
    },
    "M20": {
        "setcode": "M20",
        "fullname": "Core Set 2020",
        "releaseDate": "2019-07-01",
        "previousSet": "MH1",
        "nextSet": "C19"
    },
    "C19": {
        "setcode": "C19",
        "fullname": "Commander 2019",
        "releaseDate": "2019-08-01",
        "previousSet": "M20",
        "nextSet": "ELD"
    },
    "ELD": {
        "setcode": "ELD",
        "fullname": "Throne of Eldraine",
        "releaseDate": "2019-10-04",
        "previousSet": "C19",
        "nextSet": "THB"
    },
    "THB": {
        "setcode": "THB",
        "fullname": "Theros Beyond Death",
        "releaseDate": "2020-01-01",
        "previousSet": "ELD",
        "nextSet": "IKO",
        "updateBulletin": "https://magic.wizards.com/en/articles/archive/news/theros-beyond-death-update-bulletin-2020-01-10",
        "policyPerspectives": "https://blogs.magicjudges.org/telliott/2020/01/20/policy-update-for-theros-beyond-death/"
    },
    "IKO": {
        "setcode": "IKO",
        "fullname": "Ikoria: Lair of Behemoths",
        "releaseDate": "2020-04-01",
        "previousSet": "THB",
        "nextSet": "M21",
        "updateBulletin": "https://magic.wizards.com/en/articles/archive/news/ikoria-lair-behemoths-update-bulletin-2020-04-10",
        "policyPerspectives": "https://blogs.magicjudges.org/telliott/2020/04/20/policy-update-for-ikoria-lair-of-behemoths/",
    },
    "M21": {
        "setcode": "M21",
        "fullname": "Core Set 2021",
        "releaseDate": "2020-07-03",
        "previousSet": "IKO",
        "nextSet": "JMP",
        "updateBulletin": "https://magic.wizards.com/en/articles/archive/news/core-set-2021-update-bulletin-2020-06-23",
        "policyPerspectives": "https://blogs.magicjudges.org/telliott/2020/06/29/policy-update-for-core-set-2021/"
    },
    "JMP": {
        "setcode": "JMP",
        "fullname": "Jumpstart",
        "releaseDate": "2020-07-17",
        "previousSet": "M21",
        "nextSet": "2XM"
    },
    "2XM": {
        "setcode": "2XM",
        "fullname": "Double Masters",
        "releaseDate": "2020-08-07",
        "previousSet": "JMP",
        "nextSet": "ZNR"
    },
    "ZNR": {
        "setcode": "ZNR",
        "fullname": "Zendikar Rising",
        "releaseDate": "2020-09-25",
        "previousSet": "2XM",
        "nextSet": "CMR"
    },
    "CMR": {
        "setcode": "CMR",
        "fullname": "Commander Legends",
        "releaseDate": "2020-11-20",
        "previousSet": "ZNR",
        "nextSet": "IDK"
    }
}
