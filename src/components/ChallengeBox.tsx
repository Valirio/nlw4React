import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CoundDownContext';
import styles from  '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
const {activeChallenges, resetChallenge, completeChallenge} = useContext(ChallengesContext);
const {resetCountDonw} = useContext(CountDownContext);

function heandleChallengeSucceeded(){
    completeChallenge();
    resetCountDonw();
}
function heandleChallengeFailed(){
    resetChallenge();
    resetCountDonw();

}
    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenges ? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenges.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenges.type}.svg`}/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenges.description}</p>
                    </main>

                    <footer>
                        <button type="button" onClick={heandleChallengeFailed} className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" onClick={heandleChallengeSucceeded}className={styles.challengeSucceededButton}>Completei</button>
                    </footer>
                </div>
            ):(
                <div className={styles.challengeBoxNotActive}>
                <strong>Finalize o siclo</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance para o próximo nível
                </p>
            </div>
            )}
        </div>
    )
}

