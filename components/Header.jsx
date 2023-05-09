import styled from 'styled-components'
import Image from 'next/image'

const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border: 5px solid black;
`

export default function Header() {
    return (
        <HeaderWrapper>
            <Image
                src="/images/checklist_128.png" // Route of the image file
                width={64} // Desired size with correct aspect ratio
                height={64} // Desired size with correct aspect ratio
                alt="Logo"
            />
            <h1>This is the Header.</h1>
        </HeaderWrapper>
    )
}
