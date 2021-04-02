---
title: "ffmpeg: how to map input to mulitple outputs"
date: "2021-03-31"
tags:
  - ffmpeg
---

I've been using ffmpeg quite a lot the last couple of weeks doing all kinds of
different encoding. I wanted to take one input and export multiple hls
playlists as output in different resolutions and combine the hls files into
a master playlist.


```bash
$ ffmpeg -y -hide_banner -i input.mp4 \
  # The pair of 0:v and 0:a maps the input video and audio
  # to new input streams. We need two of these pairs.
  -map 0:v -map 0:a -map 0:v -map 0:a \
  -r 30 \
  # Specific filter and options for the video stream at index 0
  # target with -<option>:v:<index>.
  # Filter for video stream 0 scales the video to 1080p
  -filter:v:0 scale=-2:1080 -crf 25 -c:v:0 libx264 -preset fast \
  # Filter for video stream 1 scales the video to 720p
  -filter:v:1 scale=-2:720 -crf 25 -c:v:1 libx264 -preset fast \
  # Creates a map with outputs for the hls master playlist
  -var_stream_map "v:0,a:0 v:1,a:1" \
  # Sets the hls segment filenames to `input-<video stream index>_<segment>.ts`
  -hls_segment_filename input-%v_%03d.ts \
  # Naming of the hls master playlist, relative to the output path
  -master_pl_name combined.m3u8 \
  # Output for each streams hls playlist
  input-%v.m3u8
```
