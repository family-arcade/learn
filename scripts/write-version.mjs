// Writes dist/version.json: {"rev": "<full commit sha>", "at": "<ISO time>"}.
// The release workflow reads the live copy and refuses an upload that would put an older commit live
// (.github/workflows/release.yml); hetzner-ops' deploy-static.sh does the same for a hand upload.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const rev = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[0-9a-f]{40}$/.test(rev)) throw new Error(`not a commit sha: ${rev}`);
writeFileSync("dist/version.json", JSON.stringify({ rev, at: new Date().toISOString() }));
