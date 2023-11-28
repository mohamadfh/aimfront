import React from 'react';
import InfoSection from '../InfoSection/InfoSection';
import { homeObjOne, homeObjThree} from './Data';

const AboutPage = () => {
    return (
        <>
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjThree} />
        </>
    )
}

export default AboutPage;