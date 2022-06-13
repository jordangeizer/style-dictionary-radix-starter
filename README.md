# Radix and Style Dictionary Starter Kit

This repo is an easy way to get started with Radix UI colors, without having to expose the full selection of scales to the end user and design system consuming designers/developers.

## About

This style dictionary set up follows the [Radix approach](https://www.radix-ui.com/docs/colors/palette-composition/composing-a-palette) to composing a color system.

Where pre-defined scales, are mapped to an exposed palette, and this palette is mapped to design system tokens.

```
{theme} -> scales -> palette -> tokens
```

## Quickstart


### Install depedencies

```shell
yarn
```


### Map desired scales to palette

A list of available scales is [here](https://www.radix-ui.com/colors).

[tokens/color/mapping/palette.json](tokens/color/mapping/palette.json)

```js

"palette": {
	"core": {
		"1": { "value": "{DesiredRadixScaleName.1}", "type": "color" },
	}
}
```


### Map curated palette onto tokens

[tokens/color/mapping/tokens.json](tokens/color/mapping/tokens.json)

```js
"neutral": {
	"background": {
		"value": "{palette.core.1}", "type": "color"
	}
}
```


### Build output files

```shell
yarn build
```

## Inputs

**Radix Scales** are stored as HSL in JSON and imported on build from these respective locations:

Light theme
- [tokens/color/light/radix-hsl.json](tokens/color/light/radix-hsl.json)
- [tokens/color/light/radix-hsla.json](tokens/color/light/radix-hsla.json)

Dark theme
- [tokens/color/dark/radix-hsl.json](tokens/color/dark/radix-hsl.json)
- [tokens/color/dark/radix-hsla.json](tokens/color/dark/radix-hsla.json)

## Outputs

This repository generates build files for CSS, Figma and JS.
The build task builds out a seperate file for each theme:

1. CSS
   - dark.css
   - light.css
2. FIGMA
   - dark.json
   - light.json
3. JS
   - dark.js
   - light.js
4. Raw Style-Dictionary Data
   - dark.json
   - light.json

## Extending

### Custom token mapping for each theme

Often, you may need to change how color tokens are mapped to the palette for each theme. To do this, simply create a `tokens.json` file inside each theme folder.

### New themes
To create new themes, create a new folder under `tokens/color` and add the theme name to `themes` array at the top of the [config.js](config.js) file.

```js
const themes = ["light", "dark"];
```
