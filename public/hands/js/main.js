let stone_list=[]
let surface_list=[]

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
let video = document.getElementById("myVideo");
let origin_canvas = document.getElementById("origin_canvas");
let process_canvas = document.getElementById("process_canvas");
let myThreeCanvas = document.getElementById('threeJScanvasOutput');
let stone = "";
let surface = "";
let model, transparentSphere;

const manager = new THREE.LoadingManager();
let loader, renderer;

let ring_point;

let pointA, pointB, pointC;

let angle, delta_angle_y;

let left_hand_flag = false;
let right_hand_flag = false;

let width = window.innerWidth;
let height = window.innerHeight;

let modelList = [];

window.addEventListener('load', function () {    
    video.width = width;
    video.height = height;

    origin_canvas.width = width / 2;
    origin_canvas.height = height / 2;

    process_canvas.width = width / 8;
    process_canvas.height = height / 8;

    canvasElement.width = width;
    canvasElement.height = height;

    myThreeCanvas.width = width;
    myThreeCanvas.height = height;

    initScene();
    setTimeout(() => {
        play()
    }, 1500);

}, false);


function drawRing(canvasCtx, ring_point, left_or_right) {
    if (left_or_right == "Right")
        left_or_right = "Left";
    else left_or_right = "Right";
    centerX = ring_point["x"] * width;
    centerY = ring_point["y"] * height;
    radius = 10
    canvasCtx.beginPath();
    canvasCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    canvasCtx.fillStyle = 'green';
    canvasCtx.fill();
    canvasCtx.lineWidth = 5;
    canvasCtx.strokeStyle = '#00FF00';
    // canvasCtx.strokeStyle = '#003300';
    canvasCtx.stroke();
}

let show_hide = true;

function isShow() {
    show_hide = !show_hide;
}

function get_width_finger(ring_point) {

    let src = frame.clone()

    centerX = ring_point["x"] * width;
    centerY = ring_point["y"] * height;
    let pt = new cv.Point(10, 10);
    let mask = new cv.Mat.zeros(height + 2, width + 2, cv.CV_8U);
    cv.floodFill(src, mask, pt, 255);
    cv.imshow('output_canvas', mask);
    if (canny) {
        cv.add(dstx, dsty, dst)
        cv.imshow('output_canvas', dst);
    }

}

