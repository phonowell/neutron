# import 'include/admin.ahk'
import 'include/head.ahk'
import 'lib/Neutron.ahk'
import 'shell-ahk'

import html from 'static/index.html'
import css from 'static/index.css'
import js from 'static/index.js'

# declare
$ = $

width = 320
height = 80

Webview = new Neutron html, css, js
Webview.Gui '+LabelNeutron'
WebView.Show "w#{width} h#{height}"

do -> # load clock

  $ifr = Webview.Document.QuerySelector '.ifr-clock'
  $ifr.src = "#{A_WorkingDir}/static/index.html"

  hWnd = Webview.hWnd
  `WinSet, AlwaysOnTop, On, ahk_id %hWnd%`
  `WinSet, Transparent, 205, ahk_id %hWnd%`

```
return
NeutronClose:
ExitApp
return
```