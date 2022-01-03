const fs = require("fs");

// Existence check
if (!fs.existsSync("./new")) {
  // Create dir
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}

// Existence check
if (fs.existsSync("./new")) {
  // Remove dir
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("Directory removed");
  });
}
