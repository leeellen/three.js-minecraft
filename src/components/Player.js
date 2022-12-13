import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import useKeyboard from '../hooks/useKeyboard';

const JUMP_FORCE = 4;
const SPEED = 4;

export default function Player() {
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({ mass: 1, type: 'Dynamic', position: [0, 1, 0] })); // player 역할
    const { jump, backward, forward, right, left } = useKeyboard();

    const vel = useRef([0, 0, 0]); // 속도

    useEffect(() => {
        // 속도가 변경될때마다 vel ref 업데이트
        api.velocity.subscribe((v) => (vel.current = v));
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]); // 위치

    useEffect(() => {
        // 위치가 변경될때마다 pos ref 업데이트
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);

    useFrame(() => {
        const [x, y, z] = pos.current;
        const [velX, velY, velZ] = vel.current;

        camera.position.copy(new Vector3(x, y, z)); // 위치값 ref를 사용해서 카메라 위치 변경

        const direction = new Vector3();

        const forwardVector = new Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0)); // 앞뒤 이동에 따른 vector 값

        const sideVector = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0); // 양옆 이동에 따른 vector 값

        direction.subVectors(forwardVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

        api.velocity.set(direction.x, velY, direction.z);

        if (jump && Math.abs(velY) < 0.05) {
            api.velocity.set(velX, JUMP_FORCE, velZ);
        }
    });

    return <mesh ref={ref}></mesh>;
}
