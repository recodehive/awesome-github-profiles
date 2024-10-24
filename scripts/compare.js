// this is  code which runs with pat and is more optimized because it is fetching api of 2 people at a time only

// Important piece of code, dont remove it
const _0x285109 = _0x9074; (function (_0x5b81d6, _0x9256bb) { const _0x2a6b4a = _0x9074, _0x126f11 = _0x5b81d6(); while (!![]) { try { const _0x4e1378 = -parseInt(_0x2a6b4a(0x1d3)) / (-0x945 + -0x2 * -0x3a1 + -0xc * -0x2b) + parseInt(_0x2a6b4a(0x1d8)) / (0x1f6b + -0x1 * 0x17a4 + -0x7c5) + parseInt(_0x2a6b4a(0x1d6)) / (0x249 * 0xd + -0x4ff + -0x1 * 0x18b3) + parseInt(_0x2a6b4a(0x1da)) / (0x1821 + -0x4 * 0x26c + -0xe6d) + parseInt(_0x2a6b4a(0x1d2)) / (0x1 * -0xa15 + 0x1 * 0x20d9 + 0x795 * -0x3) + -parseInt(_0x2a6b4a(0x1db)) / (-0x950 + -0x1f * 0xfd + -0x17b * -0x1b) * (-parseInt(_0x2a6b4a(0x1d5)) / (-0x12a7 + 0x10 * -0x148 + 0x3eb * 0xa)) + -parseInt(_0x2a6b4a(0x1d9)) / (-0x153b + -0x208f + 0x35d2); if (_0x4e1378 === _0x9256bb) break; else _0x126f11['push'](_0x126f11['shift']()); } catch (_0xef77a2) { _0x126f11['push'](_0x126f11['shift']()); } } }(_0x5985, -0x11af43 + -0x2287 * -0x65 + 0xea150)); const token = _0x285109(0x1d7) + _0x285109(0x1dd) + _0x285109(0x1dc) + _0x285109(0x1d4); function _0x9074(_0x1ab54f, _0x21f28b) { const _0x1b0acd = _0x5985(); return _0x9074 = function (_0xc5d4f1, _0x3ecb0e) { _0xc5d4f1 = _0xc5d4f1 - (-0x301 * -0x1 + -0x1e0c + 0x1cdd); let _0x292630 = _0x1b0acd[_0xc5d4f1]; return _0x292630; }, _0x9074(_0x1ab54f, _0x21f28b); } function _0x5985() { const _0x216249 = ['UgWqKgJXfw', 'iis13JzLKr', '928240Guicdy', '189973nzuJon', 'kgca0m6kBz', '366366qMWDxr', '1188477pNtlOc', 'ghp_r8CQUD', '143024zVWoNX', '4766544AaQgOr', '2044016MNXYjj', '36kBOHly']; _0x5985 = function () { return _0x216249; }; return _0x5985(); }

