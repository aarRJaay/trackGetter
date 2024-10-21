var now = new Date();
var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var unixTimestamp = startOfDay / 1000; // const today = new Date();
const { warn } = require("console");
// const jsonParse = require("jsonparse");
const fs = require("fs");
const filePath = "/home/rj/.config/trackGetter/data.json";

// Get filename for today's log
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; // Months are zero-indexed
const day = date.getDate();
const journal = `/home/rj/Documents/Knowledgebase/diary/${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}.md`;

const writeStream = fs.createWriteStream(journal, { flags: "a" });

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
    // console.log(data);
  } catch (error) {
    console.error("Error fetching the webpage:", error);
  }
}

function showData(data) {
  // console.log(data);
  try {
    const jsonObject = JSON.parse(data);
    writeStream.write("---\n## Track Listing\n");
    // ...
    for (var i = 0; i < jsonObject.recenttracks.track.length; i++) {
      // console.log(
      //   jsonObject.recenttracks.track[i].name,
      //   " - ",
      //   jsonObject.recenttracks.track[i].date,
      // );

      writeStream.write(
        // `${jsonObject.recenttracks.track[i].name} - ${jsonObject.recenttracks.track[i].album["#text"]} - ${jsonObject.recenttracks.track[i].artist["#text"]} - ${jsonObject.recenttracks.track[i].date["#text"]}`,
        `${jsonObject.recenttracks.track[i].name} - ${jsonObject.recenttracks.track[i].album["#text"]}- ${jsonObject.recenttracks.track[i].album["#text"]}`,
      );
      writeStream.write("\n");
    }
    writeStream.end();
  } catch (error) {
    console.error(`Error parsing JSON: ${error.message}`);
  }
}
