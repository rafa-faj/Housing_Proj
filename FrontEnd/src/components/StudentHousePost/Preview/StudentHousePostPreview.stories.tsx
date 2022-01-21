import { ComponentProps } from 'react';
import StudentHouseProfilePreview from './StudentHousePostPreview';
import { StoryTemplate } from '@utils';

export default {
  title: 'StudentHouseProfilePreview',
  component: StudentHouseProfilePreview,
};

const Template = StoryTemplate<
  ComponentProps<typeof StudentHouseProfilePreview>,
  typeof StudentHouseProfilePreview
>(StudentHouseProfilePreview);

export const Default = Template.bind({});
Default.args = {
  photos: [
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  ],
  address:
    '12399 SE Really Long Street Name for Test Purposes Trwy NW Unit 1, 12399 SE Really Long Street Name for Test Purposes Trwy NW Unit 1,',
  distance: '20 mins',
  placeName:
    '12399 SE Really Long Street Name for Test Purposes Trwy NW Unit 1, 12399 SE Really Long Street Name for Test Purposes Trwy NW Unit 1,',
  rent: '980',
  numBed: '2',
  numBath: '2',
  utility: '75',
  roomType: 'Double',
  lookingForCount: 'Looking for 1 person to fill',
  stayPeriod: 'Jan 2021 - Jan 2022 (12 mo)',
  roomCapacity: 'Single or Double',
  amenities: [
    'A/C',
    'Balcony / Patio',
    'Bath',
    'Cat Friendly',
    'Ceiling Fan',
    'Clubhouse',
    'Dishwasher',
    'Dog Friendly',
    'Elevator',
    'Furnished',
    'Fitness Center',
  ],
  moveIn: 'Dec/20/2020 - Jan/20/2021',
  genders: ['Prefer female', 'Inclusive'],
  habits: [
    'Clean',
    '420 Friendly',
    'No Drinking',
    'No Party',
    'Overnight Guest Ok',
  ],
  placeDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus, viverra vitae congue eu, consequat ac felis donec et odio pelle',
  userName: 'Cris',
  major: 'Rocket Arts',
  schoolYear: 'Third',
  userBio:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.',
  userEmail: 'troll@ucsd.edu',
  userPhone: '858-777-7658',
  userPhoto:
    'https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1288x467:1290x465)/origin-imgresizer.eurosport.com/2021/08/27/3208031-65715888-2560-1440.jpg',
};
