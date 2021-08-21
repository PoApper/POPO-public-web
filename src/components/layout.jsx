import styled from 'styled-components'
import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar/>
      <main>
        <Wrapper>
          {children}
        </Wrapper>
      </main>
      <Footer/>
    </>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 200px);
  max-width: 80rem;
  padding: 8rem 1rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout
