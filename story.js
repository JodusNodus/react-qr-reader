import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import h from "react-hyperscript"
import Reader from "./"

storiesOf('QR Reader', module)
.add('with camera', () => h(Reader, {handleScan: action("Scan"), handleError: action("Error")}))
