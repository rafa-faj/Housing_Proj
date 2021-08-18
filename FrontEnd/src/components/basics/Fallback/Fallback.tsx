import React, { FunctionComponent } from 'react';
import { amenityToIcon, Amenity } from '../Amenities/Amenities';
import { miscIcons } from '@icons';

interface FallbackProps {
  amenity: any;
}

const isAmenity = (key: any): key is Amenity => {
  if (key in amenityToIcon) {
    return true;
  }

  return false;
};

const FallbackIcon: FunctionComponent<FallbackProps> = ({ amenity }) => {
  if (isAmenity(amenity)) {
    return <>{amenityToIcon[amenity]}</>;
  } else {
    return <>{miscIcons.Fallback}</>;
  }
};

export default FallbackIcon;