function pDistance(x, y, x1, y1, x2, y2) {
    let A = x - x1;
    let B = y - y1;
    let C = x2 - x1;
    let D = y2 - y1;

    let dot = A * C + B * D;
    let len_sq = C * C + D * D;
    let param = -1;
    if (len_sq != 0)
        param = dot / len_sq;

    let xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    let dx = x - xx;
    let dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

let result;


let previousLandmarks = null;
let dx = []
let tPrev;
let minCutOff = 0.12;
let dCutOff = 0.12;
let beta = 1
// const smoothingFactor = 0.5; // Smoothing factor for exponential moving average

const smoothingFactor = (te, cutoff) => {
    const r = 2 * Math.PI * cutoff * te;
    return r / (r + 1);
};

const exponentialSmoothing = (a, x, xPrev) => {
    return a * x + (1 - a) * xPrev;
};


function processHandLandmarks(handLandmarks) {    
    if (previousLandmarks === null) {
        // Initialize previousLandmarks with the first set of landmarks
        tPrev= new Date();
        previousLandmarks = handLandmarks;
        for (let i = 0; i < handLandmarks.length; i++) {
            {
                dx[i] = [];
                for (let j = 0; j < handLandmarks[i].length; j++) {
                    dx[i][j] = {x:0,y:0,z:0}
                }
            }
        }

      } else {
        //Apply smoothing to hand landmarks
        for (let i = 0; i < handLandmarks.length; i++) {
          for (let j = 0; j < handLandmarks[i].length; j++) {
            let t = new Date();
            let te = t - tPrev
            if(te==0) te = 1;
            const ad = smoothingFactor(te, dCutOff);
            
            let dx_x = (handLandmarks[i][j].x - previousLandmarks[i][j].x) / te;
            let dxHat_x = exponentialSmoothing(ad, dx_x,  dx[i][j].x);
            const cutOff_x = minCutOff + beta * Math.abs(dxHat_x);
            const a_x = smoothingFactor(te, cutOff_x);
            let xHat_x = exponentialSmoothing(a_x, handLandmarks[i][j].x, previousLandmarks[i][j].x);
            handLandmarks[i][j].x = xHat_x;
            previousLandmarks[i][j].x = xHat_x;
            dx[i][j].x = dxHat_x;

            let dx_y = (handLandmarks[i][j].y - previousLandmarks[i][j].y) / te;
            let dxHat_y = exponentialSmoothing(ad, dx_y,  dx[i][j].y);
            const cutOff_y = minCutOff + beta * Math.abs(dxHat_y);
            const a_y = smoothingFactor(te, cutOff_y);
            let xHat_y = exponentialSmoothing(a_y, handLandmarks[i][j].y, previousLandmarks[i][j].y);
            handLandmarks[i][j].y = xHat_y;
            previousLandmarks[i][j].y = xHat_y;
            dx[i][j].y = dxHat_y;

            let dx_z = (handLandmarks[i][j].z - previousLandmarks[i][j].z) / te;
            let dxHat_z = exponentialSmoothing(ad, dx_z,  dx[i][j].z);
            const cutOff_z = minCutOff + beta * Math.abs(dxHat_z);
            const a_z = smoothingFactor(te, cutOff_z);
            let xHat_z = exponentialSmoothing(a_z, handLandmarks[i][j].z, previousLandmarks[i][j].z);
            handLandmarks[i][j].z = xHat_z;
            previousLandmarks[i][j].z = xHat_z;
            dx[i][j].z = dxHat_z;            
            tPrev = t;

          }
        }
    }
   
    let landmarks = handLandmarks[0]
    ring_point = {
        x: (landmarks[13]['x'] + (landmarks[14]['x'] - landmarks[13]['x']) / 1.7),
        y: (landmarks[13]['y'] + (landmarks[14]['y'] - landmarks[13]['y']) / 1.7)
    }
    if (landmarks[14].x > landmarks[13].x) {
        delta_angle_y = Math.atan(Math.abs(landmarks[13].y - landmarks[14].y) / Math.abs(landmarks[13].x - landmarks[14].x));
    } else {
        delta_angle_y = Math.PI - Math.atan(Math.abs(landmarks[13].y - landmarks[14].y) / Math.abs(landmarks[13].x - landmarks[14].x));
    }
    pointA = landmarks[13];
    pointB = landmarks[14];
    pointC = landmarks[17];
    setPosition();  
  
}


function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(origin_canvas, 0, 0, canvasElement.width, canvasElement.height);
    result = results;
    if (results.multiHandLandmarks) {  
        if(results.multiHandLandmarks.length>0){
            processHandLandmarks(results.multiHandLandmarks)      
        }
        
        
    }
    canvasCtx.restore();
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});


hands.setOptions({
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    static_image_mode:true,
    maxNumHands: 1,
    enableGPU: true
});


hands.onResults(onResults);


let cap, frame, dsize, dst;

function cvReady() {    
    cv['onRuntimeInitialized'] = () => {
        video.width = width;
        video.height = height;
        cap = new cv.VideoCapture(video);
        frame = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        dsize = new cv.Size(parseInt(frame.cols / 2), parseInt(frame.rows / 2));
        dst = new cv.Mat();
    };
}

function isMobile() {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isAndroid || isiOS;
}


function isPC() {
    return /Win|Mac|Linux/.test(navigator.platform) && !/Android/.test(navigator.userAgent);
  }
  
  function isAndroid() {
    return /Android/.test(navigator.userAgent);
  }

