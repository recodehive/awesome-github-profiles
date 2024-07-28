const fs = require('fs');
const jsonfile = require('jsonfile');
const path = require('path');

// Path to your contributors.json file
const contributorsFilePath = path.resolve(__dirname, '../../path/to/your/contributors.json');

const username = process.argv[2];
const issueBody = process.argv[3];

// Regular expression to extract image URL from issue body
const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
const imageUrlMatch = issueBody.match(imageUrlRegex);
const imageUrl = imageUrlMatch ? imageUrlMatch[0] : '';

if (!imageUrl) {
  console.error('No image URL found in the issue body.');
  process.exit(1);
}

jsonfile.readFile(contributorsFilePath, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const contributorExists = data.contributors.some(contributor => contributor.username === username);

  if (!contributorExists) {
    data.contributors.push({ username, image: imageUrl });

    jsonfile.writeFile(contributorsFilePath, data, { spaces: 2 }, err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log('Contributor added successfully!');
    });
  } else {
    console.log('Contributor already exists.');
  }
});
