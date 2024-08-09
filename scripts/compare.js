// this is  code which runs with pat and is more optimized because it is fetching api of 2 people at a time only

document.addEventListener("DOMContentLoaded", function () {
    let contributors = [];
    const token = ''; // Replace with your GitHub PAT

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
                }).then(response => response.json())
            ])
            .then(([data1, data2]) => {
                // Show the table
                document.getElementById('comparisonTable').classList.remove('hidden');

                // Fill the table with data
                document.getElementById('login1').textContent = data1.login;
                document.getElementById('login2').textContent = data2.login;

                document.getElementById('name1').textContent = data1.name || 'N/A';
                document.getElementById('name2').textContent = data2.name || 'N/A';

                document.getElementById('bio1').textContent = data1.bio || 'N/A';
                document.getElementById('bio2').textContent = data2.bio || 'N/A';

                document.getElementById('location1').textContent = data1.location || 'N/A';
                document.getElementById('location2').textContent = data2.location || 'N/A';

                document.getElementById('repos1').textContent = data1.public_repos || 'N/A';
                document.getElementById('repos2').textContent = data2.public_repos || 'N/A';

                document.getElementById('followers1').textContent = data1.followers || 'N/A';
                document.getElementById('followers2').textContent = data2.followers || 'N/A';

                document.getElementById('following1').textContent = data1.following || 'N/A';
                document.getElementById('following2').textContent = data2.following || 'N/A';
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please select two different contributors.');
        }
    });
});

