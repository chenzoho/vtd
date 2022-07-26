import { createApp } from "vue"
import App from "./App.vue"
import { setupIcon } from "./setup/icon"

const app = createApp(App)
setupIcon(app)

app.mount("#app")
