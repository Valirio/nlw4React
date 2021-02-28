import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){

    const {level} = useContext(ChallengesContext);
    return(
       <div className={styles.profileContainer}>
           <img src="https://www.pngfind.com/pngs/m/468-4689685_career-computer-icons-job-blue-area-png-image.png" alt="Logo"/>
           <div>
               <strong>SR. Sem Descanso</strong>
               <p>
                   <img src="icons/level.svg" alt="level"/>
                   Level {level}
               </p>
           </div>
       </div> 
    );
}