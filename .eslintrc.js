module.exports = {
	extends: [
		'airbnb/legacy'
	],
	rules: {
		'camelcase': 0,
		'comma-dangle': [2, 'never'],
		'comma-spacing': [2, {
			'before': false,
			'after': true
		}],
		'consistent-return': 0,
		'curly': 0,
		'default-case': 0,
		'eqeqeq': 0,
		'func-names': 0,
		'guard-for-in': 0,
		'indent': ["error", "tab", {
			'SwitchCase': 1
		}],
		'no-tabs': 0,
		'key-spacing': [2, {
			'beforeColon': false,
			'afterColon': true
		}],
		'keyword-spacing': [2, {
			'before': true,
			'after': true
		}],
		'max-len': 0,
		'no-bitwise': 0,
		'no-caller': 2,
		'no-console': 0,
		'no-else-return': 0,
		'no-empty-class': 0,
		'no-multi-spaces': 2,
		'no-param-reassign': 0,
		'no-shadow': 0,
		'no-spaced-func': 2,
		'no-throw-literal': 2,
		'no-trailing-spaces': 2,
		'no-undef': 2,
		'no-unneeded-ternary': 2,
		'no-unreachable': 2,
		'no-underscore-dangle': 0,
		'no-unused-expressions': 0,
		'no-unused-vars': 0,
		'no-use-before-define': [1, 'nofunc'],
		'no-var': 0,
		'no-mixed-operators': 0,
		'no-plusplus': 0,
		'no-restricted-syntax': 0,
		'object-curly-spacing': [2, 'always'],
		'one-var': [0, 'never'],
    'no-loop-func': 0,
    'no-lonely-if': 0,
		'no-prototype-builtins': 0,
		'one-var-declaration-per-line': [2, 'always'],
		'padded-blocks': 0,
		'space-before-function-paren': [2, {
			'anonymous': 'always',
			'named': 'never',
			'asyncArrow': 'always'
		}],
		'space-in-parens': [2, 'never'],
		'spaced-comment': [2, 'always'],
		'strict': 0,
		'quote-props': 0,
		'quotes': [2, 'single'],
		'wrap-iife': [2, 'outside'],
		'vars-on-top': 0,
		'global-require': 0
	},
	env: {
		node: true,
		es6: true,
		browser: true,
		jasmine: true,
		mocha: true,
		jquery: true,
		amd: true,
		prototypejs: true,
		mongo: true
	},
	globals: {
		angular: true,
		by: true,
		browser: true,
		element: true,
		inject: true,
		io: true,
		moment: true,
		Modernizr: true,
		Promise: true,
		__TESTING__: true,
		_: false,
		ApplicationConfiguration: true
	}
};
