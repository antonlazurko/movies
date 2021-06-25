import React, { useState } from "react";

type TInjectedProps = {
  toggleStatus: Boolean;
  toggle: () => void;
};
const Button = ({ primeTitle, secTitle, toggle, toggleStatus }: any) => (
  <button onClick={toggle}>{toggleStatus ? primeTitle : secTitle}</button>
);
const componentWithToggle = <TBaseProps extends TInjectedProps>(
  Component: React.ComponentType<TBaseProps>
) => (props: TBaseProps) => {
  const [toggleStatus, setToggleStatus] = useState(false);
  return (
    <Component
      {...(props as TBaseProps)}
      toggle={() => setToggleStatus(!toggleStatus)}
      toggleStatus={toggleStatus}
    />
  );
};
export const ButtonWithToggle = componentWithToggle(Button);