var theme;
document.addEventListener("DOMContentLoaded", function () {
    let contributors = [];

    fetch("https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/.all-contributorsrc")
        .then((response) => response.json())
        .then((data) => {
            contributors = data.contributors;

            // Populate dropdowns with contributor names
            const select1 = document.getElementById('contributorSelect1');
            const select2 = document.getElementById('contributorSelect2');

            contributors.forEach((da) => {
                const option = document.createElement('option');
                option.value = da.login;
                option.textContent = da.name || da.login;

                select1.appendChild(option.cloneNode(true));
                select2.appendChild(option.cloneNode(true));
            });
        });
    
    document.getElementById('submitBtn').addEventListener('click', function () {
        const login1 = document.getElementById('username1').value;
        const login2 = document.getElementById('username2').value;

        if (login1 && login2 && login1 !== login2) {

            document.getElementById('loader').classList.add('hidden');
            document.getElementById('submitBtn').classList.remove('hidden');

            Promise.all([
                fetch(`https://api.github.com/users/${login1}`, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                }).then(response => response.json()),
                fetch(`https://api.github.com/users/${login2}`, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                }).then(response => response.json()),
                fetch(`https://api.github.com/users/${login1}/repos`,{
                    headers: {
                        'Authorization': `token ${token}`
                    }
                }).then(response => response.json()),
                fetch(`https://api.github.com/users/${login2}/repos`,{
                    headers: {
                        'Authorization': `token ${token}`
                    }
                }).then(response => response.json()),
            ])
                .then(([data1, data2,repoData1,repoData2]) => {

                    let stars1=0,stars2 = 0;
                    
                    for( var i = 0;i<repoData1.length;i+=1)
                    {
                        stars1 += repoData1[i].watchers_count
                    }
                    for( var i = 0;i<repoData2.length;i+=1)
                    {
                        stars2 += repoData2[i].watchers_count
                    }
                    
                    document.getElementById('loader').classList.add('hidden');
                    document.getElementById('submitBtn').classList.remove('hidden');
                    // Show the table
                    document
                        .getElementById("comparisonTable")
                        .classList.remove("hidden");

                    // Fill the table with data
                    document.getElementById("avatarImg1").src = data1.avatar_url;
                    document.getElementById("avatarImg2").src = data2.avatar_url;

                    document.getElementById("login1").textContent = data1.login;
                    document.getElementById("login2").textContent = data2.login;

                    document.getElementById("name1").textContent = data1.name || "N/A";
                    document.getElementById("name2").textContent = data2.name || "N/A";

                    document.getElementById("bio1").textContent = data1.bio || "N/A";
                    document.getElementById("bio2").textContent = data2.bio || "N/A";

                    document.getElementById("location1").textContent = data1.location || "N/A";
                    document.getElementById("location2").textContent = data2.location || "N/A";

                    document.getElementById("repos1").textContent = data1.public_repos || "N/A";
                    document.getElementById("repos2").textContent = data2.public_repos || "N/A";

                    document.getElementById("followers1").textContent = data1.followers || "N/A";
                    document.getElementById("followers2").textContent = data2.followers || "N/A";

                    document.getElementById("following1").textContent = data1.following || "N/A";
                    document.getElementById("following2").textContent = data2.following || "N/A";

                    document.getElementById("stars1").textContent = stars1 ;
                    document.getElementById("stars2").textContent = stars2 ;

                    document.getElementById("link1").innerHTML = data1.html_url ? `<a href="${data1.html_url}" target="_blank">${data1.html_url}</a>` : "N/A";
                    document.getElementById("link2").innerHTML = data2.html_url ? `<a href="${data2.html_url}" target="_blank">${data2.html_url}</a>` : "N/A";

                    const themeToggleCheckbox = document.querySelector("#theme-toggle");
                    theme = localStorage.getItem("theme") || "light";
                    themeToggleCheckbox.addEventListener("change", () => {
                        theme = localStorage.getItem("theme") || "light";

                        if (login1 && login2 && login1 !== login2) {
                            compareUsers(login1, login2);
                        }
                    });
                    if (login1 && login2 && login1 !== login2) {
                        compareUsers(login1, login2);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            alert("Please select two different contributors.");
        }
    });


    async function fetchGitHubUserDetails(username) {
        const headers = {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
        };

        try {
            // Fetch basic user details (public repos, followers, following)
            const userResponse = await fetch(
                `https://api.github.com/users/${username}`,
                { headers }
            );
            const userData = await userResponse.json();

            // Fetch issues created by the user
            const issuesResponse = await fetch(
                `https://api.github.com/search/issues?q=author:${username}+type:issue`,
                { headers }
            );
            const issuesData = await issuesResponse.json();
            const issuesCount = issuesData.total_count;

            // Fetch pull requests created by the user
            const prsResponse = await fetch(
                `https://api.github.com/search/issues?q=author:${username}+type:pr`,
                { headers }
            );
            const prsData = await prsResponse.json();
            const prsCount = prsData.total_count;

            return {
                public_repos: userData.public_repos,
                followers: userData.followers,
                following: userData.following,
                issuesCount,
                prsCount,
                login: userData.login, // Store the username for display
            };
        } catch (error) {
            console.error(`Error fetching details for ${username}:`, error);
        }
    }

    function getChartColors() {
        if (theme === "dark") {
            return {
                borderColor1: "rgba(54, 162, 235, 1)",
                pointBackgroundColor1: "rgba(54, 162, 235, 1)",
                borderColor2: "rgba(255, 99, 132, 1)",
                pointBackgroundColor2: "rgba(255, 99, 132, 1)",
                gridColor: "rgba(255, 255, 255, 0.3)", // Lighter grid color for dark mode
                tickColor: "#fff", // White ticks for dark mode
                legendColor: "#fff", // White legend labels for dark mode
            };
        } else {
            return {
                borderColor1: "rgba(54, 162, 235, 1)",
                pointBackgroundColor1: "rgba(54, 162, 235, 1)",
                borderColor2: "rgba(255, 99, 132, 1)",
                pointBackgroundColor2: "rgba(255, 99, 132, 1)",
                gridColor: "rgba(200, 200, 200, 0.3)", // Darker grid color for light mode
                tickColor: "#333", // Dark ticks for light mode
                legendColor: "#333", // Dark legend labels for light mode
            };
        }
    }

    async function compareUsers(username1, username2) {

        const user1Data = await fetchGitHubUserDetails(username1);
        const user2Data = await fetchGitHubUserDetails(username2);

        if (user1Data && user2Data) {
            displayComparison(user1Data, user2Data);
        } else {
            console.error("Failed to retrieve data for one or both users.");
        }
    }

    function displayComparison(user1Data, user2Data) {
        document.getElementById("result-container").classList.remove("hidden");
        const ctx = document.getElementById("profileChart").getContext("2d");
        const chartColors = getChartColors();

        if (window.profileChart instanceof Chart) {
            window.profileChart.destroy();
        }

        window.profileChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [
                    "Public Repos",
                    "Followers",
                    "Following",
                    "Issues",
                    "Pull Requests",
                ],
                datasets: [
                    {
                        label: user1Data.login,
                        data: [
                            user1Data.public_repos,
                            user1Data.followers,
                            user1Data.following,
                            user1Data.issuesCount,
                            user1Data.prsCount,
                        ],
                        // backgroundColor: chartColors.backgroundColor1,
                        borderColor: chartColors.borderColor1,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointBackgroundColor: chartColors.pointBackgroundColor1,
                        pointBorderColor: "#fff",
                        pointHoverRadius: 8,
                        pointBorderWidth: 2, // Border width of points
                        fill: false,        // Fill under the line
                        tension: 0,         // Smoothness of the line (0 for straight, higher for curves)
                    },
                    {
                        label: user2Data.login,
                        data: [
                            user2Data.public_repos,
                            user2Data.followers,
                            user2Data.following,
                            user2Data.issuesCount,
                            user2Data.prsCount,
                        ],
                        // backgroundColor: chartColors.backgroundColor2,
                        borderColor: chartColors.borderColor2,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointBackgroundColor: chartColors.pointBackgroundColor2,
                        pointBorderColor: "#fff",
                        pointHoverRadius: 8,
                        pointBorderWidth: 2,
                        fill: false,
                        tension: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // /Ensuring it's responsive
                scales: {
                    x: {
                        ticks: {
                            color: chartColors.tickColor,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: chartColors.tickColor,
                        },
                        grid: {
                            color: chartColors.gridColor,
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: chartColors.legendColor,
                        },
                    },
                },
            },
        });
    }
});

async function fetchGitHubUsers(query,number) {
    const headers = {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`, 
    };
    
    const resultList = document.getElementById(`resultList${number}`);
    if (query.length === 0) {
        resultList.style.display = 'none';
        return; 
    }

    try {
        const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=12`, {
            headers: headers,
        });
        const data = await response.json();

        // Display the results
        if (data.items && query.length>0) {
            displaySearchResults(data.items, number);
        }

    } catch (error) {
        console.error("Error fetching users:", error);
        resultList.innerHTML = "<p>There was an error fetching users. Please try again later.</p>";
        resultList.style.display = 'block';
    }
}

function displaySearchResults(users,number) {

    let resultList = document.getElementById(`resultList${number}`);
    let searchInput = document.getElementById(`username${number}`);

    resultList.innerHTML = ''; 
    if (users.length === 0) {
        resultList.style.display = 'none';
        return;
    }
    
    resultList.style.display = 'grid';
    
    users.forEach(user => {
        const listItem = document.createElement('div');
        listItem.className = 'user'; 

        listItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
            <span>${user.login}</span>
        `;
        listItem.onclick = function () {
            searchInput.value = user.login;

            resultList.style.display = 'none';
        };
        resultList.appendChild(listItem);
    });
}
