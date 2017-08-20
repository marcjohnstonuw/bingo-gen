import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import Utils from './Utils';

class Tile extends React.Component {
  setupRef = (mesh) => { 
    this.mesh = mesh; 
    if (mesh) { this.props.registerUUID(mesh.uuid) }
    else { console.log('unmounted') }
  }

  render() {
    let position = {
      x: this.props.x * Tile.width + (Math.abs(this.props.z) % 2 === 1 ? Tile.width / 2 : 0), //+ (Math.abs(this.props.x) % 2 === 1 ? Tile.width / 2 : 0)
      y: this.props.y * 10,
      z: this.props.z * (Tile.width - 2.5),
    }
    let opacity = this.props.type === Utils.TileTypes.HIDDEN ? 
                      (this.props.isHover ? 0.4 : 0.2) :
                      1;
    let isTransparent = this.props.type === Utils.TileTypes.HIDDEN ? true : false;
    let color = Utils.TileColors[this.props.type];
    if (this.props.isHover) { color = Utils.LightenColor(color, 80)}

    return (
        <mesh ref={this.setupRef}
          uuid={this.props.key}
          position={new THREE.Vector3(position.x, position.y, position.z)}
          castShadow={true}
          receiveShadow={true}
        >
          <cylinderGeometry
            radiusTop={10}
            radiusBottom={10}
            radialSegments={6}
            height={this.props.h * 10}
          />

          <meshLambertMaterial
            color={color}
            transparent={isTransparent}
            opacity={opacity}
            shading={THREE.SmoothShading}
          />
        </mesh>
      )
  }
}
Tile.width = 8.66 * 2;

export default Tile