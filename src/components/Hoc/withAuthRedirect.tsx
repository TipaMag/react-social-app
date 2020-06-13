import React from "react"
import { Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import { AppStateType } from "../../redux/redux-store"

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {

  return function RedirectComponent (props: WCP) {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    if (!isAuth) return <Redirect to="/login" />
    
    return <WrappedComponent {...props} />
  }
  
}
