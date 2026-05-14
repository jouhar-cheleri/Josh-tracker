// ── data.js — Curriculum data shared between dashboard and form ──
// Loaded as a classic script tag (no type="module").
// Exposes DEFAULT_DATA (for dashboard) and SUBJECTS/CHAPTERS (for form) as globals.

// ── SUBJECT ICONS (dashboard only) ──
const SUBJECT_ICONS = {
  'English':'📖','Mathematics':'📐','Basic Science':'🔬','Social Science':'🌍',
  'Physics':'⚡','Chemistry':'🧪','Biology':'🧬',
  'Social Science I':'🏛️','Social Science II':'🗺️','default':'📚'
};
function subjIcon(s){ return SUBJECT_ICONS[s]||SUBJECT_ICONS['default']; }

// ── DEFAULT CURRICULUM DATA (used by dashboard) ──
const DEFAULT_DATA = {
  "8B1":{
    "English":{chapters:[
      {name:"A Long Walk With Granny",month:"June",planned:16},
      {name:"The Seven Ages of Man",month:"June",planned:6},
      {name:"Little Things Matter",month:"July",planned:13},
      {name:"Hope is the Thing with Feathers",month:"July",planned:6},
      {name:"A Prescription for Life",month:"July–Aug",planned:15},
      {name:"The Day My World Changed",month:"Sep",planned:14},
      {name:"Talking of Science",month:"Sep–Oct",planned:11},
      {name:"Engine Trouble",month:"Oct–Nov",planned:15},
      {name:"The Astronomer",month:"Nov",planned:6},
      {name:"Get Together",month:"Nov",planned:6},
      {name:"A Tryst with Destiny",month:"Nov–Dec",planned:13},
      {name:"Thank You Ma'am",month:"Dec–Jan",planned:12},
      {name:"A Tale of Two Gifts",month:"Jan",planned:13},
      {name:"Caged Bird",month:"Feb",planned:6},
      {name:"Village of the Watermills",month:"Feb",planned:13}
    ]},
    "Mathematics":{chapters:[
      {name:"Squares (വർഗങ്ങൾ)",month:"June",planned:8},
      {name:"Congruent Triangles (തുല്യത്രികോണങ്ങൾ)",month:"June–July",planned:15},
      {name:"Quadratic Equations (വർഗസമവാക്യങ്ങൾ)",month:"July–Aug",planned:20},
      {name:"Polygons (ബഹുഭുജങ്ങൾ)",month:"Aug",planned:10},
      {name:"Solving Equations (സമവാക്യപരിഹാരം)",month:"Sep",planned:12},
      {name:"New Numbers (പുതിയ സംഖ്യകൾ)",month:"Sep–Oct",planned:10},
      {name:"Statistics / Divisors (സമഭാജികൾ)",month:"Oct",planned:10},
      {name:"Ratio/Proportion (അംശബന്ധം)",month:"Oct–Nov",planned:14},
      {name:"Circles (വൃത്തങ്ങൾ)",month:"Nov",planned:8},
      {name:"Decimal Forms (ദശാംശരൂപങ്ങൾ)",month:"Dec",planned:8},
      {name:"Parallelograms (സാമാന്തരികങ്ങൾ)",month:"Jan",planned:12},
      {name:"Prisms (ലംബകങ്ങൾ)",month:"Jan–Feb",planned:12},
      {name:"Statistics (സ്ഥിതിവിവരക്കണക്ക്)",month:"Feb",planned:8}
    ]},
    "Basic Science":{chapters:[
      {name:"Ch 1: Measurements & Units",month:"June–July",planned:10},
      {name:"Ch 2: Motion & Force",month:"July–Aug",planned:10},
      {name:"Ch 3: Pressure (മർദ്ദം)",month:"Aug–Oct",planned:12},
      {name:"Ch 4: Chemistry of Changes",month:"June–July",planned:10},
      {name:"Ch 5: Elements & Compounds",month:"July–Aug",planned:12},
      {name:"Ch 6: Metals & Non-metals",month:"Aug–Sep",planned:10},
      {name:"Ch 7: Plants (നട്ടു നനയ്ക്കാം)",month:"June–July",planned:14},
      {name:"Ch 8: Origin of Life",month:"July–Aug",planned:10},
      {name:"Ch 9: Cells & Tissues",month:"Sep–Oct",planned:8},
      {name:"Ch 10: Static Electricity",month:"Oct–Nov",planned:12},
      {name:"Ch 11: Magnetism & Electricity",month:"Nov–Jan",planned:14},
      {name:"Ch 12: Spherical Mirrors",month:"Jan–Feb",planned:14},
      {name:"Ch 13: Acids, Bases, Salts",month:"Oct–Nov",planned:14},
      {name:"Ch 14: Water (ജലം)",month:"Dec–Jan",planned:14},
      {name:"Ch 15: Chemistry of Matter",month:"Feb",planned:8},
      {name:"Ch 16: Tree of Life",month:"Oct–Nov",planned:12},
      {name:"Ch 17: Beauty of Diversity",month:"Nov–Jan",planned:14},
      {name:"Ch 18: Stem Cells",month:"Jan–Feb",planned:10}
    ]},
    "Social Science":{chapters:[
      {name:"Ch 1: Colonial History (അധിനിവേശം)",month:"June–July",planned:0},
      {name:"Ch 2: National Movements",month:"June–July",planned:0},
      {name:"Ch 3: Land Features",month:"July–Aug",planned:0},
      {name:"Ch 4: Fundamental Rights",month:"Aug–Sep",planned:0},
      {name:"Ch 5: Indian Constitution",month:"Aug–Sep",planned:0},
      {name:"Ch 6: Media & Society",month:"Oct",planned:0},
      {name:"Ch 7: Regional Economy",month:"Oct",planned:0},
      {name:"Ch 8: National Economy",month:"Oct–Nov",planned:0},
      {name:"Ch 9: Democracy (ജനാധിപത്യം)",month:"Nov",planned:0},
      {name:"Ch 10: World Map / Europe",month:"Dec",planned:0},
      {name:"Ch 11: Global Citizenship",month:"Jan",planned:0},
      {name:"Ch 12: Agriculture",month:"Jan–Feb",planned:0},
      {name:"Ch 13: New Roads / Pathways",month:"Feb–Mar",planned:0}
    ]}
  },
  "9B1":{
    "English":{chapters:[
      {name:"Half a Day",month:"June",planned:16},
      {name:"Debts of Gratitude",month:"June–July",planned:13},
      {name:"Nothing Twice (Poem)",month:"July",planned:7},
      {name:"Dreams Realised",month:"July–Aug",planned:13},
      {name:"The Toilet",month:"Aug",planned:12},
      {name:"Success (Poem)",month:"Aug–Sep",planned:6},
      {name:"Sea Fever (Poem)",month:"Sep",planned:7},
      {name:"The Saga of Tiffin Carriers",month:"Oct",planned:13},
      {name:"Waiting for Rain",month:"Oct–Nov",planned:14},
      {name:"The Unstoppable Soul Surfer",month:"Nov",planned:15},
      {name:"A Shield of Courage",month:"Nov–Dec",planned:11},
      {name:"Walk Alone (Poem)",month:"Jan",planned:7},
      {name:"Toys to Teens",month:"Jan",planned:15},
      {name:"The Ink and the Melody",month:"Feb",planned:14},
      {name:"Let it Go (Song)",month:"Feb",planned:5}
    ]},
    "Mathematics":{chapters:[
      {name:"01: Pair of Equations",month:"June",planned:10},
      {name:"Bridge 1: Decimal Forms",month:"June",planned:5},
      {name:"02: New Numbers",month:"June–July",planned:10},
      {name:"Bridge 2: Triangle Area",month:"July",planned:4},
      {name:"03: Parallel Lines",month:"July",planned:18},
      {name:"04: Multiplication Equations",month:"Aug",planned:15},
      {name:"05: Polynomial Multiplication",month:"Aug–Sep",planned:10},
      {name:"06: Similar Triangles",month:"Sep–Oct",planned:12},
      {name:"Bridge 3: Circles",month:"Oct",planned:5},
      {name:"08: Circle Measurements",month:"Oct",planned:10},
      {name:"09: Linear Numbers",month:"Nov",planned:8},
      {name:"10: Polynomials",month:"Nov",planned:8},
      {name:"11: Parts of Circle",month:"Dec",planned:8},
      {name:"12: Prisms",month:"Jan",planned:12},
      {name:"13: Polynomial Graphs",month:"Jan",planned:8},
      {name:"14: Ratio",month:"Jan–Feb",planned:10},
      {name:"15: Statistics",month:"Feb",planned:8}
    ]},
    "Physics":{chapters:[
      {name:"1: Refraction of Light",month:"June–July",planned:10},
      {name:"2: Equations of Motion",month:"July–Aug",planned:13},
      {name:"3: Laws of Motion",month:"Aug–Sep",planned:12},
      {name:"4: Gravitation",month:"Oct",planned:9},
      {name:"5: Fluid Pressure",month:"Nov",planned:7},
      {name:"6: Work & Energy",month:"Dec",planned:10},
      {name:"7: Electric Current",month:"Jan–Feb",planned:12},
      {name:"8: Sound",month:"Feb–Mar",planned:7}
    ]},
    "Chemistry":{chapters:[
      {name:"1: Structure of Atom",month:"June",planned:10},
      {name:"2: Periodic Table",month:"July",planned:9},
      {name:"3: Chemical Bonding",month:"Aug–Sep",planned:13},
      {name:"4: Redox Reactions",month:"Sep",planned:8},
      {name:"5: Chemical Kinetics",month:"Oct",planned:8},
      {name:"6: Solutions",month:"Nov–Dec",planned:11},
      {name:"7: Non-metals",month:"Jan",planned:12},
      {name:"8: Organic Chemistry",month:"Feb",planned:9}
    ]},
    "Biology":{chapters:[
      {name:"1: Life Processes",month:"June–July",planned:10},
      {name:"2: Digestion & Nutrition",month:"July–Aug",planned:16},
      {name:"3: Respiration & Excretion",month:"Sep–Oct",planned:16},
      {name:"4: Movement & Locomotion",month:"Oct–Dec",planned:14},
      {name:"5: Reproductive Health",month:"Dec–Feb",planned:16},
      {name:"6: Classification",month:"Feb–Mar",planned:8}
    ]},
    "Social Science I":{chapters:[
      {name:"1: ശിലായുഗത്തിൽ നിന്ന് മുന്നോട്ട്",month:"June",planned:0},
      {name:"2: ആശയങ്ങളും ആദ്യകാല രാഷ്ട്രങ്ങളും",month:"July",planned:0},
      {name:"3: ഭൂമിദാനവും ഇന്ത്യൻ സമൂഹവും",month:"Sep–Oct",planned:0},
      {name:"4: ഇന്ത്യൻ ഭരണഘടന – അധികാരം",month:"Aug–Sep",planned:0},
      {name:"5: ജനസംഖ്യാ പ്രവണതകൾ",month:"Oct–Nov",planned:0},
      {name:"6: ചോളനാട്ടിൽ നിന്ന് ഡൽഹിയിലേക്ക്",month:"Jan",planned:0},
      {name:"7: ജനാധിപത്യത്തിന്റെ വ്യാപനം",month:"Nov–Dec",planned:0},
      {name:"8: ലിംഗവിവേചനമില്ലാത്ത സമൂഹം",month:"Feb–Mar",planned:0}
    ]},
    "Social Science II":{chapters:[
      {name:"1: ലോകത്തിന്റെ നെറുകയിൽ",month:"June",planned:0},
      {name:"2: വിശാലസമതലഭൂവിൽ",month:"July–Aug",planned:0},
      {name:"3: ഭൗമചരിത്രമുറങ്ങുന്ന പീഠഭൂമി",month:"Sep–Oct",planned:0},
      {name:"4: മാനവവിഭവശേഷി",month:"Aug–Sep",planned:0},
      {name:"5: ഇന്ത്യൻ സമ്പദ്ഘടന",month:"Oct–Nov",planned:0},
      {name:"6: വിലയും വിപണിയും",month:"Jan",planned:0},
      {name:"7: മണലാരണ്യത്തിലൂടെ",month:"Nov–Dec",planned:0},
      {name:"8: തീരങ്ങളിലൂടെ",month:"Feb–Mar",planned:0}
    ]}
  },
  "10B1":{
    "English":{chapters:[
      {name:"A Very Old Man with Enormous Wings",month:"June",planned:14},
      {name:"In the Attic",month:"June–July",planned:12},
      {name:"Friends, Romans, Countrymen...",month:"July",planned:7},
      {name:"Breaking Barriers, I will Fly",month:"July",planned:8},
      {name:"A Phoenix Rises",month:"July–Aug",planned:15},
      {name:"The Seedling (Poem)",month:"Sep",planned:6},
      {name:"Another Day in Paradise (Song)",month:"Sep",planned:6},
      {name:"War",month:"Sep–Oct",planned:14},
      {name:"A Piece of String",month:"Oct",planned:12},
      {name:"Shakuntalam",month:"Nov",planned:14},
      {name:"Trills and Thrills: Birdwatching",month:"Nov–Dec",planned:13},
      {name:"The Wild Swans at Coole",month:"Dec–Jan",planned:6},
      {name:"Beloved Boles",month:"Jan",planned:12},
      {name:"Preference Nationale",month:"Jan–Feb",planned:12},
      {name:"Mirror",month:"Feb",planned:6}
    ]},
    "Mathematics":{chapters:[
      {name:"1: Arithmetic Progressions",month:"June",planned:12},
      {name:"2: Circles & Angles",month:"June–July",planned:12},
      {name:"3: AP & Algebra",month:"July",planned:15},
      {name:"4: Probability",month:"July",planned:8},
      {name:"5: Quadratic Equations",month:"Aug",planned:12},
      {name:"6: Trigonometry",month:"Aug–Sep",planned:17},
      {name:"7: Indices",month:"Sep–Oct",planned:10},
      {name:"8: Tangents",month:"Oct",planned:12},
      {name:"9: Polynomials & Equations",month:"Oct–Nov",planned:10},
      {name:"10: Circles & Lines",month:"Nov",planned:8},
      {name:"11: Geometry & Algebra",month:"Nov–Dec",planned:12},
      {name:"12: Solids",month:"Dec–Jan",planned:14},
      {name:"13: Statistics",month:"Jan",planned:6}
    ]},
    "Physics":{chapters:[
      {name:"1: Sound Waves",month:"June–July",planned:11},
      {name:"2: Lenses",month:"July–Aug",planned:12},
      {name:"3: Vision & Colours",month:"Aug–Sep",planned:11},
      {name:"4: Magnetic Effect of Electricity",month:"Oct–Nov",planned:11},
      {name:"5: Electrical Energy",month:"Nov–Dec",planned:12},
      {name:"6: EM Induction",month:"Dec–Jan",planned:12},
      {name:"7: Mechanical Advantage",month:"Jan–Feb",planned:11}
    ]},
    "Chemistry":{chapters:[
      {name:"1: Nomenclature & Isomerism",month:"June",planned:10},
      {name:"2: Organic Reactions",month:"July",planned:11},
      {name:"3: Periodic Table (Doble)",month:"Aug",planned:9},
      {name:"4: Gas Laws",month:"Sep",planned:8},
      {name:"5: Laser / Electrochemical Reactions",month:"Oct–Nov",planned:11},
      {name:"6: Metals & Ores",month:"Nov–Dec",planned:10},
      {name:"7: Industrial Compounds",month:"Jan–Feb",planned:15}
    ]},
    "Biology":{chapters:[
      {name:"1: Genetics",month:"June–July",planned:16},
      {name:"2: Evolution",month:"July–Aug",planned:23},
      {name:"3: Nervous System",month:"Sep–Oct",planned:23},
      {name:"4: Reproduction",month:"Oct–Dec",planned:20},
      {name:"5: Immunity & Health",month:"Dec–Jan",planned:22},
      {name:"6: Biology Trends & Future",month:"Feb–Mar",planned:15}
    ]},
    "Social Science I":{chapters:[
      {name:"1: Humanity (മാനവികത)",month:"June",planned:13},
      {name:"2: Independence & Equality",month:"July",planned:9},
      {name:"3: Social Analysis",month:"Aug",planned:8},
      {name:"4: State & World",month:"Sep–Oct",planned:23},
      {name:"5: Democratic Institutions",month:"Oct–Nov",planned:9},
      {name:"6: Independent India Today",month:"Dec",planned:14},
      {name:"7: Struggle for Freedom",month:"Jan",planned:13},
      {name:"8: Indian Social System",month:"Feb",planned:9},
      {name:"9: Democracy – Indian Experience",month:"Jan",planned:13}
    ]},
    "Social Science II":{chapters:[
      {name:"1: Climate & Geography",month:"June",planned:14},
      {name:"2: Climate Zones",month:"July",planned:12},
      {name:"3: Rainfall Regions",month:"Sep–Oct",planned:25},
      {name:"4: Consumer Rights",month:"Aug",planned:12},
      {name:"5: Money & Economy",month:"Oct–Nov",planned:26},
      {name:"6: Changing Earth",month:"Dec",planned:12},
      {name:"7: Sustainability",month:"Jan",planned:13},
      {name:"8: Indian Economy Growth",month:"Feb",planned:13}
    ]}
  },
  "10B2":{
    "English":{chapters:[
      {name:"A Very Old Man with Enormous Wings",month:"June",planned:14},
      {name:"In the Attic",month:"June–July",planned:12},
      {name:"Friends, Romans, Countrymen...",month:"July",planned:7},
      {name:"Breaking Barriers, I will Fly",month:"July",planned:8},
      {name:"A Phoenix Rises",month:"July–Aug",planned:15},
      {name:"The Seedling (Poem)",month:"Sep",planned:6},
      {name:"Another Day in Paradise (Song)",month:"Sep",planned:6},
      {name:"War",month:"Sep–Oct",planned:14},
      {name:"A Piece of String",month:"Oct",planned:12},
      {name:"Shakuntalam",month:"Nov",planned:14},
      {name:"Trills and Thrills: Birdwatching",month:"Nov–Dec",planned:13},
      {name:"The Wild Swans at Coole",month:"Dec–Jan",planned:6},
      {name:"Beloved Boles",month:"Jan",planned:12},
      {name:"Preference Nationale",month:"Jan–Feb",planned:12},
      {name:"Mirror",month:"Feb",planned:6}
    ]},
    "Mathematics":{chapters:[
      {name:"1: Arithmetic Progressions",month:"June",planned:12},
      {name:"2: Circles & Angles",month:"June–July",planned:12},
      {name:"3: AP & Algebra",month:"July",planned:15},
      {name:"4: Probability",month:"July",planned:8},
      {name:"5: Quadratic Equations",month:"Aug",planned:12},
      {name:"6: Trigonometry",month:"Aug–Sep",planned:17},
      {name:"7: Indices",month:"Sep–Oct",planned:10},
      {name:"8: Tangents",month:"Oct",planned:12},
      {name:"9: Polynomials & Equations",month:"Oct–Nov",planned:10},
      {name:"10: Circles & Lines",month:"Nov",planned:8},
      {name:"11: Geometry & Algebra",month:"Nov–Dec",planned:12},
      {name:"12: Solids",month:"Dec–Jan",planned:14},
      {name:"13: Statistics",month:"Jan",planned:6}
    ]},
    "Physics":{chapters:[
      {name:"1: Sound Waves",month:"June–July",planned:11},
      {name:"2: Lenses",month:"July–Aug",planned:12},
      {name:"3: Vision & Colours",month:"Aug–Sep",planned:11},
      {name:"4: Magnetic Effect of Electricity",month:"Oct–Nov",planned:11},
      {name:"5: Electrical Energy",month:"Nov–Dec",planned:12},
      {name:"6: EM Induction",month:"Dec–Jan",planned:12},
      {name:"7: Mechanical Advantage",month:"Jan–Feb",planned:11}
    ]},
    "Chemistry":{chapters:[
      {name:"1: Nomenclature & Isomerism",month:"June",planned:10},
      {name:"2: Organic Reactions",month:"July",planned:11},
      {name:"3: Periodic Table (Doble)",month:"Aug",planned:9},
      {name:"4: Gas Laws",month:"Sep",planned:8},
      {name:"5: Laser / Electrochemical Reactions",month:"Oct–Nov",planned:11},
      {name:"6: Metals & Ores",month:"Nov–Dec",planned:10},
      {name:"7: Industrial Compounds",month:"Jan–Feb",planned:15}
    ]},
    "Biology":{chapters:[
      {name:"1: Genetics",month:"June–July",planned:16},
      {name:"2: Evolution",month:"July–Aug",planned:23},
      {name:"3: Nervous System",month:"Sep–Oct",planned:23},
      {name:"4: Reproduction",month:"Oct–Dec",planned:20},
      {name:"5: Immunity & Health",month:"Dec–Jan",planned:22},
      {name:"6: Biology Trends & Future",month:"Feb–Mar",planned:15}
    ]},
    "Social Science I":{chapters:[
      {name:"1: Humanity (മാനവികത)",month:"June",planned:13},
      {name:"2: Independence & Equality",month:"July",planned:9},
      {name:"3: Social Analysis",month:"Aug",planned:8},
      {name:"4: State & World",month:"Sep–Oct",planned:23},
      {name:"5: Democratic Institutions",month:"Oct–Nov",planned:9},
      {name:"6: Independent India Today",month:"Dec",planned:14},
      {name:"7: Struggle for Freedom",month:"Jan",planned:13},
      {name:"8: Indian Social System",month:"Feb",planned:9},
      {name:"9: Democracy – Indian Experience",month:"Jan",planned:13}
    ]},
    "Social Science II":{chapters:[
      {name:"1: Climate & Geography",month:"June",planned:14},
      {name:"2: Climate Zones",month:"July",planned:12},
      {name:"3: Rainfall Regions",month:"Sep–Oct",planned:25},
      {name:"4: Consumer Rights",month:"Aug",planned:12},
      {name:"5: Money & Economy",month:"Oct–Nov",planned:26},
      {name:"6: Changing Earth",month:"Dec",planned:12},
      {name:"7: Sustainability",month:"Jan",planned:13},
      {name:"8: Indian Economy Growth",month:"Feb",planned:13}
    ]}
  }
};

