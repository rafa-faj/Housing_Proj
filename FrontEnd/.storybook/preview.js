// TODO we haven't used next/image yet, so leaving below commented for now
// import * as nextImage from 'next/image'; // importing to override next/image for storybook (it won't render right with storybook)
import { Provider } from 'react-redux'
import { configureStore } from '@redux';

// import global styles
import '!style-loader!css-loader!sass-loader!../src/assets/scss/global/_storybook.scss';

const store = configureStore();

export const decorators = [
  // Wrap every story with redux provider so components that use redux won't break
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  )
];

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // Set viewports that you can select in Storybook to see the effect screen size has on the component
  viewport: {
    viewports: {
      mobile: {
        name: 'iPhone X',
        styles: {
          width: '375px',
          height: '812px',
        },
      },
      tablet: {
        name: 'iPad',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      laptop: {
        name: 'Laptop',
        styles: {
          width: '1024px',
          height: '768px',
        },
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: '1440px',
          height: '1024px',
        },
      },
    },
  },
};

// Replace next/image for Storybook so it will render correctly
// TODO we haven't used next/image yet, so leaving below commented for now
// Object.defineProperty(nextImage, 'default', {
//   configurable: true,
//   value: (props) => {
//     const { width, height } = props
//     const ratio = (height / width) * 100
//     return (
//       <div
//         style={{
//           paddingBottom: `${ratio}%`,
//           position: 'relative',
//         }}>
//         <img
//           style={{
//             objectFit: 'cover',
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//           }}
//           {...props}
//         />
//       </div>
//     )
//   },
// });