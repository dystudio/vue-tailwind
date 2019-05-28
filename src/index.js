import DefaultTheme from './themes/default.js'

import TInput from './elements/TInput.vue'
import TTextarea from './elements/TTextarea.vue'
import TSelect from './elements/TSelect.vue'
import TButton from './elements/TButton.vue'
import TRadio from './elements/TRadio.vue'
import TRadioGroup from './elements/TRadioGroup.vue'
import TCheckbox from './elements/TCheckbox.vue'

import TDropdown from './components/TDropdown.vue'

const components = {
  TInput: TInput,
  TTextarea: TTextarea,
  TSelect: TSelect,
  TButton: TButton,
  TRadio: TRadio,
  TRadioGroup: TRadioGroup,
  TCheckbox: TCheckbox,
  TDropdown: TDropdown,
}

/**
 * Will extend the component with the merged classes added in the settings
 */
function extendComponent (Vue, CurrentTheme, componentName) {
  const propsDefaults = CurrentTheme[componentName]

  let props = components[componentName].props

  Object.keys(propsDefaults).forEach(key => {
    const prop = {
      default: propsDefaults[key]
    }
    props[key] = prop
  })

  return Vue.extend({
    ...components[componentName],
    ...{
      props
    }
  })
}

const VueTailwind = {
  install (Vue, args = {}) {
    if (this.installed) {
      return
    }

    this.installed = true

    const CurrentTheme = {
      ...DefaultTheme,
      ...args.theme || {}
    }

    const componentsToRegister = args.components || Object.keys(components)

    componentsToRegister.forEach(componentName => {
      Vue.component(componentName, extendComponent(Vue, CurrentTheme, componentName))
    })
  }
}

export default VueTailwind