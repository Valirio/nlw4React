import { useState , useEffect} from 'react';
import styles from '../styles/components/CountDonw.module.css';
export function CountDonw(){

    const [time, setTime] = useState(30 * 60);

    const [active, setActive] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDonw(){
        setActive(true);
    }

    useEffect(()=>{
        if(active && time > 0){
            setTimeout(()=>{
                setTime(time -1);
            },1000)
        }
    }, [active, time])
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

            <button
                type="button"
                className={styles.countDonwButton}
                onClick={startCountDonw}
            >
                Iniciar Ciclo
            </button>
        </div>
    );
}