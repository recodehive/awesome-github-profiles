const fs = require('fs');
const path = require('path');

const username = process.argv[2];
const prBody = process.argv[3];
const screenshotUrl = `https://raw.githubusercontent.com/nishant0708/awesome-github-profiles/main/screenshots/${username}.png`;

// Extract selected categories from the PR body
const categories = (prBody.match(/\[x\] <span class="tag">(.+?)<\/span>/g) || []).map(tag => tag.replace(/\[x\] <span class="tag">(.+?)<\/span>/, '$1'));

// Path to .all-contributorsrc file
const contributorsFilePath = path.join(process.cwd(), '.all-contributorsrc');

// Read the existing contributors file
let contributorsData;
try {
    contributorsData = JSON.parse(fs.readFileSync(contributorsFilePath, 'utf8'));
} catch (error) {
    console.error(`Failed to read .all-contributorsrc: ${error.message}`);
    process.exit(1);
}

// Find existing contributor or create a new one
let contributor = contributorsData.contributors.find(contributor => contributor.login === username);

if (contributor) {
    contributor.contributions = categories;
} else {
    contributor = {
        login: username,
        name: username,  // Customize as needed
        avatar_url: `https://avatars.githubusercontent.com/${username}`,
        ScreenShot: screenshotUrl,
        profile: `https://github.com/${username}`,
        contributions: categories
    };
    contributorsData.contributors.push(contributor);
}

// Write the updated data back to the file
try {
    fs.writeFileSync(contributorsFilePath, JSON.stringify(contributorsData, null, 2));
    console.log('Contributors file updated successfully!');
} catch (error) {
    console.error(`Failed to write to .all-contributorsrc: ${error.message}`);
    process.exit(1);
}