async function setupCamera() {
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    return new Promise((resolve) => {
        (async () => {
            if(isAndroid()){
                navigator.mediaDevices.enumerateDevices()
                .then(function(devices) {
                    var rearCamera = devices.find(function(device) {
                        return device.kind === 'videoinput' && device.label.toLowerCase().includes('back');
                    });
                    if (rearCamera) {

                        navigator.mediaDevices.getUserMedia(
                            { 
                                video: { 
                                    deviceId: rearCamera.deviceId,
                                    width: {
                                        min: 375,
                                        ideal: 1920,
                                        max: 1920,
                                    },
                                    height: {
                                        min: 667,
                                        ideal: 1080,
                                        max: 1080
                                    },
                                } 
                            })
                          .then(function(stream) {
                            video.srcObject = stream;
                            video.play();
                            resolve(true);
                          })
                          .catch(function(error) {
                            resolve(false);
                          });
                      } else {
                        // Rear-facing camera not found
                    }
                })
            }
            else{
                navigator.mediaDevices.getUserMedia({
                        'audio': false,
                        'video': {
                            width: {
                                min: 375,
                                ideal: 1920,
                                max: 1920,
                            },
                            height: {
                                min: 667,
                                ideal: 1080,
                                max: 1080
                            },
                            facingMode: 'environment'
                        }
                    })
                    .then((stream) => {
                        video.srcObject = stream;
                        video.play();
                        resolve(true);
                    })
                    .catch((err) => {
                        resolve(false);
                    });
            }
        })();
    });
}

video.addEventListener('play', function () {
    (async () => {
         await setupCamera();
    })();

    let $this = this;
    (async function loop() {
        if (!$this.paused && !$this.ended) {
            cap.read(frame);
            cv.resize(frame, dst, dsize);        
            cv.imshow("origin_canvas", dst);            
            var resizedImageData = new cv.Mat();
            cv.resize(frame, resizedImageData, new cv.Size(parseInt(frame.cols / 8), parseInt(frame.rows / 8)));
            cv.imshow("process_canvas", resizedImageData); 
            await hands.send({
                image: origin_canvas
            });  
            setTimeout(loop, 33);
        }
    })();
}, 0);

video.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);

let _pWidth = width; // the post width AFTER the new calc see below from this video..
let _pHight = height;

let camera, scene, geometry, texture, mesh;

let clock = new THREE.Clock();

let ambient, directionalLight, directionalLight2, directionalLight3, pointLight;
let controls;


let ring_body, stone_mesh, prongs_mesh;

