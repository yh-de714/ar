var view = document.getElementById('main_viewer');

if (!Detector.webgl) Detector.addGetWebGLMessage();

var camera, camerHelper, scene, renderer, loader,
    stats, controls, transformControls, numOfMeshes = 0, model, modelDuplicate, sample_model, wireframe, mat, scale, delta;

const manager = new THREE.LoadingManager();

var modelLoaded = false, sample_model_loaded = false;
var modelWithTextures = false, fbxLoaded = false, gltfLoaded = false;;
var bg_Texture = false;

var selectedObject, composer, position, outlinePass;
var clock = new THREE.Clock();

var ambient, directionalLight, directionalLight2, directionalLight3, pointLight;
var backgroundScene, backgroundCamera, backgroundMesh;

var color_red = 128;
var color_green = 128;
var color_blue = 128;

//ANIMATION GLOBALS
var animations = {}, mixer, currentAnimation, actions = {};

//X-RAY SHADER MATERIAL
//http://free-tutorials.org/shader-x-ray-effect-with-three-js/
var materials = {
    default_material: new THREE.MeshLambertMaterial({ side: THREE.DoubleSide }),
    default_material2: new THREE.MeshLambertMaterial({ side: THREE.DoubleSide }),
    wireframeMaterial: new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        wireframe: true, 
        shininess: 100,
        specular: 0x000, emissive: 0x000,
        flatShading: false, depthWrite: true, depthTest: true
    }),
    wireframeMaterial2: new THREE.LineBasicMaterial({ wireframe: true, color: 0xffffff }),
    wireframeAndModel: new THREE.LineBasicMaterial({ color: 0xffffff }),
    phongMaterial: new THREE.MeshPhongMaterial({
        color: 0x555555, specular: 0xffffff, shininess: 10,
        flatShading: false, side: THREE.DoubleSide, skinning: true
    }),
    xrayMaterial: new THREE.ShaderMaterial({
        uniforms: {
            p: { type: "f", value: 3 },
            glowColor: { type: "c", value: new THREE.Color(0x84ccff) },
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
        transparent: true, depthWrite: false
    })
};

var clock = new THREE.Clock();
var winDims = [window.innerWidth * 0.8, window.innerHeight * 0.89]; //size of renderer


var ring_body, stone_mesh, prongs_mesh;

function initScene() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500000);
    camera.position.set(0, 0, 40);

    //Setup renderer
    //renderer = new THREE.CanvasRenderer({ alpha: true });
    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight)
    // renderer.setClearColor(0x003957, 0.8); //565646, 292121, 003957
    renderer.setClearColor(0x000000, 0.0);

    view.appendChild(renderer.domElement);

    THREEx.WindowResize(renderer, camera);
  
    ambient = new THREE.AmbientLight(0x404040);
    
    /*LIGHTS*/
    directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    directionalLight2 = new THREE.DirectionalLight(0xffeedd);
    directionalLight2.position.set(0, 0, -1).normalize();
    scene.add(directionalLight2);

    directionalLight3 = new THREE.DirectionalLight(0xffeedd);
    directionalLight3.position.set(0, 1, 0).normalize();
    scene.add(directionalLight3);

    var ambientLight = new THREE.AmbientLight(0x808080, 0.2); //Grey colour, low intensity
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xcccccc, 0.5);
    camera.add(pointLight);

    scene.add(camera);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.09;
    controls.rotateSpeed = 0.09;

    transformControls = new THREE.TransformControls(camera, renderer.domElement);
    transformControls.addEventListener('change', render);
    scene.add(transformControls);

    transformControls.addEventListener('mouseDown', function () {
        controls.enabled = true;
    });
    transformControls.addEventListener('mouseUp', function () {
        controls.enabled = true;
    });

    // postprocessing    
    var renderPass = new THREE.RenderPass( scene, camera );

    var fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
    var pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
    fxaaPass.renderToScreen = true;

    outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);   
    outlinePass.edgeStrength = 1.5; 
    outlinePass.edgeGlow = 2;

    composer = new THREE.EffectComposer( renderer );
    composer.addPass( renderPass );
    composer.addPass(outlinePass);
    composer.addPass( fxaaPass );
    
    var filename = $("#ring_url").val(); //index from array of sample models in html select options
    loader = new THREE.GLTFLoader(manager);
    var url = "/uploads/" + filename;


    //progress/loading bar
    var onProgress = function (data) {
        if (data.lengthComputable) { //if size of file transfer is known
            var percentage = Math.round((data.loaded * 100) / data.total);
            console.log(percentage);
            
        }
    }
    var onError = function (xhr) {
        console.log('ERROR');
    };

    const path = "/hands/images/cube/";
    const format = '.jpg';
    let urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    let reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;

    const  stoneBackMaterial = new THREE.MeshPhysicalMaterial( {
        map: null,
        color: null,
        metalness: 1.0,
        roughness: 0,
        opacity: 0.5,
        side: THREE.FrontSide,
        transparent: true,
        envMapIntensity: 6,
        premultipliedAlpha: true,
        envMap: reflectionCube,
    } );

    loader.load(url, function (data) {
        sample_model = data.scene;
        sample_model_loaded = true;

        ring_body = prongs_mesh = stone_mesh = null;

        sample_model.traverse(function (child) {

            if(child.isMesh && child.name === "ringbody") {                   
                ring_body = child;             
                ring_body.material = materials.phongMaterial;    
                ring_body.material.color.set(0x949494);   
            }
            if(child.isMesh && child.name === "prongs") {       
                prongs_mesh = child;                
                prongs_mesh.material = ring_body.material.clone();
                prongs_mesh.material.color.set(0x342342);
            }
            if(child.isMesh && child.name === "stone") {   
                stone_mesh = child;
                stone_mesh.material = stoneBackMaterial;
                stone_mesh.material.color.set(0xf8f8f8);  
            }
        });      

        setCamera(sample_model);
        sample_model.position.set(0, 0, 0);
        
        scene.add(sample_model);
        console.log("scene", scene)
    }, onProgress, onError);
}

