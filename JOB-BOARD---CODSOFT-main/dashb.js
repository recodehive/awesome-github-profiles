var jsoncont;
var userd;
async function getdata() {
    try {
        const response = await fetch('http://localhost/joboard/save-json.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        jsoncont = data;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function saveJsonData(jsoncont) {
    try {
        const response = await fetch('http://localhost/joboard/save-json.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsoncont)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function main() {
    try {
        jsoncont = await getdata();
        return jsoncont.basicdata[user];
    } catch (error) {
        console.error('Error:', error);
    }
}
userd = main();
var user = getQueryParam('email'); 


// user logged in
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


////////////// TO GET ALL THE DETAILS OF A PERTICULAR USER
function userdetails() {
    userd = main();
    userd.then(([name, dob, degree, clg, exp, jobposted, empaccepted, jobsapplied, jobsinprocess, completedjobs, moneymade]) => {
        document.getElementById('sidebar-name').textContent = name;
        document.getElementById('sidebar-email').textContent =user;
        document.getElementById('dashprofilename').textContent = "Name : " + name;
        document.getElementById('dashprofilemail').textContent = "E-mail : " + user;
        document.getElementById('dashprofiledob').textContent = "DOB : " + dob;
        document.getElementById('dashprofiledegree').textContent = "Degree : " + degree;
        document.getElementById('dashprofileclg').textContent = "College : " + clg;
        document.getElementById('dashprofileexp').textContent = "Experience : " + exp;
        document.getElementById('Number-of-Jobs-Posted').textContent = jobposted;
        document.getElementById('Number-of-Employees-placed').textContent = empaccepted;
        document.getElementById('no-of-job-applied').textContent = jobsapplied;
        document.getElementById('no-of-app-approves').textContent = jobsapplied - jobsinprocess;
        document.getElementById('workexp').textContent = completedjobs;
        document.getElementById('moneymade').textContent = moneymade;
    });      
    return userd;
}
userd = userdetails();

// for profile update
function saveupdinfo(){
    userd = userdetails();
    var jobposted;
    var empaccepted;
    var jobsapplied;
    var jobsinprocess;
    var completedjobs;
    var moneymade;
    userd.then(([name, dob, degree, clg, exp, jobposted, empaccepted, jobsapplied, jobsinprocess, completedjobs, moneymade]) => {
        this.jobposted = jobposted;
        this.empaccepted = empaccepted;
        this.jobsapplied = jobsapplied;
        this.jobsinprocess = jobsinprocess;
        this.completedjobs = completedjobs;
        this.moneymade = moneymade;
    });
    jsoncont.basicdata[user][0] = document.getElementById('name').value;
    jsoncont.basicdata[user][1] = document.getElementById('dob').value;
    jsoncont.basicdata[user][3] = document.getElementById('clg').value;
    jsoncont.basicdata[user][2] = document.getElementById('degree').value;
    jsoncont.basicdata[user][4] = document.getElementById('experience').value;
    jsoncont.cvurl[user] = document.getElementById('cvurlup').value;
    saveJsonData(jsoncont);
    location.reload();
}


function jobpost_form() {
    window.open('postjob.html?email='+ encodeURIComponent(user));
}