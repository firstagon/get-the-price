const coords = {
    x: null,
    y: null,
    z: null,
    rx: 0,
    ry: 0,
    rz: 0,
    moving: false,
    rotating: true,
    grow: false,
    degrow: false,
    firstRun: false,
};


const updatingItem = (item, e) => {
    coords.x = item.position.x
    coords.y = item.position.y
    coords.z = item.position.z


    if (coords.x >= -8 && coords.x <= 8) {
        item.moved = true;

        if (coords.grow) {
            coords.x += (e.movementX * 0.01);
            coords.y += -(e.movementY * 0.01);

            if (coords.z >= 4) coords.grow = false;
            coords.z += 0.2;

            if (coords.rotating) {
                coords.rx += Math.PI / 12;
                coords.ry += Math.PI / 6;
                coords.rz += Math.PI / 2;
            };
        } else {
            coords.x += (e.movementX * 0.01);
            coords.y += -(e.movementY * 0.01);
            coords.z -= 0.1;
            if (coords.z <= -4) coords.grow = true;
        }
    } else {
        coords.x = item.position.x
        coords.y = item.position.y
        coords.z = item.position.z
    }




    return { coords };
};

export default updatingItem;