import styled from 'styled-components'
import Link from 'next/link'
import Layout from '../../components/Layout'
import ProductCard from '../../components/ProductCard'

const PageTitle = styled.h1`
    color: #333;
    margin-top: 30px;
    text-align: center;
`

const BackLink = styled.div`
    text-align: center;
    text-decoration: underline;
`

const ProductContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`

export async function getServerSideProps({ params }) {
    const api = `https://fakestoreapi.com/products/${params.id}`
    const res = await fetch(api)
    const json = await res.json()

    return {
        props: { product: json },
    }
}

const Product = ({ product }) => {
    return (
        <Layout>
            <h1>以下的資料，是使用 getStaticProps 去處理資料</h1>
            <PageTitle>商品詳細頁面</PageTitle>
            <BackLink>
                <Link href="/products3">回產品列表</Link>
            </BackLink>
            <ProductContainer>
                {product ? <ProductCard product={product} /> : <h1>查無商品資料</h1>}
            </ProductContainer>
        </Layout>
    )
}

export default Product
