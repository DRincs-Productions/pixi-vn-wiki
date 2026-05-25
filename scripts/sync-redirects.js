const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const redirects = JSON.parse(fs.readFileSync(path.join(root, "redirects.json"), "utf-8"));

// firebase.json: { source, destination, type: 301 }
const firebasePath = path.join(root, "firebase.json");
const firebase = JSON.parse(fs.readFileSync(firebasePath, "utf-8"));
firebase.hosting.redirects = redirects.map(({ source, destination }) => ({
    source,
    destination,
    type: 301,
}));
fs.writeFileSync(firebasePath, JSON.stringify(firebase, null, 2) + "\n");

// vercel.json: { source, destination, permanent: true }
const vercelPath = path.join(root, "vercel.json");
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf-8"));
vercel.redirects = redirects.map(({ source, destination }) => ({
    source,
    destination,
    permanent: true,
}));
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + "\n");

console.log(`Synced ${redirects.length} redirects to firebase.json and vercel.json`);
