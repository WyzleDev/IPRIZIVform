import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import RecruitIndex from './views/RecruitIndex.vue'
import RecruitNew from './views/RecruitNew.vue'
import VueTheMask from 'vue-the-mask'
import PrimeVue from 'primevue/config'
import './index.css'
import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/aura-light-green/theme.css'

import { createRouter, createWebHistory } from 'vue-router'
import RecruitEdit from './views/RecruitEdit.vue'

const router = createRouter({
  routes: [
    {
      path: '/recruits',
      component: RecruitIndex
    },
    {
      path: '/recruits/new',
      component: RecruitNew
    },
    {
      path: '/recruits/:id/edit',
      component: RecruitEdit
    }
  ],
  history: createWebHistory()
})

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.use(VueTheMask)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')

if(typeof(String.prototype.strip) === "undefined")
  {
      String.prototype.strip = function() 
      {
          return String(this).replace(/^\s+|\s+$/g, '');
      };
  }