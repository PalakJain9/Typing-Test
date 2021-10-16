let timer_area = document.getElementById("tim_er");
let total_time = 10;
let btn_wpm = document.getElementById("wpm");
let btn_error = document.getElementById("error");
let btn_accuracy = document.getElementById("accuracy");
let btn_restart = document.getElementById("restart");
let word_area = document.getElementById("comp_input");
let user_type_area = document.getElementById("user_input");
const words = ["gorgeous", "is", "at", "altogether",
        "Display", "engagement", "mercury", "Satellite", "universe",
        "bandwidth", "Bliss", "sunshine", "Volatile", "extravaganza",
        "physics", "mary", "bedroom", "footpath", "stable", "Unicorn",
        "listener", "Barack", "happy", "football", "Christmas", "tomorrow"];
let comp_temp;
let user_temp;
let score_wpm = 0;
let score_error = 0;

timer_area.innerHTML = total_time + "s";

const getRandomWord = (word) => {
    return Math.floor(Math.random() * word.length);
}

const displayWord = () => {
    comp_temp = getRandomWord(words);
    word_area.innerHTML = words[comp_temp];
    /*if (user_temp != undefined) {
        areWordsSame();
    }*/
    //get_user_word();
    //userWord = get_user_word();
    //console.log(userWord);
}

function areWordsSame () {
    console.log(user_temp);
    console.log(words[comp_temp]);
    if (user_temp == words[comp_temp]) {
        score_wpm += 1;
    } else {
        score_error += 1;
    }
    if (total_time != 0) {
        displayWord();
    }
}

const get_user_word = (ele) => {
    if (window.event.key === "Enter") {
        user_temp = ele.value;
        console.log(user_temp);
        areWordsSame();
    }
}

const clear = (ele) => {
    ele.value = '';
}

const typingTest = () => {
    const timeEnd = () => {
        btn_wpm.style.display = "inline-block"; btn_wpm.innerText = "WPM: " + score_wpm;
        btn_error.style.display = "inline-block"; btn_error.innerText = "Errors: " + score_error;
        btn_accuracy.style.display = "inline-block";
        btn_restart.style.display = "block"; btn_restart.innerText = "Restart";
        word_area.style.display = "none"; user_type_area.style.display = "none";

        btn_restart.addEventListener('click', () => {
            window.location.reload();
        });
    }

    const timer = () => {
        if (total_time != 0) {
            total_time = total_time - 1;
            timer_area.innerHTML = total_time + "s";
        } else {
            timeEnd();
        }
    }

    /*const get_user_word = () => {
        let user_word = document.getElementById("user_input")[0].value;
        console.log(user_word);
        //get_user_word();
    }*/

    const startTest = () => {
        btn_restart.style.display = "block";
        btn_restart.innerText = "Start";
        btn_restart.addEventListener('click', () => {
            btn_restart.style.display = "none";
            displayWord();
            setInterval(timer, 1000);
        });
    }
    startTest();
}
typingTest();

