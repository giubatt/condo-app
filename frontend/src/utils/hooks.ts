import { useState, useCallback } from 'react'

export function useModals<T>(): {
  openModalId: T | undefined
  modalProps: { [key: string]: unknown }
  openModal: (id: T, props: { [key: string]: unknown }) => void
  closeModal: () => void
} {
  const [modalProps, setModalProps] = useState<{ [key: string]: unknown }>({})
  const [openModalId, setOpenModalId] = useState<T>()

  const openModal = useCallback(
    (id: T, props: { [key: string]: unknown } = {}) => {
      setOpenModalId(id)
      setModalProps(props)
    },
    [],
  )

  const closeModal = useCallback(() => {
    setOpenModalId(undefined)
  }, [])

  return { openModalId, modalProps, openModal, closeModal }
}
