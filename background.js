let mediaRecorder;
let mediaStream;
let isRecording = false;

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startRecording,
  });
});

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

function handleDataAvailable(event) {
  // Do something with the recorded data, e.g., send it to a server
  console.log("data available", event);
}

function handleStop(event) {
  console.log("recorder stopped", event);
}
