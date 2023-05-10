import styled from 'styled-components'
import Layout from '../../components/Layout'
import { getAllProduct, sortByPrice } from '../../fake-data'
import Link from 'next/link'

const PageTitle = styled.h1`
    color: #333;
    margin-top: 30px;
    text-align: center;
`

const ProductGallery = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 30px 0;
    gap: 24px;
`

export default function Products3() {
    const products = getAllProduct()

    return (
        <Layout>
            <h1>以下的資料，是使用專案 file 的資料</h1>
            <PageTitle>商品列表</PageTitle>
            <ProductGallery>
                {products.map((product) => (
                    <Link key={product.id} href={`/products3/${product.id}`}>
                        product-{product.id}
                    </Link>
                ))}
            </ProductGallery>
        </Layout>
    )
}
