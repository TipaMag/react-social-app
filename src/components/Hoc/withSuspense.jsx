import React from 'react'

const withSuspense = (Component) => {
    return (props) => (
        <React.Suspense fallback={<div>Загрузка...</div>}>
            <Component {...props}/>
        </React.Suspense>
    )
}
export default withSuspense