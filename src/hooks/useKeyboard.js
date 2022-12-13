import React, { useCallback, useEffect, useState } from 'react';

function actionByKey(key) {
    const keyActionMap = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right',
        Space: 'jump',
        Digit1: 'dirt',
        Digit2: 'grass',
        Digit3: 'glass',
        Digit4: 'log',
        Digit5: 'wood',
    };

    return keyActionMap[key];
}

export default function useKeyboard() {
    const [actions, setActions] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
    });

    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code);
        action && setActions((prev) => ({ ...prev, [action]: true }));
    }, []);

    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code);
        action && setActions((prev) => ({ ...prev, [action]: false }));
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return actions;
}
