var jsoncont;
var userd;
async function getdata() {
    try {
        const response = await fetch('http://localhost/joboard/save-json.php');
        if (!response.ok) {throw new Error('Network response was not ok');}
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
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function main() {
    try {
        jsoncont = await getdata();
        return jsoncont;
    } catch (error) {
        console.error('Error:', error);
    }
}
async function mainn(jsoncont){
    try{
        saveJsonData(jsoncont);
    }catch(error){
        console.log('Error:', error);
    }
}
jsoncont = main();


function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


function submit() {
    var ftpt;
    let skill = [];
    var i = 0;
    const id = (document.getElementById('jobid').value);
    const cname = document.getElementById('companyName').value;
    const ctype = document.getElementById("companyType").value;
    const url = document.getElementById("companyUrl").value;
    if(document.getElementById('fullTime').checked){ftpt = 'ft'}
    else{ftpt='pt'}
    if(document.getElementById('webdev').checked){skill[i]='Web dev'; i++;}
    if(document.getElementById('appdev').checked){skill[i]='Application development'; i++;}
    if(document.getElementById('ds').checked){skill[i]='Data science'; i++;}
    if(document.getElementById('da').checked){skill[i]='Data analysis'; i++;}
    if(document.getElementById('uix').checked){skill[i]='UI/UX'; i++;}
    if(document.getElementById('ved').checked){skill[i]='Video Editing'; i++;}
    if(document.getElementById('se').checked){skill[i]='Software Engineer'; i++;}
    if(document.getElementById('prog').checked){skill[i]='Programming'; i++;}
    let newf = [cname,ctype,getQueryParam("email"),url,document.getElementById('postName').value,document.getElementById('salary').value,ftpt,document.getElementById('experi').value,document.getElementById("deadline").value,skill];
    jsoncont.jobpost[id] = newf;
    mainn(jsoncont);
    alert("please dont close the window, your form will be submitted soon!!!");
    setTimeout(()=>{window.close();},5000);
}


function goback(){
    window.close();
}