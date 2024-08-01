import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { generateAllSeries } from "../src/logic";

const currentDirectoryPath = dirname(fileURLToPath(import.meta.url));
const probabilityJsonPath = resolve(
  currentDirectoryPath,
  "..",
  "src",
  "probabilities.json"
);

const allSeries = generateAllSeries();
fs.writeFileSync(probabilityJsonPath, JSON.stringify(allSeries));
