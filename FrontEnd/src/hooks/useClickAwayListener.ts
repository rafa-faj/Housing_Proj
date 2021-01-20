import { useEffect, MutableRefObject } from 'react';

/**
 * This is a click away listener. It will run the onClickAway function whenever there is a
 * click that is outside of all of the provided refs.
 * @param refs - an array of refs to check for clicking
 * @param onClickAway - function to run on a click away event
 * @param active - should this be active?
 */
const useClickAwayListener = (
  refs: MutableRefObject<HTMLElement | undefined | null>[],
  onClickAway: (e: MouseEvent) => any,
  active = true,
) => {
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (
        active &&
        e.target !== null &&
        !refs.find(
          (ref) =>
            ref && ref.current && ref.current.contains(e.target as Element),
        )
      ) {
        onClickAway(e);
      }
    };

    // Bind the event listener
    document.addEventListener('click', handleClickAway);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickAway);
    };
  }, [refs, onClickAway, active]);
};

export default useClickAwayListener;
