import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import ProductCard from '../../components/ProductCard'
import { getAllProduct, sortByPrice } from '../../fake-data'

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

const PriceFilter = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    font-size: 20px;
`

export default function Products2() {
    // const products = getAllProduct()
    const [direction, setDirection] = useState('ASC')
    const router = useRouter()
    const products = sortByPrice(direction)

    // 重新整理後仍然可以保留排序的結果。使用 shallow routing 把 direction 儲存到 url 的 query string 上來實作。
    // https://ithelp.ithome.com.tw/articles/10269179
    const handleSortingDirectionChange = (e) => {
        const dir = e.target.value
        router.push(`${router.pathname}?direction=${dir}`, undefined, {
            shallow: true,
        })

        // Shallow routing 是一種用於同一個 page 的路由，你能夠改變 url 上的 query string，但是不執行 getServerSideProps 、 getStaticProps 與 getInitialProps 裡面的程式，此外還會保留 page 中的狀態。
        // https://ithelp.ithome.com.tw/articles/10267445
    }

    // 從 router 擷取出 direction 資訊、setDirection()、再去 sortByPrice(direction) 排序撈出資料
    useEffect(() => {
        if (router.query.direction) {
            setDirection(router.query.direction)
        }
    }, [router.query.direction])

    return (
        <Layout>
            <h1>以下的資料，是使用專案 file 的資料</h1>
            <PageTitle>商品列表</PageTitle>
            <PriceFilter>
                Price:
                <select value={direction} onChange={handleSortingDirectionChange}>
                    <option value="ASC">價格由低到高</option>
                    <option value="DES">價格由高到低</option>
                </select>
            </PriceFilter>
            <ProductGallery>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductGallery>
        </Layout>
    )
}
