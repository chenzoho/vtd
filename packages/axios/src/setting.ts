import type { IRequsetSetting } from "./types"
const defaultSetting: IRequsetSetting = {
	baseURL: "BASE_URL",
	timeout: 1000 * 60 * 5,
	token: "token",
	attaches: ["system", "unique"],
	parser: (res: any) => {
		return res.data
	}
}

export default defaultSetting
