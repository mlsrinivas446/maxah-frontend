import React from "react"

const ReactContext = React.createContext({
    serachInput: "",
    onSetSearchInput: () => {}
})

export default ReactContext