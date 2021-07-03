// import any logo to be used in the `Icon` type below
import ExampleIcon from './misc/logo.svg';

export {
  default as preferencesIcons,
  preferencesChosen,
  preferencesUnchosen,
} from './preferences';
export * as roomTypeIcons from './roomType';
export { default as contactIcons } from './contact';
export * as miscIcons from './misc';
export * as facilityIcons from './facilities';
export * as filterIcons from './filter';
export { default as carouselIcons } from './carousel';
export * as mapIcons from './map';
export { default as bookmarkIcons } from './bookmarks';
export { default as loading } from './loading';
export * as profileIcons from './profile';
export * as landingIcons from './landing';
export * as roomTypeIconsTemp from './roomTypeCorrect'; // TODO rename correctly
export * as amenityIcons from './amenities';
export * as aboutIcons from './about';

export type Icon = typeof ExampleIcon;
export type IconProps = React.SVGProps<SVGSVGElement>;
export type IconObject = { [key: string]: Icon };
