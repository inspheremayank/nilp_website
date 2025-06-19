'use client'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
    isOpen: boolean
    onClose?: () => void
    children: React.ReactNode
    title?: string
    backdrop?: boolean,
    className?: string,
    header?: boolean
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, backdrop, className, header = true }) => {
    const [show, setShow] = useState(isOpen)

    useEffect(() => {
        if (isOpen) {
            setShow(true)
        }
    }, [isOpen])

    // const handleAnimationEnd = () => {
    //     if (!isOpen) {
    //         setShow(false)
    //     }
    // }

    if (typeof window === 'undefined') return null
    const modalRoot = document.querySelector('body')
    if (!modalRoot || !show) return null

    return ReactDOM.createPortal(
        <div className={`modal customModal ${isOpen ? 'd-block fadeIn' : 'fadeOut'} ${backdrop && 'backdorp'} ${className && className}`} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {header &&
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                        </div>
                    }
                    <div className="modal-body">
                        {children}
                    </div>

                </div>
            </div>
        </div>,
        modalRoot
    )
}

export default CustomModal;