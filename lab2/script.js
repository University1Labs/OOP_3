document.addEventListener("DOMContentLoaded", ()=>{
    
    let audio = new Audio("sound.mp3");

    class Timer{
        constructor(time,status){
            this.time = time;
            this.status = status;
        }
        html(index){
            console.log(this.time);
            let hours = Math.floor(this.time / 3600);
            let minutes = Math.floor(this.time%3600 / 60);
            let seconds = Math.floor(this.time%60);
            if (hours < 10){
                hours = '0' + hours;      
            }
            if (minutes < 10){
                minutes = '0' + minutes;      
            }
            if (seconds < 10){
                seconds = '0' + seconds;      
            }
            console.log(this.status+'!!!');

            let htmlStatus = (this.status == 1)? `<div class="status"><img src="pause.png"></div>`
            : `<div class="status"><img src="play.svg"></div>`
            return `
                <div class="timer" id="${index}">
                    <div class="timer_text">
                        ${hours} : ${minutes} : ${seconds}
                    </div>
                    ${htmlStatus}
                    <div class="delete">
                        <img src="delete.png">
                    </div>
                </div>
            `
        }
    }
    
    const add_btn = document.querySelector('.add');
    const timers = document.querySelector('.timers');
    const inputs = document.querySelectorAll('input');
    const disturb_btn = document.querySelector('.disturb_status');
    const countOfTimersEl = document.querySelector('.count');
    let countOfTimers = 0;
    let disturbStatus = 0;

    let timersArray = [];
    let intervalID = [];
    for (let i = 0;i < 500;i++){
        intervalID.push(0);
    }
    add_btn.addEventListener('click',()=>{
        const time = inputs[0].value*3600+inputs[1].value*60+inputs[2].value*1;
        const timer = new Timer(time,0);
        timersArray.push(timer);
        TimersShow();
        inputs.forEach(input=>{
            input.value="00";
        })
    });
    disturb_btn.addEventListener('click',()=>{
        if (disturb_btn.classList.contains('green')){
            disturb_btn.classList.remove('green');
            disturb_btn.classList.add('red');
            disturbStatus = 1;
        }
        else {
            disturb_btn.classList.remove('red');
            disturb_btn.classList.add('green');
            disturbStatus = 0;
        }
    });
    function TimersShow(){
        timers.innerHTML = "";
        console.log(timersArray);
        let index = -1;
        countOfTimers = 0;
        timersArray.forEach(item=>{
            index++;
            timers.insertAdjacentHTML('beforeend',item.html(index));
            if (item.status == 1){
                countOfTimers++;
            }
        });
        countOfTimersEl.innerHTML = `Кількість активних таймерів: ${countOfTimers}`;
        for (const item of timers.children){
            item.children[2].addEventListener('click',()=>{
                timersArray = timersArray.filter((element,ind)=>{
                  if (item.id != ind){
                    return true;
                  }  
                  return false;
                });
                TimersShow();
            });
            item.children[1].addEventListener('click',()=>{
                timersArray.forEach((element,ind)=>{
                    if (item.id == ind && element.time > 0){
                        element.status = 1-element.status;
                        if (element.status == 1){
                            intervalID[item.id] = setInterval(()=>{
                                element.time = element.time - 1;
                                if (element.time < 0){
                                    element.time = 0;
                                    if (disturbStatus == 0){
                                        audio.play();
                                        alert("Timer" + ' ' + item.id);
                                    }
                                    clearInterval(intervalID[item.id]);
                                    element.status = 0;
                                }
                                TimersShow();
                            },1000);
                        }
                        else {
                            clearInterval(intervalID[item.id]);
                        }
                    }
                })
                  TimersShow();
            });
        }
    }
    TimersShow();
});