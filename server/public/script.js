const socket = io("/");
let USER_ID = undefined;

const videoGrid = document.getElementById("video-grid");

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

socket.on("get-info", (userId) => {
  console.log(userId);
  USER_ID = userId;
});
socket.emit("join-room", ROOM_ID);

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}
