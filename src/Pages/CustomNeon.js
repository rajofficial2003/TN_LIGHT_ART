import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import Header from '../Components/Header';
import SingleFooter from '../Components/Footer';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NeonGlow';
    src: url('/fonts/NeonGlow.otf') format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: 'NeonLights';
    src: url('/fonts/NeonLights.otf') format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: 'NeonTube';
    src: url('/fonts/NeonTube.otf') format('opentype');
    font-display: swap;
  }
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #0a0a0a;
    color: #ffffff;
  }
`;

const PageContainer = styled.div`
  margin-top: 60px;
`;

const HeroSection = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/neon-background.jpg');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-family: 'NeonGlow', 'Arial', sans-serif;
  text-shadow: 0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'NeonLights', 'Arial', sans-serif;
`;

const DesignerSection = styled.section`
  padding: 4rem 0;
  background-color: #1a1a1a;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const DesignerTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #40E0D0;
  font-family: 'NeonTube', 'Arial', sans-serif;
  font-size: 2.5rem;
  text-shadow: 0 0 10px #40E0D0, 0 0 20px #40E0D0;
`;

const NeonPreview = styled.div`
  background-color: #000;
  padding: 3rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
`;

const NeonText = styled.p`
  font-size: 4rem;
  margin: 0;
  padding: 1rem;
  color: ${props => props.color};
  font-family: ${props => props.font}, 'Arial', sans-serif;
  text-shadow: 0 0 5px ${props => props.color},
               0 0 10px ${props => props.color},
               0 0 20px ${props => props.color},
               0 0 40px ${props => props.color};
`;

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  background-color: #2a2a2a;
  border: 1px solid #40E0D0;
  color: #ffffff;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  background-color: #2a2a2a;
  border: 1px solid #40E0D0;
  color: #ffffff;
  border-radius: 5px;
`;

const ColorPalette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#ffffff' : 'transparent'};
  cursor: pointer;
  background-color: ${props => props.color};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const PricingSection = styled.section`
  padding: 4rem 0;
  background-color: #0a0a0a;
`;

const PricingTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #40E0D0;
  font-family: 'NeonTube', 'Arial', sans-serif;
  font-size: 2.5rem;
  text-shadow: 0 0 10px #40E0D0, 0 0 20px #40E0D0;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const PricingCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(64, 224, 208, 0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

const PricingCardTitle = styled.h3`
  margin-bottom: 1rem;
  color: #ffffff;
  font-family: 'NeonLights', 'Arial', sans-serif;
  font-size: 2rem;
`;

const PricingCardPrice = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  color: #40E0D0;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #40E0D0;
`;

const PricingCardFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const PricingCardFeature = styled.li`
  margin-bottom: 0.75rem;
  color: #cccccc;
`;

const Button = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #40E0D0;
  color: #000310;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #2CC1B1;
    box-shadow: 0 0 15px #40E0D0;
    transform: translateY(-3px);
  }
`;

const ErrorMessage = styled.div`
  background-color: #ff6b6b;
  color: white;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 5px;
  text-align: center;
