import { FormEvent, ReactNode, useCallback } from "react";

type Props = {
  children?: ReactNode;
  onChangedValue: (name: string, value: string) => void;
};

export const Form = (props: Props) => {
  const onChangeChild = useCallback(
    (e: FormEvent) => {
      const target = e.target as HTMLInputElement;
      const name = target.getAttribute("name");
      const value = target.value;
      if (name != null && value != null) {
        props.onChangedValue(name, value);
      }
    },
    [props.onChangedValue]
  );

  return <form onChange={onChangeChild}>{props.children}</form>;
};
