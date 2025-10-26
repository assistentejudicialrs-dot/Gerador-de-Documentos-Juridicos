import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { LegalBasis } from '../types';

interface LegalBasisModalProps {
    isOpen: boolean;
    onClose: () => void;
    legalBases: LegalBasis[];
}

// Fix: Replaced React.FC with a standard function definition with typed props to avoid errors from missing React types.
const LegalBasisModal = ({ isOpen, onClose, legalBases }: LegalBasisModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Base Legal</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6 text-gray-700 dark:text-gray-300">
                    {legalBases && legalBases.length > 0 ? (
                        legalBases.map(item => (
                            <div key={item.id} className="mb-6">
                                <h3 className="font-bold mb-2 text-lg text-gray-800 dark:text-gray-200">{item.title}</h3>
                                <p className="whitespace-pre-wrap">{item.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 p-4">
                            Nenhuma base legal foi configurada. Você pode adicionar itens na tela de Configurações.
                        </p>
                    )}
                </div>
                <div className="flex justify-end p-6 border-t dark:border-gray-700">
                    <button onClick={onClose} className="px-6 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary-dark">Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default LegalBasisModal;