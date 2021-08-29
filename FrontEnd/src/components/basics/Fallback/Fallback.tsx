import React, { FunctionComponent } from 'react';
import { amenityToIcon, Amenity } from '../Amenities/Amenities';
import { Icon as IconType, miscIcons } from '@icons';

// Amenity needs to be any so it can be type guarded
interface FallbackProps {
  amenity: any;
}

// Type guard to check if key is of Amenity type
const isAmenity = (key: any): key is Amenity => {
  if (key in amenityToIcon) {
    return true;
  }

  return false;
};

// Fallback Icon Component (could be a normal amenity svg too)
const FallbackIcon: FunctionComponent<FallbackProps> = ({ amenity }) => {
  if (isAmenity(amenity)) {
    const Icon: IconType = amenityToIcon[amenity];

    // return <>{amenityToIcon[amenity]}</>;
    return (
      <div>
        <Icon />
      </div>
    );
  } else {
    const Icon: IconType = miscIcons.Fallback;
    return (
      <div>
        <Icon />
      </div>
    );
  }
};

export default FallbackIcon;
