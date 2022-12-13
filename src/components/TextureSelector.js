import React, { useEffect, useState } from 'react';
import useKeyboard from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';
import * as images from '../images/images';

const urls = Object.values(images);
const textureList = Object.keys(images).map((e, i) => ({ type: e, url: urls[i] }));

export default function TextureSelector() {
    const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
    const { dirt, grass, glass, wood, log } = useKeyboard();

    useEffect(() => {
        onChangeTexture();
    }, [dirt, grass, glass, wood, log]);

    const onChangeTexture = () => {
        if (dirt) return setTexture('dirt');
        if (grass) return setTexture('grass');
        if (glass) return setTexture('glass');
        if (wood) return setTexture('wood');
        if (log) return setTexture('log');
    };

    return (
        <div className="item-list">
            {textureList.map((i) => (
                <div
                    key={i.type}
                    className={`
                item-wrapper active-${activeTexture + 'Img' === i.type}
                `}
                >
                    <img src={i.url} />
                </div>
            ))}
        </div>
    );
}
