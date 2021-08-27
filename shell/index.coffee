# import 'include/admin.ahk'
import 'include/head.ahk'
import 'lib/Neutron.ahk'
import html from '../source/index.html'
import css from '../source/index.css'
import js from '../source/index.js'
import 'shell-ahk'

# declare
$ = $

title = 'Homepage'
width = 1280
height = 720

webview = new NeutronWindow html, css, js, title
webview.Gui '+LabelNeutron'
webView.Show "w#{width} h#{height}"
webView.Load 'build/index.html'
return

```
NeutronClose:
ExitApp
return
```