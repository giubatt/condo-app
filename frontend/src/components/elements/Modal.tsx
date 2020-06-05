import React from 'react'
import ReactModal from 'react-modal'
import Button from 'src/components/elements/Button'

export interface Props extends ReactModal.Props {
  title: string
  onCancel: () => void
  onConfirm: () => void
  cancelButtonText?: string
  confirmButtonText?: string
}

const Modal: React.FC<Props> = ({
  title,
  onCancel,
  onConfirm,
  cancelButtonText = 'Cancelar',
  confirmButtonText = 'Confirmar',
  isOpen,
  children,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'block',
          minWidth: '20em',
          maxWidth: '70%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          position: 'fixed',
          inset: 0,
        },
      }}
      className="rounded p-4 bg-white"
      overlayClassName="bg-gray-800 bg-opacity-75"
      {...props}
    >
      <h1 className="text-gray-800 text-1xl mb-4 font-bold">{title}</h1>
      <div className="mb-4">{children}</div>
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          {cancelButtonText}
        </Button>
        <Button type="submit" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </div>
    </ReactModal>
  )
}

export default Modal
