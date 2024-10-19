
function startSearch() {
    // get main elements
    const input = document.querySelector(".search-input");
    const btnListen = document.querySelector(".mic-button");
    let listening = false;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  
    // if there's speech recognition, show the microphone
    if (SpeechRecognition) {
   setTimeout(function () {
         btnListen.classList.add("show");
       }, 1000);
      console.log("listening");
    }
  
    // show/hide placeholder
    
  
    // listen to speech
    btnListen.addEventListener("click", function () {
        btnListen.classList.add("listening");

      if (!listening) {
        
        const recognition = new SpeechRecognition();
  
        recognition.onstart = function () {
           btnListen.classList.add("listening");
          listening = true;
        };
  
        recognition.onspeechend = function () {
          recognition.stop();
          btnListen.classList.remove("listening");
          listening = false;
        };
  
        recognition.onerror = function () {
          btnListen.classList.remove("listening");
          listening = false;
        };
  
        recognition.onresult = function (event) {
          const transcript = event.results[0][0].transcript;
          const confidence = event.results[0][0].confidence;
  
          input.value = transcript;
          console.log(transcript);
          input.focus();
        };
  
        recognition.start();
      }
    });
  }
  
  // ... (keep existing code) ...

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  const confidence = event.results[0][0].confidence;

  input.value = transcript;
  console.log(transcript);
  input.focus();

  // Check for skill or role keywords
  const skills = ["javascript", "python", "react", "node.js"]; // Add more skills
  const roles = ["developer", "designer", "data scientist"]; // Add more roles

  skills.forEach(skill => {
    if (transcript.includes(skill)) {
      addSkillFilter(skill);
    }
  });

  roles.forEach(role => {
    if (transcript.includes(role)) {
      document.getElementById("role-filter").value = role;
      currentFilters.role = role;
      renderProfiles();
    }
  });
};

// ... (keep existing code) ...
  startSearch();
  
  