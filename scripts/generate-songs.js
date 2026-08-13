const fs = require("fs");
const path = require("path");

const rawData = {
  "Dard": [
    "Ajj Din Chadheya — Pritam, Rahat Fateh Ali Khan",
    "Iss Tarah — Chaar Diwaari, Sonu Nigam",
    "Tere Liye — Atif Aslam, Shreya Ghoshal",
    "Tose Naina Lage — Shilpa Rao",
    "Tanha Dil — Shaan",
    "Humdard — Arijit Singh, Mithoon",
    "Khairiyat — Pritam, Arijit Singh",
    "Agar Tum Saath Ho — Alka Yagnik, Arijit Singh",
    "Woh Kisna Hai — Sukhwinder Singh",
    "Mera Mann Kehne Laga — Falak Shabbir",
    "Woh Ladki Hai Kahan — Shaan, Kavita Krishnamurthy",
    "He Ram He Ram — Jagjit Singh",
    "Tere Pyaar Mein — Pritam, Arijit Singh",
    "Love Me Thoda Aur — Pritam, Arijit Singh",
    "At My Worst — Pink Sweat$",
    "everything sucks — vaultboy",
    "Save Your Tears (with Ariana Grande) — The Weeknd",
    "Ranjha (From \"Shershaah\") — Jasleen Royal, B Praak",
    "Meri Kahani — Atif Aslam",
    "Dhan Te Nan — Sukhwinder Singh",
    "I'll Be There for You — The Rembrandts"
  ],
  "Desi Energy": [
    "By My Side — AP Dhillon",
    "STFU — AP Dhillon, Shinda Kahlon",
    "Bairan — Banjaare",
    "Barsaat — Banjaare, Roni",
    "Wo Noor — AP Dhillon",
    "Dil Nu — AP Dhillon",
    "Summer High — AP Dhillon",
    "Players — Badshah, Karan Aujla",
    "Kinna Sona — Sunil Kamath, Mithoon",
    "Kinna Sona (From \"Marjaavaan\") — Meet Bros., Jubin Nautiyal",
    "Chak Glass — Imran Khan",
    "Amplifier — Imran Khan",
    "Ganpat — Mika Singh",
    "Jhak Maar Ke — Pritam, Neeraj Shridhar",
    "Kun Faya Kun — A.R. Rahman, Javed Ali",
    "Deewaana Deewaana — A.R. Rahman",
    "Ibn-E-Batuta — Sukhwinder Singh, Mika Singh",
    "Sabsa Bada Rupaiya — Mehmood, Chetan, Sai",
    "Jugni — Panjabi MC",
    "Lover — Diljit Dosanjh",
    "BHALA — Vinay Katoch",
    "Gal Sun — Sabat Batin, Rackstar",
    "Leja — Lost Stories, JAI DHIR"
  ],
  "English Nostalgia": [
    "Closer — The Chainsmokers, Halsey",
    "Bad Liar — Imagine Dragons",
    "Die With A Smile — Lady Gaga, Bruno Mars",
    "Blinding Lights — The Weeknd",
    "Heat Waves — Glass Animals",
    "STAY (with Justin Bieber) — The Kid LAROI",
    "Beautiful Mistakes (feat. Megan Thee Stallion) — Maroon 5",
    "Lost — Maroon 5",
    "Nobody's Love — Maroon 5",
    "Kiss and Make Up — Dua Lipa, BLACKPINK",
    "OK Not To Be OK — Marshmello, Demi Lovato",
    "edamame — bbno$, Rich Brian",
    "Chosen (feat. Ty Dolla $ign) — Blxst, Tyga",
    "Into Your Arms (feat. Ava Max) — Witt Lowry",
    "Lalala — Y2K, bbno$",
    "What A Man Gotta Do — Jonas Brothers",
    "Weekend Vibe (feat. Desi Crew) — Jubël",
    "Leave Before You Love Me — Marshmello, Jonas Brothers",
    "nursery — bbno$, lentra",
    "love nwantiti (ah ah ah) — CKay",
    "love nwantiti (feat. Dj Yo! & AX'EL) - Remix — CKay",
    "Get Into It (Yuh) — Doja Cat",
    "Woman — Doja Cat",
    "Life Goes On — Oliver Tree",
    "Young Shahrukh — Tesher",
    "Clear - Shawn Wasabi Remix — Pusher, MOTHICA",
    "Heartbreak Anniversary — GIVĒON",
    "Problems — Anne-Marie",
    "The Lazy Song — Bruno Mars",
    "Cold — Alfie Castley"
  ],
  "Filmy Retro Mix": [
    "Omkara — Vishal Bhardwaj",
    "Ghanchakkar Babu — Amit Trivedi",
    "Mera Yaar — Shankar-Ehsaan-Loy",
    "Gehra Hua (From \"Dhurandhar\") — Shashwat Sachdev",
    "Khoon Choos Le — Sachin-Jigar",
    "Dard Karaara — Anu Malik, Kumar Sanu",
    "Maskara (From \"Main Vaapas Aaunga\") — A.R. Rahman",
    "Aye Bachchu — A.R. Rahman",
    "Oye Boy Charlie — Vishal Bhardwaj",
    "Tai Tai Phis — Amit Trivedi",
    "Phatela Jeb - Aankhen / Soundtrack Version — Nitin Raikar",
    "Radha Kaise Na Jale — Asha Bhosle, Udit Narayan",
    "Bhaag D.K. Bose, Aandhi Aayi — Ram Sampath",
    "Illuminati - From \"Aavesham\" — Sushin Shyam, Dabzee",
    "Pehle Bhi Main — Vishal Mishra",
    "Matargashti — Mohit Chauhan",
    "Mere Liye Tum Kaafi Ho — Ayushmann Khurrana",
    "Masakali — Mohit Chauhan, A.R. Rahman",
    "Teri Aankhon Mein — Darshan Raval, Neha Kakkar",
    "Saibo — Sachin-Jigar, Shreya Ghoshal",
    "Chaap Tilak - From \"Dark 7 White\" — Sargam Jassu",
    "Shanivaar Raati (From \"Main Tera Hero\") — Arijit Singh",
    "Tooh — Vishal-Shekhar, Mika Singh",
    "Saun Da Mahina - Lofi — Javed Ali, L3AD",
    "Ek Din Teri Raahon — Javed Ali, Pritam",
    "Char Baj Gaye - Party Abhi Baaki Hai — Sachin-Jigar, Hard Kaur",
    "Alfaazo — Mitraz",
    "Dhundhala — Yashraj, Dropped Out",
    "Ve Haaniyaan — Danny, Avvy Sra, Sagar",
    "Banana Boat (Day-O) — Harry Belafonte",
    "Roz Roz — The Yellow Diary",
    "Par Chanaa De — Shilpa Rao, Noori",
    "Jogi — Aakanksha Sharma",
    "Kaantha — Masala Coffee, Sooraj Santhosh",
    "Thodi Si Daaru — AP Dhillon, Shreya Ghoshal",
    "Dooron Dooron — Paresh Pahuja, Shiv Tandon",
    "Dooron Dooron - Unplugged — Paresh Pahuja, Shiv Tandon",
    "Sawarne Lage — Tanishk Bagchi, Jubin Nautiyal",
    "Ilahi — Pritam, Arijit Singh",
    "Main Rang Sharbaton Ka — Atif Aslam",
    "Haaye Re — Banjaare, Swati Shukla",
    "Tu Jaane Na — Pritam, Atif Aslam",
    "Tu Jaana Na Piya — King"
  ],
  "Bhakti Break": [
    "Hanuman Chalisa — Shankar Mahadevan",
    "Hanuman Chalisa — Vijay Prakash, Nandini Srikar",
    "Shiva Shiva Shankara — Shankar Mahadevan",
    "Dhishum Dhishum — Shravan, Tapas Relia",
    "Aasman Ko Chukar — Daler Mehndi",
    "Shiv Tandav Stotram (Har Har Shiv Shankar) — Sachet Tandon",
    "Shankara Re Shankara — Mehul Vyas, Adarsh Shinde",
    "Adi Anant Shiva — Aditya Sharma",
    "Kanha - Thumri — Sajid-Wajid, Rekha Bhardwaj"
  ]
};

