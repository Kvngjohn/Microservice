const { test, expect } = require('@jest/globals');

test('hello world!', () => {
	expect(1 + 1).toBe(2);
});

test('object equality', () => {
	const obj = { a: 1, b: 2 };
	expect(obj).toEqual({ a: 1, b: 2 });
});

test('array contains value', () => {
	const arr = [1, 2, 3];
	expect(arr).toContain(2);
});

test('string matches regex', () => {
	const str = 'microservice';
	expect(str).toMatch(/service/);
});

test('promise resolves', async () => {
	await expect(Promise.resolve('ok')).resolves.toBe('ok');
});

test('throws error', () => {
	function throwError() {
		throw new Error('fail');
	}
	expect(throwError).toThrow('fail');
});