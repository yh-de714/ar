let view = document.getElementById('main_viewer');

if (!Detector.webgl) Detector.addGetWebGLMessage();

let camera, camerHelper, scene, renderer, loader,
    stats, controls, transformControls, numOfMeshes = 0, model, modelDuplicate, sample_model, wireframe, mat, scale, delta;

const manager = new THREE.LoadingManager();

let modelLoaded = false, sample_model_loaded = false;
let modelWithTextures = false, fbxLoaded = false, gltfLoaded = false;;
let bg_Texture = false;

let selectedObject, composer, position, outlinePass;
let clock = new THREE.Clock();

let ambient, directionalLight, directionalLight2, directionalLight3, pointLight;
let backgroundScene, backgroundCamera, backgroundMesh;

let color_red = 128;
let color_green = 128;
let color_blue = 128;

//ANIMATION GLOBALS
let animations = {}, mixer, currentAnimation, actions = {};

//X-RAY SHADER MATERIAL
//http://free-tutorials.org/shader-x-ray-effect-with-three-js/
let materials = {
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
    })
};

let winDims = [window.innerWidth * 0.8, window.innerHeight * 0.89]; //size of renderer


let ring_body, stone_mesh, prongs_mesh;


function initScene(url) {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500000);
    camera.position.set(0, 0, 40);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
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

    let ambientLight = new THREE.AmbientLight(0x808080, 0.2); //Grey colour, low intensity
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
    let renderPass = new THREE.RenderPass( scene, camera );

    let fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
    let pixelRatio = renderer.getPixelRatio();

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
    loader = new THREE.GLTFLoader(manager);
   

    //progress/loading bar
    let onProgress = function (data) {
        if (data.lengthComputable) { //if size of file transfer is known
            let percentage = Math.round((data.loaded * 100) / data.total);
            console.log(percentage);
            
        }
    }
    let onError = function (xhr) {
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
    let bbox = new THREE.Box3().setFromObject(mod);

    /*MODELS OF DIFFERENT SIZES TO FIT IN CAMERA VIEW*/
    let height = bbox.getSize().y;
    let dist = height / (2 * Math.tan(camera.fov * Math.PI / 360));
    let pos = scene.position;
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
    let colour = getColours(color_red, color_green, color_blue);
    directionalLight.color.setRGB(colour[0], colour[1], colour[2]);
    directionalLight2.color.setRGB(colour[0], colour[1], colour[2]);
    directionalLight3.color.setRGB(colour[0], colour[1], colour[2]);
    
    ambient.color.setRGB(colour[0], colour[1], colour[2]);

}

function getColours(r, g, b) {
    let colour = [r.valueOf() / 255, g.valueOf() / 255, b.valueOf() / 255];
    return colour;
}

function render() {
    setColours_render();
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


let image;
let ring_model;
let ring_id="";
let ring_image="";
let ring_url="";
let ring_name="";
$(function(){
    ring_id =  $("#ring_id").val();
    ring_image =  $("#ring_image").val();
    ring_url  =  $("#ring_model").val();
    ring_name  =  $("#ring_name").val();
    let base_path = $("#url").val();
    if(ring_image!=="null"){

        $("#image-ref").attr('src', `${base_path}/uploads/${ring_image}`);
    }
    if(ring_name!=="null"){
        $("#name").val(ring_name);
    }

    if(ring_url!=="null"){
        load(`${base_path}/uploads/${ring_url}`)
    }

    $('#image-ref').click(function() {
        $('#image').click();
    })
    $('#ring-ref').click(function() {
        $('#ring').click();
    });

    $('#image').change(function (e){
        let fileObj = e.target.files[0];
        if(!fileObj){
            return
        }
        image = fileObj
        $("#image-ref").attr('src', URL.createObjectURL(fileObj));
    });
    $("#ring").change(function (e){
        let fileObj = e.target.files[0];
        
        if(!fileObj){
            return
        }
        ring_model = fileObj
        let url = URL.createObjectURL(fileObj);
        load(url)
    })

    $("#submit").click(function(){
        if(ring_id=="null"){
            let token = $('#_token').val();
            let name = $('#name').val();
            let data = new FormData();  
            if(!ring_model){
                alert("Please Select Ring 3D Model");
                return;
            }
            if(name==""){
                alert("Please Enter the Ring name");
                return;
            }              
            data.append('model', ring_model);
            data.append('image', image);
            data.append('name', name);
            data.append('_token', token);    
            $('.loader').addClass('show');
            
            $.ajax({
                url: '/uploadmodel',
                data: data,
                processData: false,
                contentType: false, 
                type: 'POST',
                success: function(response){
                    $('.loader').removeClass('show');
                    console.log(response)
                    window.location.href= '/stone/' + response.id;
                },
                error: function(error) {
                    $('.loader').removeClass('show');
                    console.log(error);
                    alert('ajax error!');
                },
                complete: function (e) {
                    $('.loader').removeClass('show');
                }
            });
        }
        else{
            let token = $('#_token').val();
            let name = $('#name').val();
            let data = new FormData();  
            if(name==""){
                alert("Please Enter the Ring name");
                return;
            }           
            if(ring_model){
                data.append('model', ring_model);    
            }
            if(image){
                data.append('image', image);
            }
            data.append('id', ring_id);
            data.append('name', name);
            data.append('_token', token);    
            $('.loader').addClass('show');
            
            $.ajax({
                url: '/updatemodel',
                data: data,
                processData: false,
                contentType: false, 
                type: 'POST',
                success: function(response){
                    $('.loader').removeClass('show');
                    console.log(response)
                    window.location.href= '/stone/' + response.id;
                },
                error: function(error) {
                    $('.loader').removeClass('show');
                    console.log(error);
                    alert('ajax error!');
                },
                complete: function (e) {
                    $('.loader').removeClass('show');
                }
            });
        }
        
    })
});

function load(url){
    $('#main_viewer').removeClass('d-none');
    $("#ring-ref").addClass('d-none');   
    initScene(url);
    animate();
}

document.addEventListener('dragover', function (event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
   
});

document.addEventListener('drop', function (event) {
    
    event.stopPropagation(); //Only call loadFile function on drop event (default is to display file as plain text file).
    event.preventDefault();
  
    if (event.dataTransfer.files.length > 0 && event.dataTransfer.files.length < 2) {
        loadFile(event.dataTransfer.files[0]);
    }

}, false);


let loadFile = function (file) {
    let filename = file.name;
    let extension = filename.split('.').pop().toLowerCase();
    if(extension == "glb") {
        ring_model = file;
        let url = URL.createObjectURL(ring_model);
        load(url)
    }
    else {
        alert( 'Unsupported file format (' + extension +  ').' );
    }
};













