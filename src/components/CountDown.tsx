import { useState , useEffect, useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import {CountDownContext} from '../contexts/CoundDownContext';
import styles from '../styles/components/CountDonw.module.css';



export function CountDonw(){
    const {minutes, seconds, hasFinished, isActive, startCountDonw, resetCountDonw} = useContext(CountDownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
    
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