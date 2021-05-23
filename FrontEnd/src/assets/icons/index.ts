import * as navIcons from './nav';
import preferencesIcons, {
  preferencesChosen,
  preferencesUnchosen,
} from './preferences';
import * as roomTypeIcons from './roomType';
import contactIcons from './contact';
import * as miscIcons from './misc';
import * as facilityIcons from './facilities';
import * as filterIcons from './filter';
import carouselIcons from './carousel';
import * as mapIcons from './map';
import bookmarkIcons from './bookmarks';
import loading from './loading';
import * as profileIcons from './profile';
import * as landingIcons from './landing';
import * as roomTypeIconsTemp from './roomTypeCorrect'; // TODO rename correctly
import {
  smallAmenitiesIcons,
  largeAmenitiesIcons,
  translations as amenitiesTranslations,
} from './amenities';

export type Icon = typeof navIcons.logo;
export type IconProps = React.SVGProps<SVGSVGElement>;
export type IconObject = { [key: string]: Icon };

export {
  navIcons,
  preferencesIcons,
  preferencesChosen,
  preferencesUnchosen,
  roomTypeIcons,
  roomTypeIconsTemp,
  contactIcons,
  miscIcons,
  facilityIcons,
  filterIcons,
  carouselIcons,
  mapIcons,
  bookmarkIcons,
  loading,
  profileIcons,
  landingIcons,
  smallAmenitiesIcons,
  largeAmenitiesIcons,
  amenitiesTranslations,
};
