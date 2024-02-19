import * as THREE from 'three';
import { Sphere, Tetrahedron, Wireframe } from '@react-three/drei';
import { EffectComposer, DepthOfField, Noise, Vignette, Autofocus, } from '@react-three/postprocessing'
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, ConeCollider } from '@react-three/rapier';
import { useRef, useMemo, useEffect, useState } from 'react';
const colors = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00', '#4060ff', '#20ffa0', '#ff4060', '#ffcc00'];


function BackLight({ isLoggenIn }) {
    const [line, setLine] = useState(false);

    useEffect(() => {
        if (!!isLoggenIn) setLine(true)
    }, [isLoggenIn])

    const upd = () => {
        // setLine((prev) => !prev);
        console.log(line)
    }

    return (
        <div id="canvas-container" style={{
            width: '100%', height: '94vh', position: "absolute", top: "6vh",
        }}>
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
        </div >
    )
};

export default BackLight;
function RigidTetrahedron(props) {
    const r = THREE.MathUtils.randFloatSpread;
    const c = THREE.MathUtils.randFloat;
    const vec = new THREE.Vector3()
    const api = useRef(null);
    const pos = useMemo(() => props.position || [r(10), c(5, 8), r(4)], []);
    useFrame((state, delta) => {
        if (!!props.line) {
            const target = new THREE.Vector3(-7 + props.index * 2, 2, -2);
            const dir = new THREE.Vector3();
            if (api.current.translation().x === target.x) return
            api.current?.applyImpulse(vec.copy(dir.subVectors(target, api.current.translation())).multiplyScalar(1));
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
        {props.line && <ConeCollider args={[1, 1, 1]} />}

    </RigidBody>
};

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
};