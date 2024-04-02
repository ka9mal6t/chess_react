import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import MessageComponent from "../modal/MessageComponent";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    timerStop: boolean;
    setTimerStop: (stop: boolean) => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, timerStop, setTimerStop}) => {
    const [blackTime, setBlackTime] = useState(600);
    const [whiteTime, setWhiteTime] = useState(600);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [messageModal, setMessageModal] = useState<string | null>(null);
    const [resultModal, setResultModal] = useState<boolean>(true);
    const [modalShown, setModalShown] = useState<boolean>(false);

    useEffect(() =>{
        startTimer()
    }, [currentPlayer]);
    function startTimer() {
        if(timer.current){
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;

        timer.current = setInterval(callback, 1000);
    }
    function decrementBlackTimer() {
        if(!timerStop) {
            setBlackTime(prev => {
            const updatedTime = prev > 0 ? prev - 1 : prev;
            if (updatedTime === 0 && resultModal && !modalShown) {
                setModalShown(true);
                setMessageModal('White is win');
            }
            return updatedTime;
        });
        }
    }
    function decrementWhiteTimer() {
        if(!timerStop) {
            setWhiteTime(prev => {
                const updatedTime = prev > 0 ? prev - 1 : prev;
                if (updatedTime === 0 && resultModal && !modalShown) {
                    setModalShown(true);
                    setMessageModal('Black is win');
                }
                return updatedTime;
            });
        }

    }
    const handleRestart = () => {
        setWhiteTime(600);
        setBlackTime(600);
        setMessageModal(null);
        setTimerStop(false);
        setModalShown(false);
        setResultModal(true);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart</button>
            </div>
            <h2>Black - {Math.floor(blackTime / 60)}m {blackTime % 60}s</h2>
            <h2>White - {Math.floor(whiteTime / 60)}m {whiteTime % 60}s</h2>
            {modalShown && resultModal && (
                <MessageComponent
                    isOpen={modalShown}
                    handleClose={() => {
                        setResultModal(false);
                        setModalShown(false);
                        setTimerStop(true);
                    }
                }
                    message={messageModal}
                />
            )}
            {/* Блокировка интерактивных элементов при открытом модальном окне */}
            {modalShown && resultModal && <div className="overlay" />}
        </div>
    );
};

export default Timer;