# coc-split-term

**Working On**
Support for toggling simultaneous terminals. The intention is to share a single toggleable terminal instance across windows as long as only one instance is spawned. When two or more terminals are spawned, they should be tied to the window on which they were spawned.

**Right Now**
This is essentially [coc-terminal](https://github.com/fannheyward/coc-terminal) with more granular controls - exposing more of the internal terminal functions because I didn't love the toggling behavior.

I use these hotkeys so that the toggle behavior is more consistent across normal, insert, and terminal modes.
```
" Toggle the terminal with Ctrl-k
nmap <silent> <C-k> <Plug>(coc-split-term-show)
imap <C-k> <Esc><Plug>(coc-split-term-show)<CR>
tmap <silent> <C-k> <C-\><C-n><Plug>(coc-split-term-hide)
```

## Install

`:CocInstall coc-split-term`

## Keymaps
```
nmap <silent> <C-k> <Plug>(coc-split-term-show)
nmap <silent> <C-k> <Plug>(coc-split-term-hide)
nmap <silent> <C-k> <Plug>(coc-split-term-toggle)
```

## License

MIT

---

> This extension is created by [create-coc-extension](https://github.com/fannheyward/create-coc-extension) and based on [coc-terminal](https://github.com/fannheyward/coc-terminal)
