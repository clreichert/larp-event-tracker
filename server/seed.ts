import { db } from "./db";
import { parties, encounters, combatEncounters, combatCheckins, issues } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const partyNames = [
    "Arden",
    "Clairia", 
    "P'Loa",
    "Uri-Kesh",
    "Doloron",
    "Sythwan",
    "Noctara",
    "Keer",
    "Waylon",
    "Elsewhich",
    "Glendeep"
  ];

  const createdParties: Record<string, { id: string; name: string }> = {};

  for (const name of partyNames) {
    const [party] = await db.insert(parties).values({ name }).returning();
    createdParties[name] = party;
    console.log(`Created party: ${name}`);
  }

  const encountersData = [
    {
      party: "Arden",
      encounters: [
        {
          name: 'Aria Morgan',
          time: 'Friday night',
          location: 'Contact',
          activity: 'Introducing the party to the companion, getting comfortable interacting in the "otherworld"',
          completed: true,
          notes: 'Party met with Aria. Good introduction. -JS'
        },
        {
          name: 'Ursula Smirch',
          time: 'Friday night',
          activity: 'Getting comfortable interacting in the "otherworld"',
          completed: true,
          notes: 'Went well. -CR'
        },
        {
          name: 'Nix Valerius',
          time: 'Friday night',
          activity: 'Walking to set location / experiencing combat',
          completed: true,
          notes: ''
        },
        {
          name: 'Isaiah Cooke',
          time: 'Friday night',
          location: 'Valerius house',
          activity: 'Illiterate letter #1 challenge; communicating despite obstacles',
          item: 'Paper listing needed items',
          completed: false,
          notes: ''
        },
        {
          name: 'Kiko Truthspeaker',
          time: 'Saturday morning',
          location: 'Makai Camp',
          activity: 'Cup of insight challenge; learning about partymates',
          item: 'locus root',
          completed: false,
          notes: ''
        },
        {
          name: 'Buzzkill',
          time: '11am-6pm',
          location: 'Crabtree & Evelyn\'s',
          activity: 'Perfectly good bucket challenge; practicing brainstorming, building on partymates\' ideas',
          completed: false,
          notes: ''
        },
        {
          name: 'Pascal Valerius',
          time: '8am-1pm',
          location: 'Valerius house',
          activity: 'Combat teamwork challenge; becoming more comfortable with combat, working as a team',
          item: 'star of direction',
          completed: false,
          notes: ''
        },
        {
          name: 'Karmin Smirch',
          time: '9-11am, 1-4pm, 6-8pm',
          location: 'Smirches\' shop',
          activity: 'Smirch jingle challenge; being creative, working collaboratively',
          item: 'riverglass jewelbox',
          completed: false,
          notes: ''
        }
      ]
    },
    {
      party: "Clairia",
      encounters: [
        {
          name: 'Initial Contact',
          time: 'Friday night',
          activity: 'Meeting companion and getting oriented',
          completed: true,
          notes: 'Group introduced successfully. -MM'
        },
        {
          name: 'First Challenge',
          time: 'Saturday morning',
          activity: 'Team building and party dynamics',
          completed: false,
          notes: ''
        }
      ]
    }
  ];

  for (const partyEncounter of encountersData) {
    const party = createdParties[partyEncounter.party];
    if (!party) continue;

    for (const encounter of partyEncounter.encounters) {
      await db.insert(encounters).values({
        partyId: party.id,
        name: encounter.name,
        time: encounter.time,
        location: encounter.location,
        activity: encounter.activity,
        item: encounter.item,
        completed: encounter.completed,
        notes: encounter.notes
      });
    }
    console.log(`Created ${partyEncounter.encounters.length} encounters for ${partyEncounter.party}`);
  }

  const combatData = [
    { name: 'Shadow Beast Pack', type: 'Creatures' },
    { name: 'Bandit Ambush', type: 'Humanoid' },
    { name: 'River Guardian', type: 'Elemental' },
    { name: 'Night Creatures', type: 'Creatures' },
    { name: 'Forest Spirits', type: 'Magical' },
    { name: 'Mountain Trolls', type: 'Creatures' },
    { name: 'Desert Wraiths', type: 'Undead' }
  ];

  const createdCombats: Array<{ id: string; name: string }> = [];
  for (const combat of combatData) {
    const [created] = await db.insert(combatEncounters).values(combat).returning();
    createdCombats.push(created);
    console.log(`Created combat: ${combat.name}`);
  }

  const checkinData: Array<{ combat: string; parties: string[]; notes: Record<string, string> }> = [
    { combat: 'Shadow Beast Pack', parties: ['Arden', 'Clairia', 'P\'Loa'], notes: { 'Arden': 'Party handled well, good teamwork. -CR' } },
    { combat: 'Bandit Ambush', parties: ['Arden', 'Clairia', 'P\'Loa', 'Uri-Kesh', 'Doloron'], notes: {} },
    { combat: 'River Guardian', parties: ['Arden', 'Uri-Kesh'], notes: {} },
    { combat: 'Night Creatures', parties: ['Sythwan'], notes: {} },
    { combat: 'Forest Spirits', parties: ['Clairia', 'P\'Loa', 'Doloron', 'Sythwan'], notes: {} },
    { combat: 'Mountain Trolls', parties: [], notes: {} },
    { combat: 'Desert Wraiths', parties: ['Uri-Kesh', 'Noctara'], notes: {} }
  ];

  for (const checkin of checkinData) {
    const combat = createdCombats.find(c => c.name === checkin.combat);
    if (!combat) continue;

    for (const partyName of partyNames) {
      const party = createdParties[partyName];
      if (!party) continue;

      const encountered = checkin.parties.includes(partyName);
      const notes = checkin.notes[partyName] || '';

      await db.insert(combatCheckins).values({
        combatId: combat.id,
        partyId: party.id,
        encountered,
        notes
      });
    }
    console.log(`Created checkins for combat: ${checkin.combat}`);
  }

  const issuesData = [
    {
      party: 'Clairia',
      job: 'Keeper',
      type: 'Medical',
      priority: 'Low',
      status: 'Hopefully fixed',
      situation: 'Keeper tweaked an ankle while walking. Sounds minor, but should have a medical check-in at lunch. -Scaz. UPDATE: JulieL checked her out and she\'s fine.',
      timestamp: new Date('2024-01-20T13:00:00'),
      hasDetails: true
    },
    {
      party: 'P\'Loa',
      job: 'Other',
      type: 'Medical',
      priority: 'High',
      status: 'Monitoring',
      situation: 'Participant suddenly feeling light-headed, sweaty; Steve found Abigail. Julie Leviter checking in. Maisie\'s husband sent to hospital via 911.',
      timestamp: new Date('2024-01-19T18:45:00'),
      hasDetails: true
    },
    {
      party: 'Uri-Kesh',
      job: 'Traveler',
      type: 'General',
      priority: 'Low',
      status: 'Hopefully fixed',
      situation: 'Participant walked through basement with eyes closed, feeling overwhelmed. Talked to Bill, participant went straight into combat workshops. Bill not concerned. -jodi',
      timestamp: new Date('2024-01-19T18:30:00'),
      hasDetails: false
    },
    {
      party: 'Noctara',
      job: 'Other',
      type: 'Opportunity!',
      priority: 'Low',
      status: 'Hopefully fixed',
      situation: 'Via companion, they are really into Banshee lore, Pendant of Fortune d\'Oro would be a big win for them. UPDATE: They got the pendant and were very excited!',
      timestamp: new Date('2024-01-20T08:30:00'),
      hasDetails: true
    },
    {
      party: 'Keer',
      job: 'Ranger',
      type: 'General',
      priority: 'Low',
      status: 'Monitoring',
      situation: 'BobM reports that Nietz (Martin) is holding himself apart. Worth keeping an eye on. Note: he lost a son to overdose couple years back, watch as grief/Rites plot ramps up. -Kristi',
      timestamp: new Date('2024-01-20T09:00:00'),
      hasDetails: false
    }
  ];

  for (const issue of issuesData) {
    await db.insert(issues).values(issue);
  }
  console.log(`Created ${issuesData.length} issues`);

  console.log("Seeding complete!");
}

export { seed };
