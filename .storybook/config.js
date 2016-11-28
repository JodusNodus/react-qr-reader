import { configure } from '@kadira/storybook'

function loadStories() {
  require('../story.js')
}

configure(loadStories, module)
