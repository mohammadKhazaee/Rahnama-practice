const range = (start, end) => {
	const len = end - start;
	const firstItem = len > 0 ? start : end;
	const sign = Math.sign(len);

	return Array(sign * len)
		.fill(0)
		.map((_, i) => firstItem + sign * i);
};

console.log(range(100, 90));
console.log(range(90, 100));