// Known IDs from before crash
const knownIds = {
  "Ajj Din Chadheya": "IImcBEHuDRI",
  "Iss Tarah": "s4fYA_wkta8",
  "Tere Liye": "1C2My_eQQN4",
  "Tose Naina Lage": "y41Dqcpzr-Y",
  "Tanha Dil": "QRsDk-JBs48",
  "Humdard": "7tElHNHLSKY"
};

function processSongs() {
  const songs = [];
  let idCounter = 1;

  for (const [rotation, list] of Object.entries(rawData)) {
    for (const item of list) {
      const parts = item.split("—");
      const title = parts[0].trim();
      const artist = parts[1] ? parts[1].trim() : "Unknown";
      
      const youtubeId = knownIds[title] || "dQw4w9WgXcQ";

      songs.push({
        id: `song-${idCounter++}`,
        title,
        artist,
        year: "90s-20s",
        youtubeId,
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(title + " " + artist)}`,
        youtubeMusicUrl: `https://music.youtube.com/search?q=${encodeURIComponent(title + " " + artist)}`,
        tags: [rotation]
      });
    }
  }

  const outputPath = path.join(__dirname, "..", "data", "songs.json");
  fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));
  console.log(`Finished writing ${songs.length} songs to data/songs.json`);
}

processSongs();
