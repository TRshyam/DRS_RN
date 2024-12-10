import { Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber/native';
import { useGLTF, OrbitControls } from '@react-three/drei/native';
import modelPath from '../../assets/model.glb';

function Model(props) {
  const { scene } = useGLTF(modelPath) || {};

  if (!scene) return null; // Avoid errors if loading fails

  return <primitive {...props} object={scene} />;
}

function LogCameraPosition() {

  // useFrame(() => {
  //   const { x, y, z } = camera.position;
  //   console.log(`Camera Position -> x: ${x}, y: ${y}, z: ${z}`);
  // });

  return null; // This component only logs the camera position
}

// Define the cameraAxis object
const cameraAxis = {
  x: 13.496820857545245,
  y: 2.974224970377211,
  z: -0.13412446635198547,
};

export default function App() {
  return (
    <Canvas
      camera={{
        position: [cameraAxis.x, cameraAxis.y, cameraAxis.z], // Set the camera position dynamically
        fov: 50,
      }}
    >
      <ambientLight />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls
        minPolarAngle={Math.PI / 4} // Prevent camera from going below y-axis
        maxPolarAngle={Math.PI / 2} // Prevent camera from going too high
      />
      <LogCameraPosition /> {/* Logs the camera position */}
    </Canvas>
  );
}
