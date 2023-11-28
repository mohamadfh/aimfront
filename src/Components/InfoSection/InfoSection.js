import React from 'react'
import {
    InfoSec,
    InfoRow,
    InfoColumn,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img,
    Paragraph
} from './InfoSection.elements'
import { Container, Button } from '../../globalStyles'
import { Link } from 'react-router-dom'

const InfoSection = ({

                         primary,
                         lightBg,
                         topLine,
                         lightTopLine,
                         lightText,
                         lightTextDesc,
                         headline,
                         description,
                         buttonLabel,
                         buttonLink,
                         img,
                         alt,
                         imgStart,
                         start,
                         oneColumn
                     }) => {
    return (
        <>
            <InfoSec lightBg={lightBg}>
                <Container>
                    {oneColumn ? (<>
                        {headline === '' ? (null) : <Heading lightText={lightText}>{headline}</Heading>}
                        {description.map((desc)=> <Paragraph lightTextDesc={lightTextDesc}>{desc}</Paragraph>)}
                    </>):(<InfoRow imgStart={imgStart}>

                            <InfoColumn>
                                <TextWrapper>
                                    {topLine === '' ? (null) : <TopLine lightTopLine={lightTopLine} style={{height:50}}>{''}</TopLine>}
                                    {headline === '' ? (null) : <Heading lightText={lightText}>{headline}</Heading>}
                                    <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
                                    {buttonLabel === '' ? (null) : <Link to={buttonLink}> <Button big fontBig primary={primary}>{buttonLabel}</Button></Link>}
                                </TextWrapper>
                            </InfoColumn>
                            <InfoColumn>
                                <ImgWrapper start={start}>
                                    <Img src={img} alt={alt} />
                                </ImgWrapper>
                            </InfoColumn>
                        </InfoRow>)}

                </Container>
            </InfoSec>
        </>
    )
}

export default InfoSection;