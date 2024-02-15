import * as THREE from 'three';
import { Box, Sphere, Environment, Lightformer, Tetrahedron, Cone, Wireframe } from '@react-three/drei';
import { EffectComposer, N8AO, DepthOfField, Bloom, Noise, Vignette, Autofocus, } from '@react-three/postprocessing'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, CuboidCollider, AnyCollider } from '@react-three/rapier';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'

const colors = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00', '#4060ff', '#20ffa0', '#ff4060', '#ffcc00'];

function move(speed, mesh, target) {
    console.log(mesh.x, target)
    var d = mesh.x - target;
    if (mesh.x > target) {
        mesh.x -= Math.min(speed, d);
    }
}

function BackLight() {
    // const isLine = false;
    const [line, setLine] = useState(false);
    const upd = () => {
        setLine((prev) => !prev);
        console.log(line)
    }
    return (
        <div id="canvas-container" style={{ width: '100%', height: '450px', position: "absolute", top: "8vh" }}>
            <Canvas onClick={upd} >
                <Physics colliders={false} gravity={[0, 0, 0]}>
                    <Pointer />
                    {colors.map((el, index) => <RigidTetrahedron line={line} color={el} key={index} index={index} />)}
                </Physics>
                <EffectComposer>
                    <Autofocus />
                    <DepthOfField focusDistance={1} focalLength={0.02} bokehScale={1} height={480} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={1} />
                </EffectComposer>
            </Canvas>
        </div>
    )
};

export default BackLight;

function RigidTetrahedron(props) {
    const r = THREE.MathUtils.randFloatSpread;
    const vec = new THREE.Vector3()
    const api = useRef(null);
    const pos = useMemo(() => props.position || [r(10), r(5), r(5)], []);
    useFrame((state, delta) => {
        if (!!props.line) {
            const target = new THREE.Vector3(-7 + props.index * 2, 0, 0);
            const dir = new THREE.Vector3();
            if (api.current.translation().x === target.x) return
            api.current?.applyImpulse(vec.copy(dir.subVectors(target, api.current.translation())).multiplyScalar(5));
            return
        }
        delta = Math.min(0.1, delta);
        api.current?.applyTorqueImpulse({ x: 0, y: 0.05, z: 0 }, true);
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.5))
    })
    return <RigidBody ref={api} colliders={false} position={pos} linearDamping={4} angularDamping={1} friction={0.1} {...props}>
        <Tetrahedron material-color={props.color}  >
            <Wireframe simplify={false} fillOpacity={0.5} stroke={"black"} thickness={0.03} colorBackfaces={false} />
        </Tetrahedron>
        {!props.line && <BallCollider args={[2]} />}
        {props.line && <CuboidCollider args={[1, 1, 1]} />}
    </RigidBody>
};

function RigidSphere(props) {
    const r = THREE.MathUtils.randFloatSpread;
    const vec = new THREE.Vector3()
    const api = useRef(null)
    const pos = useMemo(() => props.position || [r(8), r(8), r(5)], []);
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.2))
    })
    return <RigidBody ref={api} colliders={"ball"} position={pos} linearDamping={4} angularDamping={1} friction={0.1}>
        <Sphere material-color={props.color} />
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