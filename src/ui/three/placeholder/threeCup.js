import * as THREE from 'three';
import { useEffect, useRef } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import cup from '../../../threeProps/items/mug/nescafe_mug.gltf';

const CupProp = () => {
    const can = useRef();

    useEffect(() => {
        const canvasStyle = window.getComputedStyle(can.current);
        const sizes = {
            width: +canvasStyle.width.split('p')[0],
            height: +canvasStyle.height.split('p')[0] * 3,
        };
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.set(0, 0, 10);
        const controls = new OrbitControls(camera, can.current);
        controls.enablePan = false;
        controls.enableZoom = false;
        scene.add(camera);

        const hemiLight = new THREE.HemisphereLight('#ffffff', '#ffffff', 0.6);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        const pointLoght = new THREE.PointLight('white', 100, 100);
        pointLoght.position.set(0, 0, 10);
        pointLoght.castShadow = true;
        scene.add(pointLoght);

        const objGroup = new THREE.Group();

        const gltfLoader = new GLTFLoader();

        gltfLoader.load(cup, (obj) => {
            const cup = obj.scenes[0];
            cup.scale.setScalar(60);
            cup.rotation.set(Math.PI / 16, Math.PI / 1, Math.PI / 4);
            cup.position.set(-1, -1, 0);
            cup.name = 'sodacan';
            objGroup.add(cup);
        });

        const renderer = new THREE.WebGLRenderer({ canvas: can.current });
        renderer.setClearColor(0xffffff, 0);
        scene.add(objGroup);

        let myReq;
        const tick = () => {
            myReq = window.requestAnimationFrame(tick);
            // const delta = clock.getDelta();
            objGroup.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        tick();

        const resize = () => {
            // Обновляем размеры
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Обновляем соотношение сторон камеры
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Обновляем renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.render(scene, camera);
        }
        resize();
        window.addEventListener('resize', (e) => {
            resize();
        });

        return () => window.cancelAnimationFrame(myReq);
    }, []);
    return (
        <div className='threeWrapperProp'>
            <canvas className='canvasProp' ref={can} />
        </div>
    )
};

export default CupProp;