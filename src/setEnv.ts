/* tslint:disable */
// @ts-nocheck

const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;

  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';

  // Load node modules

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    

    firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
      },
      stripePublicKey:
        '${process.env.STRIPE_PUBLIC_KEY}',
 
  };
  `;
  console.log(
    'The file `environment.ts` will be written with the following content'
  );

  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();

/* tslint:enable */
