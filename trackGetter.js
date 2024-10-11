var now = new Date();
var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var unixTimestamp = startOfDay / 1000; // const today = new Date();

const apiKey = "000";

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
  `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aarrjaay&${apiKey}&from=${unixTimestamp}&format=json`,
);
// fetchWebpage("https://www.bible.com/verse-of-the-day");k
