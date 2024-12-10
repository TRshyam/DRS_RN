import React, { Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber/native';
import { useGLTF, OrbitControls } from '@react-three/drei/native';
import modelPath from '../../assets/model.glb'; // Update the path to your model if needed
import { ErrorBoundary } from 'react-error-boundary';

function Model(props) {
  const { scene } = useGLTF(modelPath) || {};

  if (!scene) return null; // Avoid errors if loading fails

  return <primitive {...props} object={scene} />;
}

function DebugCamera() {
  const { camera } = useThree();

  useFrame(() => {
    // Clamp zoom distance (z-axis)
    // if (camera.position.z < 1) camera.position.z = 1;
    // if (camera.position.z > 10) camera.position.z = 10;
    if (camera.position.y < 2) camera.position.y = 2;


    // Optional: Log camera position for debugging
    // console.log(`Camera posi///tion -> x: ${camera.position.x}, y: ${camera.position.y}, z: ${camera.position.z}`);
  });

  return null; // No visible UI
}

function ErrorFallback({ error }) {
  return (
    <div style={{ color: 'red', padding: 20 }}>
      <h3>An error occurred:</h3>
      <pre>{error.message}</pre>
    </div>
  );
}

export default function App() {
  const cameraAxis = {
    x: 13.496820857545245,
    y: 2.974224970377211,
    z: -0.13412446635198547,
  };
  const orbitTarget = [5, 1, 0]; // Change the center of orbit here


  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
          makeDefault // Ensure it binds the controls to the default camera
          minPolarAngle={Math.PI / 4} // Prevent camera from going below y-axis
          maxPolarAngle={Math.PI / 2} // Prevent camera from going too high
          minDistance={1} // Minimum zoom distance
          maxDistance={20} // Maximum zoom distance
          enableZoom={true} // Explicitly enable zooming
          target={orbitTarget} // Set the center position for orbiting
          
        />
        <DebugCamera />
      </Canvas>
    </ErrorBoundary>
  );
}
