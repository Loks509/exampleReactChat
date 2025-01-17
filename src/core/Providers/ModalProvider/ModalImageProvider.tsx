//@ts-nocheck временно, надо убирать ошибки

import { createContext, useEffect, useState } from "react";

import './image-style.css'

const modalImageContext = createContext<{src: string, setSrc: (src: string) => void}>({src: '', setSrc: ()=>{}});

const ModalFullScreen = ({ src, setSrc }) => {
    const hideModal = () => {
        setSrc('');
    }

    const closeModal = (event) => {
        if (event.key === "Escape") {
            hideModal();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", closeModal, false);
        return () => {
            document.removeEventListener("keydown", closeModal, false);
        }
    }, [src]);

    const style = {
        display: src != '' ? 'flex' : 'none',
    };

    const style2 = {
        'backgroundImage': `url(${src})`
    }

    return (
        <div className="overlay-image" style={style} onClick={hideModal}>
            <div className="overlay-content" style={style2}>
            </div>
        </div>
    );
}

function ModalImageProvider({ children }) {
    const [src, setSrc] = useState('');

    return (
        <modalImageContext.Provider value={{ src, setSrc }}>
            {children}
            <ModalFullScreen src={src} setSrc={setSrc} />
        </modalImageContext.Provider>
    )
}
export {modalImageContext}
export default ModalImageProvider