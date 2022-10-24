import type { Component, Plugin } from "vue";
import MainLayout from "@/layouts/VMainLayout.vue"
import LoginLayout from "@/layouts/VLoginLayout.vue"
export const components = {
    MainLayout,LoginLayout
}


export const globalComponentsPlugin:Plugin= {
install(app, ...options) {
    Object.entries(components).forEach(([name,component])=>{
        
        app.component(name ?? '', component)
  
  })
},
}