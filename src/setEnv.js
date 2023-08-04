const { writeFile, existsSync, mkdirSync } = require("fs");

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== "") {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const envDirectory = "./src/environments";

// creates the `environments` directory if it does not exist
mkdirSync(envDirectory);

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS("./src/environments/environment.ts", "");

// choose the correct targetPath based on the environment chosen
const targetPath = "./src/environments/environment.ts";

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
  // This file was autogenerated by dynamically running setEnv.ts and using dotenv for managing API key secrecy
  
  export const environment =firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
  },
  stripePublicKey:
    '${process.env.STRIPE_PUBLIC_KEY}',

};
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file
