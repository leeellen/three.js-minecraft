import { useBox } from '@react-three/cannon';
import { useState } from 'react';
import { NearestFilter } from 'three';
import { useStore } from '../hooks/useStore';
import * as textures from '../images/textures';

export default function Cube({ id, pos, texture }) {
    const [ref] = useBox(() => ({
        type: 'Static',
        position: pos,
    }));
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);
    const [isHovered, setIsHovered] = useState(false);

    const activeTexture = textures[texture + 'Texture'];
    activeTexture.magFilter = NearestFilter;

    const onClickCube = (e) => {
        e.stopPropagation();
        const { x, y, z } = ref.current.position;
        const clickedFace = Math.floor(e.faceIndex / 2);

        if (e.altKey) return removeCube(id);
        if (clickedFace === 0) return addCube(x + 1, y, z);
        if (clickedFace === 1) return addCube(x - 1, y, z);
        if (clickedFace === 2) return addCube(x, y + 1, z);
        if (clickedFace === 3) return addCube(x, y - 1, z);
        if (clickedFace === 4) return addCube(x, y, z + 1);
        if (clickedFace === 5) return addCube(x, y, z - 1);
    };

    return (
        <mesh
            ref={ref}
            onClick={onClickCube}
            onPointerMove={(e) => {
                e.stopPropagation();
                setIsHovered(true);
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setIsHovered(false);
            }}
        >
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial
                attach="material"
                map={activeTexture}
                color={isHovered ? 'grey' : 'white'}
                transparent={true}
                opacity={texture === 'glass' ? 0.4 : 1}
            />
        </mesh>
    );
}