let materials = {
    default_material: new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide
    }),
    default_material2: new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide
    }),
    wireframeMaterial: new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        wireframe: true,
        shininess: 100,
        specular: 0x000,
        emissive: 0x000,
        flatShading: false,
        depthWrite: true,
        depthTest: true
    }),
    wireframeMaterial2: new THREE.LineBasicMaterial({
        wireframe: true,
        color: 0xffffff
    }),
    wireframeAndModel: new THREE.LineBasicMaterial({
        color: 0xffffff
    }),
    phongMaterial: new THREE.MeshPhongMaterial({
        color: 0x555555,
        specular: 0xffffff,
        shininess: 10,
        flatShading: false,
        side: THREE.DoubleSide,
        skinning: true,
        transparent: true
    })
};

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 5000);
    /*LIGHTS*/
    directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);
    
    directionalLight2 = new THREE.DirectionalLight(0xffeedd);
    directionalLight2.position.set(-1, 0, -1).normalize();
    scene.add(directionalLight2);

    directionalLight3 = new THREE.DirectionalLight(0xffeedd);
    directionalLight3.position.set(-1, 1, 0).normalize();
    scene.add(directionalLight3);

    let ambientLight = new THREE.AmbientLight(0x808080, 0.1); //Grey colour, low intensity
    scene.add(ambientLight);

    pointLight = new THREE.PointLight(0xcccccc, 0.5);
    camera.add(pointLight);
    scene.add(camera);
   
    renderer = new THREE.WebGLRenderer({
        canvas: myThreeCanvas,
        antialias: true,
        alpha: true,
        premultipliedAlpha: false,
    });
    renderer.setPixelRatio(myThreeCanvas.devicePixelRatio);
    myThreeCanvas.width = myThreeCanvas.clientWidth;
    myThreeCanvas.height = myThreeCanvas.clientHeight;
    renderer.setViewport(0, 0, myThreeCanvas.clientWidth, myThreeCanvas.clientHeight);
    //renderer.setSize(500, 500);

     /*LOAD SAMPLE MODELS*/
    let filename = $("#ring_url").val();
    loader = new THREE.GLTFLoader(manager);
    let url = "/uploads/" + filename;

    //progress/loading bar
    let onProgress = function (data) {
        if (data.lengthComputable) { //if size of file transfer is known
            let percentage = Math.round((data.loaded * 100) / data.total);
            
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
        model = data.scene;
        ring_body = prongs_mesh = stone_mesh = null;

        model.traverse(function (child) {

            if((child.isMesh && child.name === "ringbody" ) || (child.isMesh && child.name === "ring001" )) {                   
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

        scene.add(model);

        transparentSphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(10, 32, 16),
            new THREE.MeshStandardMaterial({
                color: 0x9999ff,
                transparent: true,
                opacity: 0,
            })
        );
    
        transparentSphere.renderOrder = 0;

        transparentSphere.position.z = model.position.z - 1;
    
        scene.add(transparentSphere);

    }, onProgress, onError);

    camera.position.z = 200;

    // CONTROLS
    // controls = new THREE.OrbitControls( camera, myThreeCanvas );
    // controls.minDistance = 5;
    // controls.maxDistance = 10;

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    camera.aspect = _pWidth / _pHight;
    camera.updateProjectionMatrix();
    //renderer.se`tSize(window.innerWidth, window.innerHeight);
    renderer.setSize(_pWidth, _pHight);
}


function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const c_width = canvas.width;
    const c_height = canvas.height;

    // adjust displayBuffer size to match
    if (_pWidth > 0 && _pHight > 0) {
        if (_pWidth !== c_width || _pHight !== c_height) {
            // you must pass false here or three.js sadly fights the browser
            onWindowResize();
            myThreeCanvas.width = _pWidth;
            myThreeCanvas.height = _pHight;
            // update any render target sizes here
        }
    }
}

function convert_XYZ(point) {
    let vec = new THREE.Vector3(); // create once and reuse
    let pos = new THREE.Vector3(); // create once and reuse

    vec.set(point.x * 2 - 1, -point.y * 2 + 1, 0.5);

    vec.unproject(camera);

    vec.sub(camera.position).normalize();

    // let distance = (target.z - camera.position.z) / vec.z;
    let distance = (-camera.position.z) / vec.z;

    pos.copy(camera.position).add(vec.multiplyScalar(distance));
    pos.z = -point.z * distance;

    return pos;
}

function set_Rotation(pointA, pointB, pointC) {
    let AB = new THREE.Vector3();
    let AC = new THREE.Vector3();
    let dir = new THREE.Vector3();

    AB.subVectors(pointB, pointA).normalize();
    AC.subVectors(pointC, pointA).normalize();


    dir.crossVectors(AB, AC).normalize();

    return dir;
}


function setPosition() {
    if (model) {
        if (ring_point) {
            if (!result.multiHandLandmarks[0]) {
                model.visible = false;
                left_hand_flag = false;
                right_hand_flag = false;
            } else {
                
                model.visible = true;
                let pos = new THREE.Vector3();
                pos = convert_XYZ(ring_point);
            
                model.position.x = pos.x;
                model.position.y = pos.y;
                transparentSphere.position.x = pos.x;
                transparentSphere.position.y = pos.y;       
                
                angle = set_Rotation(convert_XYZ(pointA), convert_XYZ(pointB), convert_XYZ(pointC));
                let dir = new THREE.Vector3();
                if(result.multiHandedness[0].label=="Right"){
                    right_hand_flag = true;
                    left_hand_flag = false;
                }
                if(result.multiHandedness[0].label=="Left"){
                    right_hand_flag = false;
                    left_hand_flag = true;
                }
                if (left_hand_flag) {
                    angle.negate();
                }
                dir.addVectors(angle, model.position);
                model.lookAt(dir);
                if (angle.z < 0) {
                    model.rotation.z = -(Math.PI / 2) - delta_angle_y;
                } else {
                    model.rotation.z = -(Math.PI / 2) + delta_angle_y;
                }
            }
        } else {

        }
    }
}

