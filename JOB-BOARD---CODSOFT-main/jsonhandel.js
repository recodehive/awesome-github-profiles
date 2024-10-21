// Function to fetch JSON data from PHP and handle the response
var jsoncont;
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


//function to store the json object back to file
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


///////////////////////////////////////////////////////////////////////////////
/////////// ABOVE CODE WAS FOR GETTIG DATA AND SAVING BACK THE DATA ///////////
///////////////////////////////////////////////////////////////////////////////


////////////// TO GET MAIL IDS AND PASSWORDS
function extractEmailsAndPasswords(jsonData) {
    var emailsWithPasswords = [];
    if (jsonData) {
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key) && typeof jsonData[key] === 'object' && jsonData[key] !== null) {
                if (key === 'log') {
                    for (var email in jsonData.log) {
                        if (jsonData.log.hasOwnProperty(email)) {
                            var password = jsonData.log[email];
                            emailsWithPasswords.push([email, password]);
                        }
                    }
                    break;
                }
            }
        }
    } else {
        console.error("JSON data is null or undefined.");
    }
    return emailsWithPasswords;
}


////////////// TO STORE THE DATA IN PARTS
async function main() {
    try {
        await getdata();
        emaillist = extractEmailsAndPasswords(jsoncont);
    } catch (error) {
        console.error('Error:', error);
    }
}
var emaillist;
var presentmaillog;
main();


///////////////////////////////////////////////////////////////////////////////
/////////////////// METHODS TO GET DIFFERENT DATAS FILTERED ///////////////////
///////////////////////////////////////////////////////////////////////////////


// for newsletter
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function nwlbtn(){
    if(emailRegex.test(document.getElementById('emailInput').value)){
        jsoncont.newsletter.push(document.getElementById('emailInput').value);
        console.log(jsoncont);
        document.getElementById('emailInput').value = "";
        saveJsonData(jsoncont);
        alert("Email subscribed successfully!!!");
    }
    else{
        alert("enter a valid mail id!!!");
        document.getElementById('emailInput').value = "";
    }
}


// login
function logb(){
    let logInputs = document.getElementById('loginmailplc');
    let logpassInputs = document.getElementById('loginpassplc');
    for(let i=0;i<(emaillist.length);i++){
        if (logInputs.value === emaillist[i][0]){
            if(logpassInputs.value === emaillist[i][1]){
                if(document.getElementById('logcheck').checked){
                    window.open('dashboard.html?email='+ encodeURIComponent(logInputs.value));
                }
                else {
                    alert("Please agree with the terms and conditions");
                }
            }
            else {
                alert("Wrong password!!");
            }
        }
    }
}


async function cvsk(urll){
    await fetchSkillsFromResume(urll)
}
// register
function dashb(){
    let regInputs = document.getElementById('regmailplc');
    let regpassInputs = document.getElementById('regpassplc');
    let regrepassInputs = document.getElementById('regrepassplc');
    let bool = false;
    for(let i=0;i<(emaillist.length);i++){
        if (regInputs.value === emaillist[i][0]){
            bool = true;
            alert('already exists');
        }
    }
    if(!bool){
        if(regpassInputs.value === regrepassInputs.value){
            if(document.getElementById('regcheck').checked){
                jsoncont.log[regInputs.value] = regpassInputs.value;
                saveJsonData(jsoncont);
                alert("Registered Successfully!");
                document.getElementById('regcred').style.display ='none';
                document.getElementById('regscreen').style.display = 'none';
                document.getElementById('popupForm').style.display = 'flex';
                document.getElementById('popsubmit').addEventListener('click', () =>{
                    var regname = document.getElementById('popname').value;
                    var regdob = document.getElementById('popdob').value;
                    var regdegree = document.getElementById('popdegree').value;
                    var popexperience = document.getElementById('popexperience').value;
                    var regcollege = document.getElementById('popcollege').value;
                    var regcv = document.getElementById('popcv').value;
                    jsoncont.basicdata[regInputs.value] = [regname,regdob,regdegree,regcollege,popexperience,0,0,0,0,0,0];
                    jsoncont.cvurl[regInputs.value] = regcv;
                    saveJsonData(jsoncont);
                    alert("data saved successfully");
                    const logmail = regInputs.value;
                    document.getElementById('popsubmit').addEventListener('click', ()=>{
                        window.open('dashboard.html?email='  + encodeURIComponent(regInputs.value));
                    })
                });  
            }
            else{ alert("Please agree with the terms and conditions"); }
        }
        else{ alert("password doesn't match!!"); }
    }
    else{ alert("Mail id already exists please login!!"); }
}
/// http://localhost/pyresumeparser/resumeskill.py