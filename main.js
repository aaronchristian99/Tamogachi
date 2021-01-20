window.onload = function() {
    class Tamogachi {
        constructor(petLocation, dataSource) {
            this.petLocation = petLocation;
            this.ownerName = ownerName
            this.initialFood = 60;
            this.metabolismRate = 1000;
            fetch(dataSource)
            .then(response => response.json())
            .then(data => {
                this.petMoodList = data.petMood;
                this.foodList = data.petFood;
                this.petCompliment = data.compliments;
                foodPoints.value = this.initialFood;
            })
            .catch(err => console.log(err));
        }

        resetFood() {
            this.food=this.initialFood;
            foodPoints.value = this.initialFood;
        }

        hatch(ownerName) {
            console.log(this);
            console.log(ownerName);
            console.log("The game has started");
            textArea.value+= "The Game has Started.\r\n";
            this.resetFood();
            this.startMetabolism(ownerName);
        }

        die() {
            clearInterval(this.metabolism);
            let myObj = document.getElementById('tamo').contentDocument;
            let myEye = myObj.getElementById('eye')
            let eyeLid = myObj.getElementById('eyeLid');
            let stravedEyes = myObj.getElementById('starvedEyes');
            let stravedEyesTwo = myObj.getElementById('starvedEyesTwo');
            gsap.to([myEye, eyeLid], {
                opacity: 0,
                duration: .5
            });
            gsap.to(stravedEyes, {
                autoAlpha: 1
            });
            gsap.to(stravedEyesTwo, {
                autoAlpha: 1
            });
            textArea.value+=`Game Over.\r\n`;
            gsap.to(myB5, {
                scale: 1.2,
                repeat: 10,
                yoyo: true
            });
        }

        startMetabolism(ownerName) {
            this.isHappy = false;
            this.isSad = false;
            this.metabolism = setInterval(()=> {
                this.food -=1;
                foodPoints.value = this.food;
                if(this.food>=65 && this.isHappy==false) {
                    this.isHappy = true;
                    console.log(ownerName);
                    this.happyFace(ownerName);
                }
                if(this.food<=20 && this.isSad==false) {
                    this.isSad = true;
                    console.log(ownerName);
                    this.sadFace(ownerName);
                }
                if(this.food<=0){
                    this.die();
                }
            },this.metabolismRate);
        }

        restart(ownerName){
            clearInterval(this.metabolism);
            console.log("Game Restart");
            textArea.value+= "Restarting the Game.\r\n";
            this.metabolismRate = 1000
            this.hatch(ownerName);
            let myObj = document.getElementById('tamo').contentDocument;
            let myEye = myObj.getElementById('eye')
            let eyeLid = myObj.getElementById('eyeLid');
            let stravedEyes = myObj.getElementById('starvedEyes');
            let stravedEyesTwo = myObj.getElementById('starvedEyesTwo');
            gsap.to([myEye, eyeLid], {
                opacity: 1,
                duration: .5
            });
            gsap.to(stravedEyes, {
                autoAlpha: 0
            });
            gsap.to(stravedEyesTwo, {
                autoAlpha: 0
            });
            gsap.set(myB5, {
                scale: 1,
                repeat: 0
                // yoyo: true
            });
        }

        resetGame() {
            myB5 = document.getElementById('btn5');
            myB5.classList.add('start');
            myB5.classList.remove('restart');
            b5 = myB5.contentDocument.getElementById("start");
            gsap.to(b5, {
                autoAlpha: 1,
                duration: 0.5
            });
            b5 = myB5.contentDocument.getElementById("restart");
            gsap.to(b5, {
                autoAlpha: 0,
                duration: 0.5
            });
            clearInterval(this.metabolism);
            this.resetFood();
        }

        randomFood() {
            console.log(this.foodList);
            let getRandomFood = this.foodList[Math.floor(this.foodList.length*Math.random())];
            textArea.value += `The pet ate ${getRandomFood.food}.`
            if(getRandomFood.foodChance < 0.3) {
                textArea.value += `ChunChunmaru is feeling sick and lost ${getRandomFood.foodPoints}.\r\n`;
                this.food -= getRandomFood.foodPoints;
                foodPoints.value = this.food;
            }
            else {
                textArea.value += `ChunChunmaru is feeling great and gained ${getRandomFood.foodPoints}.\r\n`;
                this.food += getRandomFood.foodPoints;
                foodPoints.value = this.food;
            }
            this.isHappy = false;
            this.isSad = false;
        }

        drinkCoffee(ownerName) {
            clearInterval(this.metabolism);
            this.metabolismRate = 500;
            textArea.value+= `ChunChunmaru drank coffee so he is very active.\r\n`;
            console.log(ownerName);
            this.startMetabolism(ownerName);
        }

        drinkBeer(ownerName) {
            clearInterval(this.metabolism);
            this.metabolismRate = 1500;
            console.log(this.metabolismRate);
            textArea.value+= `ChunChunmaru drank beer so the he is not active.\r\n`;
            console.log(ownerName);
            this.startMetabolism(ownerName);
        }

        giveCompliments(ownerName) {
            this.ownerName = ownerName;
            let compliment = this.petCompliment[Math.floor(Math.random()*this.petCompliment.length)];
            console.log(compliment);
            console.log(this.ownerName);
            textArea.value += `${compliment.replace("Owner", this.ownerName)}.\r\n`;
        }

        movingMouth() {
            gsap.to(myMouth, {
                y: 10,
                repeat: 2,
                yoyo: true,
                delay: 1
            });
        }

        stopMovingMouth() {
            gsap.to(myMouth, {
                delay: 0.5,
                y: 0,
                onComplete: () => {this.resetFace();}
            });
        }

        resetFace() {
            let myEye = myObj.getElementById("eye");
            gsap.to(myMouth, {
                attr: {
                    d: orgPath
                },
                fill: "none",
                ease: "power2",
                duration: 1,
                delay: 1
            });
            gsap.to(myEye, {
                cx: 387.08,
                cy: 339.16,
                rx: 15.71,
                ry: 17.46,
                ease: "power4"
            });
        }

        happyFace(ownerName) {
            this.ownerName = ownerName;
            let newPath = "M358.6,396.17c21.34,19.52,41.45,17.83,60.53,0"
            gsap.to(myMouth, {
                attr: {
                    d: newPath
                },
                ease: "power2",
                duration: 1
            });
            let happyPhrase = this.petMoodList.filter(moodValue=>moodValue.mood=="Happy");
            let randomPhrase = happyPhrase[Math.floor(Math.random()*happyPhrase.length)];
            textArea.value+=`${randomPhrase.moodPhrase.replace("Owner", ownerName)}\r\n`;
            this.movingMouth();
            this.stopMovingMouth();
        }

        sadFace(ownerName) {
            this.ownerName = ownerName;
            let newPath = "M358.6,396.17c22.24-20.73,42.18-18.3,60.53,0"
            gsap.to(myMouth, {
                attr: {
                    d: newPath
                },
                ease: "power2",
                duration: 1
            });
            let sadPhrase = this.petMoodList.filter(moodValue=>moodValue.mood=="Sad");
            let randomPhrase = sadPhrase[Math.floor(Math.random()*sadPhrase.length)];
            console.log(randomPhrase.moodPhrase);
            textArea.value+=`${randomPhrase.moodPhrase.replace("Owner", ownerName)}\r\n`;
            this.movingMouth();
            this.stopMovingMouth();
        }

        angryFace(ownerName) {
            let newPath = "M358.6,396.17c22.24-20.73,67.49-21.41,60.53,0";
            let myEye = myObj.getElementById("eye");
            gsap.to(myMouth, {
                attr: {
                    d: newPath
                },
                ease: "power2",
                duration: 1
            });
            gsap.to(myEye, {
                cx: 380.48,
                cy: 335.96,
                rx: 11.44,
                ry: 12.17,
                ease: "power4",
                duration: 0.5
            });
            this.ownerName = ownerName;
            let angryPhrase = this.petMoodList.filter(moodValue=>moodValue.mood=="Angry");
            let randomPhrase = angryPhrase[Math.floor(Math.random()*angryPhrase.length)];
            console.log(randomPhrase.moodPhrase);
            textArea.value+=`${randomPhrase.moodPhrase.replace("Owner", ownerName)}\r\n`;
            this.movingMouth();
            this.stopMovingMouth();
        }

        jokeyFace(ownerName) {
            let newPath = "M358.6,396.17c23.26,51.69,43.19,49.71,60.53,0";
            gsap.to(myMouth, {
                attr: {
                    d: newPath
                },
                ease: "power2",
                duration: 1
            });
            this.ownerName = ownerName;
            let jokeyPhrase = this.petMoodList.filter(moodValue=>moodValue.mood=="Jokey");
            let randomPhrase = jokeyPhrase[Math.floor(Math.random()*jokeyPhrase.length)];
            console.log(randomPhrase.moodPhrase);
            textArea.value+=`${randomPhrase.moodPhrase.replace("Owner", ownerName)}\r\n`;
            this.movingMouth();
            this.stopMovingMouth();
        }
    }

    let ownerName = document.querySelector("#name");
    let submit = document.querySelector("#submit");
    let textArea = document.querySelector("#gameActions");
    let foodPoints = document.querySelector("#foodPoints");
    textArea.value = " ";
    submit.addEventListener("click", function() {
        textArea.value += `Hello, master ${ownerName.value}. My name is ChunChunMaru.\r\n`;
    });
    let chunchunmaru = new Tamogachi(document.querySelector("#tamo"), "data.json");
    let myB1 = document.getElementById('btn1').contentDocument;
    let myB2 = document.getElementById('btn2').contentDocument;
    let myB3 = document.getElementById('btn3').contentDocument;
    let myB4 = document.getElementById('btn4').contentDocument;
    let myB5 = document.getElementById('btn5').contentDocument;
    let myB6 = document.getElementById('btn6').contentDocument;
    let myB7 = document.getElementById('btn7').contentDocument;
    let myB8 = document.getElementById('btn8').contentDocument;
    let myB9 = document.getElementById('btn9').contentDocument;
    let myB10 = document.getElementById('btn10').contentDocument;
    let myObj = document.getElementById('tamo').contentDocument;
    // reference specific target

    let b1 = myB1.getElementById("happy");
    let b2 = myB2.getElementById("sad");
    let b3 = myB3.getElementById("angry");
    let b4 = myB4.getElementById("jokey");
    let b5 = myB5.getElementById("start");
    let b6 = myB6.getElementById("reset");
    let b7 = myB7.getElementById("drinkCoffee");
    let b8 = myB8.getElementById("drinkBeer");
    let b9 = myB9.getElementById("compliment");
    let b10 = myB10.getElementById("eatFood");

    // reference visual mouth
    let myMouth = myObj.getElementById('mouth');
    // store original path
    let orgPath = "M358.6,396.17c20.08,6.25,40.27,5.48,60.53,0";
    // new Path
    let newPath = "";
    // Set to reveal a specific layer
    let btnArray = [b1,b2,b3,b4,b5,b6,b7,b8,b9,b10];
    gsap.set(btnArray, {
        autoAlpha: 1
    });

    // myB6.style.display = "none";

    myB1.addEventListener("click", () => {
        chunchunmaru.resetFace();
        chunchunmaru.happyFace(ownerName.value);
    });

    myB2.addEventListener("click", () => {
        // chunchunmaru.resetFace();
        chunchunmaru.sadFace(ownerName.value);
    });

    myB3.addEventListener("click", () => {
        chunchunmaru.resetFace();
        chunchunmaru.angryFace(ownerName.value);
    });

    myB4.addEventListener("click", () => {
        chunchunmaru.resetFace();
        chunchunmaru.jokeyFace(ownerName.value);
    });

    myB5.addEventListener("click", () => {
        myB5 = document.getElementById('btn5');
        if(myB5.classList.contains('start')) {
            chunchunmaru.hatch(ownerName.value);
            myB5.classList.add('restart');
            myB5.classList.remove('start');
            b5 = myB5.contentDocument.getElementById("start");
            gsap.to(b5, {
                autoAlpha: 0
            });
            b5 = myB5.contentDocument.getElementById("restart");
            gsap.to(b5, {
                autoAlpha: 1
            });
        }
        else {
            chunchunmaru.restart(ownerName.value);
        }
    });

    myB6.addEventListener("click", () => {
        chunchunmaru.resetGame(ownerName.value);
        textArea.value =` `;
        ownerName.value = " ";
    });

    myB7.addEventListener("click", () => {
        chunchunmaru.drinkCoffee(ownerName.value);
    });

    myB8.addEventListener("click", () => {
        chunchunmaru.drinkBeer(ownerName.value);
    });

    myB9.addEventListener("click", () => {
        chunchunmaru.giveCompliments(ownerName.value);
    });

    myB10.addEventListener("click", () => {
        chunchunmaru.randomFood();
    });
}