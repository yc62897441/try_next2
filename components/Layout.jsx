import styled from 'styled-components'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

const LayoutWrapper = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
`

const MainWrapper = styled.section`
    flex-grow: 1;
`

export default function Layout({ children }) {
    return (
        <LayoutWrapper>
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
        </LayoutWrapper>
    )
}
