const imageUpload = document.getElementById('imageUpload')

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
   faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

function start(){
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)
    document.body.append("loading")
    imageUpload.addEventListener('change', async()=> {

        const image = await faceapi.bufferToImage(imageUpload.files[0])
        document.body.append(image)
        const canvas = faceapi.createCanvasFromMedia(image)
        container.append(canvas)
        const displaysize = { width: image.width, height: image.height}
       faceapi.matchDimensions(canvas,displaysize)
        const detection = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
       const reSizeddetection = faceapi.resizeResults(detection, displaysize)
       reSizeddetection.forEach(detection => {
           const box = detection.detection.box
           const drawBox = new faceapi.draw.drawBox(box, {label: 'Face'})
           drawBox.draw(canvas)

           

       });
       
    })
}