`;

const CustomNeonPage = () => {
  const [neonText, setNeonText] = useState('Your Text Here');
  const [neonFont, setNeonFont] = useState('NeonGlow');
  const [neonColor, setNeonColor] = useState('#ff00de');
  const [error, setError] = useState(null);

  const fonts = [
    'NeonGlow', 'NeonLights', 'NeonTube',
    'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana',
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
    'Trebuchet MS', 'Arial Black', 'Impact'
  ];

  const colors = [
    '#ff00de', '#00ff00', '#0000ff', '#ffff00', '#00ffff',
    '#ff0000', '#ffffff', '#FFA500', '#800080', '#FFC0CB',
    '#40E0D0', '#FF1493', '#7FFF00', '#FF4500', '#1E90FF'
  ];

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontPromises = [
          new FontFace('NeonGlow', 'url(/fonts/NeonGlow.otf)'),
          new FontFace('NeonLights', 'url(/fonts/NeonLights.otf)'),
          new FontFace('NeonTube', 'url(/fonts/NeonTube.otf)')
        ].map(font => font.load());

        await Promise.all(fontPromises);
        document.fonts.add(...fontPromises);
      } catch (err) {
        console.error('Error loading fonts:', err);
        setError('');
      }
    };

    loadFonts();
  }, []);

  return (
 <div className="">
    <Header/>
       <ErrorBoundary>
      <PageContainer>
        <GlobalStyle />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <HeroSection>
          <HeroContent>
            <Title>Illuminate Your World</Title>
            <Subtitle>Create stunning custom neon signs that bring your ideas to life</Subtitle>
            <Button href="#designer">Start Designing Now</Button>
          </HeroContent>
        </HeroSection>

        <DesignerSection id="designer">
          <Container>
            <DesignerTitle>Neon Sign Designer</DesignerTitle>
            <NeonPreview>
              <NeonText color={neonColor} font={neonFont}>
                {neonText}
              </NeonText>
            </NeonPreview>
            <ControlsContainer>
              <Input
                type="text"
                value={neonText}
                onChange={(e) => setNeonText(e.target.value)}
                placeholder="Enter your text"
              />
              <Select
                value={neonFont}
                onChange={(e) => setNeonFont(e.target.value)}
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </Select>
              <ColorPalette>
                {colors.map((color) => (
                  <ColorOption
                    key={color}
                    color={color}
                    selected={color === neonColor}
                    onClick={() => setNeonColor(color)}
                  />
                ))}
              </ColorPalette>
            </ControlsContainer>
          </Container>
        </DesignerSection>

        <PricingSection>
          <Container>
            <PricingTitle>Choose Your Perfect Neon Package</PricingTitle>
            <PricingGrid>
              <PricingCard>
                <PricingCardTitle>Starter Glow</PricingCardTitle>
                <PricingCardPrice>From $149</PricingCardPrice>
                <PricingCardFeatures>
                  <PricingCardFeature>Up to 15 characters</PricingCardFeature>
                  <PricingCardFeature>1 color</PricingCardFeature>
                  <PricingCardFeature>5 font options</PricingCardFeature>
                  <PricingCardFeature>Basic remote control</PricingCardFeature>
                </PricingCardFeatures>
                <Button href="#order">Illuminate Now</Button>
              </PricingCard>
              <PricingCard>
                <PricingCardTitle>Radiant Plus</PricingCardTitle>
                <PricingCardPrice>From $249</PricingCardPrice>
                <PricingCardFeatures>
                  <PricingCardFeature>Up to 25 characters</PricingCardFeature>
                  <PricingCardFeature>2 colors</PricingCardFeature>
                  <PricingCardFeature>10 font options</PricingCardFeature>
                  <PricingCardFeature>Advanced remote control</PricingCardFeature>
                  <PricingCardFeature>Basic shapes included</PricingCardFeature>
                </PricingCardFeatures>
                <Button href="#order">Shine Brighter</Button>
              </PricingCard>
              <PricingCard>
                <PricingCardTitle>Luminous Deluxe</PricingCardTitle>
                <PricingCardPrice>From $399</PricingCardPrice>
                <PricingCardFeatures>
                  <PricingCardFeature>Unlimited characters</PricingCardFeature>
                  <PricingCardFeature>Multiple colors</PricingCardFeature>
                  <PricingCardFeature>All fonts available</PricingCardFeature>
                  <PricingCardFeature>Smart app control</PricingCardFeature>
                  <PricingCardFeature>Custom shapes & designs</PricingCardFeature>
                  <PricingCardFeature>Premium mounting kit</PricingCardFeature>
                </PricingCardFeatures>
                <Button href="#order">Dazzle Now</Button>
              </PricingCard>
            </PricingGrid>
          </Container>
        </PricingSection>
      </PageContainer>
    </ErrorBoundary>
    <SingleFooter/>
 </div>
  );
};

export default CustomNeonPage;

