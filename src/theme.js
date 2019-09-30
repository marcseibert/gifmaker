import { grommet, dark } from 'grommet/themes'
import {generate as generateBase} from 'grommet/themes/base'
import { deepMerge } from 'grommet/utils'

const baseTheme = generateBase(18)

const theme = {
    "global": {
        "colors": {
          "active": "rgba(102,102,102,0.5)",
          "border": "rgba(255,255,255,0.33)",
          "brand": "#FD6FFF",
          "control": "#77ff70",
          "focus": "#15a60d",
          "text": "#eeeeee",
          "accent-1": "#FD6FFF",
          "accent-2": "#60EB9F",
          "accent-3": "#60EBE1",
          "accent-4": "#77ff70",
          "neutral-1": "#EB6060",
          "neutral-2": "#01C781",
          "neutral-3": "#6095EB",
          "neutral-4": "#ffee2e",
          "status-critical": "#ff9100",
          "status-error": "#FF3333",
          "status-warning": "#F7E464",
          "status-ok": "#7DD892",
          "status-unknown": "#a8a8a8",
          "status-disabled": "#a8a8a8"
        },
        "drop": {
          "background": "#333333"
        },
        "focus": {
          "border": {
            "color": [
              null,
              ";"
            ]
          }
        },
        "input": {
          "weight": 700
        }
      },
      "anchor": {
        "color": "#FFCA58"
      },
      "layer": {
        "background": "#111111",
        "overlay": {
          "background": "rgba(48,48,48,0.5)"
        }
      }
}

export default deepMerge(baseTheme, dark, theme)