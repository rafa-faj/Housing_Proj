import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';
import { largeAmenitiesIcons, IconProps } from '@icons';
import Col, { ColProps } from 'react-bootstrap/Col';
import styles from './Amenities.module.scss';
import cn from 'classnames';

export const amenityToIcon = {
  'Pets Friendly': largeAmenitiesIcons.petsFriendly,
  'Common Area': largeAmenitiesIcons.sharedCommonSpace,
  Furnished: largeAmenitiesIcons.furnished,
  'A/C': largeAmenitiesIcons.airConditioning,
  'No Smoking': largeAmenitiesIcons.smokeFree,
  'Indoor Laundry': largeAmenitiesIcons.indoorWasher,
  'Outdoor Parking': largeAmenitiesIcons.outdoorParking,
  'Indoor Parking': largeAmenitiesIcons.indoorParking,
  'Swimming Pool': largeAmenitiesIcons.swimmingPool,
  'Hardwood Floor': largeAmenitiesIcons.hardwoodFloor,
  Elevator: largeAmenitiesIcons.elevator,
  Gym: largeAmenitiesIcons.gym,
};

const allAmenityKeys = Object.keys(amenityToIcon) as [
  keyof typeof amenityToIcon,
];

// TODO extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
interface AmenitiesProps extends ColProps {
  /**
   * The selected amenities to render. If `undefined`, all of them will be rendered
   * (set selected to be an empty array if you don't want any to be rendered)
   */
  selected?: [keyof typeof amenityToIcon];

  /**
   * Component that wraps every icon (icon is passed as `children`)
   */
  // TODO iconWrapper?: FunctionComponent<any> | Component<any, any, any>;
  // temporary below
  // useCol?: boolean;

  /**
   * Select which variant of the Icon/Label pair you want. By default, `horizontal` is selected.
   * `horizontal` -> IconHere  LabelHere
   *
   * `vertical` ->  IconHere
   *           LabelHere
   *
   * `onlyIcon` -> IconHere
   *
   * `onlyLabel` -> LabelHere
   */
  variant?: 'horizontal' | 'vertical' | 'onlyIcon' | 'onlyLabel';

  /**
   * Props to pass through to the icon
   */
  iconProps?: IconProps;
}

const Amenities: FunctionComponent<AmenitiesProps> = ({
  selected: selectedByProp,
  // TODO iconWrapper: IconWrapper = Col,
  variant = 'horizontal',
  // TODO useCol,
  iconProps,
  ...props
}) => {
  return <div />;
  const selected = selectedByProp || allAmenityKeys;

  // TODO const Wrapper: FunctionComponent<any> = (props) =>
  //   useCol ? <Col {...props} /> : <div {...props} />;
  const Wrapper: FunctionComponent<any> = (props) => <Col {...props} />;

  return (
    <Wrapper className="d-flex" {...props}>
      {/* {selected.map((s) => {
        const SelectedIcon = amenityToIcon[s];
        const Icon = () => (variant !== 'onlyLabel' ? <SelectedIcon /> : null);
        const Label = () => (variant !== 'onlyIcon' ? <div>{s}</div> : null);

        return (
          // TODO should return the icon wrapper... but not sure what the type should be
          <div
            className={cn(styles.default, {
              [styles.vertical]: variant === 'vertical',
            })}
          >
            {/* <Icon {...iconProps} /> <Label /> 
          </div>
        );
      })} */}
    </Wrapper>
  );
};

export default Amenities;
