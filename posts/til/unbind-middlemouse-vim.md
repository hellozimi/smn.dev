---
title: "Disable paste on middle mouse in vim and neovim"
date: "2021-05-04"
---

I had an issue where when I pressed the middle mouse in normal mode in vim on macos it pasted what ever text I had in my clipboard. For some reason vim also interprets mouse 4 and mouse 5 as the middle mouse. So when I accidentally pressed one if my side button it pasted from the clipboard.

There's 4 middle mouse binds you need to disable, single, double, tripple and quadruple click.

```vim
" no paste on middle mouse
map <MiddleMouse> <Nop>
imap <MiddleMouse> <Nop>
map <2-MiddleMouse> <Nop>
imap <2-MiddleMouse> <Nop>
map <3-MiddleMouse> <Nop>
imap <3-MiddleMouse> <Nop>
map <4-MiddleMouse> <Nop>
imap <4-MiddleMouse> <Nop>
```
