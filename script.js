let mediaStream;
let mediaRecorder;
let isRecording = false;
let recordedChunks = []; // Define recordedChunks here

const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");

startRecordingButton.addEventListener("click", startRecording);
stopRecordingButton.addEventListener("click", stopRecording);

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedChunks.push(event.data);
  }
}

function handleStop(event) {
  console.log("Recorder stopped: ", event);
  const superBuffer = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(superBuffer);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "capture.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}
async function startRecording() {
  const displayMediaOptions = { video: true };
  mediaStream = await navigator.mediaDevices.getDisplayMedia(
    displayMediaOptions
  );

  mediaRecorder = new MediaRecorder(mediaStream);

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;

  mediaRecorder.start();
  isRecording = true;
}

async function stopRecording() {
  if (!mediaRecorder || !isRecording) {
    return;
  }
  mediaRecorder.stop();
  isRecording = false;
}
