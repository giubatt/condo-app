import React from 'react'
// import styled from '@emotion/styled'

export interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  error?: string
}

const LabelInput = React.forwardRef(
  (
    { label, error, ...inputProps }: Props,
    ref?: React.Ref<HTMLInputElement>,
  ) => {
    console.log({ error })
    return (
      <>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={inputProps.id}
        >
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={inputProps.id}
          type={inputProps.type}
          placeholder={inputProps.placeholder}
          ref={ref}
          {...inputProps}
        />
        <p className="text-red-500 text-xs italic h-2 mt-2">{error}</p>
      </>
    )
  },
)

LabelInput.displayName = 'LabelInput'

export default LabelInput
