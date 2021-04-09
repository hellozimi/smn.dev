---
title: "Keyboard shortcuts on mouse button on Ubuntu 20.10 (sxkhd)"
date: "2021-04-08"
tags:
  - linux
---

I have started using my [ELECOM Huge
Trackball](https://www.amazon.com/ELECOM-M-HT1DRBK-Wireless-Trackball-Mouse/dp/B0735584RM) more and more and for both
Windows and macos there's a software to control all the buttons on the mouse
but unfortunately for me there's none for Linux. Left click, right click and
the scroll wheel works out of the box. But there's 3 more buttons I would like
to use.

There's two buttons left of the ball I would like bound to page up/down and the
most right button I would macro to paste. All this is possible with a tool
called `xdotool`. I'm using sxkhd for keyboard and mouse binds, I will have all
my mouse button binds stored in sxkhd.

```sh
$ sudo apt install xdotool
```

To see what button codes to use start the xinput testing tool and press the
button you want to bind. Look for the `detail: n`. The detail n is the button
number we will use in the config later on.

This command will monitor all inputs from your keyboard and mouse, there will
be a lots of events but you'll see a pattern once you start pressing your
button. To exit focus the shell and press `control+c`.

```sh
$ xinput test-xi2 --root
```

Now open your sxkhd config and bind your shortcuts to your mouse.

```sh
# Top button left of trackball (page up)
button10
  xdotool key Page_Up

# Bottom button left of trackball (page down)
button11
  xdotool key Page_Down

# Most right button (paste)
button12
  xdotool key Control_L+V
```

_Here's a [list of keycodes for xdotool](https://gitlab.com/cunidev/gestures/-/wikis/xdotool-list-of-key-codes)_

