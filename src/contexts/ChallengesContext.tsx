import { match } from 'assert';
import {createContext, ReactNode, useEffect, useState} from 'react';
import challenges from '../../challenges.json';


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
}
interface ChallengesProvaiderProps{
    children:ReactNode;
}

export const ChallengesContext = createContext({}as ChallengesContextData);

export function ChallengesProvaider({ children}:ChallengesProvaiderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenges, setActiveChallenges] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    useEffect(() =>{
        Notification.requestPermission();
    }, []);

    function levelUp(){
        setLevel(level + 1);
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
            }
        }>
            {children}
        </ChallengesContext.Provider>
    );
}