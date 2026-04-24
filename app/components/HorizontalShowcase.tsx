"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const items = [
  { image: "/images/gallery/gallery-7.webp", title: "Live Energy" },
  { image: "/images/gallery/gallery-18.webp", title: "Luxury Moments" },
  { image: "/images/gallery/gallery-24.webp", title: "Stage Presence" },
  { image: "/images/gallery/gallery-31.webp", title: "Immersive Nights" },
  { image: "/images/gallery/gallery-36.webp", title: "Signature Style" },
  { image: "/images/gallery/gallery-40.webp", title: "Unforgettable" },
];

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !canvasWrapRef.current) return;

    const wrap = canvasWrapRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);

    const camera = new THREE.PerspectiveCamera(45, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    wrap.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const pinkLight = new THREE.PointLight(0xf3377f, 3.2, 28);
    pinkLight.position.set(0, 0.8, 8);
    scene.add(pinkLight);

    const loader = new THREE.TextureLoader();
    const group = new THREE.Group();
    scene.add(group);

    const meshes: THREE.Mesh[] = [];
    const spacing = 4.8;
    const baseY = [0.38, -0.25, 0.32, -0.3, 0.22, -0.2];

    items.forEach((item, idx) => {
      const texture = loader.load(item.image);
      texture.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.PlaneGeometry(3.6, 5);
      const mat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.75, metalness: 0.06 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(idx * spacing, baseY[idx % baseY.length], idx % 2 === 0 ? 0 : -0.45);
      mesh.rotation.z = idx % 2 === 0 ? -0.06 : 0.06;
      group.add(mesh);
      meshes.push(mesh);
    });

    let scrollProgress = 0;
    const pointer = { x: 0, y: 0 };

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const updateScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const travelled = -rect.top;
      scrollProgress = total > 0 ? clamp01(travelled / total) : 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!canvasWrapRef.current) return;
      const w = canvasWrapRef.current.clientWidth;
      const h = canvasWrapRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    updateScroll();

    const totalDistance = (items.length - 1) * spacing;
    let raf = 0;
    const tick = (t: number) => {
      const time = t * 0.001;
      group.position.x = -scrollProgress * totalDistance + 1.2;
      camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.05;
      camera.position.y += (-pointer.y * 0.42 - camera.position.y) * 0.05;

      meshes.forEach((mesh, idx) => {
        mesh.position.y = baseY[idx % baseY.length] + Math.sin(time * 1.1 + idx) * 0.07;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material;
        mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === wrap) wrap.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hshow-shell">
      <div className="hshow-sticky">
        <div className="container">
          <p className="eyebrow">SCROLL TO EXPLORE</p>
          <h2>SHOW MOMENTS</h2>
        </div>
        <div className="hshow-canvas-wrap" ref={canvasWrapRef} />
      </div>
    </section>
  );
}
