import React, {useRef} from 'react';

const Clock = () => {
        const seconds = useRef()
        const minutes = useRef()
        const hours = useRef()
        setInterval(setClock,1000)
        function setClock(){
                const currentDate = new Date()
                const secondsRatio = currentDate.getSeconds() / 60
                const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
                const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
                setRotation(seconds,secondsRatio)
                setRotation(minutes,minutesRatio)
                setRotation(hours,hoursRatio)
        }
        function setRotation(element,rotationRatio){
                  element.current.style.setProperty('--rotation',rotationRatio * 360)
        }
    return (
        <div className={'clock'}>
            <div ref={hours} className="clock__hand hour"></div>
            <div ref={minutes} className="clock__hand minute"></div>
            <div ref={seconds} className="clock__hand second"></div>
            <div className="clock__number number1">1</div>
            <div className="clock__number number2">2</div>
            <div className="clock__number number3">3</div>
            <div className="clock__number number4">4</div>
            <div className="clock__number number5">5</div>
            <div className="clock__number number6">6</div>
            <div className="clock__number number7">7</div>
            <div className="clock__number number8">8</div>
            <div className="clock__number number9">9</div>
            <div className="clock__number number10">10</div>
            <div className="clock__number number11">11</div>
            <div className="clock__number number12">12</div>
        </div>
    );
};

export default Clock;