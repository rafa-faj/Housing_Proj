import React, { useState, FunctionComponent } from 'react';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { SchoolYear, majors, BackendMapping } from '@constants';
import { Dropdown, Input, ToggleGroup } from '@basics';
import { miscIcons, profileIcons } from '@icons';
import { logout, userEditProfile } from '@apis';
import { useUser, setUser } from '@redux';
import { User, dummyUser } from '@models';
import styles from './Profile.module.scss';
import Button from '@components/basics/Button'
import cn from 'classnames';

const phoneFormat = (phone: string, previousPhone: string) => {
  const phoneRegex = /\d+/;
  const charArray = [];
  const limit = 14;
  let i;
  for (i = 0; i < Math.min(phone.length, limit); i++) {
    if (phone[i].match(phoneRegex)) {
      charArray.push(phone[i]);
    }
  }
  if (
    previousPhone.length > phone.length && // if it is a delete operation
    phone.length > 0 && // if it is non empty
    !previousPhone[previousPhone.length - 1].match(phoneRegex)
  ) {
    charArray.pop();
  }
  const bracket = charArray.length >= 3;
  const space = charArray.length > 3;
  const horizontal = charArray.length > 6;
  if (horizontal) {
    charArray.splice(6, 0, '-');
  }
  if (space) {
    charArray.splice(3, 0, ' ');
  }
  if (bracket) {
    charArray.splice(0, 0, '(');
    charArray.splice(4, 0, ')');
  }
  return charArray.join('');
};

const Profile: FunctionComponent = () => {
  const userSelected = useUser() || dummyUser;
  const [userSelectedDraft, setUserSelectedDraft] = useState(userSelected); // TODO old code was:  useSelector(selectUserDraft) || dummyUser;
  const dispatch = useDispatch();
  const [activeIndicator, setactiveIndicator] = useState(true);
  const [viewMyPosts, setViewMyPosts] = useState(false);

  return (
    <Container>
      <Row className={styles.content}>
        <Col md={2} className={styles.selectionList}>
          <div className={cn(styles.titleSelected, { [styles.selectOff]: viewMyPosts })}
            onClick={() => setViewMyPosts(false)}>
            <span className={cn(styles.divider, { [styles.dividerOff]: viewMyPosts })}></span>
            <div className={styles.selectItem}>Profile</div>
          </div>
        </Col>

        <Col className={styles.selectionList}>
          <div className={`my-4 px-4 ${styles.middleSection}`}>
            <Row className={styles.userStaticInfo}>
              <Col md={2}>
                <Image src={`https://houseit.s3.us-east-2.amazonaws.com/${userSelectedDraft.profilePhoto}`}
                  roundedCircle className={styles.icon} />
              </Col>
              <Col md={3} className={styles.name_Id}>
                <div className={styles.name}>{userSelectedDraft.name}</div>
                {activeIndicator ? (<div className={styles.UserIdentifier}>{userSelectedDraft.phone}</div>) : (
                  <Form.Control type="text" value={userSelectedDraft.phone} className={styles.phoneNum}
                    onChange={(event) => {
                      console.log(userSelected, 'hello');
                      const previousPhone = userSelectedDraft.phone;
                      setUserSelectedDraft({ ...userSelectedDraft, phone: phoneFormat(event.target.value, previousPhone,), });
                    }} />
                )}
              </Col>
              <Col md={3}>
                <div className={styles.verified}>
                  <profileIcons.tickMark />
                  <span className={styles.smallText}>UCSD Email Verified</span>
                </div>
                <div className={styles.UserIdentifier}>{userSelectedDraft.email}</div>
              </Col>
              <Col className={styles.controlButton}>
                {activeIndicator ? (
                  <Button size="secondary" variant="outline" onClick={() => setactiveIndicator(false)} icon={{ icon: profileIcons.edit }}>
                    Edit
                  </Button>
                ) : (
                  <Button size="secondary" icon={{ icon: profileIcons.save }}
                    onClick={() => { /*userEditProfile(userSelectedDraft);*/ setactiveIndicator(true); }}>
                    Save
                  </Button>
                )}
              </Col>
            </Row>

            <div className={styles.textInfo}>
              <Form.Row>
                <Form.Group as={Col} controlId="profileSchoolYear">
                  <Form.Label className={styles.label}> School year </Form.Label>
                  <Form.Row className={styles.schoolYear}>
                    <ToggleGroup
                      singleSelect
                      content={Object.values(SchoolYear)}
                      initialSelected={userSelectedDraft.schoolYear}
                      readOnly={activeIndicator}
                      onSelect={({ label }) => { setUserSelectedDraft({ ...userSelectedDraft, schoolYear: label as SchoolYear, }); }} />
                  </Form.Row>
                </Form.Group>
              </Form.Row>

              <Form.Row className={styles.dropdown}>
                <Form.Group as={Col} controlId="profileMajor">
                  <Form.Label className={styles.label}>Major</Form.Label>
                  {!activeIndicator ? (
                    <Dropdown options={majors} label="" initialSelected={userSelectedDraft.major} placeholder="Major" className={styles.drop}
                      onSelect={(s) => { setUserSelectedDraft({ ...userSelectedDraft, major: s || userSelectedDraft.major, }); }} />
                  ) : (
                    <Input type="text" value={userSelectedDraft.major} readOnly placeholder="Major" />
                  )}
                </Form.Group>
              </Form.Row>
              <Form.Row className={styles.bio}>
                <Form.Group as={Col} controlId="profileBio">
                  <Form.Label className={styles.label}> Short bio </Form.Label>
                  <Form.Control
                    readOnly={activeIndicator} as="textarea" className={styles.bioText}
                    type="text" maxLength={600} value={userSelectedDraft.description}
                    onChange={(event) => setUserSelectedDraft({ ...userSelectedDraft, description: event.target.value, })}
                  />
                  <span className={styles.charCheck}> {userSelectedDraft.description.length}/600 </span>
                </Form.Group>
              </Form.Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;