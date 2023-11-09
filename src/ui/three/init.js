import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const init = (canvas) => {
	const computes = window.getComputedStyle(canvas);
	const sizes = {
		// width: 800,
		// height: 800,
		width: computes.width,
		height: computes.height,
	};

	console.log(window.getComputedStyle(canvas).width)
	// console.log(canvas)

	const scene = new THREE.Scene();
	// const canvas = document.querySelector('.canvas');
	const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
	scene.add(camera);

	// const controls = new OrbitControls(camera, canvas);
	// console.log(OrbitControls);
	// controls.enableDamping = true;
	// controls.enableZoom = false;
	// controls.enablePan = false;
	// controls.minPolarAngle = 1;
	// controls.maxPolarAngle = 1.5;
	// controls.enableZoom = false;
	// controls.enablePan = false;
	// controls.mouseButtons = {
	// 	LEFT: THREE.MOUSE.ROTATE,
	// 	MIDDLE: THREE.MOUSE.DOLLY,
	// 	RIGHT: THREE.MOUSE.PAN
	// };
	// controls.dispose();

	// console.log(controls)

	// controls.update();

	const controls = false;


	const renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize(sizes.width, sizes.height);
	renderer.render(scene, camera);

	return { sizes, scene, canvas, camera, renderer, controls };
};

export default init;
