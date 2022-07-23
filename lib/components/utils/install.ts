import type { Plugin } from "vue";

// export const withInstall = <T>(component: T, alias?: string): T => {
// 	const comp = component as any;
// 	comp.install = (app: App) => {
// 		app.component(comp.name || comp.displayName, component);
// 		if (alias) {
// 			app.config.globalProperties[alias] = component;
// 		}
// 	};
// 	return component as T & Plugin;
// };

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      // console.log(comp.name)
      app.component(comp.name, comp);
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};

export type SFCWithInstall<T> = T & Plugin;
