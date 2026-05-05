// @ts-check
"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");

const GITHUB_API_BASE = "api.github.com";
const GITHUB_RAW_BASE =
    "https://raw.githubusercontent.com/DRincs-Productions/pixi-vn-json/refs/heads/main/schemas";
const SCHEMAS_REPO_PATH = "/repos/DRincs-Productions/pixi-vn-json/contents/schemas";
const NPM_LATEST_URL = "/@drincs/pixi-vn-json/latest";

/**
 * Makes an HTTPS GET request and resolves with the parsed JSON body.
 * @param {string} hostname
 * @param {string} urlPath
 * @param {Record<string, string>} [headers]
 * @returns {Promise<any>}
 */
function getJSON(hostname, urlPath, headers = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            path: urlPath,
            headers: { Accept: "application/json", "User-Agent": "pixi-vn-wiki-build", ...headers },
        };
        https
            .get(options, (res) => {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    // follow redirect
                    if (!res.headers.location) {
                        return reject(new Error(`Redirect with no Location header from ${hostname}${urlPath}`));
                    }
                    const redirectUrl = new URL(res.headers.location);
                    return resolve(
                        getJSON(redirectUrl.hostname, redirectUrl.pathname + redirectUrl.search, headers)
                    );
                }
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject(new Error(`Failed to parse JSON from ${hostname}${urlPath}: ${err.message}`));
                    }
                });
            })
            .on("error", reject);
    });
}

/**
 * Downloads a raw text/binary file and returns it as a Buffer.
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
function downloadBuffer(url) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const options = {
            hostname: parsed.hostname,
            path: parsed.pathname,
            headers: { "User-Agent": "pixi-vn-wiki-build" },
        };
        https
            .get(options, (res) => {
                if (res.statusCode === 301 || res.statusCode === 302) {
                    if (!res.headers.location) {
                        return reject(new Error(`Redirect with no Location header fetching ${url}`));
                    }
                    return resolve(downloadBuffer(res.headers.location));
                }
                if (res.statusCode !== 200) {
                    return reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
                }
                const chunks = [];
                res.on("data", (chunk) => chunks.push(chunk));
                res.on("end", () => resolve(Buffer.concat(chunks)));
            })
            .on("error", reject);
    });
}

/**
 * Returns the list of version folder names available in the GitHub schemas directory.
 * @returns {Promise<string[]>}
 */
async function listVersions() {
    const entries = await getJSON(GITHUB_API_BASE, SCHEMAS_REPO_PATH);
    if (!Array.isArray(entries)) throw new Error("Unexpected response from GitHub Contents API");
    return entries
        .filter((e) => e.type === "dir")
        .map((e) => e.name);
}

/**
 * Fetches the latest published version of @drincs/pixi-vn-json from the npm registry.
 * @returns {Promise<string>}
 */
async function getLatestNpmVersion() {
    const pkg = await getJSON("registry.npmjs.org", NPM_LATEST_URL);
    if (!pkg.version) throw new Error("version field missing in npm response for @drincs/pixi-vn-json");
    return pkg.version;
}

async function main() {
    const schemasDir = path.join(__dirname, "..", "public", "schemas");

    // Fetch versions from GitHub and latest from npm in parallel.
    const [versions, latestVersion] = await Promise.all([listVersions(), getLatestNpmVersion()]);

    console.log(`Found ${versions.length} schema version(s): ${versions.join(", ")}`);
    console.log(`Latest npm version: ${latestVersion}`);

    // Download all schema files in parallel.
    await Promise.all(
        versions.map(async (version) => {
            const url = `${GITHUB_RAW_BASE}/${version}/schema.json`;
            const destDir = path.join(schemasDir, version);
            const destFile = path.join(destDir, "schema.json");

            const buffer = await downloadBuffer(url);
            fs.mkdirSync(destDir, { recursive: true });
            fs.writeFileSync(destFile, buffer);
            console.log(`Saved schemas/${version}/schema.json`);
        })
    );

    // Write latest/ as a copy of the resolved npm version's schema.
    if (!versions.includes(latestVersion)) {
        throw new Error(
            `Latest npm version ${latestVersion} not found in GitHub schemas (${versions.join(", ")})`
        );
    }
    const latestSrc = path.join(schemasDir, latestVersion, "schema.json");
    const latestDir = path.join(schemasDir, "latest");
    const latestDest = path.join(latestDir, "schema.json");
    fs.mkdirSync(latestDir, { recursive: true });
    fs.copyFileSync(latestSrc, latestDest);
    console.log(`Saved schemas/latest/schema.json -> ${latestVersion}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
