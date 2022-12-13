import { useStore } from '../hooks/useStore';
import Cube from './Cube';

export default function Cubes() {
    const [cubes] = useStore((state) => [state.cubes]);

    return cubes.map(({ key, pos, texture }) => <Cube key={key} id={key} pos={pos} texture={texture} />);
}
