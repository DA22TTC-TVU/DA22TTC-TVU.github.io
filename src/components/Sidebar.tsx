'use client'
import React from 'react';
import { DriveInfo } from '../types';

declare module 'react' {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
        directory?: string;
    }
}

interface SidebarProps {
    driveInfo: DriveInfo | null;
    onCreateFolder: () => void;
    onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUploadFolder: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formatBytes: (bytes: number) => string;
    isOpen: boolean;
    onClose: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function Sidebar({ driveInfo, onCreateFolder, onUploadFile, onUploadFolder, formatBytes, isOpen, onClose, fileInputRef }: SidebarProps) {
    const folderInputRef = React.useRef<HTMLInputElement>(null);

    const handleCreateFolder = () => {
        onClose();
        onCreateFolder();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`
                fixed md:static inset-y-0 left-0 w-60 bg-white p-3 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 transition-transform duration-200 ease-in-out
                z-50 flex flex-col
            `}>
                <div className="flex items-center justify-between mb-4 md:hidden">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <button
                    onClick={handleCreateFolder}
                    className="flex items-center space-x-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all mb-4"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Tạo Thư Mục</span>
                </button>

                <div className="relative mb-2">
                    <label
                        htmlFor="fileInput"
                        className="flex items-center space-x-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer bg-white"
                        onClick={onClose}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Tải File Lên</span>
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        onChange={(e) => {
                            onUploadFile(e);
                            onClose();
                        }}
                        className="hidden"
                        ref={fileInputRef}
                    />
                </div>

                <div className="relative mb-4">
                    <label
                        htmlFor="folderInput"
                        className="flex items-center space-x-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer bg-white"
                        onClick={onClose}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span>Tải Thư Mục Lên</span>
                    </label>
                    <input
                        id="folderInput"
                        type="file"
                        webkitdirectory=""
                        directory=""
                        multiple
                        onChange={(e) => {
                            onUploadFolder(e);
                            onClose();
                        }}
                        className="hidden"
                        ref={folderInputRef}
                    />
                </div>

                <div className="space-y-1">
                    <div className="flex items-center space-x-3 px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>DA22TTC</span>
                    </div>
                </div>

                {driveInfo && (
                    <div className="mt-auto px-4 text-sm text-gray-500">
                        <div className="mb-2">Bộ nhớ đã dùng</div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${(driveInfo.used / driveInfo.total) * 100}%` }}
                            />
                        </div>
                        <div className="mt-2">{formatBytes(driveInfo.remaining)} còn trống</div>
                    </div>
                )}
            </div>
        </>
    );
}