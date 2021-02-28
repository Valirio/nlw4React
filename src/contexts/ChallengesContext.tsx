import {createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface Challenge{
    type:'body' | 'eye';
    description: string;
    amount:number;
}
interface ChallengesContextData{
    level:number;
    currentExperience:number;
    experienceToNextLevel:number;
    challengesCompleted:number;
    activeChallenges:Challenge;
    levelUp:() => void;
    startNewChallenge:() => void;
    resetChallenge:() => void;
    completeChallenge:() => void;
    closeLevelIpModal:() => void;
}
interface ChallengesProvaiderProps{
    children:ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export const ChallengesContext = createContext({}as ChallengesContextData);

export function ChallengesProvaider({ children, ...rest}:ChallengesProvaiderProps){
    const [level, setLevel] = useState(rest.currentExperience ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.currentExperience ?? 0);

    const [activeChallenges, setActiveChallenges] = useState(null);
    const [isLevelUpModalOpend, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    useEffect(() =>{
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level), {secure: true});
        Cookies.set('currentExperience', String(currentExperience),{secure: true});
        Cookies.set('challengesCompleted', String(challengesCompleted),{secure: true});
    }, [level, currentExperience, challengesCompleted]);

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelIpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];

        setActiveChallenges(challenge);
        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenges(null);
    }

    function completeChallenge(){
        if(!activeChallenges){
            return;
        }

        const {amount} = activeChallenges;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenges(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={
            {
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenges,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelIpModal,
            }
        }>
            {children}
            {isLevelUpModalOpend && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}