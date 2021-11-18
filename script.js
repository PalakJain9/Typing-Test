let timer_area = document.getElementById("tim_er");
let total_time = 60;
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
        "listener", "Barack", "happy", "football", "Christmas", "tomorrow", "paradise"];
let comp_temp;
let user_temp = "";
let score_wpm = 0;
let score_error = 0;
let typed_words = 0;
let total_words = 0;
let last_input = "";
let score_area = document.getElementById("score");

timer_area.innerHTML = total_time + "s";

const getRandomWord = (word) => {
    return Math.floor(Math.random() * word.length);
}

const displayWord = () => {
    total_words += 1;
    comp_temp = getRandomWord(words);
    word_area.innerHTML = words[comp_temp];
}

const areWordsSame = (ele) => {
    /*console.log(user_temp);
    console.log(words[comp_temp]);*/
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
    let index = 0;
    let temp_word = words[comp_temp];
    user_temp = ele.value;
    /*console.log(user_temp);*/
    let temp_str = "";

    if (window.event.key === "Enter" || window.event.keyCode === 13) {
        /*console.log("After enter " + user_temp);*/
        clear(ele);
        areWordsSame(ele);
    } else {
        if (last_input.length > user_temp.length || window.event.key === "Backspace" || window.event.keycode === "8") {
            typed_words -= 1;
        } else { 
            typed_words += 1;
        }
        for (index = 0; index < typed_words; index++) {
            temp_str += temp_word[index];
        }
        if (temp_str == user_temp) {
            ele.style.color = "green";
        } else {
            ele.style.color = "red";
        }
        /*console.log("temp_str=" + temp_str);*/
        last_input = user_temp;
    } 
}

const clear = (type_area) => {
    type_area.value = "";
    typed_words = 0;
    last_input = "";
}

const typingTest = () => {

    const timeEnd = () => {
        let accuracy = 0;
        accuracy = Math.floor((score_wpm/total_words)*100);
        btn_wpm.style.display = "inline-block"; btn_wpm.innerText = score_wpm + " WPM";
        btn_error.style.display = "inline-block"; btn_error.innerText = "Errors: " + score_error;
        btn_accuracy.style.display = "inline-block"; btn_accuracy.innerText = "Accuracy: " + accuracy + "%";
        btn_restart.style.display = "block"; btn_restart.innerText = "RESTART";
        score_area.style.display = "inline-block";
        word_area.style.display = "none"; user_type_area.style.display = "none";
        timer_area.style.display = "none";

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

    const startTest = () => {
        btn_restart.style.display = "block";
        user_type_area.style.display = "none";
        timer_area.style.display = "none";
        btn_restart.innerText = "START";
        score_area.style.display = "none";
        document.getElementById("logo").style.display = "none";
        btn_restart.addEventListener('click', () => {
            btn_restart.style.display = "none";
            timer_area.style.display = "inline-block";
            user_type_area.style.display = "block";
            document.getElementById("logo").style.display = "inline-block";
            document.getElementById("head").style.display = "none";
            displayWord();
            setInterval(timer, 1000);
        });
    }
    startTest();
}
typingTest();