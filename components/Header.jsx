import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const HeaderWrapper = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border: 5px solid black;
`

const LinksWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
        margin: 0 5px;
        color: navy;
        font-size: 18px;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;

        :hover {
            text-decoration: underline;
        }
    }
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
            <LinksWrapper>
                <Link href={'/'}>首頁</Link>
                <Link href={'/products'}>products(CSR)</Link>
                <Link href={'/products2'}>products2(SSG)</Link>
            </LinksWrapper>
        </HeaderWrapper>
    )
}
