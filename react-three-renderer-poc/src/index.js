import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import Tile from './Tile'

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 250, 50);

    this.tiles = [
        // {x: -1, z: -1, y: 0, h: 2},
        // {x: -1, z: 0, y: 0, h: 8},
        // {x: -1, z: 1, y: 0, h: 4},
        // {x: 0, z: -1, y: 0, h: 5},
        {x: 0, z: 0, y: 0, h: 7},
        {x: 0, z: 1, y: 0, h: 3},
        // {x: 1, z: -1, y: 0, h: 5},
        // {x: 1, z: 0, y: 0, h: 7},
        // {x: 1, z: 1, y: 0, h: 6},
    ]

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
    };
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      shadowMapEnabled={true}
      shadowMapType={THREE.PCFSoftShadowMap}
      antialias={true}
      gammaInput={true}
      gammaOutput={true}

      onAnimate={this._onAnimate}
    >
      <MyScene>
         <pointLight 
                position={new THREE.Vector3(-50, 150, 0)} 
                color={0xffffff}
                castShadow={true}
                shadowDarkness={0.5} 
        >
        </pointLight> 
        <ambientLight color={0x404040} intensity={1}></ambientLight>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
          lookAt={new THREE.Vector3(0, 0, 0)} 
        />
        
        {this.tiles.map((tile) => {
            return <Tile x={tile.x} y={tile.y} z={tile.z} h={tile.h} />
        })}
      </MyScene>
    </React3>);
  }
}

class MyScene extends React.Component {
  render () {
    return (
      <scene ref={(r) => {this.scene = r; console.log(r) }}>
        {this.props.children}
        </scene>
    )
  }
}

ReactDOM.render(<Simple/>, document.body);

// registerServiceWorker();
