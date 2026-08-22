// ============================================================
// 📦 SARE GAON (Araria, Jokihat, Palasi) + FAMOUS PLACES
// ============================================================

// ===== ARARIA BLOCK - SARE GAON =====
const arariaVillages = [
    "Araria", "Araria Basti", "Azamnagar", "Azmatpur", "Bahgi", "Bairgachhi",
    "Bangawan", "Bansbari", "Barakamatchistipur", "Basantpur", "Baturbari",
    "Belbari", "Belwa", "Bhagmohabbat", "Bhagpuraini", "Bhagsadullah Gachh Kola",
    "Bishunpur", "Bochi (7585)", "Bochi (1850)", "Chanderdai", "Chanrarni",
    "Chatar", "Chikni", "Dabhara Jagir", "Dabhra", "Deoria", "Dhakia", "Diari",
    "Domai", "Farasat", "Gaigari", "Gainrha", "Gamharia", "Gelhabari",
    "Gharakhal", "Haria", "Hasanpur", "Hyatpur", "Itahara", "Jamua", "Jhamta",
    "Jitwarpur", "Kamaldaha", "Kasaila Gachh Garha Bhagkasail", "Khamgara",
    "Kharhar", "Kismat Jamua", "Kismat Khawaspur", "Kochgawan", "Kusiargaon",
    "Lahna", "Lahtora", "Lodipur", "Lohtora", "Madanpur", "Mahisakol",
    "Majgawan", "Majkuri", "Metan", "Milik", "Mirzapur", "Murbala", "Paik Tola",
    "Pategna", "Phulbari", "Pokharia", "Rajokhar", "Rampur Kudarkatti",
    "Rampur Mohanpur", "Rangdaha", "Saguna", "Sahasmal", "Salaigarh", "Samda",
    "Sandalpur", "Saranpur", "Sisauna", "Surjapur", "Tarabari", "Tarauna",
    "Tirhutbita (1125)", "Tirhutbita (1777)"
];

// ===== JOKIHAT BLOCK - SARE GAON =====
const jokihatVillages = [
    "Artia", "Bagdahara", "Bagesari", "Bagmara", "Bagmagar", "Baharbari",
    "Bairgachhi", "Bankora", "Bara Istamrar", "Bardenga", "Barhuwa", "Bazidpur",
    "Bhag Turkaili", "Bhagwanpur", "Bhansia", "Bhuna", "Bhuna Majgawan",
    "Chainpur", "Chakai", "Chaukta", "Chikania", "Chilhania", "Chirah", "Dabhra",
    "Darsana", "Dhanpura", "Dharmeshwar Gachh", "Dhobinia", "Domahana", "Duba",
    "Dumaria", "Durgapur", "Gachh Mahadewa", "Gamharia", "Gerki", "Ghormara",
    "Girda", "Gogra", "Hardar", "Jahanpur", "Jokihat", "Kachnahar", "Kajleta",
    "Kakan", "Kakorha", "Karahara", "Karahara Chhaprail", "Kariat", "Kesarra",
    "Khirdaha", "Khuti Kharia", "Kishunpur", "Kursail", "Lalia", "Laruabari",
    "Machhaila", "Mahadewa", "Mahalgaon", "Mahjaili", "Majgawan", "Malchhari",
    "Malharia", "Marua", "Masuria (6289)", "Masuria (5547)", "Matiari (690)",
    "Matiari (5062)", "Matiari (995)", "Mehadinagar", "Naua Nankar", "Padampur",
    "Parha", "Parshadpur (555)", "Parshadpur (4814)", "Pathrabari", "Pechaili",
    "Phulpur Pachhari", "Phulpur Purwari", "Pipra Pachhari", "Pirganj", "Rahikpur",
    "Ramganj", "Rani", "Rani Istamrar", "Saifullah Tola", "Sapa", "Satbhita",
    "Satbhita Kamat", "Satghara", "Semaria", "Shahpur", "Singar Mohani",
    "Sisauna", "Siswa", "Taran", "Turkaili", "Uda", "Ukhwa"
];

