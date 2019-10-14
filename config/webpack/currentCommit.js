const cp = require("child_process");

// Get the latest commit and use it as the version.

let version;
try {
  version = cp.execSync("git rev-parse HEAD", {
    cwd: __dirname,
    encoding: "utf8",
  });
} catch (err) {
  console.log("Error getting revision", err);
  process.exit(1);
}

module.exports = version;
