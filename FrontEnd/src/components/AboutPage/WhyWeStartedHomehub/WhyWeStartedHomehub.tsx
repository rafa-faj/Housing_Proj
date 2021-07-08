import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { aboutIcons, landingIcons } from '@icons';
import { Body2, Subtitle2 } from '@basics';
import useBreakpoints from 'use-window-width-breakpoints';
import styles from './WhyWeStartedHomehub.module.scss';
import Typewriter from 'typewriter-effect';

const OverwhelmedSectionDescription = () => (
  <div className={styles.description}>
    <h4>
      Students can't make informed decisions when overwhelmed by an influx of
      info
    </h4>

    <Body2>
      Looking for housing for the first time can be overwhelming, and we often
      don't know what is right for us.
    </Body2>
  </div>
);

const OverwhelmedSectionVisual = () => (
  <div className={cn(styles.visual, styles.overwhelmedVisual)}>
    <aboutIcons.SelectHousing />
  </div>
);

const OverwhelmedSection = () => {
  const breakpoint = useBreakpoints();

  return (
    <div className={cn(styles.row, styles.overwhelmedWrapper)}>
      {breakpoint.down.md ? (
        <>
          <OverwhelmedSectionVisual />
          <OverwhelmedSectionDescription />
        </>
      ) : (
        <>
          <OverwhelmedSectionDescription />
          <OverwhelmedSectionVisual />
        </>
      )}
    </div>
  );
};

const WhyWeStartedHomehub: FunctionComponent = () => {
  return (
    <>
      <div className={styles.title}>
        <h3 className="d-inline pr-2">Why we started</h3>
        <span className={styles.titleHomehub}>
          <landingIcons.logo className={styles.logo} />
          <h2 className="d-inline pl-2">Homehub</h2>
        </span>
      </div>

      <div className={cn(styles.row, 'justify-content-center')}>
        <div className={cn(styles.UCScamDiego, styles.visual)}>
          <img
            src={aboutIcons.UCScamDiego}
            alt="Off-campus housing is a constant need"
          />
        </div>

        <div className={styles.description}>
          <h4>Off campus housing is a constant need</h4>

          <Body2>
            After the first or second year of college, many students have to
            find off-campus housings for variety of reasons
            <div className={styles.reasonsList}>
              <ul>
                <li>No more guaranteed on-campus housing</li>
                <li>Tight budgets</li>
                <li>Personal needs</li>
                <li>Making the most of college!</li>
              </ul>
            </div>
          </Body2>
        </div>
      </div>

      <OverwhelmedSection />

      <div className={cn(styles.row, styles.problems)}>
        <div className={cn(styles.visual, styles.problemsVisual)}>
          <aboutIcons.ProblemsOnPhone />
        </div>

        <div className={styles.description}>
          <h4>What exactly are the problems?</h4>

          <Subtitle2 className={styles.problemsSubtitle}>
            Facebook? The “standard” for seeking housing
          </Subtitle2>
          <Body2>
            Students usually use Facebook groups that have been set up by fellow
            students when looking for housing and roommates. These groups offer
            <b>limited information</b> on the rentals and <b>lack security</b>.
          </Body2>

          <Subtitle2 className={styles.problemsSubtitle}>
            Friends or classmates? The good, the bad, the ugly
          </Subtitle2>
          <Body2>
            Another common option is to ask friends or classmates if they are
            looking or know anyone looking to move off-campus. This limits many
            students in their options for compatible roommates, making it even
            harder for commuter students.
          </Body2>

          <Subtitle2 className={styles.problemsSubtitle}>
            The hidden criteria
          </Subtitle2>
          <Body2>
            Navigating a rental agreement/lease can be hard enough when you have
            classes, roommates, furniture, etc. We as students often lack the
            expertise to navigate complex rental agreements.
          </Body2>
        </div>
      </div>

      <div className={styles.inComesHomehub}>
        <h4>It comes Homehub</h4>
        <Body2>
          a centralized community for housing, roommates, and connections
        </Body2>
      </div>

      <div className={styles.byStudents}>
        <h2 className={styles.by}>
          <Typewriter
            options={{
              strings: ['By', 'With', 'For'],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>
        <h2 className={styles.students}>students</h2>
      </div>
    </>
  );
};

export default WhyWeStartedHomehub;
