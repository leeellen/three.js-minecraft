import create from 'zustand';
import { nanoid } from 'nanoid';

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [],
    addCube: (x, y, z) => {
        set((prev) => ({ cubes: [...prev.cubes, { key: nanoid(), texture: prev.texture, pos: [x, y, z] }] }));
    },
    removeCube: (id) => {
        set((prev) => ({
            cubes: prev.cubes.filter((c) => c.key !== id),
        }));
    },
    setTexture: (texture) => {
        set(() => ({ texture }));
    },
    saveWorld: () => {},
    resetWorld: () => {},
}));
