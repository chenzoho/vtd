import { createApp } from "vue"
import App from "./App.vue"
import { setupIcon } from "./setup/icon"
import { setupTable } from "./setup/vxetable"

const app = createApp(App)
setupIcon(app)
setupTable(app)
app.mount("#app")
