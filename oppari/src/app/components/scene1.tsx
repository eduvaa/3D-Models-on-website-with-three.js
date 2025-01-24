"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    // Three.js: Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // OrbitControls controls camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;

    // lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    camera.add(light); // add light to the camera (light follows camera)
    scene.add(camera); 
    
    // Loading model
    const loadModel = async (id: string) => {
      try {
        const response = await fetch(`/api/test?id=${id}`);
        if (!response.ok) throw new Error("Failed to load model");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const loader = new GLTFLoader();
        loader.load(
          url,
          (gltf) => {
            scene.add(gltf.scene); // add model to the scene
            gltf.scene.position.set(0, 0, 0); // position for the model
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
          }
        );
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    // load model example
    loadModel("1");

    // Loop for rendering scene
    const renderScene = () => {
      controls.update(); 
      renderer.render(scene, camera); 
      requestAnimationFrame(renderScene); 
    };

    renderScene();

    
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ThreeScene;
