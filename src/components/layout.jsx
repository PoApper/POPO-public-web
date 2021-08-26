import styled, { ThemeProvider } from 'styled-components'
import Navbar from './navbar'
import Footer from './footer'
import theme from '../styles/theme'

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      <main>
        <Wrapper>
          {children}
        </Wrapper>
      </main>
      <Footer/>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 200px);
  max-width: ${({theme}) => theme.contentWidth};
  padding: 8rem 1rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout
