import {  createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownContextData{
    minutes:number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    startCountDonw:() => void;
    resetCountDonw:() => void;
}
interface CountDownProviderProps{
    children:ReactNode;
}
export const CountDownContext = createContext({} as CountDownContextData);

let countDonwTimeout: NodeJS.Timeout;

export function CountDownProvider({children}: CountDownProviderProps){

    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    function startCountDonw(){
        setIsActive(true);
    }

    function resetCountDonw(){
        clearTimeout(countDonwTimeout);
        setIsActive(false);
        setTime(25*60);
        setHasFinished(false);
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
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDonw,
            resetCountDonw,
        }}>
            {children}
        </CountDownContext.Provider>
    )
}