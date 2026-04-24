"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AboutParallaxScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(0.34, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0xf3377f, transparent: true, opacity: 0.55 });
    const group = new THREE.Group();

    for (let i = 0; i < 90; i += 1) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 32, (Math.random() - 0.5) * 22, (Math.random() - 0.5) * 24);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = 0.7 + Math.random() * 0.9;
      mesh.scale.setScalar(scale);
      group.add(mesh);
    }

    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const pointer = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    let raf = 0;
    const tick = () => {
      const scrollY = window.scrollY || 0;
      group.rotation.y += 0.0019;
      group.rotation.x += 0.0008;
      group.position.y = -scrollY * 0.002;
      group.rotation.y += pointer.x * 0.0009;
      group.rotation.x += pointer.y * 0.0007;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="aboutx-scene" ref={mountRef} aria-hidden="true" />;
}
