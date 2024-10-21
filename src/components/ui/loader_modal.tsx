
import React from 'react';
import {MoonLoader} from 'react-spinners';

interface LoaderModalProps {
    loading: boolean;
    color?: string;
    size?: number;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ loading, color = "#04d9b2", size = 80 }) => {
    if (!loading) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <MoonLoader color={color} loading={loading} size={45} />
        </div>
    );
};

export default LoaderModal;
