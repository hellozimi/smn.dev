---
title: "Screen recording using ffmpeg in Ubuntu 20.10"
date: "2021-04-09"
tags:
  - linux
---

<details>
<summary>Prerequisites</summary>

Make sure you have ffmpeg installed.

```bash
$ sudo apt install ffmpeg
```
</details>

You can use x11 to record your screen using the following command in a shell.
To complete the recording just press `Ctrl-C` and the file `recording.mp4`
will be saved in your current working directory.

```bash
$ ffmpeg -hide_banner -loglevel error -f x11grab -i :0 -q:v 0 -r 30 -vcodec mpeg4 recording.mp4
```

If you have multiple monitors connected you need to update the input to `:1` to
get all screens. I made a screen recording script which defaults to your
primary display in `qrandr` but also lets you specify what screen you want to
record.

```bash
# FPS     - Records the screen in 144 fps
# DELAY   - Puts 1s delay before recording starts
# MONITOR - Only record the monitor connected to HDMI-1.
#   To see available monitors run: $ qrandr -q.
#   If you omit `MONITOR` it will use your primary monitor.

$ FPS=144 DELAY=1 MONITOR=HDMI-1 ./screenrec
```

For the latest version of the script see [`screenrec` in my
dotfiles](https://github.com/hellozimi/dotfiles/blob/master/.local/bin/screenrec).
The script will store the recording in `~/recordings` named as the current date
with seconds (`2021-04-09_14:18:30.mp4`).

```bash
#!/usr/bin/env bash

# params as env vars
#   FPS=n
#   DELAY=n 
#   MONITOR=<monitor id>
FPS=${FPS:-60}
DELAY=${DELAY:-0}
MONITOR=${MONITOR:-primary}

sleep "$DELAY"

DATE="$(date +%Y-%m-%d)_$(date +%H:%M:%S)"
OUTPUT_DIR="$(xdg-user-dir VIDEOS)/recordings"
OUTPUT="$OUTPUT_DIR/$DATE.mp4"
mkdir -p $OUTPUT_DIR

size_pos=$(xrandr -q | grep $MONITOR | grep -Eo "[[:digit:]]*x[[:digit:]]*\+[[:digit:]]*\+[[:digit:]]*" | awk -F+ '{print " -s " $1 " -i :1+"$2"+"$3}')

echo "Starting recording. Ctrl-C to stop recording."
ffmpeg -hide_banner -loglevel error -f x11grab $size_pos -q:v 0 -r $FPS -vcodec mpeg4 "$OUTPUT"

echo "Recording saved: $OUTPUT"
```
