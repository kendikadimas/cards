"use client"

import React, { PropsWithChildren } from 'react';
import { Sidebar } from '@/components/sidebar'; 

export default function EditorLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                {children}
            </div>
        </div>
    );
}