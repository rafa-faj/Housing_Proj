# Homehub frontend baby let's gooo

Homehub helps students find housing and roommates. Check it out at http://homehubdope.com/ !

## Get started

This project uses NextJS (v10, https://nextjs.org/) with TypeScript (v4.2), SCSS, Redux, SWR, and some other tools.

To get started, clone this repo and run `yarn` or `npm i` to install all necessary NPM packages. Then run
one of the below scripts to get the code running (probably `dev`).

## Available Scripts

### `yarn dev` or `npm dev`

Runs `next dev` which starts Next.js in **development** mode. <br />
Page will reload if you make edits.

### `yarn build` or `npm build`

Runs `next build` which builds the application for production usage. <br />
Need to run this before running the `start` script.

### `yarn start` or `npm start`

Runs `next start` which starts a Next.js **production** server. <br />
Need to run the `build` script before running this.


## VSCode Plugins we use (download this)
- **ESLint**: linter for the code to unify styles.
- **Prettier**: formatter for the code.
- **Prettier** ESLint

## The file system

Basically all code should go in the `src` folder.

The subfolders of `src` are aptly named:
- Components should go in `components` and commonly used components (i.e. Button) should go in `components/basics`
- APIs in `apis`
- Icons in `assets/icons`
- Global styles in `assets/scss/global` and scss utilities (vars, mixins, etc) in `assets/scss/utils`
- Constants in `constants` (you can make a new file if necessary)
- React Hooks in `hooks` (SWR hooks should go in `hooks/swr`)
- TypeScript Models in `models`
- Routing in `pages`. Make sure to create the page itself in the `components` folder and then export it in the appropriate `pages` file (we do this to separate routing and components)
- Redux in `redux`. If you need a new slice, make it in the `redux/slices` folder
- Utils in `utils`
