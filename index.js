const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
var repoLength;
var followersLength;
var followingLength;
var starLength;

var name = new Promise (function(resolve, reject){
    resolve(inquirer.prompt([
        {
            name: "color",
            type: "input",
            message: "What is your favorite color?"
        },
        {
            name: "name",
            type: "input",
            message: "What is your name?"
        },
        {
            name: "github",
            type: "input",
            message: "What is your GitHub user name?"
        }
    ]))
})

name.then(function(data){

    const username = data.github;
    var queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`

    axios.get(queryUrl).then(function(res) {
        repoLength = res.data.length
        console.log(repoLength)
    });
    var queryUrl = `https://api.github.com/users/${username}/followers?per_page=100`

    axios.get(queryUrl).then(function(res) {
        followersLength = res.data.length
        console.log(followersLength)
    });
    var queryUrl = `https://api.github.com/users/${username}/following?per_page=100`

    axios.get(queryUrl).then(function(res) {
        followingLength = res.data.length
        console.log(followingLength)
    });
    var queryUrl = `https://api.github.com/users/${username}/starred?per_page=100`

    axios.get(queryUrl).then(function(res) {
        starLength = res.data.length
        console.log(starLength)
    });

    // var element = document.getElementById('element-to-print');
    // html2pdf(element);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
    </head>
    
    <body class="container">
        <div>
            <div class="card">
                <img class="pic" src="https://avatars2.githubusercontent.com/u/55290807?s=460&v=4">
                <h1>My Name is Jeremy Pellow</h1>
                <h2>I am Director of IT at Aucnet Digital Procucts USA</h2>
                <img src="bdgbdgbdgb"><span class="link"><a href="http://www.google.com">Location</a></span>
                <img src="bdgbdgbdgb"><span class="link"><a href="http://github.com/${username}">GitHub</a></span>
                <img src="bdgbdgbdgb"><span class="link"><a href="https://jpellow.github.io/Portv3">Portfolio</a></span>/
    
            </div>
        </div>
        <div class="stats">
            <div class="api">
                <h1>Public Repos</h1>
                <h2>${repoLength}</h2>
            </div>
            <div class="api">
                <h1>Followers</h1>
                <h2>${followersLength}</h2>
            </div>
            <div class="api">
                <h1>GitHub Stars</h1>
                <h2>${starLength}</h2>
            </div>
            <div class="api">
                <h1>Following</h1>
                <h2>${followingLength}</h2>
            </div>
        </div>
    
        <script src="html2pdf.bundle.min.js"></script>
        <script src="es6-promise.auto.min.js"></script>
        <script src="jspdf.min.js"></script>
        <script src="html2canvas.min.js"></script>
        <script src="html2pdf.min.js"></script>
        <script type="text/javascript" src="index.js"></script>
    
    </body>
    
    </html>
`;
console.log(repoLength)

    fs.writeFile('index.html', html, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log('Success!');
    });
})