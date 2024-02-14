import * as THREE from 'three';
import { Box, Sphere, Environment, Lightformer, Tetrahedron } from '@react-three/drei';
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, CuboidCollider, AnyCollider } from '@react-three/rapier';
import { useRef, useMemo } from 'react';

const colors = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00'];

function BackLight() {
    return (
        <div id="canvas-container" style={{ width: '100%', height: '625px', position: "absolute" }}>
            <Canvas >
                {/* <mesh>
                    <boxGeometry />
                    <meshStandardMaterial />
                </mesh> */}
                <Physics colliders={false} gravity={[0, 0, 0]}>
                    <Pointer />
                    {colors.map((el, index) => <RigidTetrahedron color={el} key={index} />)}
                    {colors.map((el, index) => <RigidTetrahedron color={el} key={index+100} />)}
                </Physics>
            </Canvas>
        </div>
    )
};

export default BackLight;

function RigidSphere(props) {
    const r = THREE.MathUtils.randFloatSpread;
    const vec = new THREE.Vector3()
    const api = useRef()
    const pos = useMemo(() => props.position || [r(8), r(8), r(5)], []);
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    })
    return <RigidBody ref={api} colliders={"ball"} position={pos} linearDamping={4} angularDamping={1} friction={0.1}>
        <Sphere material-color={props.color} />
    </RigidBody>
}

function RigidTetrahedron(props) {
    const r = THREE.MathUtils.randFloatSpread;
    const vec = new THREE.Vector3()
    const api = useRef();
    const pos = useMemo(() => props.position || [r(8), r(5), r(5)], []);
    console.log(props.position);
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    })
    return <RigidBody ref={api} colliders={false} position={pos} linearDamping={4} angularDamping={1} friction={0.1} {...props}>
        <Tetrahedron material-color={props.color} />
        {/* <BallCollider args={[1]} /> */}
        <CuboidCollider args={[1, 1, 1]} />
    </RigidBody>
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
        ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 8, (mouse.y * viewport.height) / 8, 0))
    })
    return (
        <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[0.5]} />
        </RigidBody>
    )
}