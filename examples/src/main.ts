import { createApp } from "vue"
import App from "./App.vue"
import { setupIcon } from "./setup/icon"
import { setupTable } from "./setup/vxetable"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

const app = createApp(App)
setupIcon(app)
setupTable(app)
app.use(ElementPlus)
app.mount("#app")
