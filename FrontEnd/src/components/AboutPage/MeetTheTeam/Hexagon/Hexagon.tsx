import React, {
  FunctionComponent,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
} from 'react';
import styles from './Hexagon.module.scss';
import HexagonPopover, {
  HexagonDetails,
} from './HexagonPopover/HexagonPopover';

interface HexagonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  details?: HexagonDetails;
  imgSrc?: Pick<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'src'
  >;
}

const HexagonUI: FunctionComponent = () => <div className={styles.hexagon} />;

const Hexagon: FunctionComponent<HexagonProps> = ({
  details,
  imgSrc,
  ...divProps
}) => {
  if (!details) {
    return <HexagonUI />;
  }

  return (
    <HexagonPopover details={details}>
      <HexagonUI />
    </HexagonPopover>
  );
};

export default Hexagon;
