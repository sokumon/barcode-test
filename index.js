console.log("hello")

const video = document.getElementById('videoElement');

// Define constraints to request only video access
const constraints = {
    video: true,
};

// Access the user's media devices and stream the feed
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            // Attach the stream to the video element's srcObject
            video.srcObject = stream;
            // Play the video stream
            video.play();
        })
        .catch(function(err) {
            // Handle any errors (e.g., user denied permission, no camera found)
            console.error("Error accessing the camera: ", err);
        });
} else {
    document.write("getUserMedia not supported on this browser!");
}

function isBarcodeSupported(){
    if (!("BarcodeDetector" in globalThis)) {
    document.write("Barcode Detector is not supported by this browser.");
    } else {
    console.log("Barcode Detector supported!");

    // create new detector
    const barcodeDetector = new BarcodeDetector({
        formats: ["code_39", "codabar", "ean_13"],
    });
    }
}

isBarcodeSupported();
let barcodeDetector;
BarcodeDetector.getSupportedFormats().then((supportedFormats) => {
    barcodeDetector = new BarcodeDetector({
    formats: supportedFormats
  });
});

function scan(){
    barcodeDetector
  .detect(video)
  .then((barcodes) => {
    let result_content = ""
    barcodes.forEach((barcode) => {
        result_content = barcode.rawValue + "\n";
    });
    result.innerText = result_content;
  })
  .catch((err) => {
    console.log(err);
  });
}