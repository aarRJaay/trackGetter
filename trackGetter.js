var now = new Date();
var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var unixTimestamp = startOfDay / 1000; // const today = new Date();
// const unixTimestamp = Math.floor(today.getTime() / 1000); // Application name 	TrackGetter
// API key 	57afb56f19875af6fb8a53e688a753d4
// Shared secret 	712e606b6b99efe2332f58b1dccc1b37
// Registered to 	aarRJaay
//
// http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=YOUR_API_KEY&format=json

// http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=57afb56f19875af6fb8a53e688a753d4&format=json

async function fetchWebpage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error fetching the webpage:", error);
  }
}

// Example usage:
// fetchWebpage('https://example.com');
fetchWebpage(
  // "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=rj&api_key=57afb56f19875af6fb8a53e688a753d4&format=json",
  `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aarrjaay&api_key=57afb56f19875af6fb8a53e688a753d4&from=${unixTimestamp}&format=json`,
  // "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aarrjaay&api_key=57afb56f19875af6fb8a53e688a753d4&from=1728514800&format=json",
);
// fetchWebpage("https://www.bible.com/verse-of-the-day");k
