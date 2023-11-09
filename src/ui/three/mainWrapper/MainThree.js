import * as THREE from 'three';
import { useEffect, useRef } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

import wineBottle from '../../../threeProps/items/wineBottle/wineBottle.gltf';
import sodaCan from '../../../threeProps/items/Soda_Can/sodaCan.gltf';
// import microwave from '../../../threeProps/items/microwave/microwave_BI2.gltf';
import gamepad from '../../../threeProps/items/room/gamepad.gltf';

const MainThree = () => {
    const can = useRef();

    useEffect(() => {
        const canvasStyle = window.getComputedStyle(can.current);

        // const random = (min, max) => {
        //     return Math.floor(Math.random() * (max - min + 1)) + min;
        // };

        const sizes = {
            width: +canvasStyle.width.split('p')[0],
            height: +canvasStyle.height.split('p')[0] * 3,
        };
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        camera.position.set(0, 0, 10);
        scene.add(camera);

        const hemiLight = new THREE.HemisphereLight('#ffffff', '#ffffff', 0.6);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        const pointLoght = new THREE.PointLight('white', 100, 100);
        pointLoght.position.set(0, 0, 10);
        pointLoght.castShadow = true;
        scene.add(pointLoght);

        const objGroup = new THREE.Group();
        const gamepadGroup = new THREE.Group();
        const waveGroup = new THREE.Group();
        gamepadGroup.name = 'gamepad';
        waveGroup.name = 'microwave';

        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            new DragControls(objGroup.children, camera, renderer.domElement);
            const gamepadControl = new DragControls(gamepadGroup.children, camera, renderer.domElement);
            const wavedControl = new DragControls(waveGroup.children, camera, renderer.domElement);
            gamepadControl.transformGroup = true;
            wavedControl.transformGroup = true;
        };

        const gltfLoader = new GLTFLoader(manager);

        // gltfLoader.load(wineBottle, (obj) => {
        //     const bottle = obj.scenes[0];
        //     bottle.scale.set(0.2, 0.2, 0.2);
        //     bottle.rotation.set(Math.PI / -2, Math.PI / -20, Math.PI / 24);
        //     bottle.position.set(5, -1.5, 4);
        //     bottle.traverse(child => {
        //         if (child.isMesh) {
        //             child.material.metalness = 0.9;
        //         }
        //     });
        //     bottle.name = 'bottle';
        //     objGroup.add(bottle);
        // });

        gltfLoader.load(sodaCan, (obj) => {
            const sodaCan = obj.scenes[0];
            sodaCan.scale.set(0.2, 0.2, 0.2);
            sodaCan.rotation.set(Math.PI / 1.9, Math.PI / 1.2, Math.PI / 4);
            sodaCan.position.set(3, -2.5, 2);
            sodaCan.name = 'sodacan';
            objGroup.add(sodaCan);
        });

        gltfLoader.load(gamepad, (obj) => {
            const gamepad = obj.scenes[0];
            gamepad.scale.setScalar(2)
            gamepad.rotation.set(Math.PI * 1.2, -6, 4);
            gamepad.position.set(-5, 4, 0);
            gamepad.name = 'gamepad';
            gamepadGroup.add(gamepad);
            scene.add(gamepadGroup)
        });
        // gltfLoader.load(microwave, (obj) => {
        //     const microwave = obj.scenes[0];
        //     microwave.scale.setScalar(0.8)
        //     microwave.rotation.set(0, 0, Math.PI / 16);
        //     microwave.position.set(6, -5, 0);
        //     microwave.name = 'microwave';
        //     waveGroup.add(microwave);
        //     // scene.add(waveGroup);
        // });

        const renderer = new THREE.WebGLRenderer({ canvas: can.current });
        renderer.setClearColor(0xffffff, 0);
        scene.add(objGroup);

        const mouseTolerance = 0.0005;
        const mouseMove = (e) => {
            const centerX = window.innerWidth * 0.5;
            const centerY = window.innerHeight * 0.5;

            camera.position.x = (e.clientX - centerX) * mouseTolerance;
            camera.position.y = (e.clientY - centerY) * mouseTolerance;

            const pointer = new THREE.Vector2();
            pointer.x = (e.clientX / sizes.width) * 2 - 1;
            pointer.y = -((e.clientY / sizes.height) * 2 - 1);

        };

        window.addEventListener('mousemove', mouseMove);
        console.log(scene.children)

        let myReq;
        const tick = () => {
            myReq = window.requestAnimationFrame(tick);
            // const delta = clock.getDelta();
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
        <div className='threeWrapper'>
            <canvas className='canvasThree' ref={can} />
            <div className='canvasTextContainer'>
                <p className='canvasText'>
                    Усилиями маркетологов цена товара может существенно отличаться в ту или иную сторону в зависимости
                    от дня недели, месяца и времени года.

                    Благодаря простейшему трекеру цены можно получить уведомление о изменении цены и совершить покупку
                    по подходящей для вас цене.
                </p>
            </div>
        </div>
    )
};

export default MainThree;