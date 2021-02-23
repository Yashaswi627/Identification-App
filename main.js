Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot() 
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QkmKN0tyb/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, getResult);
}

function getResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = "<p style='font-size: 22px;' id='result_object_name'>Object : "+results[0].label+ "</p>";
        document.getElementById("result_object_accuracy").innerHTML = "<p style='font-size: 22px;' id='result_object_accuracy'>Accuracy : "+results[0].confidence.toFixed(3)+"</p>";
    }
}