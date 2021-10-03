import { useContext, createContext } from "react";

const DisabledContext = createContext({
  disabled: false,
  setDisabled: () => {}
})

export const DisabledConsumer = (component) => {
  const Component = component;
  return function Wrap(props) {
    const { disabled } = useContext(DisabledContext)
    // console.log('===', disabled, props, Component)
    return (
      <Component disabled={disabled} {...props} />
    )
  }
}

export default DisabledContext
