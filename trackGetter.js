var now = new Date();
var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var unixTimestamp = startOfDay / 1000; // const today = new Date();
const { warn } = require("console");
const fs = require("fs");
const filePath = "/home/rj/.config/trackGetter/data.json";

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const apiKey = data.toString().trim();
    grabTracks(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=aarrjaay&api_key=${apiKey}&from=${unixTimestamp}&format=json`,
    );
  }
});

async function grabTracks(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.text();
    showData(data);
  } catch (error) {
    console.error("Error fetching the webpage:", error);
  }
}

function showData(data) {
  try {
    const jsonObject = JSON.parse(data);
    for (var i = 0; i < jsonObject.recenttracks.track.length; i++) {
      console.log(
        `${jsonObject.recenttracks.track[i].name} - ${jsonObject.recenttracks.track[i].album["#text"]} - ${jsonObject.recenttracks.track[i].artist["#text"]} - ${jsonObject.recenttracks.track[i].date["#text"]}`,
      );
    }
  } catch (error) {
    console.error(`Error parsing JSON: ${error.message}`);
  }
}
