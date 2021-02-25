import { useState , useEffect} from 'react';
import styles from '../styles/components/CountDonw.module.css';



let countDonwTimeout: NodeJS.Timeout;

export function CountDonw(){

    const [time, setTime] = useState(30 * 60);

    const [isActive, setIsActive] = useState(false);

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
        setTime(30*60);
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countDonwTimeout = setTimeout(()=>{
                setTime(time -1);
            },1000)
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
            
            
        </div>
    );
}