// ===== PALASI BLOCK - SARE GAON =====
const palasiVillages = [
    "Bakainia", "Balua (12456)", "Balua (1830)", "Bangawan", "Baradbata",
    "Barailli", "Bargaon", "Barkumba", "Behari", "Belbari (904)", "Belbari (1168)",
    "Belsari", "Beni", "Bhadauna", "Bhantabari", "Bhatania", "Bhatauja",
    "Bhatwara", "Bhikha", "Bhima", "Bualdanti", "Budhi", "Chahatpur", "Chandipur",
    "Charbana", "Chauri", "Chhapania", "Dakaita (713)", "Dakaita (1017)", "Dala",
    "Daua", "Daulatpur", "Deghli", "Dehti", "Denga", "Dhangawan", "Dhantola",
    "Dharamganj Baghua", "Dhurgaon", "Dipnagar", "Doargawan", "Dogachhi",
    "Domaria", "Gang Jhali", "Garhara", "Gerari", "Gohane", "Gohans", "Gopalnagar",
    "Goshainpur", "Gyaspur", "Haribhasa", "Harwa", "Hasanpur", "Hasanpura",
    "Jahanpur", "Juraiil", "kalahi", "Kankhudia", "Karor", "Karor Deghli",
    "Kashibari", "Kathora", "Khapra", "Khutti", "Korhaili", "Kujri", "Lokhra",
    "Madhail", "Mahadeokol", "Maina", "Majhua", "Majlispur", "Maldoar",
    "Manbodhtanda", "Marichgaon", "Maya Khori", "Miapur", "Miapur Gachh",
    "Mohania", "Mundmala", "Nakta", "Nakta Khurd", "Naranga", "Pakri", "Pandubi",
    "Parwakhori", "Pechaili", "Pharhara", "Phulsara", "Pipra", "Pipra Bijwara",
    "Pothia", "Purandaha", "Ramnagar (1014)", "Ramnagar (6639)", "Rangbaha",
    "Rupail", "Seyampur", "Sobagmara", "Sohandar", "Sonakandar", "Sukhsaina",
    "Tarbi", "Urlaha"
];

// ===== FAMOUS PLACES =====
const famousPlaces = [
    { name: "Araria Sadar Hospital", block: "Araria", type: "hospital", lat: 26.1520, lon: 87.4650 },
    { name: "Araria Medical College", block: "Araria", type: "college", lat: 26.1550, lon: 87.4600 },
    { name: "Araria Degree College", block: "Araria", type: "college", lat: 26.1530, lon: 87.4580 },
    { name: "Araria ITI", block: "Araria", type: "college", lat: 26.1540, lon: 87.4550 },
    { name: "Araria Collectorate", block: "Araria", type: "office", lat: 26.1480, lon: 87.4620 },
    { name: "Araria Police Station", block: "Araria", type: "police", lat: 26.1470, lon: 87.4640 },
    { name: "Araria Court", block: "Araria", type: "court", lat: 26.1505, lon: 87.4630 },
    { name: "Araria Bus Stand", block: "Araria", type: "transport", lat: 26.1490, lon: 87.4660 },
    { name: "Araria Railway Station", block: "Araria", type: "transport", lat: 26.1460, lon: 87.4680 },
    { name: "Jokihat Hospital", block: "Jokihat", type: "hospital", lat: 26.2420, lon: 87.2150 },
    { name: "Jokihat College", block: "Jokihat", type: "college", lat: 26.2440, lon: 87.2170 },
    { name: "Jokihat Police Station", block: "Jokihat", type: "police", lat: 26.2430, lon: 87.2180 },
    { name: "Jokihat Bus Stand", block: "Jokihat", type: "transport", lat: 26.2410, lon: 87.2160 },
    { name: "Palasi Hospital", block: "Palasi", type: "hospital", lat: 26.2530, lon: 87.1820 },
    { name: "Palasi College", block: "Palasi", type: "college", lat: 26.2520, lon: 87.1800 },
    { name: "Palasi Police Station", block: "Palasi", type: "police", lat: 26.2520, lon: 87.1850 },
    { name: "Palasi Bus Stand", block: "Palasi", type: "transport", lat: 26.2510, lon: 87.1830 }
];

// ============================================================
// 🔗 MERGE ALL
// ============================================================
const places = [];

arariaVillages.forEach(function(name) {
    places.push({ name: name, block: "Araria", type: "village", lat: 26.15 + (Math.random() - 0.5) * 0.3, lon: 87.46 + (Math.random() - 0.5) * 0.3 });
});

jokihatVillages.forEach(function(name) {
    places.push({ name: name, block: "Jokihat", type: "village", lat: 26.24 + (Math.random() - 0.5) * 0.3, lon: 87.21 + (Math.random() - 0.5) * 0.3 });
});

palasiVillages.forEach(function(name) {
    places.push({ name: name, block: "Palasi", type: "village", lat: 26.25 + (Math.random() - 0.5) * 0.3, lon: 87.18 + (Math.random() - 0.5) * 0.3 });
});

famousPlaces.forEach(function(p) {
    places.push(p);
});

// ============================================================
// 📱 TELEGRAM SETUP
// ============================================================
const BOT_TOKEN = "8851136691:AAGTh9Ib2cixvgcercFggHxSwdwxUpI_2eA";
const CHAT_ID = "6323973083";

console.log("✅ Total Places Loaded:", places.length);
