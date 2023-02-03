---
name: Wrong camera selected
about: Report a device that uses a bad default camera (wide-angle, infra-red, ...)
title: ''
labels: ''
assignees: ''

---

If your device defaults to the wrong camera, please [open this demo](https://gruhn.github.io/vue-qrcode-reader/select-camera-demo.html).
You should see a list of all cameras installed on your device.
Copy the list and mark the camera that was picked by default and the camera that should actually be picked.
For example like this:

```
FaceTime HD Camera (Built-in)     [DEFAULT]
A different Camera                [PREFERRED]
Another different Camera
```

Or even better, copy the name of the bad camera and add it to: 

https://github.com/gruhn/vue-qrcode-reader/blob/f7fd9cc812e2a6b3f3dfcff2b418b06b270fc374/src/misc/camera.js#L33

yourself. Then open a pull request.
