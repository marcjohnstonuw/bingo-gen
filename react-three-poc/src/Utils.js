import Guid from 'guid';

var tileTypes = {
    HIDDEN: 'Hidden',
    FORREST: 'Forrest',
    PLAINS: 'Plains',
    DESERT: 'Desert',
    BADLANDS: 'Badlands'
}

var tileColors = {
    [tileTypes.HIDDEN]: '#000000',
    [tileTypes.FORREST]: '#00dd00',
    [tileTypes.PLAINS]: '#00dd33',
    [tileTypes.DESERT]: '#ffff00',
    [tileTypes.BADLANDS]: '#A52A2A'
}

const defaultMap = [
    { x: 0, z: -2, y: 0, h: 2, reactKey: Guid.create(), type: tileTypes.HIDDEN },
    { x: 0, z: -1, y: 0, h: 5, reactKey: Guid.create(), type: tileTypes.FORREST },
    { x: 0, z: 0, y: 0, h: 8, reactKey: Guid.create(), type: tileTypes.PLAINS },
    { x: 0, z: 1, y: 0, h: 4, reactKey: Guid.create(), type: tileTypes.PLAINS },
    { x: 0, z: 2, y: 0, h: 3, reactKey: Guid.create(), type: tileTypes.BADLANDS },
    { x: 0, z: 3, y: 0, h: 5, reactKey: Guid.create(), type: tileTypes.HIDDEN },
    { x: 1, z: -2, y: 0, h: 2, reactKey: Guid.create(), type: tileTypes.HIDDEN },
    { x: 1, z: -1, y: 0, h: 9, reactKey: Guid.create(), type: tileTypes.FORREST },
    { x: 1, z: 0, y: 0, h: 3, reactKey: Guid.create(), type: tileTypes.DESERT },
    { x: 1, z: 1, y: 0, h: 5, reactKey: Guid.create(), type: tileTypes.DESERT },
    { x: 1, z: 2, y: 0, h: 7, reactKey: Guid.create(), type: tileTypes.DESERT },
    { x: 1, z: 3, y: 0, h: 2, reactKey: Guid.create(), type: tileTypes.HIDDEN },
];

var LightenColor = function(col, amt) {
 
	if (col[0] == "#") {
		col = col.slice(1);
	}
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return '#' + (g | (b << 8) | (r << 16)).toString(16);
  
}


let Utils = {
    getInitialMap: function () {
        return defaultMap
    },
    TileTypes: tileTypes,
    TileColors: tileColors,
    LightenColor,
}
export default Utils;