function setCamera(mod) {
    var bbox = new THREE.Box3().setFromObject(mod);

    /*MODELS OF DIFFERENT SIZES TO FIT IN CAMERA VIEW*/
    var height = bbox.getSize().y;
    var dist = height / (2 * Math.tan(camera.fov * Math.PI / 360));
    var pos = scene.position;
    camera.position.set(pos.x, pos.y, dist * 3.50);
    camera.lookAt(pos);
}

function removeModel() {

    scene.remove(model);
    scale = 1;
    numOfMeshes = 0;
    modelLoaded = false;
    modelWithTextures = false;
    fbxLoaded = false;
    gltfLoaded = false;
    
    if (ambient) {
        scene.remove(ambient);
    }
    
    pointLight.intensity = 0.5;

    camera.position.set(0, 0, 40); //Reset camera to initial position
    controls.reset(); //Reset controls, for when previous object has been moved around e.g. larger object = larger rotation
    
    transformControls.detach(scene);

    controls.autoRotate = false; //Stop model auto rotating if doing so on new file select
    
}

function setColours_render() {

    var colour = getColours(color_red, color_green, color_blue);
    directionalLight.color.setRGB(colour[0], colour[1], colour[2]);
    directionalLight2.color.setRGB(colour[0], colour[1], colour[2]);
    directionalLight3.color.setRGB(colour[0], colour[1], colour[2]);
    
    ambient.color.setRGB(colour[0], colour[1], colour[2]);

}

function getColours(r, g, b) {

    var colour = [r.valueOf() / 255, g.valueOf() / 255, b.valueOf() / 255];
    return colour;
}

function render() {
    setColours_render();
   // renderer.render(scene, camera);
}

function animate() {

    delta = clock.getDelta();
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(delta);
    }
    controls.update(delta);
    composer.render();
    render();

}
var modelList = [];


initScene()

$(document).ready(function() {
    $(window).load(function() {
        animate();
    });
});



$(document).on("click", ".left-menu-wrap > ul > li > a", function (e) {
    $(this).toggleClass("active");
    $(this).parent().siblings().find('a').removeClass('active');

    if ($('#left_' + $(this).attr('id')).hasClass('active')) {
        $('#left_' + $(this).attr('id')).toggleClass("active");
    } else {
        $(".main-wrap").removeClass('active');
        $('#left_' + $(this).attr('id')).addClass("active");
    }
});

$(document).on('click touchstart', '#main_viewer', function (e) {
    if (e.target == $('canvas')[0]) {
        $('.main-wrap').removeClass('active');
        $(".left-menu-wrap > ul > li > a").removeClass('active');
    }
});


$(document).on('click', '#left_material .main-item a', function () {
    $('#left_material .main-item a').removeClass('active');
    $(this).addClass('active');

    var index = $(this).attr('id');
    switch (index) {
        case 'silver': {
            ring_body.material.color.set(0x949494);
            break;
        }
        case 'gold': {
            ring_body.material.color.set(0xc1a25b);
            break;
        }
        case 'pink_gold': {
            ring_body.material.color.set(0xFFD6C1);
            break;
        }
        case 'platinum': {
            ring_body.material.color.set(0xEBEBEB);
            break;
        }
    }
});


$(document).on('click', '#left_dyamond .main-item a', function () {
    $('#left_dyamond .main-item a').removeClass('active');
    $(this).addClass('active');

    var index = $(this).attr('id');

    if (stone_mesh !== null) {
        switch (index) {
            case 'dyamond_no': {
                stone_mesh.visible = false
                break;
            }
            case 'dyamond_item1': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0xc33329);
                    }
                });
                break;
            }
            case 'dyamond_item2': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x694e6b);
                    }
                });
                break;
            }
            case 'dyamond_item3': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x567ca8);
                    }
                });
                break;
            }
            case 'dyamond_item4': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0xa49b86);
                    }
                });
                break;
            }
            case 'dyamond_item5': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x3a7e3e);
                    }
                });
                break;
            }
            case 'dyamond_item6': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x867e6d);
                    }
                });
                break;
            }
            case 'dyamond_item7': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x93333e);
                    }
                });
                break;
            }
            case 'dyamond_item8': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x608e2f);
                    }
                });
                break;
            }
            case 'dyamond_item9': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x39588a);
                    }
                });
                break;
            }
            case 'dyamond_item10': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x97335f);
                    }
                });
                break;
            }
            case 'dyamond_item11': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0xa37228);
                    }
                });
                break;
            }
            case 'dyamond_item12': {
                stone_mesh.visible = true
                stone_mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.color.set(0x635984);
                    }
                });
                break;
            }
        }
    } else {
        console.log('Dyamond Mesh No');
    }
});