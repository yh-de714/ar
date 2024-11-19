var ring_model;
var eyecatch_image;

//Drag and drop files anywhere onto the viewer
document.addEventListener('dragover', function (event) {
    if($('#ring_upload').hasClass('active') || $('#eyecatch_upload').hasClass('active')) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    }   
}, false);

document.addEventListener('drop', function (event) {
   
    event.stopPropagation(); //Only call loadFile function on drop event (default is to display file as plain text file).
    event.preventDefault();

    if (event.dataTransfer.files.length > 0 && event.dataTransfer.files.length < 2) {

        //Just one file selected e.g. .obj, .dae, .stl
        loadFile(event.dataTransfer.files[0]);
    }

   //More than 1 file (minimum two for model plus texture)
   else if (event.dataTransfer.files.length > 1) {

        //Send to file manager in userModelTextures.js
        var files = event.dataTransfer.files;
        loadFiles(files);
    }

}, false);


var loadFile = function (file) {
    var filename = file.name;

    var extension = filename.split('.').pop().toLowerCase();

    var reader = new FileReader();

    var filenamefirst = filename.replace(/\.[^/.]+$/, "");

    if($('#ring_upload').hasClass('active')) {
        
        if(extension == "glb") {
            $('#ring_add #ring_name').val(filenamefirst);
            ring_model = file;
        }
        else {
            alert( 'Unsupported file format (' + extension +  ').' );
        }
    }   

    if($('#eyecatch_upload').hasClass('active')) {
        if(extension == "png" || extension == "jpg" || extension == "jpeg") {
            $('#ring_add #eyecatch_name').val(filenamefirst);
            eyecatch_image = file;
        }
        else {
            alert( 'Unsupported file format (' + extension +  ').' );
        }
    }
};
