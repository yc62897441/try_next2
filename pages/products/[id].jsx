import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const ProductWrapper = styled.div`
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
`

const ProductInfo = styled.div`
    width: 100%;
    margin: 5px 0;
    span {
        font-weight: 600;
    }
`

const ProductImgWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    height: 100%;
    border-radius: 15px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        object-fit: contain;
    }
`

// export async function getStaticPaths() {}

// export async function getStaticProps() {
//     return {
//         props: { data },
//     }
// }

// SSR 使用
// export async function getServerSideProps() {
//     return {
//         props: {},
//     }
// }

export default function Product() {
    const router = useRouter()
    const [fetchData, setFetchData] = useState({})
    const id = router.query.id

    useEffect(() => {
        async function fetchData(id) {
            if (typeof id === 'undefined') return

            let data = await fetch(`https://dummyjson.com/products/${id}`)
                .then((res) => res.json())
                .then((json) => {
                    return json
                })

            setFetchData(data)
        }

        fetchData(id)
    }, [id])

    return (
        <Layout>
            <h1>This is the [ Product {id} ] Page.</h1>
            <h1>這個 Page 應該是使用 CSR 去 fetch 以下資料才進行 render</h1>
            {fetchData && (
                <ProductWrapper>
                    {Object.keys(fetchData).map((key) => {
                        if (key === 'images') {
                            return (
                                <ProductImgWrapper key={key}>
                                    <img src={fetchData[key][0]} alt="product img" srcSet="" />
                                </ProductImgWrapper>
                            )
                        } else if (key === 'thumbnail') {
                            return ''
                        } else {
                            return (
                                <ProductInfo key={key}>
                                    <span>{key}:</span> {fetchData[key]}
                                </ProductInfo>
                            )
                        }
                    })}
                </ProductWrapper>
            )}
        </Layout>
    )
}
