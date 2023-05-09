import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const Product = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 24px;
    gap: 16px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 4px 4px 12px 1px rgb(0 0 0 / 20%);
    min-height: 240px;
    width: 90%;
`

const ImageWrapper = styled.div`
    width: 120px;
    height: 167px;
    position: relative;
    flex-shrink: 0;

    @media (min-width: 768px) {
        width: 144px;
        height: 200.5px;
    }
    @media (min-width: 1200px) {
        width: 180px;
        height: 250.5px;
    }
`

const ProductDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-shrink: 1;
    width: 100%;
`

const ProductTitle = styled.div`
    color: #333;
    font-size: 20px;

    /* 行數限制 */
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    word-break: break-all; /* 文字強迫換行，英文字會被切一半 */
    white-space: normal; /* 設置如何處理元素內的空白。 normal 默認。空白會被瀏覽器忽略。 */

    &:hover {
        color: #783f8e;
    }
`

const ProductDescription = styled.div`
    color: #7d7d7d;
    font-size: 16px;
    width: 100%;
    flex-shrink: 1;

    /* 行數限制 */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    word-break: break-all; /* 文字強迫換行，英文字會被切一半 */
    white-space: normal; /* 設置如何處理元素內的空白。 normal 默認。空白會被瀏覽器忽略。 */
`

const ProductPrice = styled.div`
    font-size: 24px;
`

const ProductRatingWrapper = styled.div`
    display: inline;

    .ratings {
        position: relative;
        display: inline-block;
        vertical-align: middle; /* 用來設計網頁中圖片在垂直方向的對齊方式 */
        color: #b1b1b1;
        overflow: hidden;
    }

    .full-stars {
        position: absolute;
        left: 0;
        top: 0;
        width: ${({ ratingPercent }) => (ratingPercent ? ratingPercent : '70%')};
        overflow: hidden;
        color: #fde16d;

        :before {
            content: '★★★★★';
            font-size: 20px;
            -webkit-text-stroke: 1px orange; /* 幫文字描邊 */
        }
    }

    .empty-stars {
        position: relative;

        :before {
            content: '★★★★★';
            font-size: 20px;
            -webkit-text-stroke: 1px #848484; /* 幫文字描邊 */
        }
    }

    .ratingVoteCount {
        font-size: 16px;
    }
`

export default function ProductCard({ product }) {
    const { id, image, title, description, price, rating } = product
    return (
        <Product key={id}>
            <ImageWrapper>
                <Image
                    src={image}
                    alt="product"
                    fill
                    sizes="(min-width: 768px) 144px, (min-width: 1200px) 180px, 120px"
                    style={{ objectFit: 'contain' }}
                    priority={false}
                />
            </ImageWrapper>
            <ProductDetail>
                <Link href={`/products2/${id}`} passHref>
                    <ProductTitle>{title}</ProductTitle>
                </Link>
                <ProductDescription>{description}</ProductDescription>
                <ProductPrice>${price}</ProductPrice>
                <ProductRatingWrapper
                    ratingPercent={Math.floor((100 * Number(rating.rate)) / 5) + '%'}
                >
                    <div className="ratings">
                        <div className="empty-stars"></div>
                        <div className="full-stars"></div>
                        <div className="ratingVoteCount">{'(' + rating.count + ')'}</div>
                    </div>
                </ProductRatingWrapper>
            </ProductDetail>
        </Product>
    )
}
