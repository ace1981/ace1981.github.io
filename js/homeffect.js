if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var cfg;

//const
var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight,
SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

//var
var scene,camera,
    renderer,controls,
    domElement;

var sky;

var birds=[],boids=[];

$(function(){
    if(cfg&&cfg.page=='index'){//首页的动画效果
        initIndex();
        if(birds.length)
            indexAnimate();
        else
            indexRender();
    }
})

function initBird(){
    var total = 100;
    for ( var i = 0; i < total; i ++ ) {

        boid = boids[ i ] = new Boid();
        boid.position.x = Math.random() * 2*total - total;
        boid.position.y = Math.random() * 2*total - total;
        boid.position.z = Math.random() * 2*total - total;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;
        boid.setAvoidWalls( true );
        boid.setWorldSize( 500, 500, 400 );

        bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
        bird.phase = Math.floor( Math.random() * 62.83 );
        scene.add( bird );

    }

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}


function onDocumentMouseMove( event ) {

    var vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );

    for ( var i = 0, il = boids.length; i < il; i++ ) {

        boid = boids[ i ];

        vector.z = boid.position.z;

        boid.repulse( vector );

    }

}

function indexAnimate() {

    requestAnimationFrame( indexAnimate );

    indexRender();
}


function initSky() {

    // Add Sky Mesh
    sky = new THREE.Sky();
    scene.add( sky.mesh );

    // Add Sun Helper
    sunSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry( 20000, 16, 8 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff } )
    );
    sunSphere.position.y = - 700000;
    sunSphere.visible = false;
    scene.add( sunSphere );

    //Elementary param
    var effectController  = {
        turbidity: 10,
        rayleigh: 2,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.8,
        luminance: 1,
        inclination: 0.49, // elevation / inclination
        azimuth: 0.25, // Facing front,
        sun: ! true,
        distance: 400000
    };

    var uniforms = sky.uniforms;
    uniforms.turbidity.value = effectController.turbidity;
    uniforms.rayleigh.value = effectController.rayleigh;
    uniforms.luminance.value = effectController.luminance;
    uniforms.mieCoefficient.value = effectController.mieCoefficient;
    uniforms.mieDirectionalG.value = effectController.mieDirectionalG;

    var theta = Math.PI * ( effectController.inclination - 0.5 );
    var phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

    sunSphere.position.x = effectController.distance * Math.cos( phi );
    sunSphere.position.y = effectController.distance * Math.sin( phi ) * Math.sin( theta );
    sunSphere.position.z = effectController.distance * Math.sin( phi ) * Math.cos( theta );

    sunSphere.visible = effectController.sun;

    sky.uniforms.sunPosition.value.copy( sunSphere.position );
}

function initIndex(){				
    // camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
    // camera.position.z = 450;
    //camera
    camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 2000000 );
    camera.position.set( 0, 100, 500 );//2000
    //camera.setLens(20);

    //scene
    scene = new THREE.Scene();

    //container div
    var container = document.body;
    // document.body.appendChild(container);

    // renderer = new THREE.CanvasRenderer();
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    container.appendChild( renderer.domElement );

    //bird
    if(cfg&&cfg.bird)
        initBird();

    //sky
    if(cfg&&cfg.sky)
        initSky();


    // control
    if(cfg&&cfg.orbit_control){
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', indexRender );
    }

    //controls.maxPolarAngle = Math.PI / 2;
    // controls.enableZoom = false;
    // controls.enablePan = false;

    window.addEventListener( 'resize', onWindowResize, false );
}

function indexRender(){
    if(birds.length)
    //render birds
    for ( var i = 0, il = birds.length; i < il; i++ ) {

        boid = boids[ i ];
        boid.run( boids );

        bird = birds[ i ];
        bird.position.copy( boids[ i ].position );

        color = bird.material.color;
        color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;

        bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
        bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

        bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
        bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;

    }

    renderer.render( scene, camera );
}


function onWindowResize() {

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    if(!birds.length)
        indexRender();
}