// ── FORM SUBJECTS & CHAPTERS (used by form.html) ──
// var (not const) so firebase-form.js can override via window.SUBJECTS / window.CHAPTERS
var SUBJECTS = {
  "8B1":  ["English","Mathematics","Basic Science","Social Science"],
  "9B1":  ["English","Mathematics","Physics","Chemistry","Biology","Social Science I","Social Science II"],
  "10B1": ["English","Mathematics","Physics","Chemistry","Biology","Social Science I","Social Science II"],
  "10B2": ["English","Mathematics","Physics","Chemistry","Biology","Social Science I","Social Science II"],
  "FB1":  ["Foundation - English","Foundation - Maths","Foundation - Hindi"],
  "FB2":  ["Foundation - English","Foundation - Maths","Foundation - Hindi"],
  "FB3":  ["Foundation - English","Foundation - Maths","Foundation - Hindi"]
};

var CHAPTERS = {
  "8B1":{
    "English":["A Long Walk With Granny","The Seven Ages of Man","Little Things Matter","Hope is the Thing with Feathers","A Prescription for Life","The Day My World Changed","Talking of Science","Engine Trouble","The Astronomer","Get Together","A Tryst with Destiny","Thank You Ma'am","A Tale of Two Gifts","Caged Bird","Village of the Watermills"],
    "Mathematics":["Squares","Congruent Triangles","Quadratic Equations","Polygons","Solving Equations","New Numbers","Statistics/Divisors","Ratio/Proportion","Circles","Decimal Forms","Parallelograms","Prisms","Statistics"],
    "Basic Science":["Ch 1: Measurements & Units","Ch 2: Motion & Force","Ch 3: Pressure","Ch 4: Chemistry of Changes","Ch 5: Elements & Compounds","Ch 6: Metals & Non-metals","Ch 7: Plants","Ch 8: Origin of Life","Ch 9: Cells & Tissues","Ch 10: Static Electricity","Ch 11: Magnetism & Electricity","Ch 12: Spherical Mirrors","Ch 13: Acids Bases Salts","Ch 14: Water","Ch 15: Chemistry of Matter","Ch 16: Tree of Life","Ch 17: Beauty of Diversity","Ch 18: Stem Cells"],
    "Social Science":["Ch 1: Colonial History","Ch 2: National Movements","Ch 3: Land Features","Ch 4: Fundamental Rights","Ch 5: Indian Constitution","Ch 6: Media & Society","Ch 7: Regional Economy","Ch 8: National Economy","Ch 9: Democracy","Ch 10: World Map/Europe","Ch 11: Global Citizenship","Ch 12: Agriculture","Ch 13: New Roads/Pathways"]
  },
  "9B1":{
    "English":["Half a Day","Debts of Gratitude","Nothing Twice (Poem)","Dreams Realised","The Toilet","Success (Poem)","Sea Fever (Poem)","The Saga of Tiffin Carriers","Waiting for Rain","The Unstoppable Soul Surfer","A Shield of Courage","Walk Alone (Poem)","Toys to Teens","The Ink and the Melody","Let it Go (Song)"],
    "Mathematics":["01: Pair of Equations","Bridge 1: Decimal Forms","02: New Numbers","Bridge 2: Triangle Area","03: Parallel Lines","04: Multiplication Equations","05: Polynomial Multiplication","06: Similar Triangles","Bridge 3: Circles","08: Circle Measurements","09: Linear Numbers","10: Polynomials","11: Parts of Circle","12: Prisms","13: Polynomial Graphs","14: Ratio","15: Statistics"],
    "Physics":["1: Refraction of Light","2: Equations of Motion","3: Laws of Motion","4: Gravitation","5: Fluid Pressure","6: Work & Energy","7: Electric Current","8: Sound"],
    "Chemistry":["1: Structure of Atom","2: Periodic Table","3: Chemical Bonding","4: Redox Reactions","5: Chemical Kinetics","6: Solutions","7: Non-metals","8: Organic Chemistry"],
    "Biology":["1: Life Processes","2: Digestion & Nutrition","3: Respiration & Excretion","4: Movement & Locomotion","5: Reproductive Health","6: Classification"],
    "Social Science I":["1: Stone Age to Present","2: Early States","3: Land Grants & Society","4: Constitution & Power","5: Population Trends","6: Chola to Delhi","7: Spread of Democracy","8: Gender Equality"],
    "Social Science II":["1: Top of the World","2: Great Plains","3: Plateau Regions","4: Human Resources","5: Indian Economy","6: Price & Market","7: Desert Regions","8: Coastal Regions"]
  },
  "10B1":{
    "English":["A Very Old Man with Enormous Wings","In the Attic","Friends Romans Countrymen","Breaking Barriers I will Fly","A Phoenix Rises","The Seedling (Poem)","Another Day in Paradise (Song)","War","A Piece of String","Shakuntalam","Trills and Thrills: Birdwatching","The Wild Swans at Coole","Beloved Boles","Preference Nationale","Mirror"],
    "Mathematics":["1: Arithmetic Progressions","2: Circles & Angles","3: AP & Algebra","4: Probability","5: Quadratic Equations","6: Trigonometry","7: Indices","8: Tangents","9: Polynomials & Equations","10: Circles & Lines","11: Geometry & Algebra","12: Solids","13: Statistics"],
    "Physics":["1: Sound Waves","2: Lenses","3: Vision & Colours","4: Magnetic Effect of Electricity","5: Electrical Energy","6: EM Induction","7: Mechanical Advantage"],
    "Chemistry":["1: Nomenclature & Isomerism","2: Organic Reactions","3: Periodic Table","4: Gas Laws","5: Electrochemical Reactions","6: Metals & Ores","7: Industrial Compounds"],
    "Biology":["1: Genetics","2: Evolution","3: Nervous System","4: Reproduction","5: Immunity & Health","6: Biology Trends & Future"],
    "Social Science I":["1: Humanity","2: Independence & Equality","3: Social Analysis","4: State & World","5: Democratic Institutions","6: Independent India Today","7: Struggle for Freedom","8: Indian Social System","9: Democracy – Indian Experience"],
    "Social Science II":["1: Climate & Geography","2: Climate Zones","3: Rainfall Regions","4: Consumer Rights","5: Money & Economy","6: Changing Earth","7: Sustainability","8: Indian Economy Growth"]
  }
};
CHAPTERS["10B2"] = CHAPTERS["10B1"];
