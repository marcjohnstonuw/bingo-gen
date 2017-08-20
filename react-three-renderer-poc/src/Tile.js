import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class Tile extends React.Component {
  render() {
    let position = {
      x: this.props.x * Tile.width + (Math.abs(this.props.z) % 2 === 1 ? Tile.width/2 : 0), //+ (Math.abs(this.props.x) % 2 === 1 ? Tile.width / 2 : 0)
      y: this.props.y * 10,
      z: this.props.z * Tile.width / 2,
    }


    return (
      <group>
        <mesh position={new THREE.Vector3(position.x, position.y, position.z)}
          castShadow={true}
          receiveShadow={true}>
          <cylinderGeometry
            radiusTop={10}
            radiusBottom={10}
            radialSegments={6}
            height={this.props.h * 10}
          />

          <meshLambertMaterial
            color={0x00ff00}
            shading={THREE.SmoothShading}
          />
        </mesh>
      </group>)
  }
}
Tile.width = 8.66 * 2;
/*<mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
        */
Tile.propTypes = {

}

export default Tile