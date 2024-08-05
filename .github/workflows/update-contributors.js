const fs = require('fs');
const path = require('path');

const username = process.argv[2];
const prBody = process.argv[3];
const screenshotUrl = `https://raw.githubusercontent.com/nishant0708/awesome-github-profiles/main/screenshots/${username}.png`;

// Extract selected categories from the PR body
const categories = (prBody.match(/\[(x| )\] (.+)/g) || []).map(line => line.replace(/^\[(x| )\] /, ''));

const contributorsFilePath = path.join(process.cwd(), '.all-contributorsrc');
const contributorsData = JSON.parse(fs.readFileSync(contributorsFilePath, 'utf8'));

// Check if the user already exists in the contributors data
const existingContributor = contributorsData.contributors.find(contributor => contributor.login === username);

if (existingContributor) {
    // Update existing contributor's categories
    existingContributor.contributions = categories;
} else {
    // Add a new contributor
    contributorsData.contributors.push({
        login: username,
        name: username,  // Customize as needed
        avatar_url: `https://avatars.githubusercontent.com/${username}`,
        ScreenShot: screenshotUrl,
        profile: `https://github.com/${username}`,
        contributions: categories
    });
}

fs.writeFileSync(contributorsFilePath, JSON.stringify(contributorsData, null, 2));
console.log('Contributors file updated successfully!');
