import { TextureLoader } from 'three';
import { dirtImg, grassImg, glassImg, woodImg, logImg } from './images';
import { RepeatWrapping, NearestFilter } from 'three';

const dirtTexture = new TextureLoader().load(dirtImg);
dirtTexture.magFilter = NearestFilter;

const logTexture = new TextureLoader().load(logImg);
logTexture.magFilter = NearestFilter;

const grassTexture = new TextureLoader().load(grassImg);
grassTexture.magFilter = NearestFilter;

const glassTexture = new TextureLoader().load(glassImg);
glassTexture.magFilter = NearestFilter;

const woodTexture = new TextureLoader().load(woodImg);
woodTexture.magFilter = NearestFilter;

const groundTexture = new TextureLoader().load(grassImg);
groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

export { dirtTexture, logTexture, grassTexture, glassTexture, woodTexture, groundTexture };
