import React from 'react';
import { Sun } from 'lucide-react';
import { styles } from '../../../styles/index';

interface Props {
    onClick: () => void;
}

const ButtonSun = ({ onClick }: Props) => {
    return (
        <button
            className={`border-solid border-2 border-grey hover:bg-grey bg-black text-yellow w-[2rem] h-[2rem] rounded-md ${styles.flexCenterAll}`}
            onClick={onClick}
        >
            <Sun />
        </button>
    );
};

export default ButtonSun;

