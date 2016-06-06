import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from "./"

storiesOf('QR Reader', module)
.add('with camera', () => (
  <Reader previewHeight={240} previewWidth={320} handleScan={action("Scan")} handleError={action("Scan")} ref="hello"/>
))
