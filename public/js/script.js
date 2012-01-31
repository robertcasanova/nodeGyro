/* START Scena conf */

//scena size

var WIDTH = $(window).width(),
	HEIGHT = $(window).height();
	
//camera

var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;
	
var $container = $('#container');

// and a scene
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

var scene = new THREE.Scene();	

camera.position.z = 400;
renderer.setSize(WIDTH,HEIGHT);

$container.append(renderer.domElement);		
	
/* END Scena conf */

/* CREATE something */

var material = new THREE.MeshLambertMaterial({
	color: 0xF36202	
});
var cube = new THREE.Mesh(
	new THREE.CubeGeometry(100, 170, 10),
	material
);	


cube.rotation.y = 0;
cube.rotation.x = 0;
cube.rotation.z = 0;

scene.add(cube);
scene.add(camera);


/* END CREATE something */

/* LIGHT */

var pointLight = new THREE.PointLight(0xFFFFFF);

pointLight.position.x = 0;
pointLight.position.y = 50;
pointLight.position.z = 130;

scene.add(pointLight); 

/* END LIGHT */

/* DRAW */
animate();
function animate() {
	render();
	requestAnimFrame(animate);
}

function render() {
	//cube.rotation.x += 0.09;
	//cube.rotation.y += 0.05;
	//cube.rotation.z += 0.01;
	renderer.render( scene, camera );

}

/* END DRAW */

/* INTERACTION */

var socket = io.connect('http://10.10.10.64:3000');

socket.on('gyro', function(data){
	cube.rotation.y = ((data.y)*Math.PI/180);
	cube.rotation.x = (data.x*Math.PI/180)-Math.PI/2;
	//cube.rotation.z = ((data.z)*Math.PI/180);
	
	$('header p').text('Y'+data.y);
	$('header p+p').text('X'+data.x);
	//$('header p+p+p').text('Z'+z);
})


/* END INTERACTION */

	