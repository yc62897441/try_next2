import styled from 'styled-components'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { getProductById } from '../../fake-data'
import ProductCard from '../../components/ProductCard'
import { useState, useEffect } from 'react'

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

const Product = () => {
    const router = useRouter()
    const [product, setProduct] = useState('')

    useEffect(() => {
        let tempProduct = getProductById(router.query.id)
        setProduct(tempProduct)
    }, [router.query.id])

    return (
        <Layout>
            <h1>以下的資料，是使用專案 file 的資料</h1>
            <PageTitle>商品詳細頁面</PageTitle>
            <BackLink>
                <Link href="/products2">回產品列表</Link>
            </BackLink>
            <ProductContainer>
                {product ? <ProductCard product={product} /> : <h1>查無商品資料</h1>}
            </ProductContainer>
        </Layout>
    )
}

export default Product
