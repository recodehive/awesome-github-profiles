[1mdiff --git a/Medical-Website-main/index.html b/Medical-Website-main/index.html[m
[1mindex cc3054f..05099fb 100644[m
[1m--- a/Medical-Website-main/index.html[m
[1m+++ b/Medical-Website-main/index.html[m
[36m@@ -774,7 +774,7 @@[m
 [m
     <footer class="bg-red-500 h-[30vh]">[m
         <!-- <div class="footercolor"> -->[m
[31m-        <section class="footer" id="footer" style="background-color: black ">[m
[32m+[m[32m        <section class="footer" id="footer" style="background-color: rgb(86, 65, 118) ">[m
             <hr> <!-- Horizontal line -->[m
 [m
             <!-- Parent div wrapping all footer content -->[m
[36m@@ -836,7 +836,7 @@[m
 [m
         .footer {[m
             padding: 20px;[m
[31m-            background-color: #FF6F61;[m
[32m+[m[32m            background-color: rgb(86, 65, 118);[m
             /* Ice cream color */[m
             color: white;[m
             width: 100%;[m
[36m@@ -895,22 +895,21 @@[m
             display: flex;[m
             justify-content: center;[m
             font-size: large;[m
[31m-                       [m
[32m+[m[41m           [m
             /* Center align icons */[m
         }[m
 [m
       .footer a{[m
         font-size: 1vw;[m
       }[m
[31m-       .footer .social-icons a {[m
[31m-        font-size: 1.5vw; /* Increase the size as needed */[m
[31m-        margin: 0 4.0rem;[m
[31m-        color: white;[m
[31m-        transition: color 0.3s;[m
[31m-        margin-top: 2vw;[m
[31m-        margin-right: 2vw;[m
[31m-}[m
[31m-[m
[32m+[m[32m        .footer .social-icons a {[m
[32m+[m[32m            margin: 0 10px;[m
[32m+[m[32m            color: white;[m
[32m+[m[32m            transition: color 0.3s;[m
[32m+[m[32m            margin-top: 2vw;[m
[32m+[m[32m            margin-right: 2vw;[m
[32m+[m[41m           [m
[32m+[m[32m        }[m
 [m
         .footer .social-icons a:hover {[m
             color: #ddd;[m
[36m@@ -1027,7 +1026,7 @@[m
     <script>[m
         AOS.init();[m
     </script>[m
[31m-    <footer style="background-color: red;">[m
[32m+[m[32m    <footer style="background-color: rgb(131, 236, 235);">[m
 [m
 [m
 [m
[1mdiff --git a/Medical-Website-main/style.css b/Medical-Website-main/style.css[m
[1mindex f9f94a4..cc19f21 100644[m
[1m--- a/Medical-Website-main/style.css[m
[1m+++ b/Medical-Website-main/style.css[m
[36m@@ -1,764 +1,750 @@[m
[31m-@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');[m
[32m+[m[32m@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");[m
 :root {[m
[31m-    --blue: #4385a9;[m
[32m+[m[32m  --blue: #4385a9;[m
 }[m
 [m
 * {[m
[31m-    margin: 0; [m
[31m-    padding: 0;[m
[31m-    box-sizing: border-box;[m
[31m-    outline: none;[m
[31m-    border: none;[m
[31m-    text-decoration: none;[m
[31m-    text-transform: capitalize;[m
[31m-    transition: .2s linear;[m
[32m+[m[32m  margin: 0;[m
[32m+[m[32m  padding: 0;[m
[32m+[m[32m  box-sizing: border-box;[m
[32m+[m[32m  outline: none;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  text-transform: capitalize;[m
[32m+[m[32m  transition: 0.2s linear;[m
 }[m
 [m
[31m-html{[m
[31m-    font-size: 62.5%;[m
[31m-    scroll-behavior: smooth;[m
[31m-    scroll-padding-top: 6rem;[m
[31m-    overflow-x: hidden;[m
[32m+[m[32mhtml {[m
[32m+[m[32m  font-size: 62.5%;[m
[32m+[m[32m  scroll-behavior: smooth;[m
[32m+[m[32m  scroll-padding-top: 6rem;[m
[32m+[m[32m  overflow-x: hidden;[m
 }[m
 [m
[31m-label{[m
[31m-    position: absolute;[m
[31m-    width: 45px;[m
[31m-    height: 22px;[m
[31m-    right: 20px;[m
[31m-    top: 20px;[m
[31m-    border: 2px solid;[m
[31m-    border-radius: 20px;[m
[32m+[m[32mlabel {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  width: 45px;[m
[32m+[m[32m  height: 22px;[m
[32m+[m[32m  right: 20px;[m
[32m+[m[32m  top: 20px;[m
[32m+[m[32m  border: 2px solid;[m
[32m+[m[32m  border-radius: 20px;[m
 }[m
[31m-label:before{[m
[31m-    position: absolute;[m
[31m-    content: '';[m
[31m-    width:20px;[m
[31m-    height: 20px;[m
[31m-    border-radius: 50%;[m
[31m-    background: #000;[m
[31m-    cursor: pointer;[m
[31m-    transition: 0.4s;[m
[32m+[m[32mlabel:before {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  content: "";[m
[32m+[m[32m  width: 20px;[m
[32m+[m[32m  height: 20px;[m
[32m+[m[32m  border-radius: 50%;[m
[32m+[m[32m  background: #000;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  transition: 0.4s;[m
 }[m
[31m-label.active:before{[m
[31m-    left: 24px;[m
[31m-    background: #fff;[m
[32m+[m[32mlabel.active:before {[m
[32m+[m[32m  left: 24px;[m
[32m+[m[32m  background: #fff;[m
 }[m
 [m
[31m-body.night{[m
[31m-    background: #000;[m
[31m-    color: #fff;[m
[32m+[m[32mbody.night {[m
[32m+[m[32m  background: #000;[m
[32m+[m[32m  color: #fff;[m
 }[m
[31m-body.night .icons-container{[m
[31m-    background: #101010;[m
[31m-    color: #fff;[m
[32m+[m[32mbody.night .icons-container {[m
[32m+[m[32m  background: #101010;[m
[32m+[m[32m  color: #fff;[m
 }[m
 [m
[31m-body.night .bg-boz{[m
[31m-    background: #101010;[m
[31m-    color: #fff;[m
[32m+[m[32mbody.night .bg-boz {[m
[32m+[m[32m  background: #101010;[m
[32m+[m[32m  color: #fff;[m
 }[m
 [m
[31m-body.night header{[m
[31m-    background: #101010;[m
[31m-    color: #fff;[m
[32m+[m[32mbody.night header {[m
[32m+[m[32m  background: #101010;[m
[32m+[m[32m  color: #fff;[m
 }[m
[31m-body.night header a{[m
[31m-    color: #101010;[m
[31m-    color: #fff;[m
[32m+[m[32mbody.night header a {[m
[32m+[m[32m  color: #101010;[m
[32m+[m[32m  color: #fff;[m
 }[m
 [m
[31m-section{[m
[31m-    padding: 2rem 9%;[m
[31m-}[m
[31m-[m
[31m-.heading{[m
[31m-    text-align: center;[m
[31m-    font-size: 4rem;[m
[31m-    color: #333;[m
[31m-    padding: 1rem;[m
[31m-    margin: 2rem 0;[m
[31m-    background: #eee;[m
[31m-}[m
[31m-[m
[31m-.heading span{[m
[31m-    color: var(--blue);[m
[31m-}[m
[31m-[m
[31m-.btn{[m
[31m-    /* display: inline-block; */[m
[31m-    margin-top: 1rem;[m
[31m-    margin-left: 30rem;[m
[31m-    border-radius: 5rem;[m
[31m-    background: #333;[m
[31m-    color: #fff;[m
[31m-    padding: 0.9rem 3.5rem;[m
[31m-    cursor: pointer;[m
[31m-    font-size: 1.7rem;[m
[31m-   [m
[31m-}[m
[31m-[m
[31m-.btn:hover{[m
[31m-    background: var(--blue);[m
[31m-}[m
[31m-[m
[31m-header{[m
[31m-        position: fixed;[m
[31m-        top: 0; left: 0; right: 0;[m
[31m-        width: 100%;[m
[31m-        height: 80px;[m
[31m-        background: rgba(243, 239, 239, 0.8);[m
[31m-        padding: 1rem;[m
[31m-        display: flex;[m
[31m-        align-items: center;[m
[31m-        justify-content: space-between;[m
[31m-        z-index: 1100;[m
[31m-}[m
[31m-[m
[31m-.logo[m
[31m-{[m
[31m-    height:50px;[m
[31m-    margin-left:20px;[m
[31m-}[m
[31m-.logo img[m
[31m-{[m
[31m-    width: 100%;[m
[31m-    height: 100%;[m
[31m-    border:none;[m
[31m-}[m
[31m-#shownav{[m
[31m-    height: 50px;[m
[31m-    width: 50px;[m
[31m-    border: none;[m
[31m-    font-size: 30px;[m
[31m-    cursor: pointer;[m
[31m-    transition: all ease-in-out 0.7s;[m
[31m-}[m
[31m-#shownav img{[m
[31m-    border: none;[m
[31m-}[m
[31m-.navbar, .navbar.sticky{[m
[31m-    position: fixed;[m
[31m-    top: 0;[m
[31m-    right: -100%;[m
[31m-    display: flex;[m
[31m-    flex-direction: column;[m
[31m-    height: 100dvh;[m
[31m-    align-items: center;[m
[31m-    justify-content: space-evenly;[m
[31m-    z-index: 9999;[m
[31m-    transition: right 0.5s ease-in-out;[m
[31m-    background-color: rgba(128, 128, 128, 0.7);[m
[31m-    backdrop-filter: blur(5px);[m
[31m-    border-left: 3px solid black;[m
[32m+[m[32msection {[m
[32m+[m[32m  padding: 2rem 9%;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.heading {[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  font-size: 4rem;[m
[32m+[m[32m  color: #333;[m
[32m+[m[32m  padding: 1rem;[m
[32m+[m[32m  margin: 2rem 0;[m
[32m+[m[32m  background: #eee;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.heading span {[m
[32m+[m[32m  color: var(--blue);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn {[m
[32m+[m[32m  /* display: inline-block; */[m
[32m+[m[32m  margin-top: 1rem;[m
[32m+[m[32m  margin-left: 30rem;[m
[32m+[m[32m  border-radius: 5rem;[m
[32m+[m[32m  background: #333;[m
[32m+[m[32m  color: #fff;[m
[32m+[m[32m  padding: 0.9rem 3.5rem;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  font-size: 1.7rem;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.btn:hover {[m
[32m+[m[32m  background: var(--blue);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mheader {[m
[32m+[m[32m  position: fixed;[m
[32m+[m[32m  top: 0;[m
[32m+[m[32m  left: 0;[m
[32m+[m[32m  right: 0;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  height: 80px;[m
[32m+[m[32m  background: rgba(243, 239, 239, 0.8);[m
[32m+[m[32m  padding: 1rem;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  justify-content: space-between;[m
[32m+[m[32m  z-index: 1100;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.logo {[m
[32m+[m[32m  height: 50px;[m
[32m+[m[32m  margin-left: 20px;[m
[32m+[m[32m}[m
[32m+[m[32m.logo img {[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  height: 100%;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m}[m
[32m+[m[32m#shownav {[m
[32m+[m[32m  height: 50px;[m
[32m+[m[32m  width: 50px;[m
[32m+[m[32m  border: none;[m
[32m+[m[32m  font-size: 30px;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  transition: all ease-in-out 0.7s;[m
[32m+[m[32m}[m
[32m+[m[32m#shownav img {[m
[32m+[m[32m  border: none;[m
[32m+[m[32m}[m
[32m+[m[32m.navbar,[m
[32m+[m[32m.navbar.sticky {[m
[32m+[m[32m  position: fixed;[m
[32m+[m[32m  top: 0;[m
[32m+[m[32m  right: -100%;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-direction: column;[m
[32m+[m[32m  height: 100dvh;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  justify-content: space-evenly;[m
[32m+[m[32m  z-index: 9999;[m
[32m+[m[32m  transition: right 0.5s ease-in-out;[m
[32m+[m[32m  background-color: rgba(128, 128, 128, 0.7);[m
[32m+[m[32m  backdrop-filter: blur(5px);[m
[32m+[m[32m  border-left: 3px solid black;[m
 }[m
 [m
[31m-[m
 .navbar {[m
[31m-    display: flex;[m
[31m-    align-items: center;[m
[31m-    justify-content: space-around;[m
[31m-    padding: 5px 30px;[m
[31m-    flex: 1;[m
[31m-}[m
[31m-[m
[31m-.navbar > a, .navbar > .dropdown {[m
[31m-    flex: 1; [m
[31m-    text-align: center; [m
[31m-}[m
[31m-#hidenav{[m
[31m-    position: absolute;[m
[31m-    cursor: pointer;[m
[31m-    top: 10px;[m
[31m-    left: 20px;[m
[31m-    font-size: 2rem;[m
[31m-    height: 50px;[m
[31m-    width: 50px;[m
[31m-    text-align: center;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  justify-content: space-around;[m
[32m+[m[32m  padding: 5px 30px;[m
[32m+[m[32m  flex: 1;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.navbar > a,[m
[32m+[m[32m.navbar > .dropdown {[m
[32m+[m[32m  flex: 1;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m}[m
[32m+[m[32m#hidenav {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  cursor: pointer;[m
[32m+[m[32m  top: 10px;[m
[32m+[m[32m  left: 20px;[m
[32m+[m[32m  font-size: 2rem;[m
[32m+[m[32m  height: 50px;[m
[32m+[m[32m  width: 50px;[m
[32m+[m[32m  text-align: center;[m
 }[m
[31m-.dark-btn-navbar{[m
[31m-   padding-left: 6em;[m
[31m-   margin-bottom: 5em;[m
[32m+[m[32m.dark-btn-navbar {[m
[32m+[m[32m  padding-left: 6em;[m
[32m+[m[32m  margin-bottom: 5em;[m
 }[m
 [m
[31m-header .navbar a{[m
[31m-    font-size: 2rem;[m
[31m-    padding: 0 1.5rem;[m
[31m-    color: #282727;[m
[31m-    display: flex;[m
[31m-    flex-wrap: nowrap;[m
[31m-[m
[31m-[m
[32m+[m[32mheader .navbar a {[m
[32m+[m[32m  font-size: 2rem;[m
[32m+[m[32m  padding: 0 1.5rem;[m
[32m+[m[32m  color: #282727;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-wrap: nowrap;[m
 }[m
 [m
 .navbar a {[m
[31m-    color: #333;[m
[31m-    padding: 10px 0;[m
[31m-    text-decoration: none;[m
[31m-    font-size: 17px;[m
[32m+[m[32m  color: #333;[m
[32m+[m[32m  padding: 10px 0;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  font-size: 17px;[m
 }[m
 [m
[31m-.navbar a:hover{[m
[31m-    background-color: white;[m
[31m-    color: black;[m
[32m+[m[32m.navbar a:hover {[m
[32m+[m[32m  background-color: white;[m
[32m+[m[32m  color: black;[m
 }[m
 [m
 .dropdown {[m
[31m-    position: relative;[m
[31m-    display: inline-block;[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  display: inline-block;[m
 }[m
 [m
 .dropbtn {[m
[31m-    color: white;[m
[31m-    padding: 10px 15px;[m
[31m-    text-decoration: none;[m
[31m-    [m
[32m+[m[32m  color: white;[m
[32m+[m[32m  padding: 10px 15px;[m
[32m+[m[32m  text-decoration: none;[m
 }[m
 [m
 .dropdown-content {[m
[31m-    display: none;[m
[31m-    position: absolute;[m
[31m-    background-color: rgb(164, 159, 159);[m
[31m-    min-width: 150px;[m
[31m-    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);[m
[31m-    z-index: 1;[m
[32m+[m[32m  display: none;[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  background-color: rgb(164, 159, 159);[m
[32m+[m[32m  min-width: 150px;[m
[32m+[m[32m  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);[m
[32m+[m[32m  z-index: 1;[m
 }[m
 [m
 .dropdown-content a {[m
[31m-    color: black;[m
[31m-    padding: 12px 5px;[m
[31m-    text-decoration: none;[m
[31m-    display: block;[m
[32m+[m[32m  color: black;[m
[32m+[m[32m  padding: 12px 5px;[m
[32m+[m[32m  text-decoration: none;[m
[32m+[m[32m  display: block;[m
 }[m
 [m
 .dropdown-content a:hover {[m
[31m-    background-color: #ddd;[m
[31m-    [m
[32m+[m[32m  background-color: #ddd;[m
 }[m
 [m
 .dropdown:hover .dropdown-content {[m
[31m-    display: block;[m
[32m+[m[32m  display: block;[m
 }[m
 [m
 .dark-btn-navbar {[m
[31m-    margin-left: auto; [m
[32m+[m[32m  margin-left: auto;[m
 }[m
 [m
[31m-[m
 #toggler {[m
[31m-    display: none;[m
[32m+[m[32m  display: none;[m
 }[m
 [m
 .fas.fa-bars {[m
[31m-    display: none;[m
[32m+[m[32m  display: none;[m
 }[m
 [m
[31m-.home{[m
[31m-    /* display: flex; */[m
[31m-    /* align-items: center; */[m
[31m-    min-height: 100vh;[m
[31m-    /* background: url(img/bg-home.png)no-repeat; */[m
[31m-    /* background-size: cover; */[m
[31m-    /* background-position: center; */[m
[31m-    padding: 0;[m
[32m+[m[32m.home {[m
[32m+[m[32m  /* display: flex; */[m
[32m+[m[32m  /* align-items: center; */[m
[32m+[m[32m  min-height: 100vh;[m
[32m+[m[32m  /* background: url(img/bg-home.png)no-repeat; */[m
[32m+[m[32m  /* background-size: cover; */[m
[32m+[m[32m  /* background-position: center; */[m
[32m+[m[32m  padding: 0;[m
 }[m
 [m
[31m-.home .content{[m
[31m-    max-width: 50rem;[m
[31m-    position: absolute;[m
[31m-    z-index: 1;[m
[31m-    top: 50%;[m
[31m-    transform: translateY(-50%);[m
[31m-    left: 10%;[m
[32m+[m[32m.home .content {[m
[32m+[m[32m  max-width: 50rem;[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  z-index: 1;[m
[32m+[m[32m  top: 50%;[m
[32m+[m[32m  transform: translateY(-50%);[m
[32m+[m[32m  left: 10%;[m
 }[m
 [m
[31m-.home .content h3{[m
[31m-    font-size: 5rem;[m
[31m-    color: #ffffff;[m
[31m-    font-weight: bold;[m
[31m-    text-shadow: 0 0 4px #ffffff;[m
[32m+[m[32m.home .content h3 {[m
[32m+[m[32m  font-size: 5rem;[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  font-weight: bold;[m
[32m+[m[32m  text-shadow: 0 0 4px #ffffff;[m
 }[m
 [m
[31m-.home .content span{[m
[31m-    font-size: 3.5rem;[m
[31m-    color: #a7e0ff;[m
[31m-    padding: 1rem 0;[m
[31m-    line-height: 1.5;[m
[32m+[m[32m.home .content span {[m
[32m+[m[32m  font-size: 3.5rem;[m
[32m+[m[32m  color: #a7e0ff;[m
[32m+[m[32m  padding: 1rem 0;[m
[32m+[m[32m  line-height: 1.5;[m
 }[m
 [m
[31m-.home .content p{[m
[31m-    font-size: 1.5rem;[m
[31m-    color: #ffffff;[m
[31m-    padding: 1rem 0;[m
[31m-    line-height: 1.5;[m
[31m-    text-decoration: underline;[m
[31m-    text-decoration-style: solid;[m
[32m+[m[32m.home .content p {[m
[32m+[m[32m  font-size: 1.5rem;[m
[32m+[m[32m  color: #ffffff;[m
[32m+[m[32m  padding: 1rem 0;[m
[32m+[m[32m  line-height: 1.5;[m
[32m+[m[32m  text-decoration: underline;[m
[32m+[m[32m  text-decoration-style: solid;[m
 }[m
 [m
[31m-.about .row{[m
[31m-    display: flow-root;[m
[31m-    align-items: center;[m
[31m-    gap: 2rem;[m
[31m-    /* flex-wrap:nowrap ; */[m
[31m-    padding: 2rem 0;[m
[31m-    padding-bottom: 3rem;[m
[32m+[m[32m.about .row {[m
[32m+[m[32m  display: flow-root;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  gap: 2rem;[m
[32m+[m[32m  /* flex-wrap:nowrap ; */[m
[32m+[m[32m  padding: 2rem 0;[m
[32m+[m[32m  padding-bottom: 3rem;[m
 }[m
 [m
[31m-.about .row .video-container{[m
[31m-    flex: 1 1 40rem;[m
[31m-    position: relative;[m
[32m+[m[32m.about .row .video-container {[m
[32m+[m[32m  flex: 1 1 40rem;[m
[32m+[m[32m  position: relative;[m
 }[m
 [m
[31m-.about .row .video-container video{[m
[31m-    width: 100%;[m
[31m-    border: 1.5rem solid #fffefe;[m
[31m-    border-radius: 0.5rem;[m
[31m-    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);[m
[31m-    height: 100%;[m
[31m-    object-fit: cover;[m
[32m+[m[32m.about .row .video-container video {[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  border: 1.5rem solid #fffefe;[m
[32m+[m[32m  border-radius: 0.5rem;[m
[32m+[m[32m  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);[m
[32m+[m[32m  height: 100%;[m
[32m+[m[32m  object-fit: cover;[m
 }[m
 [m
[31m-.about .row .video-container h3{[m
[31m-    position: absolute;[m
[31m-    top: 50%; transform: translateY(-50%);[m
[31m-    font-size: 3rem;[m
[31m-    background: #fff;[m
[31m-    width: 100%;[m
[31m-    padding: 1rem 2rem;[m
[31m-    text-align: center;[m
[31m-    mix-blend-mode: screen;[m
[32m+[m[32m.about .row .video-container h3 {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  top: 50%;[m
[32m+[m[32m  transform: translateY(-50%);[m
[32m+[m[32m  font-size: 3rem;[m
[32m+[m[32m  background: #fff;[m
[32m+[m[32m  width: 100%;[m
[32m+[m[32m  padding: 1rem 2rem;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  mix-blend-mode: screen;[m
 }[m
 [m
[31m-.about .row .content{[m
[31m-    flex:1 1 40rem;[m
[32m+[m[32m.about .row .content {[m
[32m+[m[32m  flex: 1 1 40rem;[m
 }[m
 [m
[31m-.about .row .content h3{[m
[31m-    font-size: 3rem;[m
[31m-    color: #333;[m
[32m+[m[32m.about .row .content h3 {[m
[32m+[m[32m  font-size: 3rem;[m
[32m+[m[32m  color: #333;[m
 }[m
 [m
[31m-.about .row .content p{[m
[31m-    font-size: 1.5rem;[m
[31m-    color: #999;[m
[31m-    padding: 0.5rem 0;[m
[31m-    padding-top: 1rem;[m
[31m-    line-height: 1.5;[m
[32m+[m[32m.about .row .content p {[m
[32m+[m[32m  font-size: 1.5rem;[m
[32m+[m[32m  color: #999;[m
[32m+[m[32m  padding: 0.5rem 0;[m
[32m+[m[32m  padding-top: 1rem;[m
[32m+[m[32m  line-height: 1.5;[m
 }[m
 [m
[31m-.icons-container{[m
[31m-    background: #eee;[m
[31m-    display: flex;[m
[31m-    flex-wrap: wrap;[m
[31m-    gap: 1rem;[m
[31m-    padding-top: 5rem;[m
[31m-    padding-bottom: 5rem;[m
[32m+[m[32m.icons-container {[m
[32m+[m[32m  background: #eee;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  flex-wrap: wrap;[m
[32m+[m[32m  gap: 1rem;[m
[32m+[m[32m  padding-top: 5rem;[m
[32m+[m[32m  padding-bottom: 5rem;[m
 }[m
 [m
[31m-.icons-container .icons{[m
[31m-    background: #fff;[m
[31m-    border: 0.1rem solid rgba(0,0,0,0.1);[m
[31m-    padding: 2rem;[m
[31m-    display: flex;[m
[31m-    align-items: center;[m
[31m-    flex: 1 1 25rem;[m
[32m+[m[32m.icons-container .icons {[m
[32m+[m[32m  background: #fff;[m
[32m+[m[32m  border: 0.1rem solid rgba(0, 0, 0, 0.1);[m
[32m+[m[32m  padding: 2rem;[m
[32m+[m[32m  display: flex;[m
[32m+[m[32m  align-items: center;[m
[32m+[m[32m  flex: 1 1 25rem;[m
 }[m
 [m
[31m-.icons-container .icons h3{[m
[31m-    color: #333;[m
[31m-    padding-bottom: 0.5rem;[m
[31m-    font-size: 1.5rem;[m
[32m+[m[32m.icons-container .icons h3 {[m
[32m+[m[32m  color: #333;[m
[32m+[m[32m  padding-bottom: 0.5rem;[m
[32m+[m[32m  font-size: 1.5rem;[m
 }[m
 [m
[31m-.icons-container .icons span{[m
[31m-    color: #555;[m
[31m-    font-size: 1.3rem;[m
[32m+[m[32m.icons-container .icons span {[m
[32m+[m[32m  color: #555;[m
[32m+[m[32m  font-size: 1.4rem;[m
 }[m
 [m
[31m-ul{[m
[31m-    font-size: 18px;[m
[31m-    font-weight: 600;[m
[31m-    gap: 20px;[m
[31m-    margin-left: 20px;[m
[32m+[m[32mul {[m
[32m+[m[32m  font-size: 18px;[m
[32m+[m[32m  font-weight: 600;[m
[32m+[m[32m  gap: 20px;[m
[32m+[m[32m  margin-left: 20px;[m
 }[m
[31m-ul li .nav-link:hover{[m
[31m-    background: var(--blue);[m
[31m-    color: white;[m
[31m-    border-radius: 30px;[m
[31m-    transition: all 0.5s;[m
[32m+[m[32mul li .nav-link:hover {[m
[32m+[m[32m  background: var(--blue);[m
[32m+[m[32m  color: white;[m
[32m+[m[32m  border-radius: 30px;[m
[32m+[m[32m  transition: all 0.5s;[m
 }[m
[31m-.card-body{[m
[31m-    position: relative;[m
[31m-    max-width: 7;[m
[31m-    font-size: 25px;[m
[31m-    text-align: center;[m
[32m+[m[32m.card-body {[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  max-width: 7;[m
[32m+[m[32m  font-size: 25px;[m
[32m+[m[32m  text-align: center;[m
 }[m
 [m
[31m-.circle{[m
[31m-    position: absolute;[m
[31m-    background-color: var(--blue);[m
[31m-    height: 370px;[m
[31m-    width: 370px;[m
[31m-    top: -20px;[m
[31m-    left: 50px;[m
[31m-    border-radius: 50%;[m
[31m-    opacity: 0.8;  [m
[32m+[m[32m.circle {[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  background-color: var(--blue);[m
[32m+[m[32m  height: 370px;[m
[32m+[m[32m  width: 370px;[m
[32m+[m[32m  top: -20px;[m
[32m+[m[32m  left: 50px;[m
[32m+[m[32m  border-radius: 50%;[m
[32m+[m[32m  opacity: 0.8;[m
 }[m
[31m-.hero{[m
[31m-    position: relative;[m
[31m-    z-index: 1;[m
[32m+[m[32m.hero {[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  z-index: 1;[m
 }[m
 [m
[31m-.py-5 .card-body .card-title{[m
[31m-    font-size: 30px;[m
[32m+[m[32m.py-5 .card-body .card-title {[m
[32m+[m[32m  font-size: 30px;[m
 }[m
[31m-.py-5 .card-body .card-subtitle{[m
[31m-    font-size: 60px;[m
[32m+[m[32m.py-5 .card-body .card-subtitle {[m
[32m+[m[32m  font-size: 60px;[m
 }[m
 .bg-mavi {[m
[31m-    background-color: var(--blue)[m
[32m+[m[32m  background-color: var(--blue);[m
 }[m
 [m
 .bg-goy {[m
[31m-    background-color: #072035;[m
[32m+[m[32m  background-color: #072035;[m
 }[m
 [m
 .bg-boz {[m
[31m-    background-color: #f1f1f1[m
[32m+[m[32m  background-color: #f1f1f1;[m
 }[m
 [m
 .text-mavi {[m
[31m-    color: var(--blue)[m
[32m+[m[32m  color: var(--blue);[m
 }[m
 [m
 .vh-50 {[m
[31m-    min-height: 50vh;[m
[32m+[m[32m  min-height: 50vh;[m
 }[m
 [m
 .features:hover {[m
[31m-    opacity: .5;[m
[32m+[m[32m  opacity: 0.5;[m
 }[m
 [m
 .serviceimgs {[m
[31m-    width: 98%;[m
[31m-    height: 98%;[m
[31m-    border: 2px solid #97aac3;[m
[31m-    border-radius: 20%;[m
[32m+[m[32m  width: 98%;[m
[32m+[m[32m  height: 98%;[m
[32m+[m[32m  border: 2px solid #97aac3;[m
[32m+[m[32m  border-radius: 20%;[m
 }[m
 [m
 .carousel-caption,[m
 .carousel-item {[m
[31m-    height: 200px;[m
[32m+[m[32m  height: 200px;[m
 }[m
 [m
 #bottom-carousel .carousel-indicators button {[m
[31m-    width: 45px !important;[m
[31m-    height: 45px !important;[m
[31m-    border-radius: 50%;[m
[32m+[m[32m  width: 45px !important;[m
[32m+[m[32m  height: 45px !important;[m
[32m+[m[32m  border-radius: 50%;[m
 }[m
 [m
 #bottom-carousel .carousel-indicators button.active {[m
[31m-    width: 50px !important;[m
[31m-    height: 50px !important;[m
[32m+[m[32m  width: 50px !important;[m
[32m+[m[32m  height: 50px !important;[m
 }[m
 [m
 .carousel-inner h6 {[m
[31m-    text-transform: uppercase;[m
[31m-    letter-spacing: .1rem;[m
[32m+[m[32m  text-transform: uppercase;[m
[32m+[m[32m  letter-spacing: 0.1rem;[m
 }[m
 [m
 .carousel-inner p {[m
[31m-    text-transform: uppercase;[m
[31m-    color: rgba(255, 255, 255, 0.7);[m
[32m+[m[32m  text-transform: uppercase;[m
[32m+[m[32m  color: rgba(255, 255, 255, 0.7);[m
 }[m
 [m
 footer p {[m
[31m-    opacity: 0.7;[m
[31m-    font-size: 1.7rem;[m
[31m-    line-height: 30px;[m
[31m-    color: #fff;[m
[31m-    font-weight: 400;[m
[32m+[m[32m  opacity: 0.7;[m
[32m+[m[32m  font-size: 1.7rem;[m
[32m+[m[32m  line-height: 30px;[m
[32m+[m[32m  color: #fff;[m
[32m+[m[32m  font-weight: 400;[m
 }[m
 [m
 footer h5 {[m
[31m-    margin-top: 40px;[m
[31m-    font-size: 4rem;[m
[31m-    color: #fff;[m
[31m-    font-weight: 400;[m
[31m-    font-family: "Roboto";[m
[31m-[m
[32m+[m[32m  margin-top: 40px;[m
[32m+[m[32m  font-size: 5rem;[m
[32m+[m[32m  color: #fff;[m
[32m+[m[32m  font-weight: 400;[m
[32m+[m[32m  font-family: "Roboto";[m
 }[m
 [m
[31m-body.night .mb-2{[m
[31m-    color: #000;[m
[31m-    font-size: small;[m
[31m-    text-align: left;[m
[32m+[m[32mbody.night .mb-2 {[m
[32m+[m[32m  color: #000;[m
[32m+[m[32m  font-size: small;[m
[32m+[m[32m  text-align: left;[m
 }[m
 [m
[31m-body.night .mb-0{[m
[31m-    color: #000;[m
[31m-    font-size: small;[m
[31m-    text-align: left;[m
[32m+[m[32mbody.night .mb-0 {[m
[32m+[m[32m  color: #000;[m
[32m+[m[32m  font-size: small;[m
[32m+[m[32m  text-align: left;[m
 }[m
 [m
[31m-[m
 .bt1 {[m
[31m-    background: url("img/feature-1.jpg") center/cover;[m
[32m+[m[32m  background: url("img/feature-1.jpg") center/cover;[m
 }[m
 [m
 .bt2 {[m
[31m-    background: url("img/feature-2.jpg") center/cover;[m
[32m+[m[32m  background: url("img/feature-2.jpg") center/cover;[m
 }[m
 [m
 .bt3 {[m
[31m-    background: url("img/feature-3.jpg") center/cover;[m
[32m+[m[32m  background: url("img/feature-3.jpg") center/cover;[m
 }[m
 [m
 .bt4 {[m
[31m-    background: url("img/feature-4.jpg") center/cover;[m
[32m+[m[32m  background: url("img/feature-4.jpg") center/cover;[m
 }[m
 [m
 .bt5 {[m
[31m-    background: url("img/feature-5.jpg") center/cover;[m
[32m+[m[32m  background: url("img/feature-5.jpg") center/cover;[m
 }[m
 [m
[31m-[m
[31m-[m
 /*--------------------------------------------------------------[m
 # Services[m
 --------------------------------------------------------------*/[m
 [m
 section {[m
[31m-    padding: 60px 0;[m
[31m-    overflow: hidden;[m
[32m+[m[32m  padding: 60px 0;[m
[32m+[m[32m  overflow: hidden;[m
 }[m
 [m
 .section-title {[m
[31m-    text-align: center;[m
[31m-    padding-bottom: 30px;[m
[31m-  }[m
[31m-  [m
[31m-  .section-title h2 {[m
[31m-    font-size: 32px;[m
[31m-    font-weight: bold;[m
[31m-    margin-bottom: 20px;[m
[31m-    padding-bottom: 20px;[m
[31m-    position: relative;[m
[31m-    color: #2c4964;[m
[31m-  }[m
[31m-  [m
[31m-  .section-title h2::before {[m
[31m-    content: "";[m
[31m-    position: absolute;[m
[31m-    display: block;[m
[31m-    width: 120px;[m
[31m-    height: 1px;[m
[31m-    background: #ddd;[m
[31m-    bottom: 1px;[m
[31m-    left: calc(50% - 60px);[m
[31m-  }[m
[31m-  [m
[31m-  .section-title h2::after {[m
[31m-    content: "";[m
[31m-    position: absolute;[m
[31m-    display: block;[m
[31m-    width: 40px;[m
[31m-    height: 3px;[m
[31m-    background: #1977cc;[m
[31m-    bottom: 0;[m
[31m-    left: calc(50% - 20px);[m
[31m-  }[m
[31m-  [m
[31m-  .section-title p {[m
[31m-    margin-bottom: 0;[m
[31m-  }[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  padding-bottom: 30px;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.section-title h2 {[m
[32m+[m[32m  font-size: 32px;[m
[32m+[m[32m  font-weight: bold;[m
[32m+[m[32m  margin-bottom: 20px;[m
[32m+[m[32m  padding-bottom: 20px;[m
[32m+[m[32m  position: relative;[m
[32m+[m[32m  color: #2c4964;[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.section-title h2::before {[m
[32m+[m[32m  content: "";[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  width: 120px;[m
[32m+[m[32m  height: 1px;[m
[32m+[m[32m  background: #ddd;[m
[32m+[m[32m  bottom: 1px;[m
[32m+[m[32m  left: calc(50% - 60px);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.section-title h2::after {[m
[32m+[m[32m  content: "";[m
[32m+[m[32m  position: absolute;[m
[32m+[m[32m  display: block;[m
[32m+[m[32m  width: 40px;[m
[32m+[m[32m  height: 3px;[m
[32m+[m[32m  background: #1977cc;[m
[32m+[m[32m  bottom: 0;[m
[32m+[m[32m  left: calc(50% - 20px);[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32m.section-title p {[m
[32m+[m[32m  margin-bottom: 0;[m
[32m+[m[32m}[m
 [m
 .services .icon-box {[m
[31m-    text-align: center;[m
[31m-    background: linear-gradient(106deg,#858383,#ffffff);[m
[31m-    border: none;[m
[31m-    padding: 20px 20px 20px 20px;[m
[31m-    transition: all ease-in-out 0.5s;[m
[31m-    width: 95%;[m
[31m-    border-radius: 4%;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box .icon {[m
[31m-    margin: 0 auto;[m
[31m-    width: 140px;[m
[31m-    height: 140px;[m
[31m-    background: #ffffff;[m
[31m-    border-radius: 20%;[m
[31m-    transition: all 0.3s ease-out 0s;[m
[31m-    display: flex;[m
[31m-    align-items: center;[m
[31m-    justify-content: center;[m
[31m-    margin-bottom: 20px;[m
[31m-    transform-style: preserve-3d;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box .icon i {[m
[31m-    color: #fff;[m
[31m-    font-size: 28px;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box .icon::before {[m
[31m-    position: absolute;[m
[31m-    content: "";[m
[31m-    left: -8px;[m
[31m-    top: -8px;[m
[31m-    height: 100%;[m
[31m-    width: 100%;[m
[31m-    background: #badaf7;[m
[31m-    border-radius: 20%;[m
[31m-    transition: all 0.3s ease-out 0s;[m
[31m-    transform: translateZ(-1px);[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box h4 {[m
[31m-    font-weight: 700;[m
[31m-    margin-bottom: 15px;[m
[31m-    font-size: 24px;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box h4 a {[m
[31m-    color: #4b4d4f;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box p {[m
[31m-    line-height: 24px;[m
[31m-    font-size: 18px;[m
[31m-    margin-bottom: 0;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box:hover {[m
[31m-    background: #b9cee1;[m
[31m-    border-color: #7b7b7b;[m
[31m-    transform: scale(1.05);[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box:hover .icon {[m
[31m-    background: #fff;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box:hover .icon i {[m
[31m-    color: #1977cc;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box:hover .icon::before {[m
[31m-    background: #3291e6;[m
[31m-  }[m
[31m-  [m
[31m-  .services .icon-box:hover h4 a,[m
