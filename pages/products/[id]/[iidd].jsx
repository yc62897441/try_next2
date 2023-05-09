import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'

export default function Product() {
    const router = useRouter()
    const { id, iidd } = router.query

    return (
        <Layout>
            <h1>
                This is the [ Product {id}/{iidd} ] Page.
            </h1>
            <h1>這個頁面用來測試 catch all routes</h1>
            <h1>例如 /products/&lt;id&gt;/&lt;iidd&gt;</h1>
        </Layout>
    )
}
