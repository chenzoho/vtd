import mitt from "mitt"

type Events = {
	requestListener: any
}

const emitter = mitt<Events>()

const key = "requestListener"

/**开始监听请求 */
export function setRequestListener(lastChangeRoute: any) {
	emitter.emit(key, lastChangeRoute)
}

/**关闭监听请求 */
export function removeRequestListener() {
	emitter.off(key)
}

/**监听请求 */
export function listenerRequest(callback: (route: any) => void) {
	emitter.on(key, callback)
}
