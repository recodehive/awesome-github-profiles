// this is  code which runs with pat and is more optimized because it is fetching api of 2 people at a time only

const token = "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"; // Replace with your GitHub PAT
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
        const login1 = document.getElementById('contributorSelect1').value;
        const login2 = document.getElementById('contributorSelect2').value;

        if (login1 && login2 && login1 !== login2) {
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
            ])
                .then(([data1, data2]) => {
                    // Show the table
                    document
                        .getElementById("comparisonTable")
                        .classList.remove("hidden");

                    // Fill the table with data
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
