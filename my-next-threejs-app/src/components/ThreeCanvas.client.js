import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styles from "./ThreeCanvas.module.css";

export default function ThreeCanvas() {
  const containerRef = useRef();
  const sceneRef = useRef(new THREE.Scene());
  const objectsRef = useRef([]);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(sceneRef.current, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  const createShape = (shapeType) => {
    let geometry;
    if (shapeType === "pyramid") {
      geometry = new THREE.ConeGeometry(1, 1, 4);
    } else {
      geometry = new THREE.SphereGeometry(1, 32, 32);
    }

    const material = new THREE.MeshBasicMaterial({ color: 0x00fff0 });
    const shape = new THREE.Mesh(geometry, material);

    const lastObject = objectsRef.current[objectsRef.current.length - 1];
    if (lastObject) {
      shape.position.x = lastObject.position.x + 2;
    }

    sceneRef.current.add(shape);
    objectsRef.current.push(shape);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <button className={styles.button} onClick={() => createShape("pyramid")}>
        Create Pyramid
      </button>
      <button className={styles.button} onClick={() => createShape("sphere")}>
        Create Sphere
      </button>
    </div>
  );
}
