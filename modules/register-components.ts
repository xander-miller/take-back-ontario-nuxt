import { addComponent, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup() {
    // import { MyComponent as MyAutoImportedComponent } from 'my-npm-package'
    addComponent({
      name: 'ModelSelect',
			export: 'ModelSelect',
      filePath: 'vue-search-select',
    })
  },
});