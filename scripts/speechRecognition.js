
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
  
  startSearch();
  