import React from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import Tile from './Tile';
import Utils from './Utils';

class App extends React.Component {
    constructor(props) {
        super(props);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.
        this.cameraPosition = new THREE.Vector3(0, 80, 0);

        this.state = {
            tiles: Utils.getInitialMap(),
            mouse:  new THREE.Vector2(),
            raycaster: new THREE.Raycaster()
        }

        this._onAnimate = () => {
        };

        this._onDocumentMouseMove = this._onDocumentMouseMove.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousemove', this._onDocumentMouseMove);
        document.addEventListener('click', this._onDocumentMouseMove);
    }
    _onDocumentMouseMove = (event) => {
        let newMouse = new THREE.Vector2(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        );
        let newRaycaster = this.state.raycaster
        newRaycaster.setFromCamera(newMouse, this._camera);
        this.setState({
            mouse: newMouse,
            raycaster: newRaycaster
        });

        let raycastableChildren = this._scene.children.filter((child) => { 
            return typeof child.raycast === 'function' 
        });
        let intersects = newRaycaster.intersectObjects(raycastableChildren, true);

        this.state.tiles.forEach((tile) => { tile.isHover = false })
        if (intersects.length) {
            let objectPicked = this.state.tiles.find((tile) => { return tile.uuid === intersects[0].object.uuid})
            if (objectPicked) {
                objectPicked.isHover = true;
            }
            this.setState({
                tiles: this.state.tiles
            });
        }
    }
    _onDocumenClick = (event) => {
        console.log('click');
    }

    render() {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        let tileObjects = this.state.tiles.map((tile) => {
            return <Tile key={tile.reactKey}
                registerUUID={(uuid) => tile.uuid = uuid}
                raycaster={this.state.raycaster} mouse={this.state.mouse} camera={this._camera}
                isHover={tile.isHover}
                type={tile.type} 
                x={tile.x} y={tile.y} z={tile.z} h={tile.h}
            />
        })

        return (
        <React3
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
            <MyScene sceneRef={(r) => { this._scene = r }}>
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

                    ref={(camera) => { this._camera = camera }}
                />

                {tileObjects}
            </MyScene>
        </React3>);
    }
}

class MyScene extends React.Component {
    render() {
        return (
            <scene ref={this.props.sceneRef}>
                {this.props.children}
            </scene>
        )
    }
}



ReactDOM.render(<App />, document.body);