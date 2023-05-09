import Link from 'next/link.js'
import styled from 'styled-components'
import Layout from '../../components/Layout.jsx'

const ProductsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 90%;
    margin: 0 auto 20px;
    padding: 5%;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 18px;
    font-weight: 400;

    div {
        width: 100%;
        margin: 5px 0;
    }
`

export default function Products() {
    return (
        <Layout>
            <h1>以下項目的頁面中的資料，應該是使用 CSR 去 fetch 資料，再進行 render</h1>
            <h1>This is the [ Products ] Page.</h1>
            <ProductsListWrapper>
                {Array.from({ length: 10 }, (_value, index) => {
                    return (
                        <div>
                            <Link href={'/products/' + (Number(index) + 1)}>
                                Product {Number(index) + 1}
                            </Link>
                        </div>
                    )
                })}
            </ProductsListWrapper>
        </Layout>
    )
}
