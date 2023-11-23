<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
#overlay {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
  cursor: pointer;
}

#text{
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
}
</style>
</head>
<body>

<div id="overlay" onclick="off()">
  <div id="text">Overlay Text</div>
</div>

<div style="padding:20px">
  <h2>Overlay with Text</h2>
  <button onclick="on()">Turn on overlay effect</button>
</div>

<script>
function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
</script>
<div class="progress"></div>

<style>
.progress {
   --r1: 154%;
   --r2: 68.5%;
   width: 67.2px;
   height: 67.2px;
   border-radius: 50%;
   background: radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,#f87d0b 80%) center left,
        radial-gradient(var(--r1) var(--r2) at bottom,#f87d0b 79.5%,#0000 80%) center center,
        radial-gradient(var(--r1) var(--r2) at top   ,#0000 79.5%,#f87d0b 80%) center right,
        #eeb355;
   background-size: 50.5% 220%;
   background-position: -100% 0%,0% 0%,100% 0%;
   background-repeat: no-repeat;
   animation: progress-mbj53w 2.8s infinite linear;
}

@keyframes progress-mbj53w {
   33% {
      background-position: 0% 33% ,100% 33% ,200% 33%;
   }

   66% {
      background-position: -100%  66%,0%   66% ,100% 66%;
   }

   100% {
      background-position: 0% 100%,100% 100%,200% 100%;
   }
}
</style>

</body>
</html> 