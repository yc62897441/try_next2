import styled from 'styled-components'
import Layout from '../../components/Layout.jsx'
import pathsJson from './paths.json'
import Link from 'next/link'
import Loading from '../../components/Loading.jsx'

const PageTitle = styled.h1`
    color: #333;
    margin-top: 30px;
    text-align: center;
`

const BackLink = styled.div`
    text-align: center;
    text-decoration: underline;
`

// Dynamic routes 的 SSG — getStaticPaths
// 使用 getStaticPaths 事先定義哪些頁面需要產生 HTML 檔案。
// paths 這個參數將會決定 dynamic routes 有哪些頁面將會產生 HTML 檔案。
// https://ithelp.ithome.com.tw/articles/10269586
export async function getStaticPaths() {
    return {
        paths: pathsJson.paths, // [{ params: { id: '1' } }, { params: { id: '2' } }, ...]
        // 多層次的定義 pages/posts/[year]/[month]/[day]
        // paths: [
        //     { params: { year: '2021', month: '7', day: '24' } },
        //     { params: { year: '2021', month: '9', day: '28' } },
        // ],

        fallback: true,
        // https://ithelp.ithome.com.tw/articles/10269586
        // fallback 為 false 的行為很單純，意思是說當使用者瀏覽沒有定義在 getStaticPaths 中的頁面時，會回傳 404 的頁面。
        // fallback 為 true，當使用者瀏覽沒有在 getStaticPaths 中定義的頁面時，Next.js 並不會回應 404 的頁面，而是回應 fallback 的頁面給使用者。流程會呼叫 getStaticProps ，在伺服器產生資料前，使用者瀏覽的是 fallback 的頁面，在 getStaticProps 執行完後，同樣由 props 注入資料到網頁中，使用者這時就能看到完整的頁面。經過這個流程的頁面，該頁面會被加入到 pre-rendering 頁面中，下次如果再有同樣頁面的請求時，伺服器並不會再次的重新呼叫 getServerSideProps ，產生新的頁面，而是回應已經產生的頁面給使用者。
        // 簡單說，1. 瀏覽沒有定義在 getStaticPaths 的 path params
        // 2. 會在 getStaticProps 中使用這個 path params 去 call 資料
        // 3. 取得資料前會先給使用者看 fallback 的頁面
        // 4. 取得資料完成後，把資料當 props 注入到頁面中，並且把這個新產生的頁面儲存起來，以後再被請求時可直接回傳這個頁面。
        // fallback 為 blocking，與 true 相同，差別只是在於沒有 router.isFallback 的狀態可以使用，而是讓頁面卡在 getStaticProps 的階段，等待執行完後回傳結果給使用者。
        // fallback 是定義使用者瀏覽 params 沒有定義的頁面時的對應方式。

        // https://ithelp.ithome.com.tw/articles/10269655
        // 假設在電商網站中假設有超過 10 萬件商品，並不是每一件商品都會被使用者看見，如果全部 build 成 HTML 有點不符成本。
        // Next.js 實作了一種功能叫做 Incremental Static Regeneration，這個功能是在 next build 打包階段不用生成所有的頁面，而是讓頁面可以動態的生成(其實就是組合使用 getStaticPaths 與 fallback(設為 true 或是 'blocking')，指打包少量、熱門的商品頁面，其他則使用動態生成)。
        // 但因為電商商品資訊可能會常異動，所以可以設定 revalidate ，在設定的一定時間過後，如果又有使用者瀏覽這個頁面的話，Next.js 就會重新打包這個頁面。

        // https://ithelp.ithome.com.tw/articles/10269655
        // fallback: true v.s. fallback: 'blocking'
        // 'blocking' 的好處是有利於 SEO，雖然對於會執行 JavaScript 的 Google 爬蟲沒有影響，但是像是 Facebook 或 Twitter 等不會執行 JavaScript 的爬蟲， 'blocking' 才能確保爬蟲拿到的資料是完整的。
        // 對於需要經過 authentication 的頁面或是後台頁面來說，也許 true 是一個好的選擇，因為不用在意 SEO，而且透過 web skeleton 可以讓使用者更快地看到網頁預載入的內容框，從另一個面向來看是可以優化 UX 的選擇。
    }
}

// Static Side Generation 指的是在打包階段會將所有渲染所需要的資料都準備好，包括呼叫 API 的資料，最後會將資料都嵌入到 HTML 檔案之中，因此使用者在瀏覽網站時就會直接拿到已經渲染完的 HTML 靜態檔案。
// https://ithelp.ithome.com.tw/articles/10269586
export async function getStaticProps({ params }) {
    const id = params.id
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const post = await res.json()

    return {
        props: {
            post,
        },
    }
}

export default function Post({ post }) {
    return (
        <Layout>
            <h1>
                以下的資料，是使用 getStaticProps，在 build 時去 fetch 資料並把資料塞到
                HTML，生成靜態的 HTML 檔。
            </h1>
            <PageTitle>Post 詳細頁面</PageTitle>
            <BackLink>
                <Link href="/posts">回 posts 列表</Link>
            </BackLink>
            {post ? (
                <>
                    <h1>id: {post.id}</h1>
                    <h1>userId: {post.userId}</h1>
                    <h1>title: {post.title}</h1>
                    <h1>body: {post.body}</h1>
                </>
            ) : (
                <Loading />
            )}
        </Layout>
    )
}
