import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={469}
        viewBox="0 0 280 469"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="125" r="120" />
        <rect x="0" y="268" rx="15" ry="15" width="280" height="29" />
        <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="425" rx="10" ry="10" width="95" height="45" />
        <rect x="125" y="425" rx="20" ry="20" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton

