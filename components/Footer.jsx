import styled from 'styled-components'

const FooterWrapper = styled.footer`
    width: 100%;
    border: 5px solid black;
`

export default function Footer() {
    return (
        <FooterWrapper>
            <h1>This is the Footer.</h1>
        </FooterWrapper>
    )
}
