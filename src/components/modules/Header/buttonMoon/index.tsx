import React from 'react';
import { Moon } from 'lucide-react';
import { styles } from '../../../styles/index';

interface Props {
    onClick: () => void;
}

const ButtonMoon = ({ onClick }: Props) => {
    return (
        <button className={`border-solid border-2 border-grey bg-grey text-blue rounded-md w-[2rem] h-[2rem] ${styles.flexCenterAll}`} onClick={onClick}>
            <Moon />
        </button>
    );
};

export default ButtonMoon;

