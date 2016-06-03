import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import Reader from "./"

storiesOf('QR Reader', module)
.add('with camera', () => (
  <Reader previewHeight={480} previewWidth={640} handleScan={action("Scan")} handleError={action("Scan")} ref="hello"/>
))
