import React, { useEffect } from "react";
import "./Hover.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import moonImage from "../../images/moon.jpg";
// import venusImage from "../../images/venus.jpg";
import spaceImage from "../../images/space.jpg";
import pimage from "../../images/pimage.jpg";
// import {Typography} from "@mui/material";
// import TimeLine from "../TimeLine/TimeLine";

const Home = () => {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const spaceTexture = textureLoader.load(spaceImage);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    const pointLight = new THREE.PointLight(0xffffff, 0.2);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.1);

    const canvas = document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    // const controls = new OrbitControls(camera, renderer.domElement);

    // const moonTexture = textureLoader.load(moonImage);
    // const moonGeometry = new THREE.SphereGeometry(2, 64, 64);
    // const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    // const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    // const venusTexture = textureLoader.load(venusImage);
    // const venusGeometry = new THREE.SphereGeometry(3, 70, 64);
    // const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    // const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    // venus.position.set(8, 5, 5);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(16, 200);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: "white" });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    floor.rotation.x = (3 * Math.PI) / 2;
    floor.position.set(0, -3.5, -97.5);

    // HoverCraft
    const hoverGeometry = new THREE.BoxGeometry(2, 3, 1);
    const hoverMaterial = new THREE.MeshLambertMaterial({ color: "blue" });
    const hover = new THREE.Mesh(hoverGeometry, hoverMaterial);

    hover.rotation.x = (3 * Math.PI) / 2;
    hover.position.set(0, -2.5, 0);

    //left pillars
    var pillarGeometry = [];
    var pillarMaterial = [];
    var pillar = [];

    // right pillars
    var pillarRGeometry = [];
    var pillarRMaterial = [];
    var pillarR = [];

    // left pillar images
    const imageTexture = textureLoader.load(pimage);

    var imageLGeometry = [];
    var imageLMaterial = [];
    var imageL = [];

    // right pillar images
    var imageRGeometry = [];
    var imageRMaterial = [];
    var imageR = [];

    // point lights
    var imageLight = [];
    var imageLightR = [];

    for (let i = 0; i < 20; i++) {
      // left pillar
      pillarGeometry[i] = new THREE.BoxGeometry(2, 7, 5);
      pillarMaterial[i] = new THREE.MeshLambertMaterial({ color: "red" });
      pillar[i] = new THREE.Mesh(pillarGeometry[i], pillarMaterial[i]);
      pillar[i].position.set(-8, 0, -10 * i);

      scene.add(pillar[i]);

      //right pillar
      pillarRGeometry[i] = new THREE.BoxGeometry(2, 7, 5);
      pillarRMaterial[i] = new THREE.MeshLambertMaterial({ color: "red" });
      pillarR[i] = new THREE.Mesh(pillarRGeometry[i], pillarRMaterial[i]);
      pillarR[i].position.set(8, 0, -10 * i);

      scene.add(pillarR[i]);

      //left image
      imageLGeometry[i] = new THREE.PlaneGeometry(2, 3);
      // imageLMaterial[i]=new THREE.MeshBasicMaterial({color:'white'});
      imageLMaterial[i] = new THREE.MeshStandardMaterial({ map: imageTexture });
      imageL[i] = new THREE.Mesh(imageLGeometry[i], imageLMaterial[i]);
      imageL[i].rotation.y = Math.PI / 2;
      imageL[i].position.set(-6.9, 0, -10 * i);

      scene.add(imageL[i]);

      //right image

      imageRGeometry[i] = new THREE.PlaneGeometry(2, 3);
      // imageLMaterial[i]=new THREE.MeshBasicMaterial({color:'white'});
      imageRMaterial[i] = new THREE.MeshBasicMaterial({ map: imageTexture });
      imageR[i] = new THREE.Mesh(imageRGeometry[i], imageRMaterial[i]);
      imageR[i].rotation.y = (3 * Math.PI) / 2;
      imageR[i].position.set(6.9, 0, -10 * i);

      scene.add(imageR[i]);

      //point light
      imageLight[i] = new THREE.SpotLight(0xffffff, 1);
      imageLight[i].position.set(-6, 3, -10 * i);
      scene.add(imageLight[i]);

      imageLight[i].angle = Math.PI / 8;
      imageLight[i].target = imageL[i];

      //point light right
      imageLightR[i] = new THREE.SpotLight(0xffffff, 1);
      imageLightR[i].position.set(6, 3, -10 * i);
      scene.add(imageLightR[i]);

      imageLightR[i].angle = Math.PI / 8;
      imageLightR[i].target = imageR[i];
    }

    const targetPosition = new THREE.Vector3(0, 0, -210); // Example target position at (0, 0, 0)

    // Point the camera towards the target position
    camera.lookAt(targetPosition);

    camera.position.set(0, 0, 10);
    pointLight.position.set(8, 5, 0);
    pointLight2.position.set(-8, -5, 0);

    // scene.add(moon);
    // scene.add(venus);
    // scene.add(pillar);
    scene.add(hover);
    scene.add(floor);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.background = spaceTexture;

    // const constSpeed = 0.01;
    window.addEventListener("wheel", (e) => {
      // console.log(e.deltaY,e.deltaX);
      camera.position.z += (-1 * e.deltaY) / 100;
      hover.position.z += (-1 * e.deltaY) / 100;
      console.log(camera.position.z);
      // if (true) {
      //   moon.rotation.x -= constSpeed;
      //   moon.rotation.y += constSpeed;
      //   venus.rotation.x -= constSpeed;
      //   venus.rotation.y += constSpeed;
      // }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      //   moon.rotation.y += 0.001;
      //   venus.rotation.y += 0.001;
      renderer.render(scene, camera);
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    animate();
  }, []);

  return (
    <div className="home">
      <canvas className="homeCanvas"></canvas>
      
      {/* <div class="person-card">
        <img src={pimage} alt="Person's Image" />
        <h2>John Doe</h2>
        <p>Age: 30</p>
        <p>Occupation: Software Engineer</p>
        <p>Location: New York</p>
      </div> */}
    </div>
  );
};

export default Home;
