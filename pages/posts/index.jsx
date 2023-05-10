import Layout from '../../components/Layout.jsx'
import pathsJson from './paths.json'
import Link from 'next/link'
import { LinksWrapper } from '../../components/Header.jsx'

export async function getStaticProps() {
    return {
        props: {
            paths: pathsJson.paths,
        },
    }
}

export default function Posts({ paths }) {
    return (
        <Layout>
            <h1>
                以下的資料，是使用 getStaticProps，在 build 時去讀取專案內的資料(也可以 fetch AIP 或
                query Database)並把資料塞到 HTML，生成靜態的 HTML 檔。
            </h1>
            {paths.length > 0 && (
                <LinksWrapper>
                    {paths.map((link) => (
                        <Link key={link.params.id} href={'/posts/' + link.params.id}>
                            post-{link.params.id}
                        </Link>
                    ))}
                </LinksWrapper>
            )}
        </Layout>
    )
}
