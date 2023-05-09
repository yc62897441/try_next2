import styled, { keyframes } from 'styled-components'

const Spinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const LoadingWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);

    .lds-ring {
        position: relative;
        width: 250px;
        height: 250px;
    }
    .lds-ring div {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border: 30px solid #fff;
        border-radius: 50%;
        animation: ${Spinner} 1.5s cubic-bezier(0.1, 0, 0.3, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: 0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: 0.27s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: 0.1s;
    }
`

export default function Loading() {
    return (
        <LoadingWrapper>
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoadingWrapper>
    )
}
