var now = new Date();
var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
var unixTimestamp = startOfDay / 1000; // const today = new Date();
const { warn } = require("console");
// const jsonParse = require("jsonparse");
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
    // console.log(data);
  } catch (error) {
    console.error("Error fetching the webpage:", error);
  }
}

function showData(data) {
  // console.log(data);
  try {
    const jsonObject = JSON.parse(data);
    // ...
    for (var i = 0; i < jsonObject.recenttracks.track.length; i++) {
      console.log(
        jsonObject.recenttracks.track[i].name,
        " - ",
        jsonObject.recenttracks.track[i].date,
      );
    }

    // jsonObject.recenttracks.track.foreach((obj) => {
    //   console.log(obj.name);
    // });
    // console.log(jsonObject.recenttracks.track[0].date);
  } catch (error) {
    console.error(`Error parsing JSON: ${error.message}`);
  } // console.log(data);
  // data
  //   .then((res) => res.json())
  //   .then((fitbitProfileData) => {
  //     console.log(fitbitProfileData);
  //     //
  //     // const output = JSON.stringify(data);
  //     // console.log(data.recenttracks[name];
  //     // console.log("Weather: ", icons[]);
  //     // console.log("Temperature: ", fitbitProfileData.main.temp);
  //     // console.log("Feels like: ", fitbitProfileData.main.feels_like);
  //     // console.log("Sunrise: ", fitbitProfileData.sys.sunrise);
  //     // console.log("Sunset: ", fitbitProfileData.sys.sunset);
  //     //
  //     // },
  //     // );
  //   });
  // //    )
}
