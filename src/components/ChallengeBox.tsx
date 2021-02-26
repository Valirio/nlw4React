import styles from  '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
const hasActiveChallenge = true;

    return (
        <div className={styles.challengeBoxContainer}>
            {hasActiveChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe 400 XP</header>

                    <main>
                        <img src="icons/body.svg"/>
                        <strong>Novo Desafio</strong>
                        <p>Levante e caminhe 3min</p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challengeFailedButton}>Falhei</button>
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

