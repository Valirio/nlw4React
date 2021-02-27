import { useState , useEffect, useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CountDonw.module.css';



let countDonwTimeout: NodeJS.Timeout;

export function CountDonw(){

    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDonw(){
        setIsActive(true);
    }

    function resetCountDonw(){
        clearTimeout(countDonwTimeout);
        setIsActive(false);
        setTime(0.1*60);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countDonwTimeout = setTimeout(()=>{
                setTime(time -1);
            },1000)
        }else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    return(
        <div>
            <div className={styles.countDonwContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                disabled
                type="button"
                className={styles.countDonwButton}
                >
                    Ciclo Terminado
                </button>
            ): (
                <>
                    {isActive ? (
                        <button
                        type="button"
                        className={`${styles.countDonwButton} ${styles.countDonwButtonActive}`}
                        onClick={resetCountDonw}
                        >
                            Abandonar Ciclo
                        </button>
                    ):(
                        <button
                        type="button"
                        className={styles.countDonwButton}
                        onClick={startCountDonw}
                        >
                            Iniciar Ciclo
                        </button>
                    )}
                </>
            )}

            
            
            
        </div>
    );
}