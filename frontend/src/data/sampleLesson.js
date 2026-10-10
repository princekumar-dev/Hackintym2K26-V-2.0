// Sample lesson powering the mock API so the whole app is demoable
// with no backend. Content is placeholder for demo purposes.
// Each block carries its position on the page (bbox, %) + OCR confidence,
// plus simplified text at two levels, each translated (en/hi/mr).

export const sampleLesson = {
  id: 'lesson-photosynthesis',
  subject: 'Science · Class 7',
  title: 'Photosynthesis',
  source: 'Scanned textbook page',
  blocks: [
    {
      id: 'b1',
      bbox: { x: 6, y: 6, w: 88, h: 18 },
      confidence: 0.98,
      original:
        'Photosynthesis is the biochemical process by which green plants, algae and certain bacteria synthesise organic compounds from carbon dioxide and water using light energy.',
      simple: {
        en: 'Photosynthesis is how green plants make their own food. They use sunlight, water, and a gas called carbon dioxide.',
        hi: 'प्रकाश-संश्लेषण वह तरीका है जिससे हरे पौधे अपना भोजन खुद बनाते हैं। वे धूप, पानी और कार्बन डाइऑक्साइड गैस का उपयोग करते हैं।',
        mr: 'प्रकाशसंश्लेषण म्हणजे हिरवी झाडे स्वतःचे अन्न कसे बनवतात. ते सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साइड वापरतात.',
        ta: 'ஒளிச்சேர்க்கை என்பது பச்சை செடிகள் தங்கள் உணவைத் தாங்களே தயாரிக்கும் முறை. அவை சூரிய ஒளி, நீர், காற்றில் உள்ள கார்பன் டை ஆக்சைடு வாயுவைப் பயன்படுத்துகின்றன.',
      },
      medium: {
        en: 'Photosynthesis is the process green plants use to make food from carbon dioxide and water, using energy from light.',
        hi: 'प्रकाश-संश्लेषण वह प्रक्रिया है जिसमें हरे पौधे प्रकाश की ऊर्जा से कार्बन डाइऑक्साइड और पानी से भोजन बनाते हैं।',
        mr: 'प्रकाशसंश्लेषण ही प्रक्रिया आहे ज्यात हिरवी झाडे प्रकाशाच्या ऊर्जेने कार्बन डायऑक्साइड व पाण्यापासून अन्न तयार करतात.',
        ta: 'ஒளிச்சேர்க்கை என்பது பச்சை செடிகள் ஒளி ஆற்றலைப் பயன்படுத்தி கார்பன் டை ஆக்சைடு மற்றும் நீரிலிருந்து உணவு தயாரிக்கும் செயல்முறை.',
      },
      hing: {
        simple:
          'Photosynthesis ek natural process hai jisme green plants sunlight, paani aur hawa se apna khaana khud banate hain.',
        medium:
          'Photosynthesis wo process hai jisme green plants light energy se CO₂ aur paani se food banate hain.',
      },
      tang: {
        simple:
          'Photosynthesis-nu solrathu green plants sunlight, thanni, air use panni thangaloda food-a thaangaley seiyra natural process.',
        medium: 'Photosynthesis-la green plants light energy use panni CO₂ and water-la irundhu food seiyum.',
      },
    },
    {
      id: 'b2',
      bbox: { x: 6, y: 26, w: 88, h: 18 },
      confidence: 0.95,
      original:
        'The process occurs within the chloroplasts, which contain the green pigment chlorophyll that absorbs light, predominantly in the blue and red wavelengths.',
      simple: {
        en: 'It happens inside tiny green parts of the leaf called chloroplasts. They hold a green colour, chlorophyll, that catches sunlight.',
        hi: 'यह पत्ती के छोटे हरे भागों में होता है जिन्हें क्लोरोप्लास्ट कहते हैं। इनमें हरा रंग क्लोरोफिल होता है जो धूप पकड़ता है।',
        mr: 'हे पानातील लहान हिरव्या भागांत होते, त्यांना क्लोरोप्लास्ट म्हणतात. त्यात क्लोरोफिल हा हिरवा रंग असतो जो सूर्यप्रकाश पकडतो.',
        ta: 'இது இலையின் சிறிய பச்சைப் பகுதிகளான குளோரோபிளாஸ்ட்களுக்குள் நடக்கிறது. அவற்றில் சூரிய ஒளியைப் பிடிக்கும் பச்சை நிறமான குளோரோஃபில் உள்ளது.',
      },
      medium: {
        en: 'It takes place in the chloroplasts, which contain chlorophyll — the green pigment that absorbs light.',
        hi: 'यह क्लोरोप्लास्ट में होता है, जिनमें हरा वर्णक क्लोरोफिल होता है जो प्रकाश सोखता है।',
        mr: 'हे क्लोरोप्लास्टमध्ये घडते, ज्यात क्लोरोफिल हा हिरवा रंगद्रव्य प्रकाश शोषतो.',
        ta: 'இது குளோரோபிளாஸ்ட்களில் நடக்கிறது; அவற்றில் ஒளியை உறிஞ்சும் பச்சை நிறமி குளோரோஃபில் உள்ளது.',
      },
      hing: {
        simple:
          'Ye leaf ke chhote green parts (chloroplasts) ke andar hota hai. Inme chlorophyll naam ka green colour hota hai jo sunlight pakadta hai.',
        medium:
          'Ye chloroplasts me hota hai, jisme chlorophyll (green pigment) light absorb karta hai.',
      },
      tang: {
        simple:
          'Idhu leaf-oda chinna green parts, chloroplasts, ulla nadakkum. Adhula chlorophyll-nu oru green colour irukku, adhu sunlight-a pidikkum.',
        medium: 'Idhu chloroplasts-la nadakkum, adhula chlorophyll (green pigment) light-a absorb pannum.',
      },
    },
    /* MORE_BLOCKS */
    {
      id: 'b3',
      bbox: { x: 6, y: 46, w: 88, h: 14 },
      confidence: 0.86,
      original: 'The overall reaction: 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2.',
      simple: {
        en: 'In short: carbon dioxide + water + sunlight make sugar + oxygen.  (6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂)',
        hi: 'संक्षेप में: कार्बन डाइऑक्साइड + पानी + धूप से शर्करा + ऑक्सीजन बनती है।  (6CO₂ + 6H₂O + प्रकाश → C₆H₁₂O₆ + 6O₂)',
        mr: 'थोडक्यात: कार्बन डायऑक्साइड + पाणी + सूर्यप्रकाश यातून साखर + ऑक्सिजन तयार होते.  (6CO₂ + 6H₂O + प्रकाश → C₆H₁₂O₆ + 6O₂)',
        ta: 'சுருக்கமாக: கார்பன் டை ஆக்சைடு + நீர் + சூரிய ஒளி சேர்ந்து சர்க்கரை + ஆக்சிஜனை உருவாக்குகிறது.  (6CO₂ + 6H₂O + ஒளி → C₆H₁₂O₆ + 6O₂)',
      },
      medium: {
        en: 'The reaction: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂ (oxygen).',
        hi: 'अभिक्रिया: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ (ग्लूकोज़) + 6O₂ (ऑक्सीजन)।',
        mr: 'अभिक्रिया: 6CO₂ + 6H₂O + प्रकाश ऊर्जा → C₆H₁₂O₆ (ग्लुकोज) + 6O₂ (ऑक्सिजन).',
        ta: 'வினை: 6CO₂ + 6H₂O + ஒளி ஆற்றல் → C₆H₁₂O₆ (குளுக்கோஸ்) + 6O₂ (ஆக்சிஜன்).',
      },
      hing: {
        simple:
          'Short me: carbon dioxide + paani + sunlight se sugar + oxygen banta hai. (6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂)',
        medium: 'Reaction: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂ (oxygen).',
      },
      tang: {
        simple:
          'Short-a: carbon dioxide + thanni + sunlight sendhu sugar + oxygen aagum. (6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂)',
        medium: 'Reaction: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂ (oxygen).',
      },
    },
    {
      id: 'b4',
      bbox: { x: 6, y: 62, w: 88, h: 18 },
      confidence: 0.61,
      lowConfidence: true,
      original:
        'The glucose serves as an energy source and a building block for cellulose, while the oxygen released is essential for aerobic respiration in most organisms.',
      simple: {
        en: 'The sugar gives the plant energy and helps it grow. The oxygen it lets out is the air we breathe.',
        hi: 'यह शर्करा पौधे को ऊर्जा देती है और बढ़ने में मदद करती है। जो ऑक्सीजन निकलती है वही हवा हम साँस लेते हैं।',
        mr: 'ही साखर झाडाला ऊर्जा देते आणि वाढण्यास मदत करते. बाहेर पडणारा ऑक्सिजन हीच आपण श्वास घेतो ती हवा.',
        ta: 'இந்தச் சர்க்கரை செடிக்கு ஆற்றலைக் கொடுத்து வளர உதவுகிறது. வெளியேறும் ஆக்சிஜன் தான் நாம் சுவாசிக்கும் காற்று.',
      },
      medium: {
        en: 'The glucose stores energy and helps the plant grow; the oxygen released is used for breathing by most living things.',
        hi: 'ग्लूकोज़ ऊर्जा संग्रह करता है और पौधे को बढ़ाता है; निकली ऑक्सीजन अधिकांश जीवों की साँस के काम आती है।',
        mr: 'ग्लुकोज ऊर्जा साठवते व झाडाला वाढवते; बाहेर पडणारा ऑक्सिजन बहुतेक सजीवांच्या श्वासासाठी वापरला जातो.',
        ta: 'குளுக்கோஸ் ஆற்றலைச் சேமித்து செடியை வளர்க்கிறது; வெளியேறும் ஆக்சிஜனை பெரும்பாலான உயிரினங்கள் சுவாசிக்கப் பயன்படுத்துகின்றன.',
      },
      hing: {
        simple:
          'Ye sugar plant ko energy deta hai aur grow hone me help karta hai. Jo oxygen bahar nikalti hai, wahi hawa hum saans lete hain.',
        medium:
          'Glucose energy store karta hai aur plant ko grow karta hai; nikli hui oxygen zyadatar jeevon ki saans ke kaam aati hai.',
      },
      tang: {
        simple:
          'Indha sugar plant-ku energy kudukkum, valara help pannum. Veliya varra oxygen dhaan naama suvasikkra air.',
        medium:
          'Glucose energy store pannum, plant-a valarkkum; veliya varra oxygen-a niraya living things suvasikka use pannum.',
      },
    },
  ],
  /* MORE_LESSON */
  figures: [
    {
      id: 'fig1',
      caption: 'Diagram: how a leaf makes food',
      bbox: { x: 60, y: 82, w: 34, h: 14 },
      altText:
        'A leaf takes in sunlight from above, water from the roots, and carbon dioxide from the air. Arrows show sugar being made inside the leaf and oxygen being released into the air.',
    },
  ],
  glossary: {
    photosynthesis: {
      meaning: 'How green plants make their own food using light, water and air.',
      analogy: 'Like a chulha in the kitchen — but instead of fire, the leaf cooks food using sunlight.',
    },
    chlorophyll: {
      meaning: 'The green colour inside leaves that catches sunlight.',
      analogy: 'Like a village solar cooker that soaks up the sun’s heat.',
    },
    chloroplasts: {
      meaning: 'Tiny green parts inside a leaf where food is made.',
      analogy: 'Like little kitchens (chulhas) working inside the leaf.',
    },
    glucose: {
      meaning: 'A kind of sugar the plant makes for energy.',
      analogy: 'Like the roti the plant cooks to get its energy.',
    },
    oxygen: {
      meaning: 'The gas plants let out that we need to breathe.',
      analogy: 'Fresh air — like throwing open a window in the morning.',
    },
    'carbon dioxide': {
      meaning: 'A gas in the air that plants take in to make food.',
      analogy: 'The air the plant “drinks”, like water from the handpump.',
    },
    sunlight: {
      meaning: 'Light from the sun — the energy plants use to cook their food.',
      analogy: 'Like the flame under a chulha, but free from the sky.',
    },
    water: {
      meaning: 'Water the plant drinks up through its roots.',
      analogy: 'Like water drawn from the village handpump.',
    },
    light: {
      meaning: 'The energy from the sun that powers photosynthesis.',
      analogy: 'The “switch” that turns the leaf-kitchen on.',
    },
    energy: {
      meaning: 'The power a plant gets to live and grow.',
      analogy: 'Like the fuel that keeps a stove burning.',
    },
    food: {
      meaning: 'The sugar (glucose) a plant makes for itself.',
      analogy: 'The plant’s own home-cooked meal.',
    },
    plant: {
      meaning: 'A living green thing that makes its own food.',
      analogy: 'A tiny chef that cooks with sunlight.',
    },
    leaf: {
      meaning: 'The green part of a plant where food is made.',
      analogy: 'The kitchen of the plant.',
    },
    sugar: {
      meaning: 'Glucose — the food a plant makes and stores for energy.',
      analogy: 'Like the roti the plant keeps for later.',
    },
  },
  qaPairs: [
    {
      keywords: ['what is photosynthesis', 'photosynthesis', 'make food', 'food'],
      answer:
        'Great question! 🌱 Plants use sunlight, water and air to cook their own food — that’s photosynthesis. Can you spot the sunlight in the diagram?',
    },
    {
      keywords: ['chlorophyll', 'green', 'colour', 'color'],
      answer:
        'Good one! Chlorophyll is the green colour inside the leaf — it catches the sunlight, like a little solar cooker.',
    },
    {
      keywords: ['oxygen', 'breathe', 'air'],
      answer: 'Nice thinking! The plant breathes out oxygen — the very air we breathe in. 🙂',
    },
    {
      keywords: ['glucose', 'sugar', 'energy'],
      answer:
        'Exactly the right thing to ask! The plant makes glucose (sugar) — that’s its food and energy to grow.',
    },
    {
      keywords: ['where', 'chloroplast', 'leaf'],
      answer: 'Look closely at the leaf 🌿 — it all happens inside tiny green parts called chloroplasts.',
    },
  ],
  studyPlan: [
    { step: 'Read “What is photosynthesis” at your level', done: true },
    { step: 'Listen to the equation (6CO₂ + 6H₂O → …)', done: false },
    { step: 'Tap-to-understand: chlorophyll & chloroplasts', done: false },
    { step: 'Open the Visual Explainer to see the flow', done: false },
    { step: 'Quick check: why oxygen matters', done: false },
    { step: 'Revise tomorrow (spaced repetition)', done: false },
  ],
}

// Difficulty-dial stops. index 0 = simplest.
export const LEVELS = [
  { key: 'simple', label: 'Simple', hint: 'Grade 2 reading level' },
  { key: 'medium', label: 'Medium', hint: 'Grade 5 reading level' },
  { key: 'original', label: 'Original', hint: 'As written in the book' },
]

export const LANGUAGES = [
  { key: 'en', label: 'English' },
  { key: 'hi', label: 'हिन्दी (Hindi)' },
  { key: 'mr', label: 'मराठी (Marathi)' },
  { key: 'ta', label: 'தமிழ் (Tamil)' },
  { key: 'hing', label: 'Bolchaal (Hinglish)' },
  { key: 'tang', label: 'Pechu (Tanglish)' },
]
