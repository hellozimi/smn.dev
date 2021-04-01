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
ffmpeg -y -hide_banner -i input.mp4 \
  -map 0:v -map 0:a -map 0:v -map 0:a \
  -r 30 \
  -filter:v:0 scale=-2:1080 -crf 25 -c:v:0 libx264 -preset fast \
  -filter:v:1 scale=-2:720 -crf 25 -c:v:1 libx264 -preset fast \
  -var_stream_map "v:0,a:0 v:1,a:1" \
  -hls_segment_filename input-%v_%03d.ts \
  -master_pl_name combined.m3u8 \
  input-%v.m3u8
```
