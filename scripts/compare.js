document.addEventListener("DOMContentLoaded", function () {
    let contributors = [];
    let map = new Map();
    
    
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
            
            // Fetch contributor details
            contributors.forEach((da) => {
                fetch(`https://api.github.com/users/${da.login}`, {
                    method: "GET"
                })
                .then(response => response.json())
                .then(res => {
                    map.set(da.login, { ...res });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
    
    document.getElementById('submitBtn').addEventListener('click', function () {
        const login1 = document.getElementById('contributorSelect1').value;
        const login2 = document.getElementById('contributorSelect2').value;

        if (login1 && login2 && login1 !== login2) {

            const data1 = map.get(login1);
            const data2 = map.get(login2);
            console.log(data1,login1,login2,data2,map)
            if (data1 && data2) {
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
            } else {
                console.error('Contributor data not found.');
            }
        } else {
            alert('Please select two different contributors.');
        }
    });
});
