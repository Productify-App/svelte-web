function buildDebouncer(callback: Function, timeout = 300, immediate = false) {
	let timer = 0;
	return (...args: any[]) => {
		if (immediate && !timer) {
			// @ts-ignore
			callback.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			// @ts-ignore
			callback.apply(this, args);
		}, timeout);
	};
}

export { buildDebouncer };
