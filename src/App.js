import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function App() {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const wallGeometry = new THREE.PlaneGeometry(2, 2);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    scene.add(wall);

    const windowGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    const _window = new THREE.Mesh(windowGeometry, windowMaterial);
    _window.position.set(0, 0, 0.01);
    scene.add(_window);

    const stipple = new Uint8Array([0x00, 0x00, 0x00, 0x80]);

    wall.material.stipple = stipple;

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <div ref={containerRef}></div>;
}
