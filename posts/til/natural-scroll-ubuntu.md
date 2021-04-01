---
title: "How to use natural scrolling in Ubuntu 20.10"
date: "2021-04-01"
tags:
  - linux
---

I currently use Ubuntu for all my work. Coming from macos the transition was
easy but one thing I really got used to is the natural scrolling direction,
which is enabled by default on macos. I use it on both touchpads and mouse.

Here's how to update a specific input device to use natural scrolling. In the
examples below I target my Elecom Trackball.

List all available inputs, this example only shows virtual core pointers. My
Elecom Trackball has id `9`

```bash
$ xinput list
⎡ Virtual core pointer                          id=2    [master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
⎜   ↳ ELECOM TrackBall Mouse HUGE TrackBall     id=9    [slave  pointer  (2)]
⎜   ↳ RAMA WORKS RAMA WORKS U80-A Consumer Control      id=11   [slave  pointer  (2)]
⎜   ↳ Logitech USB Receiver                     id=16   [slave  pointer  (2)]
⎜   ↳ Logitech USB Receiver Consumer Control    id=18   [slave  pointer  (2)]
⎣ Virtual core keyboard                         id=3    [master keyboard (2)]
    ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
    ↳ Power Button                              id=6    [slave  keyboard (3)]
    ↳ Power Button                              id=7    [slave  keyboard (3)]
    ↳ Sleep Button                              id=8    [slave  keyboard (3)]
    ↳ RAMA WORKS RAMA WORKS U80-A               id=10   [slave  keyboard (3)]
    ↳ RAMA WORKS RAMA WORKS U80-A Keyboard      id=12   [slave  keyboard (3)]
    ↳ RAMA WORKS RAMA WORKS U80-A System Control        id=13   [slave  keyboard (3)]
    ↳ FiiO DigiHug USB Audio                    id=14   [slave  keyboard (3)]
    ↳ HD Pro Webcam C920                        id=15   [slave  keyboard (3)]
    ↳ Logitech USB Receiver Keyboard            id=17   [slave  keyboard (3)]
    ↳ Logitech USB Receiver System Control      id=19   [slave  keyboard (3)]
    ↳ Eee PC WMI hotkeys                        id=20   [slave  keyboard (3)]
    ↳ ELECOM TrackBall Mouse HUGE TrackBall     id=21   [slave  keyboard (3)]
    ↳ RAMA WORKS RAMA WORKS U80-A Consumer Control      id=22   [slave  keyboard (3)]
    ↳ Logitech USB Receiver Consumer Control    id=23   [slave  keyboard (3)]
```

List all properties for your selected pointer device.
You should be looking for the `Natural Scrolling Enabled` and `Natural
Scrolling Enabled Default`.

```bash
# xinput list-props <id>
$ xinput list-props 9

Device 'ELECOM TrackBall Mouse HUGE TrackBall':
        Device Enabled (155):   1
        Coordinate Transformation Matrix (157): 1.000000, 0.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000, 0.000000, 1.000000
        libinput Natural Scrolling Enabled (289):       0
        libinput Natural Scrolling Enabled Default (290):       0
        libinput Scroll Methods Available (291):        0, 0, 1
        libinput Scroll Method Enabled (292):   0, 0, 0
        libinput Scroll Method Enabled Default (293):   0, 0, 0
        libinput Button Scrolling Button (294): 2
        libinput Button Scrolling Button Default (295): 2
        libinput Button Scrolling Button Lock Enabled (296):    0
        libinput Button Scrolling Button Lock Enabled Default (297):    0
        libinput Middle Emulation Enabled (298):        0
        libinput Middle Emulation Enabled Default (299):        0
        libinput Rotation Angle (300):  0.000000
        libinput Rotation Angle Default (301):  0.000000
        libinput Accel Speed (302):     0.000000
        libinput Accel Speed Default (303):     0.000000
        libinput Accel Profiles Available (304):        1, 1
        libinput Accel Profile Enabled (305):   1, 0
        libinput Accel Profile Enabled Default (306):   1, 0
        libinput Left Handed Enabled (307):     0
        libinput Left Handed Enabled Default (308):     0
        libinput Send Events Modes Available (274):     1, 0
        libinput Send Events Mode Enabled (275):        0, 0
        libinput Send Events Mode Enabled Default (276):        0, 0
        Device Node (277):      "/dev/input/event12"
        Device Product ID (278):        1390, 269
        libinput Drag Lock Buttons (309):       <no items>
        libinput Horizontal Scroll Enabled (310):       1
```

Update the value by using the id of `Natural Scrolling Enabled`. In my case
this id is `289` and the value should be `1` to enable it.

```bash
# xinput set-prop <id> <setting-id> <value>
$ xinput set-prop 9 289 1
```
