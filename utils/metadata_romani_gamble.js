const fs = require("fs");
const path = require("path");
const basePath = process.cwd();
const buildDir = `${basePath}/custom/romani_gamble/json`;
// const {
//   format,
// } = require(`${basePath}/src/config.js`);
const namePrefix = 'Shares';
const description = 'Hello world!';
const baseUri = 'placeholder';
const numberOfJsons = 10000;
const console = require("console");

const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

const getImages = (_dir) => {
  try {
    return fs
      .readdirSync(_dir)
      .filter((item) => {
        let extension = path.extname(`${_dir}${item}`);
        if (extension == ".png" || extension == ".jpg") {
          return item;
        }
      })
      .map((i) => {
        return {
          filename: i,
          path: `${_dir}/${i}`,
        };
      });
  } catch {
    return null;
  }
};


const createJsons = () =>{
    let jsonList = [];
    for(let i = 1; i <= numberOfJsons; i ++){
        let jsonToBeAdded = {
            name: `${namePrefix} #${i}`,
            description: description,
            image: `${baseUri}/${i}.png`,
            edition: Number(i),
            compiler: "vladcondurat",
        }
        // write in the folder
        fs.writeFileSync(
            `${buildDir}/${i}.json`,
            JSON.stringify(jsonToBeAdded, null, 2)
          );
        //
        jsonList.push(jsonToBeAdded);
    }
    return jsonList;
}

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

const startCreating = async () => {
  const jsons = createJsons();
  if (jsons == null) {
    console.log("Please generate collection first.");
    return;
  }
  writeMetaData(JSON.stringify(jsons, null, 2));
};

buildSetup();
startCreating();
