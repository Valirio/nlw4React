import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from  '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
const {activeChallenges, resetChallenge} = useContext(ChallengesContext);
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
                        <button type="button" onClick={resetChallenge} className={styles.challengeFailedButton}>Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton}>Completei</button>
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

