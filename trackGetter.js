var now = new Date();
var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var unixTimestamp = startOfDay / 1000; // const today = new Date();

async function grabTracks(url) {
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

grabTracks(
  `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aarrjaay&api_key=57afb56f19875af6fb8a53e688a753d4&from=${unixTimestamp}&format=json`,
);
// fetchWebpage("https://www.bible.com/verse-of-the-day");k