let requestID;

function animate() {
    requestID = requestAnimationFrame(animate);
    let elapsed = clock.getElapsedTime();
    
    resizeCanvasToDisplaySize();
    renderer.render(scene, camera);
}

function stopAnimation() {

    cancelAnimationFrame(requestID);

}



function play() {
    video.play();
    animate();
    video.playbackRate = 1;
}

function stone_click(item, elem){
    setting_stone(item);
    stone = item;
    $(".item-stone").removeClass("item-stone-active");
    $(elem).addClass("item-stone-active");
}

function surface_click(item, elem){
    surface = item;
    setting_surface(item)
    $(".item-material").removeClass("item-material-active");
    $(elem).addClass("item-material-active");
}

function setting_stone(stone){
    switch (stone) {
       
        case 'Garnet': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xc33329);
                }
            });
            break;
        }
        case 'Amethyst': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x694e6b);
                }
            });
            break;
        }
        case 'Aquamarine': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x567ca8);
                }
            });
            break;
        }
        case 'Diamond': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xa49b86);
                }
            });
            break;
        }
        case 'Emerald': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x3a7e3e);
                }
            });
            break;
        }
        case 'Moonstone': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x867e6d);
                }
            });
            break;
        }
        case 'Ruby': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x93333e);
                }
            });
            break;
        }
        case 'Peridot': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x608e2f);
                }
            });
            break;
        }
        case 'Sapphire': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x39588a);
                }
            });
            break;
        }
        case 'Tourmaline': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x97335f);
                }
            });
            break;
        }
        case 'Citrine': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xa37228);
                }
            });
            break;
        }
        case 'Tanzanite': {
            stone_mesh.visible = true
            stone_mesh.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0x635984);
                }
            });
            break;
        }

        default : {
            //stone_mesh.visible = false
            break;
        }
    }
}

function setting_surface(item){
    switch (item) {
        case 'SILVER': {
            ring_body.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xE3E3E3);
                }
            });
            break;
        }
        case 'BRASS': {
            ring_body.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xE3DDA3);
                }
            });
            break;
        }
        case '18K GOLD': {
            ring_body.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xE9D499);
                }
            });
            break;
        }
        case 'PINK GOLD': {
            ring_body.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xE3D0CD);
                }
            });
            break;
        }
        case 'PLATINUM': {
            ring_body.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.color.set(0xD1D1D1);
                }
            });
            break;
        }
    }
}

$(function(){
    ring_id = $('#ring_id').val();
    stone_list = $('#ring_stone').val().split(",");
    surface_list = $('#ring_surface').val().split(",");
    let list_string = stone_list.map((item)=>{
        if(item!==""){            
            let return_string = `<div class="item-stone" onclick="stone_click('${item}', this)">
                <div class="img-stone">
                    <img src="/img/${item}.png" alt="stone">
                </div>
                <div class="name-stone">${item}</div>
            </div>`
            return return_string;
        }
    }).join(" ");
    $("#stone-box").html(list_string);

    let list_surface_string = surface_list.map((item)=>{
        if(item!==""){  
            let return_string = `<div class="item-material item-material-${item.replace(/\s/g, '').toLowerCase()}" onclick="surface_click('${item}', this)">
                    <div class="img-material">
                    </div>
                    <div class="name-material">${item}</div>
            </div>`
            return return_string;
        }
    }).join(" ");
    $("#surface-box").html(list_surface_string);

    $("#stone-select").click(function(){
        $(".box-bottom").removeClass("show")
        $(".box-stone").addClass("show")
    });

    $("#material-select").click(function(){
        $(".box-bottom").removeClass("show")
        $(".box-material").addClass("show")
    })

    $("#threeJScanvasOutput").click(function(){
        $(".box-bottom").removeClass("show");
        $(".box-btn").addClass("show");
    })
})


