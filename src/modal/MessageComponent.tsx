import React, { FC, useEffect } from 'react';
import {FigureNames} from "../models/figures/Figure";

interface ModalProps {
    isOpen: boolean;
    message: string | null;
    handleClose: () => void;
}

const MessageComponent: FC<ModalProps> = ({ isOpen, message, handleClose}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // блокируем прокрутку
        } else {
            document.body.style.overflow = 'auto'; // разблокируем прокрутку
        }
    }, [isOpen]);


    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>{message}</h2>
                <button onClick={handleClose}>Ok</button>
            </div>
        </div>
    );
};

export default MessageComponent;
