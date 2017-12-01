var archive = typeof archive == 'undefined' ?({ 'archive': false }):archive;

var renderWidth = window.innerWidth, renderHeight = window.innerHeight;
var scene, camera, renderer, controls;

var element, objects = [], targets = {
    index: 0,
    list: [[], [], [], [], []],
    table: 0,
    sphere: 1,
    helix: 2,
    grid: 3,
    ring: 4,

    push(i, e) {
        this.list[i].push(e);
    },

    update(i) {
        i = i || this.index;

        if (controls) controls.dispose();

        switch (i) {

            case this.ring:
                controls = new THREE.OrbitControls(camera, renderer.domElement);
                break;

            case this.table:
                controls = new THREE.TrackballControls(camera, renderer.domElement);
                controls.rotateSpeed = 0.5;
                controls.minDistance = 500;
                controls.maxDistance = 6000;
                break;
        }

        controls.update();

        controls.addEventListener('change', render);
    }
};

var cameraResetter={//用于重置摄像机位置
    'target':undefined,
    'position':undefined,
    'up':undefined,
    'zoom':undefined,
    reset(){
        if(camera){

            if(this.target)
                camera.lookAt(this.target);

            if(this.position)
                camera.position.copy(this.position);

            if(this.up)
                camera.up.copy(this.up)
                
            if(this.zoom)
                camera.zoom = this.zoom;

            camera.updateProjectionMatrix();
            targets.update();
            render();
        }
    }
}

$(() => {
    if (archive.archive) {
        init();
        animate();
    }
});

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, renderWidth / renderHeight, 1, 10000);
    camera.position.z = 900;
    camera.lookAt(scene.position);

    cameraResetter.target = new THREE.Vector3()
    cameraResetter.position = camera.position.clone();
    cameraResetter.up = camera.up.clone();
    cameraResetter.zoom = camera.zoom;

    var len = archive.data.length;
    archive.data.forEach((e, i) => {
        //element
        element = $("<div class='element' title='" + e.title.name + "'></div>");
        element.append("<div class='date'>" + e.date + "</div>");
        element.append("<a class='title' href='" + e.title.url + "' >" + e.title.name + "</a>");
        var tags = $("<div class='tags'></div>");
        e.tag.slice(0,(archive.maxtag?archive.maxtag:3)).forEach((t) => { tags.append("<a class='tag' href='" + t.url + "'>" + t.name + "</a>"); })
        element.append(tags);
        // $('body').append(element);

        //object
        var object = new THREE.CSS3DObject(element[0]);
        object.position.x = 0;
        object.position.y = 0;
        object.position.z = -50000;
        scene.add(object);
        objects.push(object);

        //table
        var target = new THREE.Object3D();
        target.position.x = -250 + 450 * (i % 2);
        target.position.y = 300 - 140 * Math.floor(i / 2);
        target.position.z = -400;
        targets.push(targets.table, target);

        // ring
        var rw = 1
            , rl = Math.floor(len / rw)
            , ra = Math.floor(i / rw) % rl * Math.PI * 2 / rl
            , rr = camera.position.z+10//防止遮挡
            , rz = 0;
        // console.log(ra)
        target = new THREE.Object3D();
        target.position.x = rr * Math.sin(ra);
        target.position.y = -110 * (i % rw);
        target.position.z = rz - rr * Math.cos(ra)
        target.lookAt(camera.position.clone().setZ(rz));
        targets.push(targets.ring, target);
    })

    //renderer
    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(renderWidth, renderHeight);
    // renderer.domElement.style.position = 'absolute';
    renderer.domElement.className = "archive-effect"
    $('body').append(renderer.domElement)

    //controller
    // controls = new THREE.TrackballControls(camera, renderer.domElement);
    // controls.rotateSpeed = 0.5;
    // controls.minDistance = 500;
    // controls.maxDistance = 6000;
    // controls.addEventListener('change', render);

    transform(targets[archive.default], 1000);

    if (archive.tweenable)
        $('body').on('keypress', function (e) {


            function moveIfNotList(add) {
                while (1) {
                    targets.index = (targets.index + add + targets.list.length) % targets.list.length
                    if (targets.list[targets.index].length) break;
                }
            }

            switch (e.keyCode) {
                case 52:
                    moveIfNotList(-1);
                    transform(targets.index, 1000);
                    break;
                case 53:
                    cameraResetter.reset();
                    break;
                case 54:
                    moveIfNotList(1);
                    transform(targets.index, 1000);
                    break;
            }
        })

    window.addEventListener('resize', onWindowResize, false);
}

function transform(index, duration) {
    targets.update(index);

    TWEEN.removeAll();

    var target = targets.list[index];

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        var target = targets.list[index][i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function animate() {
    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

