// @ts-check
"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");

const RAW_BASE = "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-json/refs/heads/main/schemas";

/**
 * Fetches the latest published version of @drincs/pixi-vn-json from the npm registry.
 * @returns {Promise<string>}
 */
function getLatestVersion() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: "registry.npmjs.org",
            path: "/@drincs/pixi-vn-json/latest",
            headers: { Accept: "application/json" },
        };
        https
            .get(options, (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                    try {
                        const pkg = JSON.parse(data);
                        if (!pkg.version) throw new Error("version field missing in npm response");
                        resolve(pkg.version);
                    } catch (err) {
                        reject(err);
                    }
                });
            })
            .on("error", reject);
    });
}

async function main() {
    const version = await getLatestVersion();
    console.log(`Latest @drincs/pixi-vn-json version: ${version}`);

    const firebasePath = path.join(__dirname, "..", "firebase.json");

    let config;
    try {
        config = JSON.parse(fs.readFileSync(firebasePath, "utf8"));
    } catch (err) {
        throw new Error(`Failed to read or parse firebase.json: ${err.message}`);
    }

    if (!config.hosting || !Array.isArray(config.hosting.redirects)) {
        throw new Error("firebase.json is missing hosting.redirects array");
    }

    // Remove any existing "latest" schema redirect so we can refresh it.
    config.hosting.redirects = config.hosting.redirects.filter(
        (r) => r.source !== "/schemas/latest/schema.json"
    );

    // Prepend the "latest" redirect pointing directly to the GitHub raw URL,
    // so it takes priority over the versioned wildcard and avoids a double redirect.
    config.hosting.redirects.unshift({
        source: "/schemas/latest/schema.json",
        destination: `${RAW_BASE}/${version}/schema.json`,
        type: 302,
    });

    fs.writeFileSync(firebasePath, JSON.stringify(config, null, 4) + "\n");
    console.log(`Added redirect: /schemas/latest/schema.json -> ${RAW_BASE}/${version}/schema.json`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
